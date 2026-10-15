import React, { useState } from 'react';
import { Search, X, BookOpen, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import { searchLegalDatabase, searchConstitution } from '../utils/legalLogic';
import { LegalTopic, ConstitutionArticle } from '../types/legal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: LegalTopic) => void;
  onSelectArticle: (article: ConstitutionArticle) => void;
  onAskAi: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
  onSelectArticle,
  onAskAi,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const topicResults = searchLegalDatabase(query);
  const constitutionResults = query.trim() ? searchConstitution(query) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statutes, BNS sections, Constitution, cyber law, or rights..."
            className="w-full text-sm sm:text-base text-neutral-900 border-none bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[460px] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-neutral-400 space-y-2">
              <p>Type keywords to search across Bharatiya Nyaya Sanhita, Constitution, and Legal Library.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Theft', 'Article 21', 'Online Fraud', 'Traffic Challan', 'POCSO', 'Domestic Violence'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Direct Ask AI prompt chip */}
              <div
                onClick={() => {
                  onAskAi(query);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs">
                    AI
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-900">
                    Ask AI directly: "{query}"
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>

              {/* Constitutional Articles Results */}
              {constitutionResults.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Constitution Articles ({constitutionResults.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {constitutionResults.slice(0, 3).map((art) => (
                      <div
                        key={art.articleNumber}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-neutral-100 hover:border-black hover:bg-neutral-50 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            Article {art.articleNumber} — {art.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">
                            {art.simpleExplanation}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          {art.part}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal Topics Results */}
              {topicResults.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Legal Library Topics ({topicResults.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {topicResults.slice(0, 4).map((res) => (
                      <div
                        key={res.topic.id}
                        onClick={() => {
                          onSelectTopic(res.topic);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-neutral-100 hover:border-black hover:bg-neutral-50 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900">
                            {res.topic.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">
                            {res.topic.summary}
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          {res.categoryName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topicResults.length === 0 && constitutionResults.length === 0 && (
                <div className="py-6 text-center text-xs text-neutral-500">
                  No exact statutory records found for "{query}". You can still ask Pocket Lawyer's Gemini assistant!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
