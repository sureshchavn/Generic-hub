import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect
} from "react";
import { Medicine } from "../types";
import API from "@/src/api";

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, "id" | "finalPrice">) => Promise<void>;
  updateMedicine: (medicine: Medicine) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
  getMedicineById: (id: string) => Medicine | undefined;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

const calculateFinalPrice = (price: number, discount?: number): number => {
  return price - (price * (discount || 0)) / 100;
};

export const MedicineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // 🔥 FETCH ALL FROM BACKEND
  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicines");

      const formatted = res.data.map((m: any) => ({
        ...m,
        id: m._id,
        finalPrice: calculateFinalPrice(m.price, m.discount)
      }));

      setMedicines(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // 🔥 ADD
  const addMedicine = useCallback(async (medicine: Omit<Medicine, "id" | "finalPrice">) => {
    try {
      const res = await API.post("/medicines", medicine);

      const newMed = {
        ...res.data,
        id: res.data._id,
        finalPrice: calculateFinalPrice(res.data.price, res.data.discount)
      };

      setMedicines(prev => [...prev, newMed]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 🔥 UPDATE
  const updateMedicine = useCallback(async (medicine: Medicine) => {
    try {
      await API.put(`/medicines/${medicine.id}`, medicine);

      setMedicines(prev =>
        prev.map(m =>
          m.id === medicine.id
            ? { ...medicine, finalPrice: calculateFinalPrice(medicine.price, medicine.discount) }
            : m
        )
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 🔥 DELETE
  const deleteMedicine = useCallback(async (id: string) => {
    try {
      await API.delete(`/medicines/${id}`);

      setMedicines(prev => prev.filter(m => m.id !== Number(id)));
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 🔥 GET SINGLE
  const getMedicineById = useCallback(
    (id: string) => medicines.find(m => m.id === Number(id)),
    [medicines]
  );

  return (
    <MedicineContext.Provider
      value={{ medicines, addMedicine, updateMedicine, deleteMedicine, getMedicineById }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicines = (): MedicineContextType => {
  const context = useContext(MedicineContext);
  if (!context) throw new Error("useMedicines must be used within a MedicineProvider");
  return context;
};