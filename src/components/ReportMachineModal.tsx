import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Send, Lock } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportMachineModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert('Vielen Dank! Dein gemeldeter Automat wird nun von uns überprüft und nach der Freigabe auf der Karte erscheinen.');
    onClose();
    setAddress('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Automat melden</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-500 mb-6">
              Hast du einen neuen Automaten entdeckt? Gib die Adresse ein und wir fügen ihn nach einer kurzen Prüfung hinzu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Straße, Hausnummer, PLZ, Stadt"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-marlboro-red/20 outline-none text-gray-900 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-marlboro-red hover:bg-marlboro-dark text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Absenden
              </button>
              
              <p className="text-center text-xs text-gray-400">
                Kostenlos für alle Nutzer. Meldungen werden manuell geprüft.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
