
import React from 'react';
import { SEOAnalysis, ComparisonFeature } from '../types';

interface TabProps {
  data: SEOAnalysis;
}

const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const styles = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-blue-100 text-blue-700 border-blue-200',
  };
  const current = styles[severity as keyof typeof styles] || styles.Low;
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${current} uppercase`}>
      {severity}
    </span>
  );
};

const OnPageTab: React.FC<TabProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Yếu tố so sánh</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Của tôi</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">TB Đối thủ</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Mức độ ưu tiên</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Hành động cần làm</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.onPageGaps.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700 text-sm">{item.feature}</td>
                <td className="p-4 text-sm text-slate-600">{item.myState}</td>
                <td className="p-4 text-sm text-slate-600">{item.competitorAvg}</td>
                <td className="p-4">
                  <SeverityBadge severity={item.severity} />
                </td>
                <td className="p-4 text-sm font-medium text-blue-600">{item.actionItem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnPageTab;
