import React, { useState } from 'react';
import { useMedicines } from '../context/MedicineContext';
import { Medicine } from '../types';
import Modal from '../components/Modal';
import MedicineForm from '../components/MedicineForm';
import { AddIcon, EditIcon, DeleteIcon, HomeIcon } from '../components/icons';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

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

  const handleFormSubmit = (data: Omit<Medicine, 'id' | 'finalPrice'>) => {
    if (editingMedicine) {
      updateMedicine({ ...data, id: editingMedicine.id });
    } else {
      addMedicine(data);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      deleteMedicine(id);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
            <HomeIcon />
            Return to Home
          </Link>
          <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            <AddIcon />
            Add Medicine
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 sm:p-4 text-left font-semibold text-dark dark:text-white">Name</th>
                <th className="p-2 sm:p-4 text-left font-semibold text-dark dark:text-white">Generic Name</th>
                <th className="p-2 sm:p-4 text-left font-semibold hidden sm:table-cell text-dark dark:text-white">Manufacturer</th>
                <th className="p-2 sm:p-4 text-left font-semibold hidden sm:table-cell text-dark dark:text-white">Disease</th>
                <th className="p-2 sm:p-4 text-right font-semibold text-dark dark:text-white">Price</th>
                <th className="p-2 sm:p-4 text-right font-semibold text-dark dark:text-white">Discount</th>
                <th className="p-2 sm:p-4 text-right font-semibold text-dark dark:text-white">Stock</th>
                <th className="p-2 sm:p-4 text-center font-semibold text-dark dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {medicines.map(med => (
                <tr key={med.id} className="border-b dark:border-gray-700 hover:bg-gray-50    dark:hover:bg-gray-700/50 text-sm sm:text-base">
                  <td className="p-2 sm:p-4 whitespace-nowrap">{med.name}</td>
                  <td className="p-2 sm:p-4">{med.genericName}</td>
                  <td className="p-2 sm:p-4 hidden sm:table-cell">{med.manufacturer}</td>
                  <td className="p-2 sm:p-4 hidden sm:table-cell">{med.disease}</td>
                  <td className="p-2 sm:p-4 text-right">₹{med.price.toFixed(2)}</td>
                  <td className="p-2 sm:p-4 text-right">{med.discount > 0 ? `${med.discount}%` : '-'}</td>
                  <td className="p-2 sm:p-4 text-right">{med.stock}</td>
                  <td className="p-2 sm:p-4">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                        onClick={() => openEditModal(med)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50"
                        title="Edit Medicine"
                        >
                        <EditIcon />
                        </button>
                        <button
                        onClick={() => handleDelete(med.id)}
                        className="text-danger hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                       title="Delete Medicine"
                        >
                        <DeleteIcon />
                        </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}>
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