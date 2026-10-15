import React, { useState } from 'react';

interface GavelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Synthesize a subtle, wooden courtroom gavel strike sound using Web Audio API
function playGavelStrikeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;

    // Oscillator for low wooden resonance
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);

    // Noise buffer for the sharp wooden impact "clack"
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // Gracefully ignore if browser blocks audio autoplay before gesture
  }
}

export const GavelButton: React.FC<GavelButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  ariaLabel = 'Strike gavel and submit',
  size = 'md',
  className = '',
}) => {
  const [isStriking, setIsStriking] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || isLoading || isStriking) return;

    setIsStriking(true);
    playGavelStrikeSound();

    // Trigger visual strike and proceed with submission
    setTimeout(() => {
      onClick();
    }, 120);

    setTimeout(() => {
      setIsStriking(false);
    }, 380);
  };

  const dimensions =
    size === 'sm'
      ? 'w-10 h-10 p-2'
      : size === 'lg'
      ? 'w-14 h-14 p-3'
      : 'w-12 h-12 p-2.5';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      title={disabled ? 'Enter a question to ask' : 'Strike Gavel to Ask'}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#111111] text-white transition-all duration-200 shadow-sm hover:bg-neutral-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#111111] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 group ${dimensions} ${className}`}
    >
      {/* Ripple ring on impact */}
      {isStriking && (
        <span className="absolute inset-0 rounded-full border-2 border-neutral-400 animate-ping opacity-75 pointer-events-none" />
      )}

      {/* Courtroom Gavel & Sound Block SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 text-white transition-transform ${
          isStriking
            ? 'rotate-[-35deg] scale-110 duration-100 ease-in'
            : isLoading
            ? 'animate-pulse'
            : 'group-hover:rotate-[-8deg]'
        }`}
      >
        {/* Gavel Head */}
        <path d="M14 13l-7.5 7.5" />
        <path d="M16 8l4 4" />
        <path d="M8 4l4 4" />
        <path d="M11 3l7 7" />
        {/* Sound Block at base */}
        <path d="M3 21h8" strokeWidth="2.5" />
      </svg>
    </button>
  );
};
