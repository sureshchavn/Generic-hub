import React, { useState, useMemo } from "react";
import { useMedicines } from "../context/MedicineContext";

const ComparePage: React.FC = () => {
  const { medicines } = useMedicines();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 🔍 SEARCH FILTER
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, medicines]);

  const handleSelect = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setSearchTerm("");
  };

  const removeSelected = (id: number) => {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  const selectedMedicines = medicines.filter((m) =>
    selectedIds.includes(m.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Compare Medicines
      </h1>

      {/* ✅ SEARCH BAR (CENTER + ABOVE TABLE) */}
      <div className="flex justify-center mb-6 relative">
        <input
          type="text"
          placeholder="Search medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 px-4 py-2 rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* DROPDOWN */}
        {searchTerm && (
          <div className="absolute top-12 w-80 bg-white border rounded-lg shadow z-50">
            {filteredMedicines.slice(0, 5).map((med) => (
              <div
                key={med.id}
                onClick={() => handleSelect(med.id)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {med.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ SELECTED TAGS */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {selectedMedicines.map((med) => (
          <div
            key={med.id}
            className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {med.name}
            <button
              onClick={() => removeSelected(med.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ✅ TABLE */}
      {selectedMedicines.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">

            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Feature</th>

                {selectedMedicines.map((med) => (
                  <th key={med.id} className="p-3 text-center">

                    {/* ✅ IMAGE FIX */}
                    <img
                      src={
                        med.imageUrl?.startsWith("http")
                          ? med.imageUrl
                          : `http://localhost:5000${medicine.imageUrl}`
                      }
                      alt={med.name}
                      className="w-20 h-20 object-contain mx-auto mb-2"
                    />

                    <p className="font-semibold">{med.name}</p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-3 font-semibold">Generic</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-3 text-center">
                    {m.genericName}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold">Manufacturer</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-3 text-center">
                    {m.manufacturer}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold">Category</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-3 text-center">
                    {m.category}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold">Price</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-3 text-center text-green-600 font-bold">
                    ₹{m.finalPrice}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold">Description</td>
                {selectedMedicines.map((m) => (
                  <td key={m.id} className="p-3 text-center">
                    {m.description}
                  </td>
                ))}
              </tr>
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;