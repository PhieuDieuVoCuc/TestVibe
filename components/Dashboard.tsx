
import React, { useState } from 'react';
import { SEOAnalysis } from '../types';
import OverviewTab from './OverviewTab';
import OnPageTab from './OnPageTab';
import SemanticTab from './SemanticTab';
import ActionPlanTab from './ActionPlanTab';

interface DashboardProps {
  data: SEOAnalysis;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'onpage' | 'semantic' | 'action'>('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: 'fas fa-eye' },
    { id: 'onpage', label: 'On-page Gap', icon: 'fas fa-file-alt' },
    { id: 'semantic', label: 'Semantic & SGE', icon: 'fas fa-brain' },
    { id: 'action', label: 'Action Plan', icon: 'fas fa-list-check' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200 gap-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 px-2 text-sm font-semibold flex items-center gap-2 transition-all relative ${
              activeTab === tab.id 
              ? 'text-blue-600' 
              : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className={tab.icon}></i>
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'onpage' && <OnPageTab data={data} />}
        {activeTab === 'semantic' && <SemanticTab data={data} />}
        {activeTab === 'action' && <ActionPlanTab data={data} />}
      </div>
      
      {data.groundingSources && data.groundingSources.length > 0 && (
        <div className="mt-12 p-6 bg-slate-100 rounded-xl border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Nguồn dữ liệu đối soát</h3>
          <div className="flex flex-wrap gap-3">
            {data.groundingSources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.web.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <i className="fas fa-external-link-alt text-[10px]"></i>
                {source.web.title || source.web.uri.substring(0, 30) + '...'}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
