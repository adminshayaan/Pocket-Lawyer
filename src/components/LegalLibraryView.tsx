import React, { useState } from 'react';
import { LEGAL_CATEGORIES } from '../data/legalLibraryData';
import { LegalCategory, LegalTopic } from '../types/legal';
import {
  Search,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Laptop,
  UserCheck,
  BookOpen,
  Car,
  HeartHandshake,
  ShoppingBag,
  Home,
  Users,
  Briefcase,
  Landmark,
  GraduationCap,
  TreePine,
  Scale,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';

interface LegalLibraryViewProps {
  initialCategoryId?: string | null;
  onAskAiWithTopic: (topicTitle: string) => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'criminal-law': ShieldAlert,
  'cyber-law': Laptop,
  'juvenile-child-protection': UserCheck,
  'constitutional-law': BookOpen,
  'traffic-motor-vehicle': Car,
  'womens-rights': HeartHandshake,
  'consumer-rights': ShoppingBag,
  'property-tenancy': Home,
  'family-law': Users,
  'employment-labour': Briefcase,
  'financial-banking': Landmark,
  'education-law': GraduationCap,
  'environmental-law': TreePine,
  'human-rights-police': Scale,
};

export const LegalLibraryView: React.FC<LegalLibraryViewProps> = ({
  initialCategoryId,
  onAskAiWithTopic,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(initialCategoryId || null);
  const [selectedTopic, setSelectedTopic] = useState<LegalTopic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'key-topics' | 'relevant-acts' | 'faqs'>('key-topics');

  const selectedCategory = LEGAL_CATEGORIES.find((c) => c.id === selectedCategoryId);

  // Filtered categories based on search
  const filteredCategories = LEGAL_CATEGORIES.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.shortDescription.toLowerCase().includes(q) ||
      cat.topics.some((t) => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q))
    );
  });

  // If a topic is selected for deep dive
  if (selectedTopic && selectedCategory) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <button
            onClick={() => {
              setSelectedTopic(null);
            }}
            className="hover:text-black font-medium"
          >
            {selectedCategory.name}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate">{selectedTopic.title}</span>
        </nav>

        {/* Topic Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 text-[11px] font-semibold text-neutral-700 uppercase mb-2">
              {selectedCategory.name}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {selectedTopic.title}
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              {selectedTopic.summary}
            </p>
          </div>

          <button
            onClick={() => onAskAiWithTopic(selectedTopic.title)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI about this topic</span>
          </button>
        </div>

        {/* Deep Dive Content Sections */}
        <div className="py-8 space-y-8">
          {/* Plain Language Explanation */}
          <section className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Plain-Language Explanation
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              {selectedTopic.plainLanguageExplanation}
            </p>
          </section>

          {/* When Relevant */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">
              When This Law Is Relevant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedTopic.whenRelevant.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-neutral-200 bg-white flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Applicable Sections */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Applicable Indian Legal Sections
            </h2>
            <div className="space-y-3">
              {selectedTopic.applicableSections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="text-sm font-bold text-neutral-900">{sec.act}</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 font-mono text-xs font-semibold text-neutral-800 w-max">
                      {sec.section}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 mb-2 leading-relaxed">
                    {sec.description}
                  </p>
                  {sec.penaltyOrRemedy && (
                    <div className="text-xs text-neutral-500 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                      <span className="font-semibold text-neutral-700">Remedy / Penalty: </span>
                      {sec.penaltyOrRemedy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Common Questions & FAQs */}
          {selectedTopic.commonQuestions.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Common Legal Questions
              </h2>
              <div className="space-y-3">
                {selectedTopic.commonQuestions.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1.5 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Suggested Next Steps */}
          <section className="bg-neutral-900 text-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Suggested Next Steps
            </h2>
            <ul className="space-y-2">
              {selectedTopic.suggestedNextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Official Sources */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Authoritative Sources
            </h2>
            <div className="space-y-2">
              {selectedTopic.officialSources.map((src, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-neutral-200 bg-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">{src.title}</div>
                    <div className="text-[11px] text-neutral-500">Verified official statutory source</div>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-black hover:underline"
                  >
                    <span>View Gazette</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // If a Category is selected (e.g. Criminal Law matching the UI collage middle bottom screen!)
  if (selectedCategory) {
    const IconComp = CATEGORY_ICONS[selectedCategory.id] || Scale;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
        {/* Breadcrumb */}
        <button
          onClick={() => setSelectedCategoryId(null)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Legal Library</span>
        </button>

        {/* Hero Banner matching UI Collage */}
        <div className="bg-neutral-900 text-white rounded-2xl overflow-hidden p-6 sm:p-8 mb-8 relative shadow-md">
          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Official Legal Category
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {selectedCategory.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              {selectedCategory.shortDescription}
            </p>
          </div>

          {/* Decorative graphic emblem */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 hidden sm:block">
            <IconComp className="w-44 h-44 text-white" />
          </div>
        </div>

        {/* Tabs: Overview, Key Topics, Relevant Acts, Common Questions matching UI Collage */}
        <div className="flex items-center space-x-2 border-b border-neutral-200 mb-6 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'key-topics', label: 'Key Topics' },
            { id: 'relevant-acts', label: 'Relevant Acts' },
            { id: 'faqs', label: 'Common Questions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Key Topics (Default view in collage) */}
        {activeTab === 'key-topics' && (
          <div className="space-y-4">
            {selectedCategory.topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-black hover:shadow-sm transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-black mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mb-2 line-clamp-1">
                      {topic.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {topic.applicableSections.slice(0, 2).map((sec, i) => (
                        <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          {sec.act.split(',')[0]} {sec.section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all pl-2">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Overview */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-neutral-900">About {selectedCategory.name}</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {selectedCategory.shortDescription}
            </p>
            <div className="pt-4 border-t border-neutral-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                Available Curated Topics in Prototype:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-neutral-700">
                {selectedCategory.topics.map((t) => (
                  <li key={t.id}>{t.title}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Relevant Acts */}
        {activeTab === 'relevant-acts' && (
          <div className="space-y-3">
            {selectedCategory.topics.flatMap((t) => t.applicableSections).map((sec, i) => (
              <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-neutral-900">{sec.act}</div>
                  <div className="text-xs text-neutral-600 mt-0.5">{sec.description}</div>
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 self-start sm:self-center">
                  {sec.section}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Common Questions */}
        {activeTab === 'faqs' && (
          <div className="space-y-3">
            {selectedCategory.topics.flatMap((t) => t.commonQuestions).map((faq, i) => (
              <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-white">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default Grid View: All 14 Categories matching UI Collage
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-1">
          Legal Library
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
          Explore Indian laws by category. Learn key provisions, check related sections and get simple explanations.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-8 max-w-xl">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for laws, topics or keywords..."
          aria-label="Search legal library"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-black bg-white shadow-2xs"
        />
      </div>

      {/* Categories Grid matching UI Collage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCategories.map((category) => {
          const IconComp = CATEGORY_ICONS[category.id] || Scale;
          const isSelectedOrPriority = category.isPriority && category.id === 'criminal-law';

          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group shadow-2xs ${
                isSelectedOrPriority
                  ? 'bg-black text-white border-black hover:shadow-md'
                  : 'bg-white text-neutral-900 border-neutral-200 hover:border-black hover:shadow-sm'
              }`}
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelectedOrPriority
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-100 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1">
                  {category.name}
                </h3>
                <p
                  className={`text-xs line-clamp-2 leading-relaxed ${
                    isSelectedOrPriority ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {category.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100/20 flex items-center justify-between text-xs font-semibold">
                <span className="text-[11px] opacity-75">
                  {category.topics.length} verified topics
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
