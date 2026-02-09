import React from 'react';

interface GenericMedicineInfoProps {
  info: string;
}

const GenericMedicineInfo: React.FC<GenericMedicineInfoProps> = ({ info }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 mx-4 sm:mx-0">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Understanding Generic Medicines</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {info || 'Loading information about generic medicines...'}
      </p>
      {info && (
        <p className="mt-4 text-sm text-gray-500 italic">
          Information provided by Google Gemini.
        </p>
      )}
    </div>
  );
};

export default GenericMedicineInfo;