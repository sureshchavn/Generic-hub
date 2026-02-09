import React, { useEffect, useState } from 'react';

interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MedicinesListPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines")
      .then(res => res.json())
      .then(data => setMedicines(data.medicines))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {medicines.map(med => (
        <div key={med._id} className="border rounded p-4 shadow">
          <img
            src={`http://localhost:5000${med.imageUrl}`}
            alt={med.name}
            className="w-full h-40 object-cover mb-2"
          />
          <h3 className="font-bold text-lg">{med.name}</h3>
          <p className="text-sm">{med.description}</p>
          <p className="font-semibold">Price: ${med.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicinesListPage;
