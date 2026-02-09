import React, { useState, useMemo } from 'react';
import { GenericMedicine, ShopLocation, UserLocation } from '../types';

interface GenericMedicineSearchProps {
  medicines: GenericMedicine[];
  loading: boolean;
  error: string | null;
  nearbyShops: ShopLocation[]; // New prop for nearby shops
  userLocation: UserLocation | null; // New prop for user location
  shopsLoading: boolean; // New prop for shops loading state
}

const GenericMedicineSearch: React.FC<GenericMedicineSearchProps> = ({
  medicines,
  loading,
  error,
  nearbyShops,
  userLocation,
  shopsLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<GenericMedicine | null>(null);

  const filteredMedicines = useMemo(() => {
    if (!searchTerm) {
      return medicines;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return medicines.filter(
      (med) =>
        med.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        med.uses.toLowerCase().includes(lowerCaseSearchTerm) ||
        med.genericBrands.some((brand) => brand.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, [medicines, searchTerm]);

  const handleMedicineClick = (medicine: GenericMedicine) => {
    setSelectedMedicine(medicine);
  };

  const handleBackToSearch = () => {
    setSelectedMedicine(null);
    setSearchTerm(''); // Optionally clear search term
  };

  const handleMapLink = (latitude: number, longitude: number, placeName?: string) => {
    const query = placeName ? `${placeName},${latitude},${longitude}` : `${latitude},${longitude}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-0">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Search Generic Medicines</h2>

      {!selectedMedicine ? (
        <>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by medicine name, uses, or brand..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search generic medicines"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-lg text-gray-600">Loading medicine database...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredMedicines.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {filteredMedicines.map((med, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-blue-50 transition duration-150 ease-in-out"
                      onClick={() => handleMedicineClick(med)}
                      aria-label={`View details for ${med.name}`}
                      role="button"
                      tabIndex={0}
                    >
                      <h3 className="font-bold text-xl text-blue-600 mb-2">{med.name}</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div>
                          <span className="font-semibold text-gray-800">Uses:</span> {med.uses.substring(0, 70)}...
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">Generic Brands:</span>{' '}
                          {med.genericBrands.length > 0 ? med.genericBrands.slice(0, 3).join(', ') : 'N/A'}...
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-gray-600 text-center text-lg">
                  {searchTerm ? `No results found for "${searchTerm}".` : 'No generic medicines available.'}
                </p>
              )}
              {medicines.length > 0 && (
                <p className="mt-4 text-sm text-gray-500 italic text-center">
                  Medicine information provided by Google Gemini. Click on a medicine for more details and nearby shops.
                </p>
              )}
            </>
          )}
        </>
      ) : (
        // Display selected medicine details and nearby shops
        <div>
          <button
            onClick={handleBackToSearch}
            className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center transition duration-150 ease-in-out"
            aria-label="Back to medicine search results"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Search
          </button>

          <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200 mb-8">
            <h3 className="font-bold text-2xl text-blue-800 mb-3">{selectedMedicine.name}</h3>
            <div className="space-y-3 text-base text-gray-700">
              <div>
                <span className="font-semibold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12H9m6.75 0H12m-2.25 0H10" />
                  </svg>
                  Uses:
                </span> {selectedMedicine.uses}
              </div>
              <div>
                <span className="font-semibold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 inline-block text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.174 3.35 1.9 3.35h13.713c1.726 0 2.764-1.85 1.9-3.35L13.737 2.803a1.75 1.75 0 00-2.234 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  Side Effects:
                </span> {selectedMedicine.sideEffects}
              </div>
              <div>
                <span className="font-semibold text-gray-900">Generic Brands:</span>{' '}
                {selectedMedicine.genericBrands.length > 0 ? selectedMedicine.genericBrands.join(', ') : 'N/A'}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              Medicine information provided by Google Gemini.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Nearby Medical Shops (where this medicine <span className="italic font-bold">might</span> be available)
            </h3>
            <p className="text-sm text-gray-600 mb-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-3" role="alert">
              <span className="font-bold">Disclaimer:</span> Real-time inventory cannot be verified through this application. These are general generic medical shops near your location. Please call ahead or visit to confirm availability.
            </p>

            {shopsLoading && (
              <div className="flex justify-center items-center py-8">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3 text-lg text-gray-600">Finding nearby shops...</span>
              </div>
            )}

            {!shopsLoading && nearbyShops.length > 0 ? (
              <ul className="space-y-4">
                {nearbyShops.map((shop, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                    <h4 className="font-bold text-lg text-blue-600">{shop.name}</h4>
                    <p className="text-gray-700 text-sm mt-1">{shop.address}</p>
                    {shop.distance !== undefined && (
                      <p className="text-gray-700 text-sm mt-1">
                        <span className="font-semibold">Distance:</span> {shop.distance.toFixed(2)} km
                      </p>
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
            ) : (
              !shopsLoading && <p className="mt-4 text-gray-600 text-center">No nearby generic medical shops found.</p>
            )}
            <p className="mt-4 text-sm text-gray-500 italic text-center">
              Shop locations provided by Google Maps grounding via Google Gemini.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericMedicineSearch;