import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VendingMachine } from '../data/mockData';
import { X, Copy, Navigation, Star, MessageSquare, AlertCircle, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

interface DetailsProps {
  machine: VendingMachine | null;
  isPro: boolean;
  onClose: () => void;
  onOpenPaywall: () => void;
}

export const VendingMachineDetails: React.FC<DetailsProps> = ({ machine, isPro, onClose, onOpenPaywall }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!machine) return;
    navigator.clipboard.writeText(machine.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNav = () => {
    if (!isPro) {
      onOpenPaywall();
      return;
    }
    if (!machine) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(machine.address)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {machine && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-[32px] shadow-[0_-8px_30px_rgba(0,0,0,0.1)] max-h-[85vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 flex justify-center">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>

          <div className="px-6 pb-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Automat</h2>
                <p className="text-gray-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {machine.address}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-4 px-4 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold text-gray-700 transition-all active:scale-95"
              >
                <Copy className="w-5 h-5" />
                {copied ? 'Kopiert!' : 'Kopieren'}
              </button>
              <button
                onClick={handleNav}
                className={cn(
                  "flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-semibold transition-all active:scale-95",
                  isPro ? "bg-marlboro-red text-white shadow-lg shadow-red-100" : "bg-gray-100 text-gray-400"
                )}
              >
                <Navigation className="w-5 h-5" />
                Navigation
                {!isPro && <Lock className="w-4 h-4" />}
              </button>
            </div>

            {/* Pro Features Section */}
            <div className="space-y-6">
              {/* Status & Report */}
              <section className="relative">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Status</h3>
                  {isPro && (
                    <button className="text-xs font-bold text-marlboro-red hover:underline">
                      Defekt melden
                    </button>
                  )}
                </div>
                <div className={cn("flex items-center gap-3", !isPro && "pro-blur")}>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    machine.status === 'functional' ? "bg-green-500" : "bg-red-500"
                  )} />
                  <span className="font-medium text-gray-800">
                    {machine.status === 'functional' ? 'Funktionsfähig' : 'Defekt gemeldet'}
                  </span>
                </div>
                {!isPro && <ProOverlay onClick={onOpenPaywall} />}
              </section>

              {/* Rating */}
              <section className="relative">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Bewertung</h3>
                  {isPro && (
                    <button className="text-xs font-bold text-marlboro-red hover:underline">
                      Bewerten
                    </button>
                  )}
                </div>
                <div className={cn("flex items-center gap-1", !isPro && "pro-blur")}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={cn(
                        "w-5 h-5", 
                        s <= Math.round(machine.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                      )} 
                    />
                  ))}
                  <span className="ml-2 font-bold text-gray-900">{machine.rating.toFixed(1)}</span>
                </div>
                {!isPro && <ProOverlay onClick={onOpenPaywall} />}
              </section>

              {/* Comments */}
              <section className="relative">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Kommentare</h3>
                  {isPro && (
                    <button className="text-xs font-bold text-marlboro-red hover:underline">
                      Schreiben
                    </button>
                  )}
                </div>
                <div className={cn("space-y-4", !isPro && "pro-blur")}>
                  {machine.comments.length > 0 ? (
                    machine.comments.map((c) => (
                      <div key={c.id} className="bg-gray-50 p-4 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-gray-900">{c.user}</span>
                          <span className="text-xs text-gray-400">{c.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">Noch keine Kommentare.</p>
                  )}
                </div>
                {!isPro && <ProOverlay onClick={onOpenPaywall} />}
              </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProOverlay: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div 
    onClick={onClick}
    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer group"
  >
    <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm group-hover:scale-105 transition-transform flex items-center gap-2">
      <Lock className="w-4 h-4 text-marlboro-red" />
      <span className="text-xs font-bold text-gray-900">Nur in Pro verfügbar</span>
    </div>
  </div>
);
