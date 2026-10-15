import React, { useState } from 'react';
import { GavelButton } from './GavelButton';
import {
  MessageSquare,
  BookOpen,
  Scale,
  FileText,
  ArrowRight,
  ShieldAlert,
  Laptop,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NavigationTab } from './Navbar';

interface HomeViewProps {
  onStartChatWithPrompt: (prompt: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartChatWithPrompt,
  onNavigate,
  onSelectCategory,
}) => {
  const [question, setQuestion] = useState('');

  const suggestions = [
    'Can traffic police ask me to show particular documents?',
    'What should I do if I experience online payment fraud?',
    'What rights does a child have under Indian law?',
    'How can I understand a legal notice?',
    'What should I include in a formal complaint?',
  ];

  const handleSubmit = () => {
    if (!question.trim()) return;
    onStartChatWithPrompt(question.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#FAFAFA] to-white border-b border-[#E5E5E5]">
        {/* Subtle decorative architectural courthouse watermark */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.035] pointer-events-none select-none flex items-center justify-end pr-10">
          <Scale className="w-96 h-96 text-black" strokeWidth={0.8} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50/80 text-[11px] font-semibold tracking-wider text-neutral-700 uppercase mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            AI-POWERED INDIAN LEGAL ASSISTANT
          </div>

          {/* Heading Wordmark */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] font-['Cinzel',serif] mb-3">
            POCKET LAWYER
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-neutral-800 tracking-tight mb-3">
            Understand the law. Know your rights.
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#626262] leading-relaxed mb-8">
            Explore Indian law, understand your rights, and find source-backed information for your situation. Grounded in the Bharatiya Nyaya Sanhita, IT Act, and the Constitution of India.
          </p>

          {/* Central Question Input Box */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-neutral-200 shadow-sm transition-all focus-within:border-black focus-within:shadow-md p-2">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Describe your legal question or situation..."
                aria-label="Describe your legal question or situation"
                className="w-full resize-none border-none bg-transparent px-3 py-2 text-sm sm:text-base text-[#111111] placeholder:text-neutral-400 focus:outline-none"
              />
              <div className="flex-shrink-0 pl-2 pr-1">
                <GavelButton
                  onClick={handleSubmit}
                  disabled={!question.trim()}
                  ariaLabel="Ask Pocket Lawyer with Gavel Strike"
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onStartChatWithPrompt(item)}
                className="inline-flex items-center text-xs font-medium text-neutral-700 bg-neutral-100/90 hover:bg-neutral-200 hover:text-black px-3 py-1.5 rounded-full transition-colors border border-neutral-200/60"
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Feature Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Ask AI */}
            <div
              onClick={() => onNavigate('chat')}
              className="p-6 rounded-xl border border-[#E5E5E5] bg-white hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#111111] mb-1">
                  Ask AI
                </h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  Get explanations of Indian legal provisions, BNS 2023, and practical next steps.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:translate-x-1 transition-transform">
                <span>Start conversation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2: Explore Laws */}
            <div
              onClick={() => onNavigate('library')}
              className="p-6 rounded-xl border border-[#E5E5E5] bg-white hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#111111] mb-1">
                  Explore Laws
                </h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  Browse categorized legal topics, official legislation, and verified statutory text.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:translate-x-1 transition-transform">
                <span>Open library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3: Constitution */}
            <div
              onClick={() => onNavigate('constitution')}
              className="p-6 rounded-xl border border-[#E5E5E5] bg-white hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#111111] mb-1">
                  Constitution
                </h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  Read constitutional provisions, original articles, and simple-language explanations.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:translate-x-1 transition-transform">
                <span>Explore articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4: Draft Studio */}
            <div
              onClick={() => onNavigate('draft-studio')}
              className="p-6 rounded-xl border border-[#E5E5E5] bg-white hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-black mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-[#111111] mb-1">
                  Draft Studio
                </h3>
                <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                  Prepare structured, editable drafts for incident reports, complaints, and representations.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-neutral-900 group-hover:translate-x-1 transition-transform">
                <span>Create draft</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Legal Topics Section */}
      <section className="py-12 bg-[#F7F7F7] border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
                Explore popular legal topics
              </h2>
              <p className="text-xs sm:text-sm text-[#626262] mt-1">
                Verified Indian statutory provisions and citizen legal safeguards.
              </p>
            </div>
            <button
              onClick={() => onNavigate('library')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-black hover:underline"
            >
              <span>View all categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Criminal Law */}
            <div
              onClick={() => onSelectCategory('criminal-law')}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-44 bg-neutral-900 relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-radial from-neutral-800 to-black opacity-90" />
                <div className="relative text-center text-white z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 text-white">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-neutral-300">
                    Bharatiya Nyaya Sanhita 2023
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#111111] mb-1.5 flex items-center justify-between">
                    <span>Criminal Law</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    Understand criminal offences, police procedures, bail rights, and the new BNS 2023 statutes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Theft · Assault · Cheating · Arrest Safeguards</span>
                </div>
              </div>
            </div>

            {/* Cyber Law */}
            <div
              onClick={() => onSelectCategory('cyber-law')}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-44 bg-neutral-900 relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-radial from-neutral-800 to-black opacity-90" />
                <div className="relative text-center text-white z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 text-white">
                    <Laptop className="w-7 h-7" />
                  </div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-neutral-300">
                    IT Act 2000 & 1930 Helpline
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#111111] mb-1.5 flex items-center justify-between">
                    <span>Cyber Law</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    Learn about online financial fraud, UPI scams, identity theft, cyberstalking, and digital safety.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                  <span>UPI Scams · Sec 66D · Cybercrime.gov.in</span>
                </div>
              </div>
            </div>

            {/* Juvenile & Child Protection */}
            <div
              onClick={() => onSelectCategory('juvenile-child-protection')}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:border-black hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-44 bg-neutral-900 relative overflow-hidden flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-radial from-neutral-800 to-black opacity-90" />
                <div className="relative text-center text-white z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 text-white">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-neutral-300">
                    JJ Act 2015 & POCSO 2012
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#111111] mb-1.5 flex items-center justify-between">
                    <span>Juvenile & Child Protection</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    Know the rights and protections for children in conflict with law and child welfare safeguards.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-700" />
                  <span>JJ Board · POCSO · Childline 1098</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
