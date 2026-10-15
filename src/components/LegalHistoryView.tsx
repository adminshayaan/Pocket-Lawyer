import React, { useState } from 'react';
import { LEGAL_HISTORY_EVENTS } from '../data/legalHistoryData';
import { LegalHistoryEvent } from '../types/legal';
import {
  Calendar,
  Clock,
  BookOpen,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  ArrowRight
} from 'lucide-react';

interface LegalHistoryViewProps {
  onAskAiWithHistoryEvent: (query: string) => void;
}

export const LegalHistoryView: React.FC<LegalHistoryViewProps> = ({
  onAskAiWithHistoryEvent,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<LegalHistoryEvent | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
          Evolution of Jurisprudence
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-['Cinzel',serif]">
          Legal History of India
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
          Explore the landmark constitutional moments, judicial doctrines, and statutory evolutions that shaped modern Indian law.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-neutral-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
        {LEGAL_HISTORY_EVENTS.map((event) => (
          <div
            key={event.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-black group-hover:scale-125 transition-transform" />

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs hover:border-black hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 w-max font-mono">
                  {event.year}
                </span>
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {event.era}
                </span>
              </div>

              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-black mb-2 flex items-center justify-between">
                <span>{event.title}</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                {event.summary}
              </p>

              {/* Significance Box */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700 mb-4">
                <span className="font-semibold text-neutral-900 block mb-0.5">
                  Constitutional & Legal Significance:
                </span>
                {event.significance}
              </div>

              {/* Milestones Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100">
                {event.keyActsOrMilestones.map((m, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Source Reference */}
              <div className="mt-3 text-[10px] text-neutral-400">
                Source Reference: {event.sourceReference}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Event Deep Dive Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-neutral-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  {selectedEvent.year}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-500"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {selectedEvent.summary}
            </p>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800">
              <span className="font-bold block mb-1">Impact on Indian Jurisprudence:</span>
              {selectedEvent.significance}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Key Statutes & Case Citations:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700">
                {selectedEvent.keyActsOrMilestones.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const ev = selectedEvent;
                  setSelectedEvent(null);
                  onAskAiWithHistoryEvent(`Tell me about the legal history and significance of: ${ev.title} (${ev.year})`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI about this event</span>
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
