import React from 'react';
import { ShopLocation, UserLocation } from '../types';

interface MedicalShopFinderProps {
  userLocation: UserLocation | null;
  shops: ShopLocation[];
  loading: boolean;
  error: string | null;
  onFindShops: () => void;
}

const MedicalShopFinder: React.FC<MedicalShopFinderProps> = ({
  userLocation,
  shops,
  loading,
  error,
  onFindShops,
}) => {
  // Fixed: Correct string interpolation for Google Maps search
  const handleMapLink = (latitude: number, longitude: number, placeName?: string) => {
    const query = placeName ? `${placeName} ${latitude},${longitude}` : `${latitude},${longitude}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-0">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Find Nearest Generic Medical Shops</h2>

      <div className="mb-6">
        <button
          onClick={onFindShops}
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          )}
          {loading ? 'Finding Shops...' : 'Find Nearest Shops'}
        </button>

        {userLocation && (
          <p className="mt-4 text-sm text-gray-600">
            Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {shops.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Nearby Medical Shops (Sorted by Distance)</h3>
          <ul className="space-y-4">
            {shops.map((shop, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                <h4 className="font-bold text-lg text-blue-600">{shop.name}</h4>
                <p className="text-gray-700 text-sm mt-1">{shop.address}</p>
                {shop.distance !== undefined && (
                  <p className="text-gray-700 text-sm mt-1">
                    <span className="font-semibold">Distance:</span> {shop.distance.toFixed(2)} km
                  </p>
                )}
                {shop.reviewSnippets && shop.reviewSnippets.length > 0 && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-xs italic">Reviews:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs ml-2">
                      {shop.reviewSnippets.map((snippet, sIndex) => (
                        <li key={sIndex}>{snippet}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center mt-3 space-y-2 sm:space-y-0 sm:space-x-4">
                  <a
                    href={shop.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-7 7" />
                    </svg>
                  </a>
                  {userLocation && shop.latitude && shop.longitude && (
                     <button
                       onClick={() => handleMapLink(shop.latitude!, shop.longitude!, shop.name)}
                       className="text-green-500 hover:text-green-700 text-sm font-medium flex items-center"
                     >
                       Open in Google Maps
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                     </button>
                   )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {shops.length === 0 && !loading && !error && userLocation && (
        <p className="mt-4 text-gray-600 text-center">No generic medical shops found nearby.</p>
      )}

      {/* FIXED: Correct Iframe Source Template Literal */}
      <div className="mt-8 rounded-lg overflow-hidden shadow-inner border border-gray-200">
        {userLocation ? (
          <iframe
            title="Google Maps Nearby Pharmacies"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/search?key=YOUR_GOOGLE_MAPS_EMBED_API_KEY&center=${userLocation.latitude},${userLocation.longitude}&q=pharmacy&zoom=14`}
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-200 text-gray-500">
            <p>Map will appear here after finding your location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalShopFinder;