import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { MOCK_MACHINES, VendingMachine } from '../data/mockData';
import { CigaretteIcon } from '../lib/leaflet-icons';
import { LocateFixed } from 'lucide-react';

interface MapViewProps {
  onSelectMachine: (machine: VendingMachine) => void;
  searchLocation: [number, number] | null;
}

const MapController: React.FC<{ searchLocation: [number, number] | null }> = ({ searchLocation }) => {
  const map = useMap();

  React.useEffect(() => {
    if (searchLocation) {
      map.flyTo(searchLocation, 14);
    }
  }, [searchLocation, map]);

  return null;
};

const RecenterButton: React.FC = () => {
  const map = useMap();
  
  const handleLocate = () => {
    map.locate().on('locationfound', (e) => {
      map.flyTo(e.latlng, 15);
    });
  };

  return (
    <button
      onClick={handleLocate}
      className="absolute bottom-24 right-6 z-[400] p-4 bg-white rounded-2xl shadow-xl hover:bg-gray-50 transition-all active:scale-95 text-marlboro-red"
    >
      <LocateFixed className="w-6 h-6" />
    </button>
  );
};

export const MapView: React.FC<MapViewProps> = ({ onSelectMachine, searchLocation }) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={[52.5200, 13.4050]} 
        zoom={13} 
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController searchLocation={searchLocation} />
        {MOCK_MACHINES.map((machine) => (
          <Marker 
            key={machine.id} 
            position={[machine.lat, machine.lng]} 
            icon={CigaretteIcon}
            eventHandlers={{
              click: () => onSelectMachine(machine),
            }}
          />
        ))}
        <RecenterButton />
      </MapContainer>
    </div>
  );
};
