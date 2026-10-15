import React from 'react';
import { Search, Scale, Sparkles, Menu, X } from 'lucide-react';

export type NavigationTab = 'home' | 'chat' | 'library' | 'constitution' | 'draft-studio' | 'history';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'Ask AI' },
    { id: 'library', label: 'Legal Library' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'draft-studio', label: 'Draft Studio' },
    { id: 'history', label: 'Legal History' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg py-1 px-1.5"
          >
            <div className="w-8 h-8 rounded-md bg-[#111111] text-white flex items-center justify-center transition-transform group-hover:scale-105">
              {/* Pillars / Court building icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M4 21h16" />
                <path d="M4 10h16" />
                <path d="M12 3l8 4H4l8-4z" />
                <path d="M6 10v11" />
                <path d="M10 10v11" />
                <path d="M14 10v11" />
                <path d="M18 10v11" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base sm:text-lg text-[#111111] font-['Cinzel',serif]">
                POCKET LAWYER
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#626262] hover:text-[#111111] hover:bg-neutral-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Search + Profile avatar / Ask quick */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search Legal Database"
              title="Search across all Indian laws and Constitution"
              className="p-2 text-[#626262] hover:text-[#111111] hover:bg-neutral-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Ask AI button if not in chat */}
            {currentTab !== 'chat' && (
              <button
                onClick={() => handleNavClick('chat')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                <span>Ask AI</span>
              </button>
            )}

            {/* User Avatar Circle 'S' matching collage mockup */}
            <div
              className="w-8 h-8 rounded-full bg-[#111111] text-white text-xs font-semibold flex items-center justify-center cursor-default select-none shadow-sm"
              title="Signed in as Citizen Advocate"
            >
              S
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#626262] hover:text-[#111111] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-[#E5E5E5] space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#111111] text-white'
                      : 'text-[#626262] hover:bg-neutral-100 hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
