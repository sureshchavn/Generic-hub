import React, { useEffect, useState } from 'react';
import { Medicine } from '../types';
import Modal from '../components/Modal';
import MedicineForm from '../components/MedicineForm';
import { AddIcon, EditIcon, DeleteIcon, HomeIcon } from '../components/icons';
import { Link } from 'react-router-dom';
import API from '@/src/api';

const AdminPage: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [medicinesData, setMedicinesData] = useState<Medicine[]>([]);

  // 🔥 FETCH DATA
  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicines");

      // ⚠️ MongoDB _id -> id mapping
      const formatted = res.data.map((m: any) => ({
        ...m,
        id: m._id
      }));

      setMedicinesData(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // MODAL
  const openAddModal = () => {
    setEditingMedicine(null);
    setIsModalOpen(true);
  };

  const openEditModal = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMedicine(null);
  };

  // 🔥 ADD / UPDATE
  const handleFormSubmit = async (data: Omit<Medicine, 'id' | 'finalPrice'>) => {
    try {
      if (editingMedicine) {
        await API.put(`/medicines/${editingMedicine.id}`, data);

        // update state
        setMedicinesData(prev =>
          prev.map(m =>
            m.id === editingMedicine.id ? { ...m, ...data } : m
          )
        );

        console.log("Updated ✅");
      } else {
        const res = await API.post("/medicines", data);

        const newMed = {
          ...res.data,
          id: res.data._id
        };

        setMedicinesData(prev => [...prev, newMed]);

        console.log("Added ✅");
      }

      closeModal();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await API.delete(`/medicines/${id}`);

        setMedicinesData(prev => prev.filter(m => m.id !== id));

        console.log("Deleted ✅");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-md">
            <HomeIcon />
            Home
          </Link>

          <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md">
            <AddIcon />
            Add Medicine
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Generic</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Disease</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {medicinesData.map(med => (
                <tr key={med.id} className="border-b">
                  <td className="p-3">{med.name}</td>
                  <td className="p-3">{med.genericName}</td>
                  <td className="p-3">{med.manufacturer}</td>
                  <td className="p-3">{med.disease}</td>
                  <td className="p-3 text-right">₹{med.price}</td>
                  <td className="p-3 text-right">{med.stock}</td>

                  <td className="p-3 text-center">
                    <button onClick={() => openEditModal(med)}>
                      <EditIcon />
                    </button>

                    <button onClick={() => handleDelete(med.id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingMedicine ? 'Edit Medicine' : 'Add Medicine'}>
        <MedicineForm
          onSubmit={handleFormSubmit}
          onClose={closeModal}
          initialData={editingMedicine}
        />
      </Modal>
    </div>
  );
};

export default AdminPage;