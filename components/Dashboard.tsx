
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ManagementViewType } from '../types';

const VISITOR_DATA = [
  { name: '08:00', visitors: 1200, capacity: 4000 },
  { name: '10:00', visitors: 3500, capacity: 4000 },
  { name: '12:00', visitors: 3800, capacity: 4000 },
  { name: '14:00', visitors: 3100, capacity: 4000 },
  { name: '16:00', visitors: 1500, capacity: 4000 },
];

const PROFILING_DATA = [
  { name: '亲子游', value: 45, color: '#10b981' },
  { name: '养生团', value: 30, color: '#f59e0b' },
  { name: '个人摄影', value: 15, color: '#3b82f6' },
  { name: '其他', value: 10, color: '#6b7280' },
];

interface Props {
  initialView: ManagementViewType;
}

const Dashboard: React.FC<Props> = ({ initialView }) => {
  const [view, setView] = useState<ManagementViewType>(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const renderBrainView = () => (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '预测拥堵点', val: '索道上站', sub: '预计排队 35min', color: 'purple' },
          { label: '实时运力', val: '1,200/h', sub: '效率提升 12%', color: 'indigo' },
          { label: '接驳车状态', val: '满负荷', sub: '在途 14 辆', color: 'blue' },
          { label: '决策AI状态', val: '智能模式', sub: '置信度 98%', color: 'emerald' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${s.color}-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform`}></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <p className={`text-2xl font-black mt-2 text-${s.color}-600`}>{s.val}</p>
            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-black text-xl text-slate-800 flex items-center">
            <span className="w-2 h-8 bg-purple-600 rounded-full mr-3"></span>
            全域客流动态与承载预测
          </h3>
          <div className="flex space-x-2">
            <span className="flex items-center text-[10px] text-slate-400 font-bold uppercase"><span className="w-2 h-2 bg-purple-600 rounded-full mr-1"></span> 实时客流</span>
            <span className="flex items-center text-[10px] text-slate-400 font-bold uppercase"><span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span> 警戒阈值</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={VISITOR_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#7c3aed" strokeWidth={4} dot={{ r: 6, fill: '#7c3aed', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
              <Line type="step" dataKey="capacity" stroke="#f87171" strokeDasharray="8 8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-8 bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center space-x-6">
          <div className="bg-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <i className="fas fa-robot text-xl"></i>
          </div>
          <p className="text-sm text-purple-900 leading-relaxed font-bold italic">
            "基于当前云海景观能见度(优)及索道排队压力，建议通过APP推送『后山古道漫游』专属任务，预计可瞬间分流核心景区约18%的低留存意愿游客。"
          </p>
        </div>
      </div>
    </div>
  );

  const renderSecurityView = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: 'fa-video', label: '全域监控', val: '248 路', sub: '实时识别中', color: 'blue' },
          { icon: 'fa-triangle-exclamation', label: '异常告警', val: '2 次', sub: '今日累计', color: 'amber' },
          { icon: 'fa-person-falling', label: '跌倒检测', val: '0 次', sub: '实时监测', color: 'green' },
          { icon: 'fa-bolt', label: '响应效率', val: '1.8s', sub: '秒级联动', color: 'indigo' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`w-12 h-12 bg-${s.color}-50 text-${s.color}-600 rounded-xl flex items-center justify-center`}>
              <i className={`fas ${s.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-xl font-black text-slate-800">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
          <h3 className="font-black text-xl text-slate-800 mb-8 flex items-center">
            <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
            护法神实时预警流
          </h3>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-px flex-grow bg-slate-100 my-1"></div>
              </div>
              <div className="flex-grow pb-6">
                <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-black text-red-600 uppercase tracking-widest">紧急告警</span>
                    <span className="text-[10px] text-slate-400">14:50:22</span>
                  </div>
                  <h4 className="font-bold text-red-900">飞仙崖异常攀爬尝试</h4>
                  <p className="text-sm text-red-800/80 mt-1">智能视频分析引擎捕捉到非法翻越围栏动作。护法神系统已启动现场云端喊话并同步推送到安保端。</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <div className="w-px flex-grow bg-slate-100 my-1"></div>
              </div>
              <div className="flex-grow">
                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-black text-amber-600 uppercase tracking-widest">风险预警</span>
                    <span className="text-[10px] text-slate-400">14:12:05</span>
                  </div>
                  <h4 className="font-bold text-amber-900">核心景区瞬时密度过大</h4>
                  <p className="text-sm text-amber-800/80 mt-1">葛仙殿外广场密度触发二级阈值。建议调拨巡逻人员引导至偏殿参观。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-end">
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <i className="fas fa-fingerprint text-5xl text-blue-400 mb-6"></i>
            <h4 className="text-2xl font-black mb-4">全域安防数字孪生</h4>
            <p className="text-sm opacity-60 leading-relaxed font-serif italic">“如影随形，护法归心。”</p>
            <div className="mt-8 space-y-3">
              <div className="flex justify-between text-xs"><span className="opacity-60">网络响应</span><span className="font-mono">12ms</span></div>
              <div className="h-1 w-full bg-white/10 rounded-full"><div className="h-full w-[90%] bg-blue-400 rounded-full"></div></div>
              <div className="flex justify-between text-xs mt-4"><span className="opacity-60">AI识别置信度</span><span className="font-mono">99.2%</span></div>
              <div className="h-1 w-full bg-white/10 rounded-full"><div className="h-full w-[98%] bg-green-400 rounded-full"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
        <h3 className="font-black text-xl text-slate-800 mb-8 flex items-center">
          <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
          游客画像全景分析 (360°)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PROFILING_DATA}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {PROFILING_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {PROFILING_DATA.map(item => (
            <div key={item.name} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-4 h-4 rounded-md" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs font-bold text-slate-600">{item.name}</span>
              <span className="text-xs font-mono ml-auto font-black">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col">
        <h3 className="font-black text-xl text-slate-800 mb-8 flex items-center">
          <span className="w-2 h-8 bg-amber-500 rounded-full mr-3"></span>
          AI 需求洞察与服务短板
        </h3>
        <div className="flex-grow space-y-6">
          <div className="group p-6 bg-amber-50 rounded-2xl border border-amber-100 hover:bg-amber-100 transition-colors">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-xl flex items-center justify-center mr-3">
                <i className="fas fa-triangle-exclamation"></i>
              </div>
              <p className="font-black text-amber-900 uppercase tracking-widest text-xs">痛点识别: 交通瓶颈</p>
            </div>
            <p className="text-sm text-amber-800 leading-relaxed">
              数据分析显示，16:00-17:30 期间，下山索道负面情绪词云占比上升12%，主要集中在排队区域缺乏遮阳及饮水设施。建议立即增加临时补给站。
            </p>
          </div>
          <div className="group p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-emerald-200 text-emerald-700 rounded-xl flex items-center justify-center mr-3">
                <i className="fas fa-wand-magic-sparkles"></i>
              </div>
              <p className="font-black text-emerald-900 uppercase tracking-widest text-xs">机会发现: 养生文化</p>
            </div>
            <p className="text-sm text-emerald-800 leading-relaxed">
              游客在AI对话中，询问“炼丹饮食建议”的频次本周环比增长40%。建议在葛仙殿附近增加道家特色药膳体验项目，预计转化率极高。
            </p>
          </div>
        </div>
        <button className="mt-8 w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-black transition-all">
          生成完整分析报告 (PDF)
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      {/* 极简精致的二级切换 */}
      <div className="max-w-3xl mx-auto flex space-x-2 bg-white/60 backdrop-blur-md p-2 rounded-3xl shadow-xl border border-white">
        {[
          { id: 'brain', label: 'AI仙山大脑', icon: 'fa-brain', color: 'purple' },
          { id: 'security', label: 'AI护法神', icon: 'fa-shield-halved', color: 'blue' },
          { id: 'data-center', label: 'AI云霄阁', icon: 'fa-database', color: 'amber' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all duration-300 flex items-center justify-center space-x-3 text-sm ${
              view === tab.id 
              ? `bg-slate-900 text-white shadow-2xl scale-[1.02]` 
              : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <i className={`fas ${tab.icon} ${view === tab.id ? `text-${tab.color}-400` : ''}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="min-h-[500px]">
        {view === 'brain' && renderBrainView()}
        {view === 'security' && renderSecurityView()}
        {view === 'data-center' && renderDataView()}
      </div>
    </div>
  );
};

export default Dashboard;
