import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, Scale, RefreshCw } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToChat: (transcript: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSendToChat,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiSpeechResponse, setAiSpeechResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check speech recognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Indian English legal context

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setAiSpeechResponse('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleProcessVoiceQuery = async (queryText?: string) => {
    const q = queryText || transcript;
    if (!q.trim()) return;

    setIsProcessing(true);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          enableSearch: true,
          modelPreference: 'fast',
        }),
      });

      if (!chatRes.ok) throw new Error('Voice assistant query failed');
      const chatData = await chatRes.json();
      const answer = chatData.text || '';
      setAiSpeechResponse(answer);

      // Now generate audio via Gemini TTS
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: answer.slice(0, 400) }),
      });

      if (ttsRes.ok) {
        const ttsData = await ttsRes.json();
        const audioUrl = `data:${ttsData.mimeType || 'audio/wav'};base64,${ttsData.audioBase64}`;
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
        }
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      }
    } catch (err: any) {
      console.error(err);
      setAiSpeechResponse(`Voice response error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-neutral-200 p-8 shadow-2xl relative flex flex-col items-center text-center animate-in zoom-in-95 duration-150">
        <button
          onClick={() => {
            if (audioPlayerRef.current) audioPlayerRef.current.pause();
            onClose();
          }}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors"
          aria-label="Close voice modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-800 mb-6">
          <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : isSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
          <span>
            {isListening
              ? 'Listening to Indian Legal Query...'
              : isProcessing
              ? 'Analyzing Legal Statutes (Gemini Live)...'
              : isSpeaking
              ? 'Speaking Legal Answer (Kore Voice)...'
              : 'Voice Assistant Ready (gemini-3.8-live)'}
          </span>
        </div>

        {/* Big Mic Waveform Button */}
        <div className="relative mb-6">
          {/* Animated rings */}
          {(isListening || isSpeaking) && (
            <div className="absolute inset-0 rounded-full border-4 border-neutral-900 animate-ping opacity-30" />
          )}

          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isListening
                ? 'bg-red-600 text-white scale-105'
                : isSpeaking
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start voice conversation'}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 animate-bounce" />
            ) : isSpeaking ? (
              <Volume2 className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        <p className="text-xs text-neutral-500 mb-4">
          {isListening
            ? 'Speak clearly (e.g. "What are my rights if police stop my car?"). Click button when done.'
            : 'Tap the microphone to start real-time spoken legal consultation.'}
        </p>

        {/* Live Transcript Box */}
        {transcript && (
          <div className="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-900 text-left mb-4 shadow-2xs">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              You Spoke:
            </span>
            "{transcript}"
            {!isProcessing && !isListening && (
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => handleProcessVoiceQuery()}
                  className="px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-800"
                >
                  Consult AI Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* AI Answer Preview */}
        {aiSpeechResponse && (
          <div className="w-full p-4 rounded-2xl bg-neutral-900 text-white text-xs text-left mb-4 max-h-48 overflow-y-auto shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Spoken Legal Explanation:
              </span>
              <button
                onClick={() => {
                  onSendToChat(transcript);
                  onClose();
                }}
                className="text-[11px] font-semibold text-neutral-300 hover:text-white underline"
              >
                Open in Full Chat →
              </button>
            </div>
            <p className="text-neutral-200 leading-relaxed text-xs">
              {aiSpeechResponse.slice(0, 350)}...
            </p>
          </div>
        )}

        {/* Suggested Quick Prompts */}
        <div className="w-full pt-4 border-t border-neutral-100 flex flex-wrap justify-center gap-1.5">
          {[
            'Can traffic police take my keys?',
            'What is Section 303 BNS?',
            'How to report 1930 cyber fraud?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setTranscript(prompt);
                handleProcessVoiceQuery(prompt);
              }}
              className="text-[11px] text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-full transition-colors"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
