import React from 'react';
import { Link } from 'react-router-dom';
import { Medicine } from '../types';
import { useAuth } from '../context/AuthContext';

interface MedicineQuickViewProps {
  medicine: Medicine;
}

const MedicineQuickView: React.FC<MedicineQuickViewProps> = ({ medicine }) => {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
      <div>
        <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-auto rounded-lg object-cover shadow-md" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-dark dark:text-white mb-1">{medicine.name}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">{medicine.genericName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">By <span className="font-semibold">{medicine.manufacturer}</span></p>

        <div className="mb-4">
          {medicine.discount > 0 ? (
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">₹{medicine.finalPrice.toFixed(2)}</span>
              <span className="text-xl text-gray-500 dark:text-gray-400 line-through">₹{medicine.price.toFixed(2)}</span>
              <span className="text-sm bg-red-100 text-danger font-semibold px-2 py-1 rounded-md">{medicine.discount}% OFF</span>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary">₹{medicine.price.toFixed(2)}</p>
          )}
        </div>

        <span className={`inline-block px-3 py-1 text-sm rounded-full mb-4 ${medicine.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {medicine.stock > 0 ? `${medicine.stock} units in stock` : 'Out of Stock'}
        </span>

        <p className="leading-relaxed text-sm mb-4">{medicine.description}</p>

        <div className="mt-4 text-sm text-center">
          <Link to={`/medicine/${medicine.id}`} className="text-primary hover:underline">
            View Full Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MedicineQuickView;