
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <span className="text-gray-400 text-sm"><i className="fas fa-leaf mr-1"></i> 环保游览</span>
          <span className="text-gray-400 text-sm"><i className="fas fa-om mr-1"></i> 道家文化传承</span>
          <span className="text-gray-400 text-sm"><i className="fas fa-shield-alt mr-1"></i> 智能安防保障</span>
        </div>
        <p className="text-gray-500 text-xs">
          © 2024 葛仙山智慧旅游项目组 | “葛仙智伴”AI功能架构体系 | 由 Gemini 赋能的智慧文旅方案
        </p>
      </div>
    </footer>
  );
};

export default Footer;
