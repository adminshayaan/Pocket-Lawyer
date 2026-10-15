import React from 'react';
import { Scale, PhoneCall, ShieldAlert, ExternalLink } from 'lucide-react';
import { NavigationTab } from './Navbar';

interface DisclaimerFooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DisclaimerFooter: React.FC<DisclaimerFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E5E5E5] bg-white py-10 text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Emergency Helplines Bar */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-neutral-900" />
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Emergency & Citizen Legal Helplines:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-800">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-700" />
              <span>National Emergency: <strong>112</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-700" />
              <span>Cyber Financial Fraud: <strong>1930</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-700" />
              <span>Childline: <strong>1098</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-700" />
              <span>Women Helpline: <strong>1091 / 181</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-700" />
              <span>National Legal Services (NALSA): <strong>15100</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Brand Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center text-xs font-bold font-['Cinzel',serif]">
                PL
              </div>
              <span className="font-bold tracking-tight text-neutral-900 font-['Cinzel',serif]">
                POCKET LAWYER
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Understand the law. Know your rights. Grounded in the Bharatiya Nyaya Sanhita, 2023 and the Constitution of India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('chat')} className="hover:text-black">
                  Ask AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('library')} className="hover:text-black">
                  Legal Library (14 Categories)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('constitution')} className="hover:text-black">
                  Constitution of India Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('draft-studio')} className="hover:text-black">
                  Draft Studio & Incident Reports
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="hover:text-black">
                  Legal History Timeline
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.indiacode.nic.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                  <span>India Code (Legislation)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                  <span>Cyber Crime Reporting Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://nalsa.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                  <span>NALSA (Free Legal Aid)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://edaakhil.nic.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-black">
                  <span>e-Daakhil (Consumer Portal)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Verified Legal Standards
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              Accounts for current Indian criminal law: Bharatiya Nyaya Sanhita (BNS) 2023, BNSS 2023, and BSA 2023 effective from July 1, 2024.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
              <Scale className="w-3.5 h-3.5" />
              <span>Grounded Statutory Information</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-6 border-t border-neutral-200 text-[11px] text-neutral-500 leading-relaxed text-center sm:text-left space-y-1">
          <p>
            <strong>LEGAL DISCLAIMER:</strong> Pocket Lawyer is an artificial intelligence-powered legal information and educational platform. It does not provide legal advice, representation, or counsel, nor does it create an advocate-client relationship. Laws, procedural timelines, and state notifications vary across Indian jurisdictions. For specific disputes or pending legal proceedings, always consult an enrolled advocate or approach the District Legal Services Authority (DLSA).
          </p>
          <p className="text-neutral-400">
            © {new Date().getFullYear()} Pocket Lawyer · Prototype Edition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
