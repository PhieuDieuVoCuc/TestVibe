
import React from 'react';
import { SEOAnalysis } from '../types';

interface TabProps {
  data: SEOAnalysis;
}

const OverviewTab: React.FC<TabProps> = ({ data }) => {
  const { overview } = data;

  const stats = [
    { label: 'Số lượng từ (Word Count)', value: overview.wordCount, icon: 'fa-font', color: 'bg-indigo-100 text-indigo-600' },
    { label: 'Độ dài Title', value: overview.titleLength, icon: 'fa-heading', color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Chỉ số EEAT', value: `${overview.eeatScore}/100`, icon: 'fa-certificate', color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-bullseye text-blue-600"></i>
            Tóm tắt chiến lược
          </h3>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            {data.priorityStrategy}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-sparkles"></i>
            Phân tích bởi AI
          </h3>
          <p className="text-blue-50 leading-relaxed">
            {overview.description}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">G</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">3</div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">F</div>
            </div>
            <span className="text-xs text-blue-100">Cung cấp bởi Gemini 3 Flash & Google Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
