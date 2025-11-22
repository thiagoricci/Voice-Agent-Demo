import React from 'react';
import { DemoSection } from './components/DemoSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-estalio-gold/20">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              {/* Text Logo */}
              <div className="flex items-center gap-2">
                 <span className="text-2xl font-bold text-estalio-navy tracking-tight">Estalio Real Estate</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                <a href="#demos" className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-estalio-navy hover:bg-slate-800 transition-all shadow-lg shadow-estalio-navy/20 transform hover:-translate-y-0.5">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden bg-white">
         {/* Background blobs */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-estalio-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-estalio-navy/10 rounded-full blur-3xl"></div>
         </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-estalio-navy text-sm font-bold mb-8 tracking-wide uppercase">
             AI Voice Assistant for Real Estate
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-estalio-navy tracking-tight mb-6 leading-tight">
            Never Miss a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-estalio-gold to-amber-600">Potential Buyer</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Estalio Real Estate provides human-like AI receptionists for <strong>Real Estate Agencies</strong>.
            Qualify leads, schedule viewings, and answer property questions 24/7 without hiring extra staff.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#demos" className="px-8 py-4 rounded-full bg-estalio-navy text-white font-bold text-lg shadow-xl shadow-estalio-navy/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
              Try Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-slate-50 relative border-y border-slate-200">
        <DemoSection />
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-estalio-navy mb-4">Why Choose Estalio Real Estate?</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Specialized for Real Estate, our AI understands property details and qualifies leads effectively.
              </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                   { title: "24/7 Availability", desc: "Capture every lead, even during open houses and weekends.", icon: "🌙" },
                   { title: "Seamless Integration", desc: "Connects directly with your CRM to schedule viewings automatically.", icon: "🔗" },
                   { title: "Natural Conversation", desc: "Clients feel valued with our professional and engaging voice models.", icon: "🗣️" }
               ].map((feature, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-estalio-gold/30 transition-all duration-300 group">
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                         {feature.icon}
                       </div>
                       <h3 className="text-xl font-bold text-estalio-navy mb-3">{feature.title}</h3>
                       <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                   </div>
               ))}
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <div className="flex justify-center gap-2 mb-6 items-center opacity-80">
               <span className="text-2xl font-bold text-estalio-navy tracking-tight">Estalio Real Estate</span>
          </div>
          <p className="text-sm font-medium">&copy; 2025 Estalio Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;