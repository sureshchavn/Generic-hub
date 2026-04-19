import React, { useEffect, useState } from 'react';
import API from '@/src/api';

interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageUrl: string;
}

const MedicinesListPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/medicines");

        setMedicines(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Medicines
        </h1>
        <p className="text-gray-500">
          Browse all available medicines with best prices
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {medicines.map((med) => {

          const finalPrice = med.discount
            ? med.price - (med.price * med.discount) / 100
            : med.price;

          return (
            <div
              key={med._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >

              {/* IMAGE */}
              <div className="h-44 bg-gray-100 overflow-hidden">
                <img
                  src={`http://localhost:5000${med.imageUrl}`}
                  alt={med.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {med.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {med.description || "No description available"}
                </p>

                {/* PRICE */}
                <div className="flex items-center gap-2">

                  <span className="text-xl font-bold text-teal-600">
                    ₹{finalPrice.toFixed(2)}
                  </span>

                  {med.discount && (
                    <>
                      <span className="text-sm line-through text-gray-400">
                        ₹{med.price}
                      </span>

                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        {med.discount}% OFF
                      </span>
                    </>
                  )}

                </div>

                {/* BUTTON */}
                <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  View Details
                </button>

              </div>
            </div>
          );
        })}

      </div>

      {/* EMPTY STATE */}
      {medicines.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">No medicines found</p>
        </div>
      )}

    </div>
  );
};

export default MedicinesListPage;