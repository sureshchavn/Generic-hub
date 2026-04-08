import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useMedicines } from '../context/MedicineContext';

const ComparePage: React.FC = () => {
  const { medicines } = useMedicines();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter logic (Name, Generic, or Category)
  const searchResults = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return [];
    
    return medicines.filter(med =>
      med.name.toLowerCase().includes(query) ||
      med.genericName.toLowerCase().includes(query) ||
      med.category.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchTerm, medicines]);

  const handleSelect = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds(prev => [...prev, id]);
    }
    // RESET SEARCH AFTER SELECTION
    setSearchTerm(''); 
    setIsDropdownOpen(false);
  };

  const removeSelected = (id: number) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const selectedMedicines = medicines.filter(med => selectedIds.includes(med.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">
          Compare Medicines
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Search by name or category to build your comparison table.
        </p>
      </div>

      {/* Search Section */}
      <div className="relative max-w-2xl mx-auto mb-12" ref={searchContainerRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search e.g. 'Diabetes', 'Metformin', 'Heart'..."
            value={searchTerm}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            className="w-full px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-dark dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setIsDropdownOpen(false);
              }}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isDropdownOpen && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {searchResults.map(med => (
              <div
                key={med.id}
                onClick={() => handleSelect(med.id)}
                className="px-5 py-3 hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer flex justify-between items-center border-b last:border-none dark:border-gray-700 transition-colors"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-dark dark:text-white">{med.name}</p>
                    <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500 uppercase font-black tracking-widest">
                      {med.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{med.genericName}</p>
                </div>
                {selectedIds.includes(med.id) ? (
                  <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">✓ Added</span>
                ) : (
                  <span className="text-primary text-sm font-bold">+ Add to Compare</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {selectedIds.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Selected ({selectedIds.length}):</span>
          {selectedMedicines.map(med => (
            <div key={med.id} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg shadow-sm">
              <span className="font-semibold text-sm text-dark dark:text-white">{med.name}</span>
              <button 
                onClick={() => removeSelected(med.id)} 
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            onClick={() => setSelectedIds([])}
            className="text-xs font-bold text-red-500 hover:text-red-700 uppercase ml-auto px-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Comparison Table */}
      {selectedMedicines.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50">
              <tr>
                <th className="p-6 font-bold text-gray-400 uppercase text-xs tracking-widest border-b dark:border-gray-800">Feature</th>
                {selectedMedicines.map(med => (
                  <th key={med.id} className="p-6 font-bold text-primary border-b dark:border-gray-800">
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                        <img src={med.imageUrl} alt={med.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-lg">{med.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b dark:border-gray-800 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-6 font-bold text-sm bg-gray-50/20 dark:bg-gray-800/20">Generic Name</td>
                {selectedMedicines.map(m => <td key={m.id} className="p-6 italic text-sm">{m.genericName}</td>)}
              </tr>
              <tr className="border-b dark:border-gray-800 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-6 font-bold text-sm bg-gray-50/20 dark:bg-gray-800/20">Manufacturer</td>
                {selectedMedicines.map(m => <td key={m.id} className="p-6 text-sm">{m.manufacturer}</td>)}
              </tr>
              <tr className="border-b dark:border-gray-800 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-6 font-bold text-sm bg-gray-50/20 dark:bg-gray-800/20">Category</td>
                {selectedMedicines.map(m => <td key={m.id} className="p-6"><span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded">{m.category}</span></td>)}
              </tr>
              <tr className="border-b dark:border-gray-800 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-6 font-bold text-sm bg-gray-50/20 dark:bg-gray-800/20">Price</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-6">
                    <div className="flex flex-col gap-1">
                      {m.discount > 0 ? (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter">
                          {m.discount}% OFF
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Standard Price</span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="font-extrabold text-2xl text-accent">₹{m.finalPrice}</span>
                        {m.discount > 0 && <span className="text-sm text-gray-400 line-through">₹{m.price}</span>}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 font-bold text-sm bg-gray-50/20 dark:bg-gray-800/20 rounded-bl-xl">Description</td>
                {selectedMedicines.map(m => <td key={m.id} className="p-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{m.description}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-6 grayscale opacity-50">💊</div>
          <h3 className="text-2xl font-bold text-gray-400 dark:text-gray-500">Comparison Table is Empty</h3>
          <p className="text-gray-400 max-w-xs mx-auto mt-2">Add at least one medicine using the search bar above to see details.</p>
        </div>
      )}
    </div>
  );
};

export default ComparePage;