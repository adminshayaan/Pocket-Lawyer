import React, { useState, useRef, useEffect } from 'react';
import { GavelButton } from './GavelButton';
import { ChatMessage, ConversationThread, LegalSource } from '../types/legal';
import { parseLegalAnswer } from '../utils/legalLogic';
import {
  Plus,
  Paperclip,
  Search,
  Brain,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  ChevronRight,
  FileQuestion,
  Mic,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface ChatWorkspaceProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onOpenVoiceModal: () => void;
  onSelectTopicById?: (topicId: string) => void;
}

const DEFAULT_THREADS: ConversationThread[] = [
  {
    id: 'thread-traffic',
    title: 'Traffic police document inspection',
    category: 'Traffic Law',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Can traffic police ask me to show which documents? What if they misbehave?',
        timestamp: '10:30 AM',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `1. Short Answer
Traffic police can ask you to show specific documents such as driving licence, registration certificate (RC), insurance and pollution under control (PUC) certificate. They must follow legal procedures, wear uniform with name badge, and cannot misbehave or harass you. You have the right to be treated with dignity.

2. What the Law Says
The Motor Vehicles Act, 1988 lays down the requirements for driving documents and penalties for violations. Under Rule 139 of the Central Motor Vehicles Rules (CMVR), documents shown on DigiLocker or mParivahan are legally valid at par with physical originals. Police officers must act within the law and cannot seize your vehicle keys or use abusive language or unlawful force.

3. Relevant Sections
| Act | Section | What it says |
| Motor Vehicles Act, 1988 | Sec 130 | Duty to produce licence and certificate of registration on demand by police officer in uniform. |
| Central Motor Vehicles Rules, 1989 | Rule 139 | Production of electronic documents on DigiLocker / mParivahan recognized as valid. |
| Motor Vehicles Act, 1988 | Sec 177 | General penalty for violations (traffic challans). |
| Bharatiya Nyaya Sanhita, 2023 | Sec 351 | Criminal intimidation (if police or officer threatens unlawful injury or force). |

4. What You Can Do Next
- Carry or show verified digital copies in the official DigiLocker or mParivahan app.
- Note down the officer's name, badge number, and police station if there is misconduct.
- Insist on an official printed or SMS e-challan rather than paying cash without receipt.
- In case of extortion or harassment, file a grievance on the State Police Citizen Portal or approach the Traffic Police Commissioner.

5. Sources
- Motor Vehicles Act, 1988 (India Code Official)
- Ministry of Road Transport and Highways (MoRTH) Notification on DigiLocker
- Bharatiya Nyaya Sanhita, 2023 Section 351

6. Important Limitations
Traffic rules and compounding fines may have state-specific fee notifications. This information is educational and does not constitute formal legal counsel.`,
        timestamp: '10:31 AM',
        parsedSections: {
          shortAnswer:
            'Traffic police can ask you to show specific documents such as driving licence, registration certificate (RC), insurance and pollution under control (PUC) certificate. They must follow legal procedures, wear uniform with name badge, and cannot misbehave or harass you. You have the right to be treated with dignity.',
          whatTheLawSays:
            'The Motor Vehicles Act, 1988 lays down the requirements for driving documents and penalties for violations. Under Rule 139 of the Central Motor Vehicles Rules (CMVR), documents shown on DigiLocker or mParivahan are legally valid at par with physical originals. Police officers must act within the law and cannot seize your vehicle keys or use abusive language or unlawful force.',
          relevantSections: [
            { act: 'Motor Vehicles Act, 1988', section: 'Sec 130', whatItSays: 'Production of documents on demand.' },
            { act: 'Central Motor Vehicles Rules, 1989', section: 'Rule 139', whatItSays: 'Electronic DigiLocker documents validity.' },
            { act: 'Motor Vehicles Act, 1988', section: 'Sec 177', whatItSays: 'General penalty for violations.' },
            { act: 'Bharatiya Nyaya Sanhita, 2023', section: 'Sec 351', whatItSays: 'Criminal intimidation (if threatened).' }
          ],
          whatYouCanDoNext: [
            'Carry or show verified digital copies in the official DigiLocker or mParivahan app.',
            "Note down the officer's name, badge number, and police station if there is misconduct.",
            'Insist on an official printed or SMS e-challan rather than paying cash without receipt.',
            'In case of extortion or harassment, file a grievance on the State Police Citizen Portal.'
          ],
          sources: [
            {
              title: 'Motor Vehicles Act, 1988',
              actName: 'Motor Vehicles Act',
              sectionOrArticle: 'Section 130, Rule 139',
              excerpt: 'Production of driving licence and certificate of registration on demand.',
              url: 'https://morth.nic.in',
              verified: true
            }
          ],
          importantLimitations: 'Traffic rules and compounding fees may have state-specific notifications.'
        }
      }
    ]
  },
  {
    id: 'thread-online-fraud',
    title: 'Online payment fraud & UPI scam',
    category: 'Cyber Law',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-fraud-1',
        role: 'user',
        content: 'I fell victim to a UPI payment fraud of ₹25,000 via a fake link. What should I do immediately?',
        timestamp: '11:15 AM'
      },
      {
        id: 'msg-fraud-2',
        role: 'assistant',
        content: `1. Short Answer
Immediately call the national cyber fraud helpline 1930 within the "Golden Hour" to freeze the transfer before it is withdrawn. Then report the incident on cybercrime.gov.in and notify your bank's fraud control department within 3 days for zero-liability protection.

2. What the Law Says
Online financial fraud and cheating by computer resource are governed under Section 66D of the Information Technology Act, 2000 and Section 318 of the Bharatiya Nyaya Sanhita, 2023. Under RBI Master Directions on Customer Protection, if unauthorized electronic transactions are reported within 3 working days, customer liability is zero.

3. Relevant Sections
| Act | Section | What it says |
| Information Technology Act, 2000 | Sec 66D | Cheating by personation by using computer resource (up to 3 yrs imprisonment and fine). |
| Bharatiya Nyaya Sanhita, 2023 | Sec 318 | Cheating and dishonestly inducing delivery of property (replaces IPC 420). |
| RBI Master Direction | Customer Protection | Zero liability if reported within 3 days of unauthorized debit. |

4. What You Can Do Next
- Dial 1930 immediately to trigger the Citizen Financial Cyber Fraud Reporting System to freeze funds.
- Lodge a formal complaint on the National Cyber Crime Portal (cybercrime.gov.in) and download the acknowledgment.
- Send written notice and email to your bank manager demanding a temporary credit under RBI guidelines.

5. Sources
- Ministry of Home Affairs - National Cyber Crime Reporting Portal (cybercrime.gov.in)
- Reserve Bank of India Master Directions on Limiting Liability of Customers

6. Important Limitations
Recovery depends on reporting promptly before fraudsters withdraw the funds from beneficiary accounts or mules.`,
        timestamp: '11:16 AM',
        parsedSections: {
          shortAnswer: 'Immediately call the national cyber fraud helpline 1930 within the "Golden Hour" to freeze the transfer before it is withdrawn. Then report the incident on cybercrime.gov.in and notify your bank\'s fraud control department within 3 days for zero-liability protection.',
          whatTheLawSays: 'Online financial fraud and cheating by computer resource are governed under Section 66D of the Information Technology Act, 2000 and Section 318 of the Bharatiya Nyaya Sanhita, 2023. Under RBI Master Directions on Customer Protection, if unauthorized electronic transactions are reported within 3 working days, customer liability is zero.',
          relevantSections: [
            { act: 'Information Technology Act, 2000', section: 'Sec 66D', whatItSays: 'Cheating by personation using computer resource.' },
            { act: 'Bharatiya Nyaya Sanhita, 2023', section: 'Sec 318', whatItSays: 'Cheating and inducing property delivery (replaces IPC 420).' },
            { act: 'RBI Customer Protection Circular', section: 'Zero Liability', whatItSays: 'Zero customer liability if notified within 3 days.' }
          ],
          whatYouCanDoNext: [
            'Dial 1930 immediately to trigger the Citizen Financial Cyber Fraud Reporting System.',
            'Lodge a formal complaint on cybercrime.gov.in and download the acknowledgment.',
            'Send written notice and email to your bank manager demanding temporary credit.'
          ],
          sources: [
            {
              title: 'National Cyber Crime Reporting Portal (cybercrime.gov.in)',
              actName: 'IT Act 2000 & RBI Guidelines',
              sectionOrArticle: 'Section 66D',
              excerpt: 'Whoever by means of any computer resource cheats by personating shall be punished...',
              url: 'https://cybercrime.gov.in',
              verified: true
            }
          ],
          importantLimitations: 'Recovery probability is highest within the first 2-3 hours of the transaction.'
        }
      }
    ]
  },
  {
    id: 'thread-child-rights',
    title: 'Child rights under Indian law',
    category: 'Juvenile Law',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-child-1',
        role: 'user',
        content: 'What rights does a child have under Indian law if apprehended by police?',
        timestamp: '09:00 AM'
      },
      {
        id: 'msg-child-2',
        role: 'assistant',
        content: `1. Short Answer
A person under 18 years cannot be locked in a police lockup or sent to jail. They must be placed in charge of a Special Juvenile Police Officer (SJPO) in plain clothes and produced before the Juvenile Justice Board (JJB) within 24 hours. Bail is mandatory by law in almost all situations.

2. What the Law Says
The Juvenile Justice (Care and Protection of Children) Act, 2015 guarantees that children are treated reformatively rather than punitively. Section 10 and 12 mandate immediate bail unless release brings the child into association with known criminals. Section 74 strictly forbids disclosing the child's identity or publishing their name, school, or photographs.

3. Relevant Sections
| Act | Section | What it says |
| Juvenile Justice Act, 2015 | Sec 10 | Apprehension of child alleged to be in conflict with law; no lockup or jail. |
| Juvenile Justice Act, 2015 | Sec 12 | Mandatory bail for child in conflict with law. |
| Juvenile Justice Act, 2015 | Sec 74 | Strict prohibition on disclosure of child's identity in public or media. |

4. What You Can Do Next
- Verify birth certificate to establish minor age below 18.
- Contact the District Legal Services Authority (DLSA) for free child legal counsel.
- Reach out to Childline at 1098 if the child requires urgent care or protection.

5. Sources
- Juvenile Justice (Care and Protection of Children) Act, 2015 (India Code)
- Supreme Court directives on child protection and Special Juvenile Police Units

6. Important Limitations
For children aged 16–18 accused of heinous crimes (punishable by 7+ years), the JJB conducts a preliminary assessment.`,
        timestamp: '09:01 AM',
        parsedSections: {
          shortAnswer: 'A person under 18 years cannot be locked in a police lockup or sent to jail. They must be placed in charge of a Special Juvenile Police Officer in plain clothes and produced before the Juvenile Justice Board within 24 hours. Bail is mandatory by law in almost all situations.',
          whatTheLawSays: 'The Juvenile Justice (Care and Protection of Children) Act, 2015 guarantees that children are treated reformatively rather than punitively. Section 10 and 12 mandate immediate bail unless release brings the child into association with known criminals. Section 74 strictly forbids disclosing the child\'s identity or publishing their name, school, or photographs.',
          relevantSections: [
            { act: 'Juvenile Justice Act, 2015', section: 'Sec 10', whatItSays: 'No lockup or ordinary jail for minors.' },
            { act: 'Juvenile Justice Act, 2015', section: 'Sec 12', whatItSays: 'Mandatory bail for juvenile.' },
            { act: 'Juvenile Justice Act, 2015', section: 'Sec 74', whatItSays: 'Ban on disclosing child identity.' }
          ],
          whatYouCanDoNext: [
            'Verify birth certificate to establish minor age below 18.',
            'Contact the District Legal Services Authority (DLSA) for free child counsel.',
            'Call Childline at 1098 for immediate care and assistance.'
          ],
          sources: [
            {
              title: 'Juvenile Justice Act, 2015',
              actName: 'JJ Act 2015',
              sectionOrArticle: 'Section 10, 12, 74',
              excerpt: 'In no case, a child alleged to be in conflict with law shall be placed in a police lockup or lodged in a jail.',
              url: 'https://www.indiacode.nic.in',
              verified: true
            }
          ],
          importantLimitations: 'Child identity protection is absolute and applies to media and police reports.'
        }
      }
    ]
  },
  {
    id: 'thread-legal-notice',
    title: 'Legal notice explanation',
    category: 'Procedure',
    updatedAt: 'Today',
    messages: []
  },
  {
    id: 'thread-cyberstalking',
    title: 'Cyberstalking laws & penalties',
    category: 'Cyber Law',
    updatedAt: 'Previous',
    messages: []
  },
  {
    id: 'thread-dv',
    title: 'Domestic violence help & PWDVA',
    category: 'Women Rights',
    updatedAt: 'Previous',
    messages: []
  },
  {
    id: 'thread-property',
    title: 'Property dispute rights',
    category: 'Property Law',
    updatedAt: 'Previous',
    messages: []
  },
  {
    id: 'thread-consumer',
    title: 'Consumer complaint filing',
    category: 'Consumer Law',
    updatedAt: 'Previous',
    messages: []
  },
  {
    id: 'thread-workplace',
    title: 'Workplace harassment & POSH',
    category: 'Employment Law',
    updatedAt: 'Previous',
    messages: []
  }
];

export const ChatWorkspace: React.FC<ChatWorkspaceProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  onOpenVoiceModal,
}) => {
  const [threads, setThreads] = useState<ConversationThread[]>(DEFAULT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-traffic');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchGroundingEnabled, setSearchGroundingEnabled] = useState(false);
  const [thinkingModeEnabled, setThinkingModeEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const [viewModes, setViewModes] = useState<Record<string, 'simple' | 'sources'>>({});
  const [showSavedTopicsModal, setShowSavedTopicsModal] = useState(false);
  const [savedTopics, setSavedTopics] = useState<string[]>([
    'BNS 2023 Sec 303 (Theft)',
    'Article 21 (Right to Personal Liberty)',
    '1930 Cyber Fraud Reporting',
    'Rule 139 DigiLocker Validity'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isLoading]);

  // Handle incoming initial prompt from homepage or feature clicks
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      const promptText = initialPrompt.trim();
      const newId = `thread-${Date.now()}`;
      const title = promptText.length > 36 ? promptText.slice(0, 36) + '...' : promptText;
      const newThread: ConversationThread = {
        id: newId,
        title,
        category: 'Legal Query',
        updatedAt: 'Just now',
        messages: []
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newId);
      handleSendMessage(promptText, newId);
      onClearInitialPrompt?.();
    }
  }, [initialPrompt]);

  const handleCreateNewChat = () => {
    const newId = `thread-${Date.now()}`;
    const newThread: ConversationThread = {
      id: newId,
      title: 'New Legal Query',
      category: 'General',
      updatedAt: 'Today',
      messages: []
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newId);
    setInputMessage('');
    setUploadedImage(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPEG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setUploadedImage({
        base64,
        mimeType: file.type,
        preview: base64,
      });
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (textToSend?: string, targetThreadId?: string) => {
    const activeId = targetThreadId || activeThreadId;
    const currentThread = threads.find((t) => t.id === activeId) || activeThread;
    const query = (textToSend || inputMessage).trim();
    if (!query && !uploadedImage) return;

    const userMsgId = `usr-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: query || 'Analyze uploaded legal document / image.',
      imageUrl: uploadedImage?.preview,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentMessages = currentThread?.messages || [];
    const updatedMessages = [...currentMessages, newUserMessage];

    // Update active thread with user message immediately
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeId) {
          return {
            ...t,
            title: t.messages.length === 0 ? (query.slice(0, 32) + (query.length > 32 ? '...' : '')) : t.title,
            messages: updatedMessages,
          };
        }
        return t;
      })
    );

    setInputMessage('');
    const attachedImage = uploadedImage;
    setUploadedImage(null);
    setIsLoading(true);

    try {
      const historyPayload = currentMessages
        .filter((m) => !m.id.startsWith('err-') && m.content)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          enableSearch: searchGroundingEnabled,
          thinkingMode: thinkingModeEnabled,
          imageData: attachedImage?.base64,
          imageMimeType: attachedImage?.mimeType,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.text || '';
      const parsed = parseLegalAnswer(rawText);

      // If local sources were returned, attach them to parsed sections
      if (data.groundingSources && data.groundingSources.length > 0) {
        parsed.sources = data.groundingSources;
      }

      const aiMsgId = `ai-${Date.now()}`;
      const newAiMessage: ChatMessage = {
        id: aiMsgId,
        role: 'assistant',
        content: rawText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        parsedSections: {
          shortAnswer: parsed.shortAnswer,
          whatTheLawSays: parsed.whatTheLawSays,
          relevantSections: parsed.relevantSections.length > 0 ? parsed.relevantSections : undefined,
          whatYouCanDoNext: parsed.whatYouCanDoNext.length > 0 ? parsed.whatYouCanDoNext : undefined,
          sources: parsed.sources,
          importantLimitations: parsed.limitations,
        },
        groundingSearchQueries: data.searchQueries || [],
        modelUsed: data.modelUsed,
        thinkingMode: thinkingModeEnabled,
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeId
            ? { ...t, messages: [...t.messages, newAiMessage] }
            : t
        )
      );
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I could not complete your legal request at this moment: ${err.message || 'Server error'}. Please check your connection or consult official legislation on indiacode.nic.in.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeId
            ? { ...t, messages: [...t.messages, errorMsg] }
            : t
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePlayTTS = async (id: string, text: string) => {
    if (playingAudioId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingAudioId(null);
      return;
    }

    try {
      setAudioLoading(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Audio generation failed');
      const data = await res.json();
      const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setPlayingAudioId(id);

      audio.onended = () => {
        setPlayingAudioId(null);
        audioRef.current = null;
      };

      await audio.play();
    } catch (e) {
      console.error('TTS error:', e);
      alert('Could not generate speech audio at this time.');
    } finally {
      setAudioLoading(false);
    }
  };

  const todayThreads = threads.filter((t) => t.updatedAt === 'Today');
  const previousThreads = threads.filter((t) => t.updatedAt === 'Previous');

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      {/* Hidden File Input for Image/Document Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Left Sidebar matching UI Collage */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 border-r border-[#E5E5E5] bg-white p-4 select-none justify-between">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* New Chat Button */}
          <button
            onClick={handleCreateNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>

          {/* Today Threads */}
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
              Today
            </div>
            <div className="space-y-0.5">
              {todayThreads.map((thread) => {
                const isActive = thread.id === activeThreadId;
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors truncate ${
                      isActive
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-[#626262] hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <FileQuestion className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                    <span className="truncate">{thread.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Previous Threads */}
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
              Previous
            </div>
            <div className="space-y-0.5">
              {previousThreads.map((thread) => {
                const isActive = thread.id === activeThreadId;
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors truncate ${
                      isActive
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-[#626262] hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <FileQuestion className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                    <span className="truncate">{thread.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Saved Topics Button */}
        <div className="pt-3 border-t border-[#E5E5E5]">
          <button
            onClick={() => setShowSavedTopicsModal(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Bookmark className="w-4 h-4 text-neutral-500" />
            <span>Saved Topics ({savedTopics.length})</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <main className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative overflow-hidden">
        {/* Workspace Top Bar */}
        <div className="h-12 border-b border-[#E5E5E5] bg-white px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Legal Workspace:
            </span>
            <span className="text-sm font-semibold text-neutral-900 truncate max-w-xs sm:max-w-md">
              {activeThread.title}
            </span>
          </div>

          {/* Feature Badges & Mode Indicators */}
          <div className="flex items-center gap-2 text-xs">
            {/* Search Grounding Toggle */}
            <button
              onClick={() => setSearchGroundingEnabled(!searchGroundingEnabled)}
              title="Toggle Google Search Grounding with gemini-3.8-flash"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                searchGroundingEnabled
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>Search Grounding</span>
            </button>

            {/* Deep Thinking Mode Toggle */}
            <button
              onClick={() => setThinkingModeEnabled(!thinkingModeEnabled)}
              title="Toggle High Thinking Mode with gemini-4-argon"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                thinkingModeEnabled
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Brain className="w-3 h-3" />
              <span>Thinking Mode</span>
            </button>

            {/* Voice Mode Trigger */}
            <button
              onClick={onOpenVoiceModal}
              title="Open Gemini Voice Conversation"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
            >
              <Mic className="w-3 h-3 text-neutral-800" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeThread.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto p-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4 text-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">
                Pocket Lawyer Assistant
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                Ask any question about Indian law, police powers, tenant disputes, cyber scams, or constitutional rights. Your query will be grounded in verified statutes.
              </p>
              <div className="grid grid-cols-1 gap-2 w-full text-left">
                {[
                  'Can traffic police take my vehicle keys?',
                  'How to recover money from a fraudulent UPI transaction?',
                  'What is Section 303 of the new Bharatiya Nyaya Sanhita?'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-3 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 font-medium hover:border-black hover:bg-neutral-50 transition-all text-left flex items-center justify-between"
                  >
                    <span>{prompt}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeThread.messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              const viewMode = viewModes[msg.id] || 'simple';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 max-w-4xl mx-auto ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Assistant Icon Pill */}
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex-shrink-0 flex items-center justify-center mt-1 shadow-xs">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M4 21h16" />
                        <path d="M4 10h16" />
                        <path d="M12 3l8 4H4l8-4z" />
                        <path d="M6 10v11" />
                        <path d="M10 10v11" />
                        <path d="M14 10v11" />
                        <path d="M18 10v11" />
                      </svg>
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div
                    className={`rounded-2xl transition-all ${
                      isAssistant
                        ? 'bg-white border border-[#E5E5E5] p-5 sm:p-6 shadow-xs text-neutral-900 w-full'
                        : 'bg-[#111111] text-white px-4 py-3 max-w-xl shadow-xs'
                    }`}
                  >
                    {/* User Uploaded Image Preview */}
                    {msg.imageUrl && (
                      <div className="mb-3 rounded-lg overflow-hidden border border-neutral-700 max-w-xs">
                        <img src={msg.imageUrl} alt="Uploaded for legal review" className="w-full h-auto object-cover max-h-48" />
                      </div>
                    )}

                    {!isAssistant ? (
                      /* User text */
                      <p className="text-sm font-normal whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                    ) : (
                      /* Structured AI Legal Response */
                      <div className="space-y-5">
                        {/* Header bar with Model badge & Action buttons */}
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                              Indian Law Grounded Response
                            </span>
                            {msg.modelUsed && (
                              <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-[10px] font-mono text-neutral-600">
                                {msg.modelUsed}
                              </span>
                            )}
                            {msg.thinkingMode && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200 flex items-center gap-1">
                                <Brain className="w-2.5 h-2.5" /> High Thinking
                              </span>
                            )}
                          </div>

                          {/* Quick Toolbar: View Toggle + TTS + Copy + Thumbs */}
                          <div className="flex items-center gap-1 text-neutral-500">
                            {/* Simple vs Legal Sources Toggle */}
                            <div className="flex items-center rounded-lg bg-neutral-100 p-0.5 mr-2">
                              <button
                                onClick={() => setViewModes({ ...viewModes, [msg.id]: 'simple' })}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                                  viewMode === 'simple'
                                    ? 'bg-white text-black shadow-xs font-semibold'
                                    : 'text-neutral-500 hover:text-black'
                                }`}
                              >
                                Explanation
                              </button>
                              <button
                                onClick={() => setViewModes({ ...viewModes, [msg.id]: 'sources' })}
                                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                                  viewMode === 'sources'
                                    ? 'bg-white text-black shadow-xs font-semibold'
                                    : 'text-neutral-500 hover:text-black'
                                }`}
                              >
                                Legal Sources
                              </button>
                            </div>

                            {/* TTS Button */}
                            <button
                              onClick={() => handlePlayTTS(msg.id, msg.parsedSections?.shortAnswer || msg.content)}
                              title="Listen to legal explanation"
                              aria-label="Listen to explanation"
                              className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
                            >
                              {playingAudioId === msg.id ? (
                                <VolumeX className="w-4 h-4 text-red-600 animate-pulse" />
                              ) : (
                                <Volume2 className="w-4 h-4 hover:text-black" />
                              )}
                            </button>

                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyText(msg.id, msg.content)}
                              title="Copy response"
                              aria-label="Copy response"
                              className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4 hover:text-black" />
                              )}
                            </button>

                            <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors" title="Helpful" aria-label="Mark helpful">
                              <ThumbsUp className="w-3.5 h-3.5 hover:text-black" />
                            </button>
                            <button className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors" title="Not helpful" aria-label="Mark unhelpful">
                              <ThumbsDown className="w-3.5 h-3.5 hover:text-black" />
                            </button>
                          </div>
                        </div>

                        {viewMode === 'simple' ? (
                          <>
                            {msg.parsedSections && (msg.parsedSections.shortAnswer || msg.parsedSections.whatTheLawSays) ? (
                              <>
                                {/* 1. Short Answer */}
                                {msg.parsedSections?.shortAnswer && (
                                  <div>
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                                      1. Short Answer
                                    </h4>
                                    <p className="text-sm sm:text-base font-normal text-[#111111] leading-relaxed">
                                      {msg.parsedSections.shortAnswer}
                                    </p>
                                  </div>
                                )}

                                {/* 2. What the Law Says */}
                                {msg.parsedSections?.whatTheLawSays && (
                                  <div>
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                                      2. What the Law Says
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                                      {msg.parsedSections.whatTheLawSays}
                                    </p>
                                  </div>
                                )}

                                {/* 3. Relevant Sections Table matching Collage */}
                                {msg.parsedSections?.relevantSections && msg.parsedSections.relevantSections.length > 0 && (
                                  <div>
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                      3. Relevant Sections
                                    </h4>
                                    <div className="border border-neutral-200 rounded-xl overflow-x-auto">
                                      <table className="w-full text-left text-xs">
                                        <thead className="bg-[#F7F7F7] border-b border-neutral-200 text-neutral-800 font-semibold">
                                          <tr>
                                            <th className="py-2 px-3">Act</th>
                                            <th className="py-2 px-3">Section</th>
                                            <th className="py-2 px-3">What it says</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-100 text-neutral-700">
                                          {msg.parsedSections.relevantSections.map((sec, idx) => (
                                            <tr key={idx} className="hover:bg-neutral-50/60">
                                              <td className="py-2.5 px-3 font-medium text-neutral-900">{sec.act}</td>
                                              <td className="py-2.5 px-3 font-mono font-medium text-neutral-800">{sec.section}</td>
                                              <td className="py-2.5 px-3 text-neutral-600">{sec.whatItSays}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* 4. What you can do next */}
                                {msg.parsedSections?.whatYouCanDoNext && msg.parsedSections.whatYouCanDoNext.length > 0 && (
                                  <div>
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                      4. What You Can Do Next
                                    </h4>
                                    <ul className="space-y-1.5">
                                      {msg.parsedSections.whatYouCanDoNext.map((step, idx) => (
                                        <li key={idx} className="text-xs sm:text-sm text-neutral-700 flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 mt-2 flex-shrink-0" />
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </>
                            ) : (
                              /* Clean fallback rendering when parsed sections are not present (plain text response or error notification) */
                              <div className="space-y-3">
                                {msg.id.startsWith('err-') ? (
                                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 space-y-2.5">
                                    <div className="flex items-center gap-2 font-semibold text-xs text-amber-900">
                                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                      <span>Legal Assistant Notice</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
                                      {msg.content}
                                    </p>
                                    <div className="pt-1 flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const msgs = activeThread.messages;
                                          const errIdx = msgs.findIndex((m) => m.id === msg.id);
                                          const prevUserMsg = msgs
                                            .slice(0, errIdx)
                                            .filter((m) => m.role === 'user')
                                            .pop();
                                          if (prevUserMsg) {
                                            handleSendMessage(prevUserMsg.content);
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111111] text-white hover:bg-neutral-800 transition-colors shadow-xs"
                                      >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Retry Question</span>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
                                    {msg.content}
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          /* Legal Sources View */
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                              Verified Statutory Sources & Citations
                            </h4>
                            {msg.parsedSections?.sources && msg.parsedSections.sources.length > 0 ? (
                              <div className="space-y-3">
                                {msg.parsedSections.sources.map((src, idx) => (
                                  <div key={idx} className="p-3.5 rounded-xl border border-neutral-200 bg-[#FAFAFA] space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs font-semibold text-neutral-900">{src.actName}</span>
                                        <span className="text-xs text-neutral-500 font-mono">({src.sectionOrArticle})</span>
                                      </div>
                                      <a
                                        href={src.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-neutral-800 hover:text-black flex items-center gap-1 font-medium"
                                      >
                                        <span>View Law</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                    <p className="text-xs text-neutral-600 italic border-l-2 border-neutral-300 pl-2.5 my-1">
                                      "{src.excerpt}"
                                    </p>
                                    <div className="text-[10px] text-neutral-400">
                                      Source: {src.title} · Status: Verified Official Publication
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
                                Authoritative primary legislation excerpt is referenced above. Always verify with official Gazette notifications at <a href="https://www.indiacode.nic.in" target="_blank" rel="noreferrer" className="underline font-semibold">indiacode.nic.in</a>.
                              </div>
                            )}
                          </div>
                        )}

                        {/* Search Grounding Queries (if available) */}
                        {msg.groundingSearchQueries && msg.groundingSearchQueries.length > 0 && (
                          <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
                            <span className="font-semibold">Grounded via Google Search:</span>
                            {msg.groundingSearchQueries.map((q, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                                {q}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* 6. Limitations Note */}
                        {msg.parsedSections?.importantLimitations && (
                          <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                            <span>{msg.parsedSections.importantLimitations}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Icon Pill */}
                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-800 flex-shrink-0 flex items-center justify-center mt-1 text-xs font-semibold">
                      S
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Loading Indicator with Gavel animation */}
          {isLoading && (
            <div className="flex items-start gap-3 max-w-4xl mx-auto justify-start">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex-shrink-0 flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 animate-pulse">
                  <path d="M4 21h16" />
                  <path d="M4 10h16" />
                  <path d="M12 3l8 4H4l8-4z" />
                </svg>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neutral-900 animate-ping" />
                <span className="text-xs text-neutral-600 font-medium">
                  {thinkingModeEnabled
                    ? 'Pocket Lawyer is analyzing Indian statutes with high reasoning (gemini-4-argon)...'
                    : 'Grounding answer with verified Indian legislation & BNS provisions...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Dock at Bottom matching UI Collage */}
        <div className="p-4 bg-white border-t border-[#E5E5E5] flex-shrink-0">
          <div className="max-w-4xl mx-auto space-y-2">
            {/* Uploaded image chip */}
            {uploadedImage && (
              <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl border border-neutral-200 w-max text-xs text-neutral-700">
                <ImageIcon className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">Document attached for legal review</span>
                <button
                  onClick={() => setUploadedImage(null)}
                  className="p-1 hover:bg-neutral-200 rounded-full"
                >
                  <X className="w-3 h-3 text-neutral-600" />
                </button>
              </div>
            )}

            <div className="relative flex items-center bg-white rounded-2xl border-2 border-neutral-200 shadow-sm focus-within:border-black transition-all p-2">
              {/* Attachment Paperclip button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach photo or legal document for Gemini analysis"
                aria-label="Attach photo or legal document"
                className="p-2 text-neutral-400 hover:text-black rounded-lg transition-colors flex-shrink-0"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Chat Input */}
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                rows={1}
                placeholder="Ask a follow-up question or describe a legal situation..."
                aria-label="Ask a legal question"
                className="w-full resize-none border-none bg-transparent px-3 py-2 text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none max-h-32"
              />

              {/* Courtroom Gavel Send Button */}
              <div className="flex-shrink-0 pl-1 pr-1">
                <GavelButton
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || (!inputMessage.trim() && !uploadedImage)}
                  isLoading={isLoading}
                  ariaLabel="Send legal query"
                  size="md"
                />
              </div>
            </div>

            {/* Bottom Disclaimer matching mockup */}
            <p className="text-[11px] text-center text-neutral-400">
              This is legal information, not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </main>

      {/* Saved Topics Modal */}
      {showSavedTopicsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-neutral-200 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-neutral-800" />
                <h3 className="text-base font-bold text-neutral-900">Saved Legal Topics</h3>
              </div>
              <button
                onClick={() => setShowSavedTopicsModal(false)}
                className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-neutral-500">
              Key Indian statutory provisions bookmarked during your research.
            </p>
            <div className="space-y-2">
              {savedTopics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-[#FAFAFA] text-xs font-medium text-neutral-800"
                >
                  <span>{topic}</span>
                  <button
                    onClick={() => {
                      setShowSavedTopicsModal(false);
                      handleSendMessage(`Explain the legal rules and latest provisions for: ${topic}`);
                    }}
                    className="text-[11px] font-semibold text-black hover:underline"
                  >
                    Ask about this →
                  </button>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSavedTopicsModal(false)}
                className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800"
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
