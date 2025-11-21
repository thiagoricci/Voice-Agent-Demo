import React, { useState } from 'react';
import { AGENTS } from '../constants';
import { AgentType, AgentConfig } from '../types';
import { useLiveAgent } from '../hooks/useLiveAgent';
import { AudioVisualizer } from './AudioVisualizer';

const ActiveDemo: React.FC<{ agent: AgentConfig }> = ({ agent }) => {
  const { isConnected, isSpeaking, error, connect, disconnect } = useLiveAgent({
    systemInstruction: agent.systemInstruction,
    voiceName: agent.voiceName
  });

  return (
    <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between h-full relative overflow-hidden shadow-2xl shadow-slate-200/50 transition-all duration-500 ease-in-out group">
      
      {/* Header inside card */}
      <div className="text-center z-10 w-full max-w-2xl">
        <div className="inline-block px-3 py-1 rounded-full bg-dara-cyan/10 text-dara-cyan text-[10px] font-bold tracking-widest uppercase mb-4">
            {agent.subtitle}
        </div>
        <h3 className="text-3xl font-extrabold text-dara-navy mb-4">{agent.title}</h3>
        <p className="text-slate-600 text-base leading-relaxed">
          {agent.description}
        </p>
      </div>

      {/* Active Visualizer */}
      <div className="flex-1 flex items-center justify-center w-full my-8 z-10">
         <AudioVisualizer isActive={isConnected} isSpeaking={isSpeaking} />
      </div>

      {/* Error Message */}
      {error && (
         <div className="absolute top-6 left-0 w-full flex justify-center z-50 px-4">
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-xl text-sm font-medium shadow-lg">
                ⚠️ {error}
            </div>
         </div>
      )}

      {/* Controls */}
      <div className="z-10 w-full max-w-xs mx-auto">
        {!isConnected ? (
          <button
            onClick={connect}
            className="w-full py-3 bg-gradient-to-r from-dara-navy to-[#0F4C75] hover:to-dara-navy text-white rounded-2xl font-bold text-base shadow-xl shadow-dara-navy/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group-hover:shadow-dara-navy/30"
          >
            <span className="group-hover:scale-110 transition-transform">🎙️</span>
            Start Demo
          </button>
        ) : (
          <button
            onClick={disconnect}
            className="w-full py-3 bg-white border-2 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-500 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-100/50"
          >
            <span>🛑</span> End Call
          </button>
        )}
         <p className="text-xs text-slate-400 text-center mt-6 font-medium">
            Microphone access required • Dara Voice Tech
         </p>
      </div>

      {/* Background decoration - subtle light gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export const DemoSection: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentType>(AgentType.AFTER_HOURS);
  const selectedAgent = AGENTS[selectedAgentId] || AGENTS[AgentType.AFTER_HOURS];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24" id="demos">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-dara-navy mb-6">Test Our Agents</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-xl">
          Select a scenario below to hear how Dara Voice Tech handles real-world interactions for <strong>Dara Animal Clinic</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Sidebar: Agent Selection */}
        <div className="lg:col-span-4 space-y-4 relative z-20">
          {Object.values(AGENTS).map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => setSelectedAgentId(agent.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border group cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md ${
                selectedAgentId === agent.id
                  ? 'bg-dara-navy border-dara-navy text-white shadow-xl shadow-dara-navy/20 transform scale-[1.02]'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-dara-cyan/50'
              }`}
            >
              <div className="flex items-center space-x-3 relative z-10">
                <div className={`text-xl p-2 rounded-xl transition-colors duration-300 ${
                    selectedAgentId === agent.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                    {agent.icon}
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      selectedAgentId === agent.id ? 'text-dara-cyan' : 'text-slate-400 group-hover:text-dara-navy'
                  }`}>
                    {agent.subtitle.split(':')[0]}
                  </span>
                  <h3 className={`font-bold text-base mt-0.5 ${
                      selectedAgentId === agent.id ? 'text-white' : 'text-dara-navy'
                  }`}>
                    {agent.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Active Demo Area */}
        <ActiveDemo key={selectedAgentId} agent={selectedAgent} />

      </div>
    </div>
  );
};