
import React from 'react';

interface HeaderProps {
  activeTab: 'architecture' | 'demo' | 'management';
  setActiveTab: (tab: 'architecture' | 'demo' | 'management') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 zen-gradient text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0 group cursor-pointer" onClick={() => setActiveTab('architecture')}>
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:rotate-180 transition-transform duration-700">
              <i className="fas fa-yin-yang text-green-800 text-2xl"></i>
            </div>
            <div className="absolute -inset-1 border border-white/30 rounded-full animate-ping opacity-20"></div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-widest font-calligraphy">葛仙智伴</h1>
            <p className="text-[10px] text-green-200 uppercase tracking-[0.2em] font-serif">Smart Gexian Ecosystem</p>
          </div>
        </div>
        
        <nav className="flex space-x-2 bg-black/30 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'architecture', label: '架构规划', icon: 'fa-project-diagram' },
            { id: 'demo', label: '体验演示', icon: 'fa-wand-magic-sparkles' },
            { id: 'management', label: '中枢运营', icon: 'fa-tower-control' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm font-bold ${
                activeTab === tab.id 
                ? 'bg-white text-green-900 shadow-[0_4px_12px_rgba(255,255,255,0.2)]' 
                : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <i className={`fas ${tab.icon} ${activeTab === tab.id ? 'text-green-700' : 'text-white/50'}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
