import React from 'react';
import { DemoSection } from './components/DemoSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-dara-cyan/20">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              {/* Logo from DaraVoiceTech */}
              <img
                src="/images/logo.png"
                alt="DaraVoiceTech"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                    // Fallback to remote URL if local image fails to load
                    e.currentTarget.src = "https://daravoicetech.com/wp-content/uploads/2024/12/DaraVoiceTech-Logo.png";
                    e.currentTarget.onerror = (e2) => {
                        // If both fail, hide the image and show fallback text
                        e2.currentTarget.style.display = 'none';
                        e2.currentTarget.nextElementSibling?.classList.remove('hidden');
                    };
                }}
              />
              <div className="hidden flex items-center gap-2">
                 {/* Fallback Logo text */}
                 <span className="text-2xl font-bold text-dara-navy tracking-tight">DaraVoiceTech</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                <a href="#demos" className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-dara-navy hover:bg-slate-800 transition-all shadow-lg shadow-dara-navy/20 transform hover:-translate-y-0.5">
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
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-dara-cyan/20 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-dara-navy/10 rounded-full blur-3xl"></div>
         </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-dara-navy text-sm font-bold mb-8 tracking-wide uppercase">
             AI Voice Assistant for Veterinary Clinics
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-dara-navy tracking-tight mb-6 leading-tight">
            Never Miss a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dara-cyan to-blue-600">Pet Owner's Call</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            DaraVoiceTech provides human-like AI receptionists for <strong>Veterinary Clinics</strong>.
            Handle appointments, triage pet emergencies, and answer questions 24/7 without hiring extra staff.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#demos" className="px-8 py-4 rounded-full bg-dara-navy text-white font-bold text-lg shadow-xl shadow-dara-navy/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
              Try Live Demo
            </a>
            <a href="https://daravoicetech.com/" className="px-8 py-4 rounded-full bg-white text-dara-navy font-bold text-lg border-2 border-dara-cyan hover:bg-dara-cyan/10 transition-all duration-200">
              Visit Website
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
              <h2 className="text-3xl md:text-4xl font-bold text-dara-navy mb-4">Why Choose DaraVoiceTech?</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Specialized for Veterinary Practices, our AI understands animal health context and empathy for pet owners.
              </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                   { title: "24/7 Availability", desc: "Capture every lead and pet emergency, even on weekends and holidays.", icon: "🌙" },
                   { title: "Seamless Integration", desc: "Connects directly with your practice management software to book vet appointments.", icon: "🔗" },
                   { title: "Natural Conversation", desc: "Pet owners feel heard with our hyper-realistic, empathetic voice models.", icon: "🗣️" }
               ].map((feature, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-dara-cyan/30 transition-all duration-300 group">
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                         {feature.icon}
                       </div>
                       <h3 className="text-xl font-bold text-dara-navy mb-3">{feature.title}</h3>
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
               <img
                src="/images/logo.png"
                alt="DaraVoiceTech"
                className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
                onError={(e) => {
                    // Fallback to remote URL if local image fails to load
                    e.currentTarget.src = "https://daravoicetech.com/wp-content/uploads/2024/12/DaraVoiceTech-Logo.png";
                }}
              />
          </div>
          <p className="text-sm font-medium">&copy; 2025 DaraVoiceTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;