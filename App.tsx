
import React, { useState, useEffect } from 'react';
import { ModuleType, ArchitectureNode, ManagementViewType } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ArchitectureGraph from './components/ArchitectureGraph';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

const ARCHITECTURE_DATA: ArchitectureNode[] = [
  {
    id: 'culture',
    label: 'AI葛仙真人',
    description: '深度解构道家文化，提供沉浸式导览体验。',
    type: ModuleType.CULTURE,
    techStack: ['Gemini LLM', '文化知识图谱', '多模态语音'],
    scenarios: ['炼丹台文化解读', '道家养生建议', '历史人物互动']
  },
  {
    id: 'eco',
    label: 'AI祈福灵境',
    description: 'AR虚拟祈福，兼顾环保与情感互动。',
    type: ModuleType.ECO_INTERACTION,
    techStack: ['AR Core', '情感计算', '视觉特效引擎'],
    scenarios: ['虚拟上香', '美学文愿润色', '永恒香火存留']
  },
  {
    id: 'safety',
    label: 'AI云海仙境',
    description: '全天候安全护航与智能探索辅助。',
    type: ModuleType.SAFETY_EXPLORE,
    techStack: ['实时定位', '地理围栏', '气象感知'],
    scenarios: ['危险区域预警', '最佳观景点推荐', '古树奇石扫描']
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'demo' | 'management'>('architecture');
  const [managementView, setManagementView] = useState<ManagementViewType>('brain');

  useEffect(() => {
    console.log("Initialization: 您好，我是“葛仙智伴”AI智能体功能架构师。我将依据葛仙山道家文化与现代科技融合的理念，为您设计出涵盖文化体验、环保互动、安全探索与景区管理的全方位智能功能体系。请您详细说明对各功能模块的具体需求与期望，我们将共同打造一个沉浸式的智慧游览生态。");
  }, []);

  const handleNodeClick = (node: ArchitectureNode) => {
    setActiveTab('demo');
  };

  const handleManagementEntry = (view: ManagementViewType) => {
    setManagementView(view);
    setActiveTab('management');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {activeTab === 'architecture' && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* 上部：核心架构图 */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <div className="mb-8 pl-4 border-l-4 border-green-700">
                  <h2 className="text-4xl font-black text-slate-800 tracking-tight">智慧全域架构</h2>
                  <p className="text-slate-500 mt-2 font-serif italic text-lg">“以智入道，以境焕山” —— 葛仙山智慧游览数字化蓝图</p>
                </div>
                <ArchitectureGraph 
                  data={ARCHITECTURE_DATA} 
                  onNodeClick={handleNodeClick} 
                  onManagementClick={() => setActiveTab('management')}
                />
              </div>
              
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 mb-6">
                    <i className="fas fa-lightbulb text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">交互说明</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-green-700 text-white text-[10px] flex items-center justify-center mr-3 mt-1 shrink-0">1</span>
                      <span>点击左侧<b>圆环节点</b>可直接进入对应模块的<b>虚拟仿真体验</b>，与葛玄真人对话或尝试AR祈福。</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-6 h-6 rounded-full bg-green-700 text-white text-[10px] flex items-center justify-center mr-3 mt-1 shrink-0">2</span>
                      <span>点击底部<b>中枢运营卡片</b>，下沉至管理层级，查看仙山大脑的实时计算模型。</span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                  <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-2">文化内核</h4>
                  <p className="text-lg font-serif italic leading-relaxed opacity-90">
                    “道生一，一生二，二生三，三生万物。” —— 我们将道教哲学融入每一行算法，实现天人合一的数字体验。
                  </p>
                </div>
              </div>
            </section>
            
            {/* 下部：中枢运营端口 (更美观的二级入口) */}
            <section className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-200"></div>
              <div className="relative flex justify-center mb-12">
                <div className="bg-[#f0f4f1] px-8 text-slate-400 uppercase tracking-[0.4em] font-bold text-sm">景区治理中枢</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    id: 'brain', 
                    title: 'AI仙山大脑', 
                    desc: '智能调度与客流预警', 
                    icon: 'fa-brain', 
                    color: 'purple',
                    tag: '计算核心'
                  },
                  { 
                    id: 'security', 
                    title: 'AI护法神', 
                    desc: '全域主动安防系统', 
                    icon: 'fa-shield-halved', 
                    color: 'blue',
                    tag: '安全屏障'
                  },
                  { 
                    id: 'data-center', 
                    title: 'AI云霄阁', 
                    desc: '文旅大数据中台', 
                    icon: 'fa-database', 
                    color: 'amber',
                    tag: '数据资产'
                  }
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleManagementEntry(item.id as ManagementViewType)}
                    className="group cursor-pointer relative bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-3"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                      <i className={`fas ${item.icon} text-2xl`}></i>
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest text-${item.color}-500 mb-2`}>{item.tag}</div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                    
                    <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                      <span>查看监控数据</span>
                      <i className="fas fa-arrow-right-long ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"></i>
                    </div>

                    <div className={`absolute top-6 right-6 w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`}></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'demo' && (
          <div className="max-w-5xl mx-auto h-[75vh] animate-in zoom-in-95 duration-500">
            <ChatInterface />
          </div>
        )}

        {activeTab === 'management' && (
          <div className="animate-in slide-in-from-right-10 duration-700">
            <Dashboard initialView={managementView} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
