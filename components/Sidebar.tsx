
import React, { useState } from 'react';
import { AnalysisStatus } from '../types';

interface SidebarProps {
  onRun: (config: {
    userUrl: string;
    competitorUrls: string[];
    keyword: string;
  }) => void;
  status: AnalysisStatus;
}

const Sidebar: React.FC<SidebarProps> = ({ onRun, status }) => {
  const [userUrl, setUserUrl] = useState('');
  const [comp1, setComp1] = useState('');
  const [comp2, setComp2] = useState('');
  const [comp3, setComp3] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userUrl || !keyword) {
      alert("Vui lòng nhập URL của bạn và Từ khóa mục tiêu");
      return;
    }
    const competitorUrls = [comp1, comp2, comp3].filter(url => url.trim() !== '');
    onRun({ userUrl, competitorUrls, keyword });
  };

  const isAnalyzing = status === AnalysisStatus.ANALYZING;

  // Class chung cho input: nền tối để text màu trắng nổi bật
  const inputClasses = "w-full pl-10 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner";

  return (
    <aside className="w-85 bg-slate-900 border-r border-slate-800 h-full flex flex-col p-6 shadow-2xl z-20 text-slate-300">
      <div className="mb-10 flex items-center gap-3 font-bold text-2xl text-white">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <i className="fas fa-chart-pie text-lg"></i>
        </div>
        <span className="tracking-tight">SEO Architect</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <section>
          <label className="flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-widest mb-3">
            <i className="fas fa-user-circle text-sm"></i>
            URL CỦA BẠN
          </label>
          <div className="relative group">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
              <i className="fas fa-link text-xs"></i>
            </span>
            <input
              type="url"
              placeholder="Nhập link bài viết của bạn..."
              className={inputClasses}
              value={userUrl}
              onChange={(e) => setUserUrl(e.target.value)}
              required
            />
          </div>
        </section>

        <section className="space-y-4">
          <label className="flex items-center gap-2 text-xs font-black text-orange-400 uppercase tracking-widest">
            <i className="fas fa-user-friends text-sm"></i>
            ĐỐI THỦ CẠNH TRANH
          </label>
          <div className="space-y-3">
            {[comp1, comp2, comp3].map((val, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-400 transition-colors">
                  <i className="fas fa-shield-alt text-xs"></i>
                </span>
                <input
                  type="url"
                  placeholder={`Link đối thủ ${idx + 1}...`}
                  className={inputClasses}
                  value={idx === 0 ? comp1 : idx === 1 ? comp2 : comp3}
                  onChange={(e) => {
                    if (idx === 0) setComp1(e.target.value);
                    else if (idx === 1) setComp2(e.target.value);
                    else setComp3(e.target.value);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <label className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest mb-3">
            <i className="fas fa-tags text-sm"></i>
            TỪ KHÓA MỤC TIÊU
          </label>
          <div className="relative group">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
              <i className="fas fa-search text-xs"></i>
            </span>
            <input
              type="text"
              placeholder="Ví dụ: dịch vụ seo uy tín"
              className={inputClasses}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isAnalyzing}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-blue-900/20 active:scale-[0.98] ${
            isAnalyzing 
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400'
          }`}
        >
          {isAnalyzing ? (
            <>
              <i className="fas fa-spinner animate-spin"></i>
              <span>Đang tính toán...</span>
            </>
          ) : (
            <>
              <i className="fas fa-wand-magic-sparkles"></i>
              <span>Phân tích Gaps</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <i className="fas fa-robot text-blue-500"></i>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Powered By</p>
            <p className="text-sm font-bold text-white">Gemini 3 Flash</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
