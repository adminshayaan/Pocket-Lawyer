import { LEGAL_CATEGORIES } from '../data/legalLibraryData';
import { CONSTITUTION_ARTICLES } from '../data/constitutionData';
import { LegalSource, LegalTopic, ConstitutionArticle } from '../types/legal';

/**
 * Searches the legal database for matching topics, acts, or sections.
 */
export function searchLegalDatabase(query: string): { topic: LegalTopic; categoryName: string; relevanceScore: number }[] {
  if (!query || !query.trim()) return [];

  const tokens = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 1);
  if (tokens.length === 0) return [];

  const results: { topic: LegalTopic; categoryName: string; relevanceScore: number }[] = [];

  for (const cat of LEGAL_CATEGORIES) {
    for (const topic of cat.topics) {
      let score = 0;
      const titleLower = topic.title.toLowerCase();
      const summaryLower = topic.summary.toLowerCase();
      const explLower = topic.plainLanguageExplanation.toLowerCase();
      const sectionsCombined = topic.applicableSections.map(s => `${s.act} ${s.section} ${s.description}`).join(' ').toLowerCase();

      for (const token of tokens) {
        if (titleLower.includes(token)) score += 10;
        if (sectionsCombined.includes(token)) score += 8;
        if (summaryLower.includes(token)) score += 5;
        if (explLower.includes(token)) score += 3;
        if (cat.name.toLowerCase().includes(token)) score += 4;
      }

      if (score > 0) {
        results.push({
          topic,
          categoryName: cat.name,
          relevanceScore: score
        });
      }
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Searches the Constitution articles by article number or text keywords.
 */
export function searchConstitution(query: string): ConstitutionArticle[] {
  if (!query || !query.trim()) return CONSTITUTION_ARTICLES;

  const q = query.toLowerCase().trim();
  const articleNumMatch = q.match(/article\s*(\d+[a-z]?)/i) || q.match(/^(\d+[a-z]?)$/i);
  const targetNum = articleNumMatch ? articleNumMatch[1].toLowerCase() : null;

  return CONSTITUTION_ARTICLES.filter(art => {
    if (targetNum && art.articleNumber.toLowerCase() === targetNum) return true;
    return (
      art.articleNumber.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.part.toLowerCase().includes(q) ||
      art.simpleExplanation.toLowerCase().includes(q) ||
      art.originalText.toLowerCase().includes(q)
    );
  });
}

/**
 * Retrieves verified statutory sources matching a user prompt to ground AI answers.
 */
export function retrieveGroundedSources(query: string): LegalSource[] {
  const matchingTopics = searchLegalDatabase(query);
  const sources: LegalSource[] = [];
  const seenUrls = new Set<string>();

  for (const match of matchingTopics.slice(0, 3)) {
    for (const src of match.topic.officialSources) {
      const key = `${src.actName}-${src.sectionOrArticle}`;
      if (!seenUrls.has(key)) {
        seenUrls.add(key);
        sources.push(src);
      }
    }
  }

  // Also check constitution
  const matchingArticles = searchConstitution(query);
  for (const art of matchingArticles.slice(0, 2)) {
    const key = `Constitution-Article-${art.articleNumber}`;
    if (!seenUrls.has(key)) {
      seenUrls.add(key);
      sources.push({
        title: `Constitution of India — Article ${art.articleNumber}`,
        actName: 'Constitution of India',
        sectionOrArticle: `Article ${art.articleNumber} (${art.title})`,
        excerpt: art.originalText.slice(0, 250) + (art.originalText.length > 250 ? '...' : ''),
        url: art.officialSourceUrl,
        verified: true,
        lastReviewed: '2024-01-01'
      });
    }
  }

  return sources;
}

/**
 * Parses structured AI legal responses into clean segments.
 */
export function parseLegalAnswer(rawText: string): {
  shortAnswer: string;
  whatTheLawSays: string;
  relevantSections: { act: string; section: string; whatItSays: string }[];
  whatYouCanDoNext: string[];
  sources?: LegalSource[];
  limitations: string;
} {
  const result: {
    shortAnswer: string;
    whatTheLawSays: string;
    relevantSections: { act: string; section: string; whatItSays: string }[];
    whatYouCanDoNext: string[];
    sources?: LegalSource[];
    limitations: string;
  } = {
    shortAnswer: '',
    whatTheLawSays: '',
    relevantSections: [],
    whatYouCanDoNext: [],
    sources: [],
    limitations: ''
  };

  if (!rawText) return result;

  const cleanDivider = (str: string) => str.replace(/\n\s*[-*_]{3,}\s*$/g, '').trim();

  // Flexible header regex patterns
  const shortAnswerPattern = /(?:(?:###|##|\*\*|)\s*(?:1\.\s*)?Short Answer(?:\*\*|:)?)\s*([\s\S]*?)(?=(?:(?:###|##|\*\*|)\s*(?:2\.\s*)?What the Law Says(?:\*\*|:)?)|$)/i;
  const lawSaysPattern = /(?:(?:###|##|\*\*|)\s*(?:2\.\s*)?What the Law Says(?:\*\*|:)?)\s*([\s\S]*?)(?=(?:(?:###|##|\*\*|)\s*(?:3\.\s*)?Relevant Sections(?:\*\*|:)?)|$)/i;
  const tableSectionPattern = /(?:(?:###|##|\*\*|)\s*(?:3\.\s*)?Relevant Sections(?:\*\*|:)?)\s*([\s\S]*?)(?=(?:(?:###|##|\*\*|)\s*(?:4\.\s*)?What You Can Do Next(?:\*\*|:)?)|$)/i;
  const nextStepsPattern = /(?:(?:###|##|\*\*|)\s*(?:4\.\s*)?What You Can Do Next(?:\*\*|:)?)\s*([\s\S]*?)(?=(?:(?:###|##|\*\*|)\s*(?:5\.\s*)?Sources(?:\*\*|:)?)|(?:(?:###|##|\*\*|)\s*(?:6\.\s*)?Important Limitations(?:\*\*|:)?)|$)/i;
  const limitationsPattern = /(?:(?:###|##|\*\*|)\s*(?:6\.\s*)?Important Limitations(?:\*\*|:)?)\s*([\s\S]*?)$/i;

  const shortAnswerMatch = rawText.match(shortAnswerPattern);
  if (shortAnswerMatch && shortAnswerMatch[1]) {
    result.shortAnswer = cleanDivider(shortAnswerMatch[1].trim());
  }

  const lawSaysMatch = rawText.match(lawSaysPattern);
  if (lawSaysMatch && lawSaysMatch[1]) {
    result.whatTheLawSays = cleanDivider(lawSaysMatch[1].trim());
  }

  const tableSectionMatch = rawText.match(tableSectionPattern);
  if (tableSectionMatch && tableSectionMatch[1]) {
    const tableLines = tableSectionMatch[1].split('\n').filter(line => line.includes('|'));
    for (const line of tableLines) {
      const cols = line.split('|').map(c => c.trim()).filter(Boolean);
      // Skip headers and divider rows
      if (cols.length >= 3 && !cols[0].toLowerCase().includes('act') && !cols[0].includes('---') && !cols[0].includes(':---')) {
        result.relevantSections.push({
          act: cols[0].replace(/\*\*/g, '').trim(),
          section: cols[1].replace(/\*\*/g, '').trim(),
          whatItSays: cols[2].replace(/\*\*/g, '').trim()
        });
      }
    }
  }

  const nextStepsMatch = rawText.match(nextStepsPattern);
  if (nextStepsMatch && nextStepsMatch[1]) {
    const rawSteps = cleanDivider(nextStepsMatch[1].trim());
    result.whatYouCanDoNext = rawSteps
      .split(/\n(?=[-*\d+.\s])/)
      .map(s => s.replace(/^[-*\d+.\s]+/, '').trim())
      .filter(s => s.length > 3);
  }

  const limitMatch = rawText.match(limitationsPattern);
  if (limitMatch && limitMatch[1]) {
    result.limitations = cleanDivider(limitMatch[1].trim());
  }

  // Fallback if structured regex didn't extract cleanly:
  if (!result.shortAnswer && !result.whatTheLawSays) {
    result.shortAnswer = rawText.slice(0, 300) + (rawText.length > 300 ? '...' : '');
    result.whatTheLawSays = rawText;
  }

  return result;
}

/**
 * Validates draft form data against required fields.
 */
export function validateDraftForm(
  requiredFields: string[],
  formData: Record<string, string>
): { isValid: boolean; missingFields: string[] } {
  const missing: string[] = [];
  for (const field of requiredFields) {
    if (!formData[field] || formData[field].trim().length === 0) {
      missing.push(field);
    }
  }
  return {
    isValid: missing.length === 0,
    missingFields: missing
  };
}
