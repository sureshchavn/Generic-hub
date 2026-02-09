import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { STORES } from '../constants';
import { Store } from '../types';
import Modal from '../components/Modal';
import StoreDetailView from '../components/StoreDetailView';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const storeIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

const StoreCard: React.FC<{ store: Store; onClick: (store: Store) => void }> = ({
  store,
  onClick,
}) => (
  <div
    onClick={() => onClick(store)}
    className={`p-4 border rounded-lg mb-4 cursor-pointer transition-all ${
      store.isOurStore
        ? 'bg-teal-50 border-secondary shadow-md hover:ring-2 hover:ring-secondary dark:bg-teal-900/50 dark:border-secondary'
        : 'bg-white hover:shadow-md hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500'
    }`}
  >
    <div className="flex justify-between items-center mb-1">
      <h3 className="font-bold text-lg text-dark dark:text-white">{store.name}</h3>
      {store.isOurStore && (
        <span className="bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
          Our Store
        </span>
      )}
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{store.address}</p>
    <div className="flex justify-between items-center text-sm">
      <span className={`font-semibold ${store.isOurStore ? 'text-accent' : 'text-danger'}`}>
        {store.priceInfo}
      </span>
      <span className="text-gray-500 dark:text-gray-400 font-medium">{store.distance} away</span>
    </div>
  </div>
);

const LocatorPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleOpenStoreDetails = (store: Store) => {
    setSelectedStore(store);
  };

  const handleCloseStoreDetails = () => {
    setSelectedStore(null);
  };

  const defaultPosition: [number, number] = [19.076, 72.8777]; // Mumbai

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">
          Find Your Nearest Store
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We offer the most affordable prices. See how other stores nearby compare and why Generic Hub is your best choice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 h-[600px] overflow-y-auto pr-2">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-4">
            Nearby Pharmacies Stores
          </h2>
        </div>

        {selectedStore && (
          <Modal isOpen={!!selectedStore} onClose={handleCloseStoreDetails} title="Store Information">
            <StoreDetailView store={selectedStore} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LocatorPage;
