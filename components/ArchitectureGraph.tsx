
import React from 'react';
import { ArchitectureNode, ModuleType } from '../types';

interface Props {
  data: ArchitectureNode[];
  onNodeClick: (node: ArchitectureNode) => void;
  onManagementClick: () => void;
}

const ArchitectureGraph: React.FC<Props> = ({ data, onNodeClick, onManagementClick }) => {
  const getIcon = (type: ModuleType) => {
    switch(type) {
      case ModuleType.CULTURE: return 'fa-feather-pointed';
      case ModuleType.ECO_INTERACTION: return 'fa-leaf';
      case ModuleType.SAFETY_EXPLORE: return 'fa-shield-halved';
      default: return 'fa-circle';
    }
  };

  const getColor = (type: ModuleType) => {
    switch(type) {
      case ModuleType.CULTURE: return 'from-amber-500/90 to-amber-700/90 shadow-amber-500/20';
      case ModuleType.ECO_INTERACTION: return 'from-emerald-500/90 to-emerald-700/90 shadow-emerald-500/20';
      case ModuleType.SAFETY_EXPLORE: return 'from-sky-500/90 to-sky-700/90 shadow-sky-500/20';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 min-h-[550px] border border-white flex items-center justify-center overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-800/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-dashed border-green-800/5 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
        <i className="fas fa-mountain absolute bottom-[-50px] left-[-50px] text-[300px] text-green-900/5 rotate-12"></i>
      </div>

      {/* SVG 连线系统 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(45, 90, 39, 0.2)" />
            <stop offset="100%" stopColor="rgba(45, 90, 39, 0.05)" />
          </linearGradient>
        </defs>
        {data.map((_, index) => {
          const angle = (index * (360 / data.length)) - 90;
          const radius = 220;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;
          return (
            <line 
              key={`line-${index}`}
              x1="50%" y1="50%" 
              x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
              stroke="url(#lineGrad)" 
              strokeWidth="2"
              strokeDasharray="5 5"
            />
          );
        })}
      </svg>

      {/* 核心枢纽 */}
      <div className="absolute z-20 w-44 h-44 group">
        <div className="absolute inset-0 bg-green-900 rounded-full animate-pulse opacity-20 scale-125"></div>
        <div className="relative w-full h-full bg-slate-900 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(0,0,0,0.3)] border-4 border-white/20 transition-transform duration-500 group-hover:scale-105">
          <i className="fas fa-microchip text-4xl mb-2 text-green-400"></i>
          <span className="text-xs font-black tracking-tighter opacity-80">GEXIAN CORE</span>
          <div className="mt-1 h-0.5 w-8 bg-green-500"></div>
          <span className="text-[10px] mt-1 font-serif">智启仙境</span>
        </div>
      </div>

      {/* 模块节点 */}
      <div className="relative w-full h-full flex items-center justify-center">
        {data.map((node, index) => {
          const angle = (index * (360 / data.length)) - 90;
          const radius = 230;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;

          return (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            >
              <button
                onClick={() => onNodeClick(node)}
                className={`group relative w-48 h-48 rounded-3xl bg-gradient-to-br ${getColor(node.type)} text-white shadow-2xl transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 active:scale-95 flex flex-col items-center justify-center p-6`}
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-800 shadow-lg group-hover:rotate-12 transition-transform">
                  <i className={`fas ${getIcon(node.type)} text-lg`}></i>
                </div>
                
                <h3 className="font-black text-xl mb-2 tracking-wide font-serif">{node.label}</h3>
                <p className="text-[10px] opacity-70 leading-relaxed mb-4">{node.description}</p>
                
                <div className="mt-auto w-full pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest">Demo</span>
                  <i className="fas fa-arrow-right-long text-xs animate-bounce-x"></i>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ArchitectureGraph;
