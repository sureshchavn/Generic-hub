import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '@/src/api';

const MedicineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [medicine, setMedicine] = useState<any>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const res = await API.get(`/medicines/${id}`);
        setMedicine(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) fetchMedicine();
  }, [id]);

  if (!medicine) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Medicine Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <img
        src={medicine.imageUrl || "https://via.placeholder.com/300"}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{medicine.name}</h1>
      <p>{medicine.genericName}</p>
      <p>{medicine.manufacturer}</p>
      <p>{medicine.description}</p>
    </div>
  );
};

export default MedicineDetailPage;