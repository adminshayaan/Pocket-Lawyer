import React, { useState, useEffect } from 'react';
import { DRAFT_TEMPLATES } from '../data/draftTemplates';
import { DraftTemplate, DraftTemplateId } from '../types/legal';
import { validateDraftForm } from '../utils/legalLogic';
import { exportDraftToPdf } from '../utils/pdfGenerator';
import {
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Sparkles,
  Download,
  AlertTriangle,
  Info,
  Edit3,
  Loader2,
  FileDown,
  CheckCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DraftStudioView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<DraftTemplate>(DRAFT_TEMPLATES[0]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // PDF Export and notification state
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic animation stage for step 3 loading
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    if (currentStep === 3) {
      const interval = setInterval(() => {
        setLoadingStage((prev) => (prev + 1) % 3);
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectTemplate = (tmpl: DraftTemplate) => {
    setSelectedTemplate(tmpl);
    setFormData({});
    setValidationError(null);
    setCurrentStep(2);
  };

  const handleInputChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    if (validationError) setValidationError(null);
  };

  // Demo sample loader so judges can test workflow instantly in 1-click
  const handleLoadDemoData = () => {
    if (selectedTemplate.id === 'incident-report') {
      setFormData({
        reporterName: 'Sunil Verma',
        dateTime: '12th October 2024 at approx. 6:45 PM',
        location: 'Koramangala 5th Block, near Sony World Signal, Bengaluru',
        involvedParties:
          'Two unidentified individuals on a black motorcycle (Registration ending in KA-01-XX-XXXX)',
        chronologicalNarrative:
          'While waiting at the bus stop, two individuals approached on a motorbike. The pillion rider forcefully snatched my mobile phone (Samsung Galaxy S23) from my hand. I attempted to note the registration number and immediately called the police emergency number 112 from a nearby shop. The patrol vehicle arrived 15 minutes later and took initial details.',
        evidenceList:
          'Store CCTV camera facing the road (Shop Name: Corner Bakery), original phone purchase invoice with IMEI numbers.',
        witnesses: 'Shopkeeper Mr. Murthy of Corner Bakery and two pedestrians who witnessed the incident.',
        requestedOutcome:
          'Registration of formal complaint/FIR, tracing of stolen device via IMEI, and issuing official acknowledgment for SIM replacement and insurance claim.',
      });
    } else if (selectedTemplate.id === 'formal-complaint') {
      setFormData({
        complainantName: 'Ananya Rao, Phone: 9876543210, Email: ananya.rao@example.com',
        authorityRecipient: 'The Branch Manager / Principal Nodal Officer, State Bank of India, MG Road Branch',
        subjectLine:
          'Formal Complaint regarding unauthorized UPI withdrawal of ₹35,000 and claim under RBI Zero Liability Policy',
        incidentSummary:
          'On 10th October 2024 at 14:15 hrs, an unauthorized debit of ₹35,000 occurred from my Savings Account #XXXX1234 without my consent. No OTP was shared. Within 45 minutes of the SMS alert, I contacted the 1930 Cyber Fraud Helpline and registered acknowledgment #2024/10/98765.',
        specificGrievance:
          'Failure of automated fraud alert mechanisms and delay in immediate temporary credit as mandated by RBI Master Directions on Customer Protection.',
        reliefRequested:
          'Immediate full credit of ₹35,000 to my account, investigation report, and confirmation of card/UPI security freeze.',
        annexures:
          'Annexure 1: Bank statement highlighting disputed transaction, Annexure 2: Cybercrime portal acknowledgment, Annexure 3: Copy of communication.',
      });
    } else {
      setFormData({
        reporterName: 'Citizen Applicant',
        dateTime: '14th October 2024',
        location: 'New Delhi',
        chronologicalNarrative:
          'A factual representation of the issue encountered and the previous administrative requests made.',
        requestedOutcome: 'Expeditious review and written resolution.',
      });
    }
    triggerToast('Loaded sample incident data into form fields.');
  };

  const handleGenerateDraft = async () => {
    // Validate required fields
    const requiredKeys = selectedTemplate.fields.filter((f) => f.required).map((f) => f.key);
    const validation = validateDraftForm(requiredKeys, formData);

    if (!validation.isValid) {
      setValidationError('Please complete the highlighted required fields before generating the draft.');
      return;
    }

    setIsGenerating(true);
    setValidationError(null);
    setCurrentStep(3);

    try {
      const response = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          templateTitle: selectedTemplate.title,
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setGeneratedDraft(data.draftText || 'Failed to generate draft.');
      setCurrentStep(4);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error('Draft generation error:', err);
      setValidationError(`Error generating draft: ${err.message}. Please try again.`);
      setCurrentStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    triggerToast('Draft text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDraft], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.id}-draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    triggerToast('Downloaded draft as .txt file.');
  };

  // Primary PDF Download Handler
  const handleDownloadPdf = () => {
    if (!generatedDraft || !generatedDraft.trim()) {
      triggerToast('Draft is empty. Please enter or generate text before downloading PDF.');
      return;
    }

    setIsExportingPdf(true);
    try {
      const success = exportDraftToPdf({
        title: selectedTemplate.title,
        draftText: generatedDraft,
        templateId: selectedTemplate.id,
        metadata: {
          reporterName: formData.reporterName || formData.complainantName,
          location: formData.location,
          date: formData.dateTime,
          authority: formData.authorityRecipient,
        },
      });

      if (success) {
        setPdfDownloaded(true);
        triggerToast('PDF report draft downloaded successfully! Check your downloads.');
        setTimeout(() => setPdfDownloaded(false), 3000);
      }
    } catch (err: any) {
      console.error('PDF export error:', err);
      triggerToast('Direct PDF export encountered an error. Falling back to .txt file.');
      handleDownloadTxt();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Optional print handler
  const handlePrintSystem = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
      {/* Floating Animated Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900 text-white shadow-xl border border-neutral-700/80 text-xs sm:text-sm">
            <CheckCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header matching UI Collage */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-black shadow-xs hover:scale-105 hover:bg-neutral-200 transition-all duration-200">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Draft Studio
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Create editable drafts for reports, complaints and representations based on your situation.
          </p>
        </div>
      </div>

      {/* 4-Step Stepper Bar with smooth interactive hover and movement effects */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 select-none">
        {[
          { num: 1, label: 'Choose Template' },
          { num: 2, label: 'Provide Details' },
          { num: 3, label: 'Generate Draft' },
          { num: 4, label: 'Edit & Download' },
        ].map((step) => {
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <div
              key={step.num}
              onClick={() => {
                if (isDone) setCurrentStep(step.num);
              }}
              className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all duration-200 transform ${
                isActive
                  ? 'bg-black text-white border-black shadow-sm font-semibold scale-[1.01]'
                  : isDone
                  ? 'bg-neutral-100 text-neutral-900 border-neutral-200 cursor-pointer hover:bg-neutral-200 hover:-translate-y-0.5 active:scale-95'
                  : 'bg-white text-neutral-400 border-neutral-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 ${
                  isActive
                    ? 'bg-white text-black scale-105'
                    : isDone
                    ? 'bg-black text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
              </div>
              <span className="text-xs font-medium truncate">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Choose Template with smooth card lift animations */}
      {currentStep === 1 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Select a Legal Document Template
          </h2>
          {DRAFT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-black hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 flex-shrink-0 group-hover:bg-black group-hover:text-white group-hover:rotate-3 group-hover:scale-105 transition-all duration-200">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-0.5 group-hover:text-black">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-2">{tmpl.description}</p>
                  <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200 transition-colors">
                    Recommended for: {tmpl.recommendedFor}
                  </span>
                </div>
              </div>
              <div className="text-neutral-400 group-hover:text-black group-hover:translate-x-1.5 transition-all duration-200 pl-2">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2: Provide Details Form */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black mb-1 font-medium hover:-translate-x-0.5 transition-transform"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Change Template
              </button>
              <h2 className="text-xl font-bold text-neutral-900">{selectedTemplate.title}</h2>
              <p className="text-xs text-neutral-500">
                Describe events in your own words. The AI will structure it formally without inventing facts.
              </p>
            </div>

            {/* Quick Demo Pre-fill Button for testing */}
            <button
              type="button"
              onClick={handleLoadDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-800 bg-white hover:bg-neutral-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Fill with Sample Demo Incident</span>
            </button>
          </div>

          {validationError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in duration-200">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {selectedTemplate.fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs font-semibold text-neutral-800 flex items-center justify-between">
                  <span>
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </span>
                  {field.helpText && (
                    <span className="text-[11px] font-normal text-neutral-400">{field.helpText}</span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y transition-all duration-200"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-black hover:-translate-x-0.5 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleGenerateDraft}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate Draft with AI</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Loading Generation with animated progress pulses */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-5 animate-in fade-in duration-300 shadow-xs">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center animate-pulse shadow-md">
              <FileText className="w-8 h-8" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-black/30 animate-ping opacity-30" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              Structuring Legal Report Draft...
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
              {loadingStage === 0 && 'Organizing chronological timeline and involved party statements...'}
              {loadingStage === 1 && 'Aligning statutory provisions under Indian law (BNS / BNSS / IT Act)...'}
              {loadingStage === 2 && 'Formatting formal prayers, relief clause, and verification block...'}
            </p>
          </div>

          {/* Progress bar visual effect */}
          <div className="w-48 h-1.5 bg-neutral-100 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-black rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* STEP 4: Edit & Download Draft */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Statutory Draft Disclaimer Notice */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3 shadow-2xs">
            <Info className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-700 leading-relaxed">
              <span className="font-bold text-neutral-900 block mb-0.5">
                IMPORTANT LEGAL DRAFT NOTICE:
              </span>
              This output is an initial draft prepared from user-provided information. It is NOT automatically an official police report, FIR, court filing, sworn affidavit, or legally validated document. Generating a draft does NOT submit it to any authority. Review and verify with a qualified advocate before filing.
            </div>
          </div>

          {/* Document Viewer & Editor Container */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-200">
            {/* Toolbar - Exact CSS Selector target matching button:nth-of-type(3) */}
            <div className="px-6 py-3 border-b border-neutral-200 bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-800">
                  {selectedTemplate.title} — Editable Draft
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold animate-in fade-in duration-200">
                  Ready to Export
                </span>
              </div>

              {/* Action Buttons group:
                  button 1: Copy Draft
                  button 2: Download .txt
                  button 3: Print / Save PDF (target element styled with interactive download & smooth animations)
              */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Draft'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Download .txt</span>
                </button>

                {/* TARGET BUTTON: div#root ... > button:nth-of-type(3) */}
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="relative group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white font-medium hover:bg-black transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border border-neutral-800 cursor-pointer overflow-hidden disabled:opacity-75 disabled:pointer-events-none"
                  title="Generate and download official PDF report draft"
                >
                  {/* Subtle shine effect on hover */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  {isExportingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                      <span className="font-medium">Saving PDF...</span>
                    </>
                  ) : pdfDownloaded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in-75 duration-200" />
                      <span className="font-semibold text-emerald-300">PDF Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200 text-white/95" />
                      <span className="font-medium">Print / Save PDF</span>
                      <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono font-bold tracking-wider">
                        PDF
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Editable Textarea Preview with document layout styling */}
            <div className="p-6 sm:p-8 bg-neutral-50/50 min-h-[420px]">
              <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs font-mono text-xs sm:text-sm text-neutral-900 leading-relaxed transition-all">
                <textarea
                  value={generatedDraft}
                  onChange={(e) => setGeneratedDraft(e.target.value)}
                  rows={22}
                  className="w-full resize-y border-none bg-transparent focus:outline-none whitespace-pre-wrap font-sans text-neutral-800 leading-relaxed"
                  aria-label="Editable generated draft"
                  placeholder="Draft content will appear here..."
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-[#FAFAFA] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black hover:-translate-x-0.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Input Details</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrintSystem}
                  className="text-xs text-neutral-500 hover:text-neutral-800 hover:underline hidden sm:inline-block cursor-pointer"
                  title="Open standard browser print dialog"
                >
                  System Print Dialogue
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(DRAFT_TEMPLATES[0]);
                    setFormData({});
                    setGeneratedDraft('');
                    setCurrentStep(1);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-black hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Draft</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
