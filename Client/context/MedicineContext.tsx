
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Medicine } from '../types';
import { MOCK_MEDICINES } from '../constants';

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id' | 'finalPrice'>) => void;
  updateMedicine: (medicine: Omit<Medicine, 'finalPrice'>) => void;
  deleteMedicine: (id: string) => void;
  getMedicineById: (id: string) => Medicine | undefined;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

const MEDICINES_STORAGE_KEY = 'medicines';

const calculateFinalPrice = (price: number, discount: number): number => {
    return price - (price * (discount || 0) / 100);
}

export const MedicineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const storedMedicines = localStorage.getItem(MEDICINES_STORAGE_KEY);
      if (storedMedicines) {
        return JSON.parse(storedMedicines);
      }
    } catch (error) {
      console.error('Error reading medicines from localStorage', error);
    }
    // Initialize with mock data if localStorage is empty or fails
    return MOCK_MEDICINES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(medicines));
    } catch (error) {
      console.error('Error saving medicines to localStorage', error);
    }
  }, [medicines]);

  const addMedicine = useCallback((medicine: Omit<Medicine, 'id' | 'finalPrice'>) => {
    const finalPrice = calculateFinalPrice(medicine.price, medicine.discount);
    const newMedicine: Medicine = { 
        ...medicine, 
        id: String(Date.now()),
        finalPrice 
    };
    setMedicines(prev => [...prev, newMedicine]);
  }, []);

  const updateMedicine = useCallback((updatedMedicine: Omit<Medicine, 'finalPrice'>) => {
    const finalPrice = calculateFinalPrice(updatedMedicine.price, updatedMedicine.discount);
    const fullyUpdatedMedicine: Medicine = { ...updatedMedicine, finalPrice };
    setMedicines(prev => prev.map(med => med.id === fullyUpdatedMedicine.id ? fullyUpdatedMedicine : med));
  }, []);

  const deleteMedicine = useCallback((id: string) => {
    setMedicines(prev => prev.filter(med => med.id !== id));
  }, []);
  
  const getMedicineById = useCallback((id: string) => {
    return medicines.find(med => med.id === id);
  }, [medicines]);

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, updateMedicine, deleteMedicine, getMedicineById }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicines = (): MedicineContextType => {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error('useMedicines must be used within a MedicineProvider');
  }
  return context;
};