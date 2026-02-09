import React from 'react';
import { Store } from '../types';
import { PhoneIcon, ClockIcon, MapPinIcon } from './icons';

interface StoreDetailViewProps {
  store: Store;
}

const StoreDetailView: React.FC<StoreDetailViewProps> = ({ store }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">{store.name}</h2>
      {store.isOurStore && (
        <span className="bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full mb-4 inline-block">
          Our Store
        </span>
      )}
      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
        <li className="flex items-center gap-3">
          <MapPinIcon className="w-5 h-5 text-primary" />
          <span>{store.address}</span>
        </li>
        {store.phone && (
          <li className="flex items-center gap-3">
            <PhoneIcon className="w-5 h-5 text-primary" />
            <a href={`tel:${store.phone}`} className="hover:underline">{store.phone}</a>
          </li>
        )}
        {store.hours && (
          <li className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-primary" />
            <span>{store.hours}</span>
          </li>
        )}
      </ul>
      <div className="mt-6 border-t pt-4 dark:border-gray-700">
        <div className="flex justify-between items-center text-md">
            <span className={`font-semibold ${store.isOurStore ? 'text-accent' : 'text-danger'}`}>
                {store.priceInfo}
            </span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">{store.distance} away</span>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailView;