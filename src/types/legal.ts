export interface LegalSource {
  title: string;
  actName: string;
  sectionOrArticle: string;
  excerpt: string;
  url: string;
  verified: boolean;
  lastReviewed?: string;
}

export interface LegalTopic {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  plainLanguageExplanation: string;
  whenRelevant: string[];
  applicableSections: {
    act: string;
    section: string;
    description: string;
    penaltyOrRemedy?: string;
  }[];
  commonQuestions: {
    question: string;
    answer: string;
  }[];
  suggestedNextSteps: string[];
  officialSources: LegalSource[];
  relatedTopicIds: string[];
}

export interface LegalCategory {
  id: string;
  name: string;
  shortDescription: string;
  iconName: string;
  isPriority?: boolean;
  topics: LegalTopic[];
}

export interface ConstitutionArticle {
  articleNumber: string;
  title: string;
  part: string;
  partTitle: string;
  originalText: string;
  simpleExplanation: string;
  keyPrinciples: string[];
  historicalContext?: string;
  officialSourceUrl: string;
  relatedArticles: string[];
}

export interface ConstitutionPart {
  id: string;
  partNumber: string;
  title: string;
  articleRange: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  parsedSections?: {
    shortAnswer?: string;
    whatTheLawSays?: string;
    relevantSections?: { act: string; section: string; whatItSays: string }[];
    whatYouCanDoNext?: string[];
    sources?: LegalSource[];
    importantLimitations?: string;
  };
  groundingSearchQueries?: string[];
  imageUrl?: string;
  modelUsed?: string;
  thinkingMode?: boolean;
}

export interface ConversationThread {
  id: string;
  title: string;
  category?: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export type DraftTemplateId =
  | 'incident-report'
  | 'formal-complaint'
  | 'representation-authority'
  | 'request-information'
  | 'chronological-statement';

export interface DraftTemplate {
  id: DraftTemplateId;
  title: string;
  description: string;
  recommendedFor: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'date';
    required?: boolean;
    helpText?: string;
  }[];
}

export interface DraftDocument {
  id: string;
  templateId: DraftTemplateId;
  templateTitle: string;
  title: string;
  formData: Record<string, string>;
  generatedContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface LegalHistoryEvent {
  id: string;
  year: string;
  title: string;
  era: string;
  summary: string;
  significance: string;
  keyActsOrMilestones: string[];
  sourceReference: string;
}
