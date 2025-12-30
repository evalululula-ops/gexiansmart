
import React, { useState, useRef, useEffect } from 'react';
import { getGexuanResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '道友请了。贫道葛玄，在这葛仙山已等候多时。此地云蒸霞蔚，灵气充沛，不知足下想探寻哪段仙缘，亦或是对这炼丹之道有何见地？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getGexuanResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden border border-white relative">
      {/* 顶部状态栏 */}
      <div className="zen-gradient p-6 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <i className="fas fa-cloud text-[200px] absolute -top-10 -right-10"></i>
        </div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Gexuan&backgroundColor=1a3c1a" className="w-14 h-14 rounded-2xl border-2 border-white/30 bg-white/10 p-1" alt="葛玄" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-green-900 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-xl font-black font-serif tracking-widest">葛仙真人 · AI 导灵</h3>
            <p className="text-[10px] text-green-300 font-bold uppercase tracking-widest">Active Spiritual Connection</p>
          </div>
        </div>
        <div className="flex space-x-3 relative z-10">
          <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"><i className="fas fa-volume-high"></i></button>
          <button className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"><i className="fas fa-ellipsis-v"></i></button>
        </div>
      </div>

      {/* 消息区域 */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-[#fafbf9]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-5 rounded-[1.5rem] shadow-sm relative ${
              msg.role === 'user' 
              ? 'bg-green-800 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 font-serif leading-relaxed'
            }`}>
              <p className="text-sm md:text-base">{msg.content}</p>
              {msg.role === 'model' && <div className="absolute -left-2 top-0 w-2 h-2 bg-white border-l border-t border-slate-100 rotate-[-45deg]"></div>}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-6 py-4 rounded-full border border-slate-100 flex space-x-2">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-green-700 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="p-8 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="探寻仙踪、问卜道法、祈愿安康..."
            className="flex-grow p-5 pr-20 bg-slate-50 border-2 border-transparent focus:border-green-700/30 rounded-[1.5rem] focus:outline-none transition-all font-serif"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 w-14 h-14 bg-green-800 text-white rounded-2xl hover:bg-green-900 transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 active:scale-90"
          >
            <i className="fas fa-paper-plane text-xl"></i>
          </button>
        </div>
        <div className="flex items-center space-x-6 mt-4 ml-2">
          <button className="text-xs font-bold text-slate-400 hover:text-green-700 flex items-center"><i className="fas fa-microphone mr-2"></i> 语音传达</button>
          <button className="text-xs font-bold text-slate-400 hover:text-green-700 flex items-center"><i className="fas fa-camera mr-2"></i> 识物辩踪</button>
          <div className="h-4 w-px bg-slate-200"></div>
          <p className="text-[10px] text-slate-300 italic font-serif">“问讯道友，心诚则灵”</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
