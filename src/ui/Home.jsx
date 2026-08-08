import { useState } from "react";
import Iridescence from './Iridescence';
import PreferencesForm from "../pages/PreferencesForm"; // adjust path as needed

// 1. Add useNavigate to your imports in Home.jsx
import { useNavigate } from "react-router-dom";

function Home({ setExpandBar, expandBar }) {
  const [showFormModal, setShowFormModal] = useState(false);

  // 2. Inside your Home component, add:
  const navigate = useNavigate();
  
  // 3. Replace handleFormSubmit with:
  const handleFormSubmit = (userPrefs) => {
    setShowFormModal(false);
    navigate("/recommendations", { state: { prefs: userPrefs } });
};
 

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e8edf5] ">
      {/* Iridescence background */}
      <div className='absolute opacity-50 inset-0 '>                
        <Iridescence
          color={[0.4, 0.55, 0.78]}
          mouseReact
          amplitude={0.1}
          speed={0.35}
        />
      </div>

      {/* Atmospheric blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-300/30 blur-[140px]" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-indigo-200/35 blur-[120px]" />
      <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full bg-sky-200/25 blur-[100px]" />

      {/* Main Home content (blurred when modal is open) */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${showFormModal ? 'blur-sm opacity-50' : ''}`}>
        <div className="w-full max-w-xl flex flex-col items-center gap-10">
          {/* Logo mark */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#3a6bbf]/30 blur-xl scale-110" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3a6bbf] to-[#5b8fd4] flex items-center justify-center shadow-lg shadow-blue-400/30">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
                  <circle cx="16" cy="16" r="2" fill="white"/>
                  <path d="M16 3v3M16 26v3M3 16h3M26 16h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
                  <path d="M20 12l-5.5 3-3 5.5 5.5-3 3-5.5z" fill="white" fillOpacity="0.95"/>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h1
                className="text-4xl font-bold tracking-[0.25em] text-[#1e3a6e] uppercase"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Compass
              </h1>
              <p className="text-[11px] text-[#5a7aaa] tracking-[0.3em] uppercase mt-1 font-medium">
                Cost of Living Explorer
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center max-w-sm">
            <p className="text-[16px] text-[#2c4a7c] leading-relaxed font-light">
              Discover the <span className="font-semibold text-[#1e3a6e]">financial landscape</span> of any city worldwide through interactive data visualizations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex space-x-10'>
            <button onClick={() => setExpandBar(x => !x)}
              className="group relative px-9 py-3.5 w-55 rounded-full text-white font-semibold text-sm tracking-widest uppercase overflow-hidden shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #3a6bbf 0%, #5b8fd4 100%)' }}
            >
              <span className="relative z-10 text-md">Start Exploring</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5b8fd4] to-[#3a6bbf] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => setShowFormModal(true)}
              className="group relative px-9 w-55 py-3.5 rounded-full text-white font-semibold text-sm tracking-widest uppercase overflow-hidden shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #3a6bbf 0%, #5b8fd4 100%)' }}
            >
              <span className="relative z-10 text-md">Custom Finder</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5b8fd4] to-[#3a6bbf] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Feature tiles */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              {
                label: 'Housing',
                desc: 'Rent & property',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a6bbf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
                    <path d="M9 21V12h6v9"/>
                  </svg>
                ),
              },
              {
                label: 'Transport',
                desc: 'Transit & fuel',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a6bbf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="2"/>
                    <path d="M3 10h18M8 6V4M16 6V4"/>
                    <circle cx="7.5" cy="15" r="1"/><circle cx="16.5" cy="15" r="1"/>
                  </svg>
                ),
              },
              {
                label: 'Groceries',
                desc: 'Food & essentials',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a6bbf" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                ),
              },
            ].map(({ label, desc, icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-2.5 p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/70 hover:bg-white/60 hover:border-blue-200/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-200/40 transition-all duration-250 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                  {icon}
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-[#1e3a6e]">{label}</p>
                  <p className="text-[10px] text-[#7090bb] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex gap-10">
            {[
              { value: '500+', label: 'Cities' },
              { value: '15k+', label: 'Data Points' },
              { value: 'Live', label: 'Updates' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-[#2455a4]" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
                <p className="text-[10px] text-[#7090bb] uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Popular cities */}
          <div className="text-center">
            <p className="text-[10px] text-[#7090bb] uppercase tracking-widest mb-3">Popular Destinations</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {['Tokyo', 'New York', 'London', 'Paris', 'Mecca'].map((city) => (
                <button
                  key={city}
                  className="px-4 py-1.5 text-xs font-medium bg-white/50 backdrop-blur-sm border border-white/80 rounded-full text-[#2c4a7c] hover:text-[#1e3a6e] hover:bg-white/75 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
    {showFormModal && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
    onClick={() => setShowFormModal(false)}
  >
    <div 
      className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onClick={(e) => e.stopPropagation()}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      <PreferencesForm onSubmit={handleFormSubmit} />
    </div>
  </div>
)}
    </div>
  );
}

export default Home;