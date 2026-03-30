import React from 'react';
import { MapView } from './components/MapView';
import { VendingMachineDetails } from './components/VendingMachineDetails';
import { Paywall } from './components/Paywall';
import { SearchBar } from './components/SearchBar';
import { ReportMachineModal } from './components/ReportMachineModal';
import { DonationModal } from './components/DonationModal';
import { SmokeOverlay, SmokePuff } from './components/SmokeEffects';
import { VendingMachine } from './data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Heart } from 'lucide-react';

export default function App() {
  const [selectedMachine, setSelectedMachine] = React.useState<VendingMachine | null>(null);
  const [searchLocation, setSearchLocation] = React.useState<[number, number] | null>(null);
  const [isPro, setIsPro] = React.useState(() => {
    return localStorage.getItem('fluppe_pro') === 'true';
  });
  const [isPaywallOpen, setIsPaywallOpen] = React.useState(false);
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const [isDonationOpen, setIsDonationOpen] = React.useState(false);
  const [puffs, setPuffs] = React.useState<{ id: number, x: number, y: number }[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('fluppe_pro', isPro.toString());
  }, [isPro]);

  const handleSelectMachine = (machine: VendingMachine) => {
    setSelectedMachine(machine);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      // Use Nominatim for geocoding (OpenStreetMap)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSearchLocation([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpgrade = () => {
    // Simulate purchase
    setIsPro(true);
    setIsPaywallOpen(false);
  };

  const handleInteraction = (e: React.MouseEvent) => {
    const newPuff = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setPuffs(prev => [...prev, newPuff]);
  };

  const removePuff = (id: number) => {
    setPuffs(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-app-bg select-none"
      onClick={handleInteraction}
    >
      {/* Background Smoke Animation */}
      <SmokeOverlay />

      {/* Main Map View */}
      <MapView onSelectMachine={handleSelectMachine} searchLocation={searchLocation} />

      {/* Floating Header & Search */}
      <div className="absolute top-6 left-6 right-6 z-30 flex flex-col gap-4 pointer-events-none">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg pointer-events-auto flex items-center gap-4"
          >
            <h1 className="text-2xl font-black text-marlboro-red tracking-tighter italic">FLUPPE</h1>
            <div className="w-px h-6 bg-gray-200" />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsDonationOpen(true);
              }}
              className="text-gray-400 hover:text-marlboro-red transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
          </motion.div>

          {!isPro && (
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsPaywallOpen(true);
              }}
              className="bg-marlboro-red text-white px-4 py-2 rounded-xl shadow-lg font-bold text-sm pointer-events-auto active:scale-95 transition-transform"
            >
              PRO HOLEN
            </motion.button>
          )}
        </div>

        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-40 right-6 z-30 flex flex-col gap-4 pointer-events-none">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsReportOpen(true);
          }}
          className="p-4 bg-marlboro-red text-white rounded-2xl shadow-xl pointer-events-auto active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Interaction Feedback (Smoke Puffs) */}
      <AnimatePresence>
        {puffs.map(puff => (
          <SmokePuff 
            key={puff.id} 
            x={puff.x} 
            y={puff.y} 
            onComplete={() => removePuff(puff.id)} 
          />
        ))}
      </AnimatePresence>

      {/* Vending Machine Details Bottom Sheet */}
      <VendingMachineDetails 
        machine={selectedMachine}
        isPro={isPro}
        onClose={() => setSelectedMachine(null)}
        onOpenPaywall={() => setIsPaywallOpen(true)}
      />

      {/* Modals */}
      <Paywall 
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        onUpgrade={handleUpgrade}
      />

      <ReportMachineModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <DonationModal 
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Footer Disclaimer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          Tabakkonsum ist gesundheitsschädlich.
        </p>
      </div>

      {/* Loading Indicator for Search */}
      {isSearching && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-marlboro-red border-t-transparent rounded-full animate-spin" />
          <span className="font-bold text-gray-900">Suche läuft...</span>
        </div>
      )}
    </div>
  );
}
