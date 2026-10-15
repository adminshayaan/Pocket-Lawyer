import React, { useState } from 'react';
import { CONSTITUTION_ARTICLES, CONSTITUTION_PARTS } from '../data/constitutionData';
import { ConstitutionArticle } from '../types/legal';
import {
  Search,
  Bookmark,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Check
} from 'lucide-react';

interface ConstitutionViewProps {
  onAskAiWithArticle: (articleText: string) => void;
}

export const ConstitutionView: React.FC<ConstitutionViewProps> = ({
  onAskAiWithArticle,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('part-3');
  const [currentArticleIndex, setCurrentArticleIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'original' | 'simple'>('original');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set(['14']));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentArticle: ConstitutionArticle = CONSTITUTION_ARTICLES[currentArticleIndex] || CONSTITUTION_ARTICLES[0];

  const handlePrev = () => {
    if (currentArticleIndex > 0) {
      setCurrentArticleIndex(currentArticleIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentArticleIndex < CONSTITUTION_ARTICLES.length - 1) {
      setCurrentArticleIndex(currentArticleIndex + 1);
    }
  };

  const handleToggleSave = () => {
    const updated = new Set(savedArticles);
    if (updated.has(currentArticle.articleNumber)) {
      updated.delete(currentArticle.articleNumber);
    } else {
      updated.add(currentArticle.articleNumber);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
    setSavedArticles(updated);
  };

  const prevArticle = currentArticleIndex > 0 ? CONSTITUTION_ARTICLES[currentArticleIndex - 1] : null;
  const nextArticle = currentArticleIndex < CONSTITUTION_ARTICLES.length - 1 ? CONSTITUTION_ARTICLES[currentArticleIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Top Header matching UI Collage */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            Constitutional Law
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-['Cinzel',serif]">
            Constitution Explorer
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Read and explore the Constitution of India with simple explanations and verified articles.
          </p>
        </div>

        {/* Ask AI button for this article */}
        <button
          onClick={() =>
            onAskAiWithArticle(
              `Explain Article ${currentArticle.articleNumber} (${currentArticle.title}) of the Constitution of India with practical real-life examples and landmark judgments.`
            )
          }
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI about Article {currentArticle.articleNumber}</span>
        </button>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-8 max-w-xl">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            const q = e.target.value.toLowerCase().trim();
            const foundIdx = CONSTITUTION_ARTICLES.findIndex(
              (a) =>
                a.articleNumber.toLowerCase() === q ||
                a.title.toLowerCase().includes(q) ||
                a.originalText.toLowerCase().includes(q)
            );
            if (foundIdx !== -1) setCurrentArticleIndex(foundIdx);
          }}
          placeholder="Search by Article, keyword or topic (e.g. 14, 21, equality, liberty)..."
          aria-label="Search Constitution articles"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black bg-white shadow-2xs"
        />
      </div>

      {/* Two-Column Explorer Layout matching UI Collage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parts List */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-neutral-200 p-3 space-y-1 shadow-2xs overflow-y-auto max-h-[580px]">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-2">
            Constitutional Parts
          </div>
          {CONSTITUTION_PARTS.map((part) => {
            const isSelected = part.id === selectedPartId;
            return (
              <button
                key={part.id}
                onClick={() => {
                  setSelectedPartId(part.id);
                  // If part-3, jump to article 14
                  if (part.id === 'part-3') setCurrentArticleIndex(0);
                  if (part.id === 'part-4') {
                    const idx = CONSTITUTION_ARTICLES.findIndex((a) => a.articleNumber === '39A');
                    if (idx !== -1) setCurrentArticleIndex(idx);
                  }
                  if (part.id === 'part-4a') {
                    const idx = CONSTITUTION_ARTICLES.findIndex((a) => a.articleNumber === '51A');
                    if (idx !== -1) setCurrentArticleIndex(idx);
                  }
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-black text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-black font-medium'
                }`}
              >
                <div>
                  <span className="font-mono mr-2">{part.partNumber}</span>
                  <span>{part.title}</span>
                </div>
                <span
                  className={`text-[10px] ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-400'
                  }`}
                >
                  {part.articleRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Article Viewer matching UI Collage */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
          {/* Subtle Lion Capital / State Emblem graphic on top right */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none select-none hidden sm:block">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-24 h-24 text-neutral-800">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Article Header */}
          <div className="mb-6 relative z-10">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              {currentArticle.part} · {currentArticle.partTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Article {currentArticle.articleNumber}
            </h2>
            <p className="text-sm font-medium text-neutral-700 mt-1">
              {currentArticle.title}
            </p>
          </div>

          {/* Toggle Tabs: Original Text vs Simple Explanation matching UI Collage */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl w-max mb-6">
            <button
              onClick={() => setViewMode('original')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'original'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              Original Text
            </button>
            <button
              onClick={() => setViewMode('simple')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'simple'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              Simple Explanation
            </button>
          </div>

          {/* Article Content Display */}
          <div className="p-6 rounded-xl bg-[#F7F7F7] border border-neutral-200 mb-6 min-h-[160px] flex items-center">
            {viewMode === 'original' ? (
              <p className="text-sm sm:text-base font-serif text-neutral-900 leading-relaxed whitespace-pre-wrap">
                "{currentArticle.originalText}"
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed whitespace-pre-wrap">
                  {currentArticle.simpleExplanation}
                </p>
              </div>
            )}
          </div>

          {/* Key Principles Checklist */}
          {currentArticle.keyPrinciples && currentArticle.keyPrinciples.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Core Constitutional Principles
              </h3>
              <ul className="space-y-1.5">
                {currentArticle.keyPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Row: Save Article & View Source matching UI Collage */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-neutral-100 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSave}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                {savedArticles.has(currentArticle.articleNumber) ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Saved Article</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-neutral-500" />
                    <span>Save Article</span>
                  </>
                )}
              </button>

              <a
                href={currentArticle.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-neutral-500" />
                <span>View Source (Official)</span>
              </a>
            </div>

            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-medium animate-in fade-in">
                Saved to your collection!
              </span>
            )}
          </div>

          {/* Pagination Controls matching UI Collage: < Article 13 | Article 15 > */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-semibold text-neutral-800">
            {prevArticle ? (
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Article {prevArticle.articleNumber}</span>
              </button>
            ) : (
              <div />
            )}

            <span className="text-neutral-400 text-[11px]">
              {currentArticleIndex + 1} of {CONSTITUTION_ARTICLES.length} curated articles
            </span>

            {nextArticle ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <span>Article {nextArticle.articleNumber}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
