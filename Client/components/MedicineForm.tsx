import React, { useState, useEffect } from 'react';
import { Medicine } from '../types';

type MedicineFormData = Omit<Medicine, 'id' | 'finalPrice'>;

interface MedicineFormProps {
  onSubmit: (data: MedicineFormData) => void;
  onClose: () => void;
  initialData?: Medicine | null;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    genericName: '',
    manufacturer: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    description: '',
    discount: 0,
    disease: '',
    category: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        genericName: initialData.genericName,
        manufacturer: initialData.manufacturer,
        price: initialData.price,
        stock: initialData.stock,
        imageUrl: initialData.imageUrl,
        description: initialData.description,
        discount: initialData.discount,
        disease: initialData.disease,
        category: initialData.category,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="genericName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Generic Name</label>
        <input type="text" name="genericName" id="genericName" value={formData.genericName} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturer</label>
        <input type="text" name="manufacturer" id="manufacturer" value={formData.manufacturer} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
        <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="disease" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Disease</label>
        <input type="text" name="disease" id="disease" value={formData.disease} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className={inputClass} required />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (₹)</label>
          <input type="number" name="price" id="price" step="0.01" value={formData.price} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
          <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discount (%)</label>
          <input type="number" name="discount" id="discount" value={formData.discount} onChange={handleChange} className={inputClass} required />
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600">Save Medicine</button>
      </div>
    </form>
  );
};

export default MedicineForm;