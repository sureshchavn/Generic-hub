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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* IMAGE SECTION */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center">
        <img
         src={`http://localhost:5000${medicine.imageUrl}`}
          alt={medicine.name}
          className="w-full h-64 object-contain rounded-lg"
        />
      </div>

      {/* DETAILS SECTION */}
      <div className="flex flex-col justify-between">

        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {medicine.name}
          </h2>

          <p className="text-md text-gray-500 mt-1">
            {medicine.genericName}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Manufactured by{" "}
            <span className="font-semibold">{medicine.manufacturer}</span>
          </p>

          {/* CATEGORY BADGE */}
          <div className="mt-3">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
              {medicine.category}
            </span>
          </div>
        </div>

        {/* PRICE SECTION */}
        <div className="mt-6">
          {medicine.discount > 0 ? (
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-600">
                  ₹{medicine.finalPrice}
                </span>

                <span className="text-lg line-through text-gray-400">
                  ₹{medicine.price}
                </span>

                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md font-bold">
                  {medicine.discount}% OFF
                </span>
              </div>
            </div>
          ) : (
            <p className="text-3xl font-bold text-green-600">
              ₹{medicine.price}
            </p>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-4">
          <span
            className={`text-sm px-3 py-1 rounded-full font-semibold ${
              medicine.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {medicine.stock > 0
              ? `${medicine.stock} in stock`
              : "Out of Stock"}
          </span>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
            {medicine.description || "No description available"}
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <Link
            to={`/medicine/${medicine.id}`}
            className="block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            View Full Details →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MedicineQuickView;