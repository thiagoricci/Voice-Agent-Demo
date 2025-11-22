import React from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive, isSpeaking }) => {
  if (!isActive) {
    return (
      <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center border-2 border-slate-200">
        <span className="text-3xl text-slate-400 opacity-50">⏸️</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer pulse ring */}
      <div className={`absolute w-full h-full rounded-full bg-estalio-gold/20 ${isSpeaking ? 'animate-ping' : ''}`} style={{ animationDuration: '2s' }}></div>
      
      {/* Inner glowing circle */}
      <div className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-estalio-gold to-amber-600 flex items-center justify-center shadow-xl shadow-estalio-gold/40 transition-all duration-300 ${isSpeaking ? 'scale-110 blob-pulse' : 'scale-100'}`}>
         <span className="text-4xl drop-shadow-md">{isSpeaking ? '🗣️' : '🎙️'}</span>
      </div>
      
      {/* Status text */}
      <div className="absolute -bottom-12 text-center w-full">
        <span className={`text-sm font-bold tracking-wide uppercase ${isSpeaking ? 'text-estalio-gold' : 'text-slate-400'}`}>
          {isSpeaking ? 'Estalio is Speaking...' : 'Listening...'}
        </span>
      </div>
    </div>
  );
};