
export interface SEOAnalysis {
  overview: {
    wordCount: number;
    titleLength: number;
    eeatScore: number;
    description: string;
  };
  onPageGaps: ComparisonFeature[];
  semanticGaps: SemanticTopic[];
  sgeReadiness: ComparisonFeature[];
  eeatAnalysis: ComparisonFeature[];
  priorityStrategy: string;
  groundingSources: Array<{ web: { uri: string; title: string } }>;
}

export interface ComparisonFeature {
  feature: string;
  myState: string;
  competitorAvg: string;
  actionItem: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface SemanticTopic {
  topic: string;
  status: 'Missing' | 'Partial' | 'Covered';
  detail: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  CRAWLING = 'CRAWLING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
