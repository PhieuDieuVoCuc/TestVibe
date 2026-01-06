
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { GoogleGenAI, Type } from "@google/genai";
import { SEOAnalysis, AnalysisStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<SEOAnalysis | null>(null);

  const runAnalysis = async (config: {
    userUrl: string;
    competitorUrls: string[];
    keyword: string;
  }) => {
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Bạn là một Chuyên gia SEO Technical cao cấp. Hãy phân tích bài viết tại URL của tôi (${config.userUrl}) 
        và so sánh với 3 đối thủ (${config.competitorUrls.join(', ')}) cho từ khóa mục tiêu: "${config.keyword}".
        
        Sử dụng công cụ Google Search để lấy thông tin chi tiết về các trang này.
        
        Hãy thực hiện các bước sau:
        1. SEO On-page Gap: So sánh cấu trúc Header (H1-H3), độ dài, Meta tags.
        2. AI Overviews (SGE) Readiness: Kiểm tra Definitions, Tables, Lists.
        3. EEAT Analysis: Tìm Author, Update Date, References, External Links (.gov, .edu).
        4. Semantic Gap: Tìm các chủ đề phụ (Sub-topics) mà đối thủ có nhưng tôi thiếu.
        
        Trả về kết quả chính xác theo định dạng JSON được yêu cầu.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overview: {
                type: Type.OBJECT,
                properties: {
                  wordCount: { type: Type.NUMBER },
                  titleLength: { type: Type.NUMBER },
                  eeatScore: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                },
                required: ["wordCount", "titleLength", "eeatScore", "description"]
              },
              onPageGaps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING },
                    myState: { type: Type.STRING },
                    competitorAvg: { type: Type.STRING },
                    actionItem: { type: Type.STRING },
                    severity: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
                  }
                }
              },
              semanticGaps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    topic: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ["Missing", "Partial", "Covered"] },
                    detail: { type: Type.STRING }
                  }
                }
              },
              sgeReadiness: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING },
                    myState: { type: Type.STRING },
                    competitorAvg: { type: Type.STRING },
                    actionItem: { type: Type.STRING },
                    severity: { type: Type.STRING }
                  }
                }
              },
              eeatAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    feature: { type: Type.STRING },
                    myState: { type: Type.STRING },
                    competitorAvg: { type: Type.STRING },
                    actionItem: { type: Type.STRING },
                    severity: { type: Type.STRING }
                  }
                }
              },
              priorityStrategy: { type: Type.STRING }
            },
            required: ["overview", "onPageGaps", "semanticGaps", "sgeReadiness", "eeatAnalysis", "priorityStrategy"]
          }
        }
      });

      const result = JSON.parse(response.text) as SEOAnalysis;
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web).filter(Boolean) || [];
      result.groundingSources = sources;

      setAnalysisData(result);
      setStatus(AnalysisStatus.COMPLETED);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setError(err.message || "Đã xảy ra lỗi trong quá trình phân tích.");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  // Pastel gradient style: Mix of blue, white and orange
  const pastelBackgroundStyle = {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fff7ed 100%)'
  };

  return (
    <div className="flex h-screen overflow-hidden" style={pastelBackgroundStyle}>
      <Sidebar onRun={runAnalysis} status={status} />
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="text-blue-600">VinaHost</span>
            <span className="text-slate-300">|</span>
            <span>SEO Content Gap Architect</span>
            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md uppercase tracking-widest font-black shadow-lg shadow-blue-200">PRO</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-medium italic">Giải pháp tối ưu nội dung thông minh cho kỷ nguyên SGE.</p>
        </header>

        {status === AnalysisStatus.IDLE && (
          <div className="flex flex-col items-center justify-center h-3/4 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 bg-white text-blue-500 rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-blue-50 transition-transform hover:scale-110">
              <i className="fas fa-rocket text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Sẵn sàng để vượt mặt đối thủ?</h2>
            <p className="text-slate-500 max-w-lg mt-4 text-lg">
              Điền các thông tin bài viết bên trái để bắt đầu quy trình phân tích chuyên sâu các yếu tố SEO On-page và EEAT.
            </p>
          </div>
        )}

        {status === AnalysisStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center h-3/4 text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-600"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600">
                <i className="fas fa-brain text-2xl"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Đang thực hiện phép so sánh đa chiều...</h2>
            <p className="text-slate-500 max-w-lg mt-4 text-lg animate-pulse">
              AI đang trích xuất dữ liệu thực thể và phân tích cấu trúc semantic từ các nguồn đối thủ uy tín nhất.
            </p>
          </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="bg-white border-l-8 border-red-500 text-slate-800 p-8 rounded-2xl shadow-xl flex items-start gap-6 animate-in slide-in-from-top-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-xl"></i>
            </div>
            <div>
              <p className="text-xl font-bold">Phát hiện lỗi kỹ thuật</p>
              <p className="text-slate-600 mt-2">{error}</p>
              <button 
                onClick={() => setStatus(AnalysisStatus.IDLE)}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Trở lại thiết lập
              </button>
            </div>
          </div>
        )}

        {status === AnalysisStatus.COMPLETED && analysisData && (
          <Dashboard data={analysisData} />
        )}
      </main>
    </div>
  );
};

export default App;
