import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Modal from '../components/Modal';
import StoreDetailView from '../components/StoreDetailView';
import 'leaflet/dist/leaflet.css';

// 🔥 Temporary empty (later API/AI fill)
const [19.076, 72.8777]; 

const storeIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

interface Store {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  priceInfo: string;
  distance: string;
  isOurStore: boolean;
  location: [number, number];
  phone?: string;
  hours?: string;
}

const LocatorPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]); 
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleOpenStoreDetails = (store: Store) => {
    setSelectedStore(store);
  };

  const handleCloseStoreDetails = () => {
    setSelectedStore(null);
  };

  const defaultPosition: [number, number] = [19.076, 72.8777];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">
          Find Your Nearest Store
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Compare prices and find best pharmacy near you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 🔥 LEFT LIST */}
        <div className="md:col-span-1 h-[600px] overflow-y-auto pr-2">
          <h2 className="text-xl font-bold mb-4">Nearby Stores</h2>

          {stores.length === 0 && (
            <p className="text-gray-500">No stores found</p>
          )}

          {stores.map(store => (
            <div
              key={store.id}
              onClick={() => handleOpenStoreDetails(store)}
              className="p-4 border rounded-lg mb-4 cursor-pointer hover:shadow"
            >
              <h3 className="font-bold">{store.name}</h3>
              <p className="text-sm">{store.address}</p>
              <p className="text-sm text-primary">{store.priceInfo}</p>
            </div>
          ))}
        </div>

        {/* 🔥 MAP */}
        <div className="md:col-span-2 h-[600px]">
          <MapContainer center={defaultPosition} zoom={13} className="h-full w-full rounded-lg">
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stores.map(store => (
              <Marker key={store.id} position={store.location} icon={storeIcon}>
                <Popup>
                  <strong>{store.name}</strong>
                  <br />
                  {store.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedStore && (
        <Modal isOpen={true} onClose={handleCloseStoreDetails} title="Store Info">
          <StoreDetailView store={selectedStore} />
        </Modal>
      )}
    </div>
  );
};

export default LocatorPage;