
import React from 'react';
import { SEOAnalysis } from '../types';

interface TabProps {
  data: SEOAnalysis;
}

const ActionPlanTab: React.FC<TabProps> = ({ data }) => {
  const combinedActions = [
    ...data.onPageGaps,
    ...data.sgeReadiness,
    ...data.eeatAnalysis
  ].filter(item => item.severity === 'High');

  return (
    <div className="space-y-8">
      <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
        <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
          <i className="fas fa-fire"></i>
          Việc cần làm ngay (Mức độ ưu tiên CAO)
        </h3>
        <div className="space-y-3">
          {combinedActions.length > 0 ? (
            combinedActions.map((action, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-red-200 shadow-sm flex items-center gap-4 group hover:border-red-400 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">{action.feature}</p>
                  <p className="text-slate-800 font-medium">{action.actionItem}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-chevron-right text-slate-300"></i>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">Không có hành động mức độ ưu tiên cao. Bài viết của bạn đang khá tốt!</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-medal text-amber-500"></i>
            Tín hiệu EEAT
          </h3>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {data.eeatAnalysis.map((item, idx) => (
              <div key={idx} className="p-4 flex items-start gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  item.myState.toLowerCase().includes('có') || item.myState.toLowerCase().includes('yes') ? 'bg-green-500' : 'bg-red-500 animate-pulse'
                }`}></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.feature}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.actionItem}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-clipboard-check text-blue-400"></i>
            Checklist Tối ưu Tổng thể
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500" />
              <span className="text-sm text-slate-300">Cập nhật H2/H3 theo Semantic Gap</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500" />
              <span className="text-sm text-slate-300">Thêm Bảng so sánh (SGE Readiness)</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500" />
              <span className="text-sm text-slate-300">Bổ sung Author Bio & External Links</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500" />
              <span className="text-sm text-slate-300">Tối ưu Meta Title & Description</span>
            </li>
          </ul>
          <div className="mt-8">
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95">
              <i className="fas fa-download mr-2"></i>
              Xuất báo cáo PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ActionPlanTab;
