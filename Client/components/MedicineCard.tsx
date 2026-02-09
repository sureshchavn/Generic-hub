import React from 'react';
import { Link } from 'react-router-dom';
import { Medicine } from '../types';
import { useAuth } from '../context/AuthContext';
import { EyeIcon } from './icons';

interface MedicineCardProps {
  medicine: Medicine;
  onQuickView: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onQuickView }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <Link to={`/medicine/${medicine.id}`} className="block text-current hover:no-underline flex-grow">
        <div className="relative">
          <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-48 object-cover" />
          {medicine.discount > 0 && (
            <div className="absolute top-2 right-2 bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">
              {medicine.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1 truncate text-dark dark:text-white">{medicine.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">({medicine.genericName})</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">by {medicine.manufacturer}</p>
          <div className="flex justify-between items-center">
             <div className="flex flex-col">
              {medicine.discount > 0 ? (
                <>
                  <span className="text-gray-500 dark:text-gray-400 line-through text-sm">₹{medicine.price.toFixed(2)}</span>
                  <span className="text-2xl font-bold text-primary">₹{medicine.finalPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">₹{medicine.price.toFixed(2)}</span>
              )}
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${medicine.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {medicine.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>
      {user?.role === 'customer' && (
        <div className="p-4 pt-0">
          <button 
            onClick={() => onQuickView(medicine)}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
            aria-label={`Quick view ${medicine.name}`}
          >
            <EyeIcon />
            Quick View
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicineCard;