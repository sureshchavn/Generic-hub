import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface GenericMedicineInfoProps {
  info: string;
}

const GenericMedicineInfo: React.FC<GenericMedicineInfoProps> = ({ info }) => {
  return (
    <div className="relative overflow-hidden mb-10">

      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"></div>

      <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-xl text-blue-600 dark:text-blue-400">
            <Info size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Understanding Generic Medicines
            </h2>
            <p className="text-sm text-gray-500">
              Learn how generics help you save money 💊
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-[15px]">
          {info ? (
            info
          ) : (
            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
              <Sparkles size={16} />
              Loading information about generic medicines...
            </div>
          )}
        </div>

        {/* Footer */}
        {info && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-500 italic flex items-center gap-2">
              <Sparkles size={14} />
              Powered by AI (Google Gemini)
            </p>

            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
              Verified Info
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericMedicineInfo;