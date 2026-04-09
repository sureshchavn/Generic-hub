import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Medicine } from '../types';
import { MOCK_MEDICINES } from '../constants';

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id' | 'finalPrice'>) => void;
  updateMedicine: (medicine: Medicine) => void;
  deleteMedicine: (id: number) => void;
  getMedicineById: (id: number) => Medicine | undefined;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

const MEDICINES_STORAGE_KEY = 'medicines';

const calculateFinalPrice = (price: number, discount?: number): number => {
  return price - (price * (discount || 0) / 100);
};

export const MedicineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const stored = localStorage.getItem(MEDICINES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return MOCK_MEDICINES.map(m => ({ ...m, finalPrice: calculateFinalPrice(m.price, m.discount) }));
  });

  useEffect(() => {
    try {
      localStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(medicines));
    } catch {}
  }, [medicines]);

  const addMedicine = useCallback((medicine: Omit<Medicine, 'id' | 'finalPrice'>) => {
    const newMed: Medicine = {
      ...medicine,
      id: Date.now(), // ✅ number now
      finalPrice: calculateFinalPrice(medicine.price, medicine.discount),
    };
    setMedicines(prev => [...prev, newMed]);
  }, []);

  const updateMedicine = useCallback((medicine: Medicine) => {
    setMedicines(prev =>
      prev.map(m => (m.id === medicine.id ? { ...medicine, finalPrice: calculateFinalPrice(medicine.price, medicine.discount) } : m))
    );
  }, []);

  const deleteMedicine = useCallback((id: number) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  }, []);

  const getMedicineById = useCallback((id: number) => medicines.find(m => m.id === id), [medicines]);

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, updateMedicine, deleteMedicine, getMedicineById }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicines = (): MedicineContextType => {
  const context = useContext(MedicineContext);
  if (!context) throw new Error('useMedicines must be used within a MedicineProvider');
  return context;
};