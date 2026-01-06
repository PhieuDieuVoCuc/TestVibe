
import React from 'react';
import { SEOAnalysis } from '../types';

interface TabProps {
  data: SEOAnalysis;
}

const SemanticTab: React.FC<TabProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-layer-group text-purple-600"></i>
          Phân tích Semantic Gap (Các chủ đề bị thiếu)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.semanticGaps.map((topic, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                topic.status === 'Missing' ? 'bg-red-100 text-red-600' :
                topic.status === 'Partial' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
              }`}>
                <i className={`fas ${
                  topic.status === 'Missing' ? 'fa-times' :
                  topic.status === 'Partial' ? 'fa-minus' : 'fa-check'
                }`}></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{topic.topic}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                    topic.status === 'Missing' ? 'bg-red-50 text-red-500 border-red-100' :
                    topic.status === 'Partial' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-green-50 text-green-500 border-green-100'
                  }`}>
                    {topic.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{topic.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fas fa-robot text-indigo-600"></i>
          AI Overviews (SGE) Readiness
        </h3>
        <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.sgeReadiness.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                <p className="text-xs font-bold text-indigo-400 uppercase mb-1">{item.feature}</p>
                <div className="flex justify-between items-end mb-3">
                  <div className="text-sm">
                    <span className="text-slate-400">Tôi: </span>
                    <span className="font-semibold text-slate-800">{item.myState}</span>
                  </div>
                  <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    TB ĐT: {item.competitorAvg}
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic border-t border-slate-50 pt-3">
                  <i className="fas fa-lightbulb text-amber-400 mr-2"></i>
                  {item.actionItem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SemanticTab;
