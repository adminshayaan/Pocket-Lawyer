import React, { useState, useEffect } from 'react';
import { Navbar, NavigationTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ChatWorkspace } from './components/ChatWorkspace';
import { LegalLibraryView } from './components/LegalLibraryView';
import { ConstitutionView } from './components/ConstitutionView';
import { DraftStudioView } from './components/DraftStudioView';
import { LegalHistoryView } from './components/LegalHistoryView';
import { VoiceModal } from './components/VoiceModal';
import { SearchModal } from './components/SearchModal';
import { DisclaimerFooter } from './components/DisclaimerFooter';
import { LegalTopic, ConstitutionArticle } from './types/legal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [selectedCategoryForLibrary, setSelectedCategoryForLibrary] = useState<string | null>(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Check URL query parameters on load (?autostart=1 support for ultra-mode automation)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setCurrentTab('chat');
    }
  }, []);

  const handleStartChatWithPrompt = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setCurrentTab('chat');
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryForLibrary(categoryId);
    setCurrentTab('library');
  };

  const handleTopicSelectedFromSearch = (topic: LegalTopic) => {
    setSelectedCategoryForLibrary(topic.categoryId);
    setCurrentTab('library');
  };

  const handleArticleSelectedFromSearch = (article: ConstitutionArticle) => {
    setCurrentTab('constitution');
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'library') setSelectedCategoryForLibrary(null);
          setCurrentTab(tab);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onStartChatWithPrompt={handleStartChatWithPrompt}
            onNavigate={(tab) => {
              if (tab === 'library') setSelectedCategoryForLibrary(null);
              setCurrentTab(tab);
            }}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentTab === 'chat' && (
          <ChatWorkspace
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt('')}
            onOpenVoiceModal={() => setVoiceModalOpen(true)}
          />
        )}

        {currentTab === 'library' && (
          <LegalLibraryView
            initialCategoryId={selectedCategoryForLibrary}
            onAskAiWithTopic={(topic) =>
              handleStartChatWithPrompt(`Explain the legal rules, BNS/statutory sections, and remedies for: ${topic}`)
            }
          />
        )}

        {currentTab === 'constitution' && (
          <ConstitutionView
            onAskAiWithArticle={(prompt) => handleStartChatWithPrompt(prompt)}
          />
        )}

        {currentTab === 'draft-studio' && <DraftStudioView />}

        {currentTab === 'history' && (
          <LegalHistoryView
            onAskAiWithHistoryEvent={(query) => handleStartChatWithPrompt(query)}
          />
        )}
      </main>

      {/* Footer (shown on all views except full-height chat workspace) */}
      {currentTab !== 'chat' && (
        <DisclaimerFooter onNavigate={(tab) => setCurrentTab(tab)} />
      )}

      {/* Real-time Voice Consultation Modal */}
      <VoiceModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onSendToChat={(transcript) => handleStartChatWithPrompt(transcript)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTopic={handleTopicSelectedFromSearch}
        onSelectArticle={handleArticleSelectedFromSearch}
        onAskAi={(q) => handleStartChatWithPrompt(q)}
      />
    </div>
  );
}
