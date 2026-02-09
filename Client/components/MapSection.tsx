import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; //Side-effect import
import L from "leaflet";
import { useEffect } from "react";

// Fix marker icons (Leaflet bug in React)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function LocationMarker() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 15);

      // Add current location marker
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("📍 You are here!")
        .openPopup();

      // Example nearby stores
      const stores = [
        { name: "Generic Store 1", lat: latitude + 0.0015, lon: longitude + 0.001 },
        { name: "Generic Store 2", lat: latitude - 0.001, lon: longitude - 0.0015 },
      ];

      stores.forEach((store) => {
        L.marker([store.lat, store.lon])
          .addTo(map)
          .bindPopup(`<b>${store.name}</b><br>Nearby Store`);
      });
    });
  }, [map]);

  return null;
}

export default function MapSection() {
  return (
    <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
      <MapContainer
        center={[20.5937, 78.9629]} // Default: India center
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
