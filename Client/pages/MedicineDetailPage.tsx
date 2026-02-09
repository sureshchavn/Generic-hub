import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMedicines } from '../context/MedicineContext';
import { useAuth } from '../context/AuthContext';

const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMedicineById } = useMedicines();
  const { user } = useAuth();

  const medicine = id ? getMedicineById(id) : undefined;

  if (!medicine) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white mb-4">Medicine Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't find the medicine you're looking for.</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={medicine.imageUrl} alt={medicine.name} className="w-full h-auto rounded-lg object-cover shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">{medicine.name}</h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-4">{medicine.genericName}</p>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-6">Manufactured by <span className="font-semibold">{medicine.manufacturer}</span></p>

          <div className="mb-6">
            {medicine.discount > 0 ? (
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold text-primary">₹{medicine.finalPrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">₹{medicine.price.toFixed(2)}</span>
                    <span className="text-md bg-red-100 text-danger font-semibold px-3 py-1 rounded-md">{medicine.discount}% OFF</span>
                </div>
            ) : (
                <p className="text-3xl sm:text-4xl font-bold text-primary">₹{medicine.price.toFixed(2)}</p>
            )}
          </div>
          

          <div className="flex items-center mb-6">
            <span className={`px-4 py-2 text-md rounded-full ${medicine.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              {medicine.stock > 0 ? `${medicine.stock} units in stock` : 'Out of Stock'}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{medicine.description}</p>
          </div>

           <div className="mt-8">
             <Link to="/" className="text-primary hover:underline">
               &larr; Back to all medicines
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailPage;