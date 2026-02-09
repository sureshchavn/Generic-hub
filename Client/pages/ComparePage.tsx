import React, { useState } from 'react';
import { useMedicines } from '../context/MedicineContext';
import { Medicine } from '../types';

const ComparePage: React.FC = () => {
  const { medicines } = useMedicines();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedMedicines = medicines.filter(med => selectedIds.includes(med.id));

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">Compare Medicines</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Select medicines from the list below to see a side-by-side comparison.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {medicines.map(med => (
          <div
            key={med.id}
            onClick={() => handleSelect(med.id)}
            className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${selectedIds.includes(med.id) ? 'bg-primary text-white ring-2 ring-blue-300 border-primary' : 'bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md dark:hover:border-gray-500'}`}
          >
            <p className="font-semibold text-dark dark:text-white">{med.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{med.genericName}</p>
          </div>
        ))}
      </div>

      {selectedMedicines.length > 0 && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 sm:p-4 font-semibold text-dark dark:text-white">Feature</th>
                {selectedMedicines.map(med => (
                  <th key={med.id} className="p-2 sm:p-4 font-semibold text-primary">{med.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Generic Name</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">{m.genericName}</td>)}</tr>
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Manufacturer</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">{m.manufacturer}</td>)}</tr>
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Disesase</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">{m.disesase}</td>)}</tr>
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Original Price</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">₹{m.price.toFixed(2)}</td>)}</tr>
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Discount</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">{m.discount > 0 ? `${m.discount}%` : '-'}</td>)}</tr>
              <tr className="border-b dark:border-gray-700"><td className="p-2 sm:p-4 font-semibold">Final Price</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4 font-bold text-accent">₹{m.finalPrice.toFixed(2)}</td>)}</tr>
              <tr><td className="p-2 sm:p-4 font-semibold">Stock</td>{selectedMedicines.map(m => <td key={m.id} className="p-2 sm:p-4">{m.stock} units</td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;