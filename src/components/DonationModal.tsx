import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Coffee, Beer, Zap } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
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
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-8 text-center"
          >
            <div className="flex justify-end mb-2">
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-marlboro-red fill-marlboro-red" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Support den Developer</h2>
            <p className="text-gray-500 mb-8">
              Fluppe ist ein One-Man-Projekt. Jeder Euro fließt direkt in die Veröffentlichung meiner nächsten App-Ideen. Supporte die Vision!
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Coffee, label: 'Kaffee', price: '2€' },
                { icon: Beer, label: 'Bier', price: '5€' },
                { icon: Zap, label: 'Support', price: '10€' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    window.open('https://www.paypal.com/paypalme/kensenich68', '_blank');
                    onClose();
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-marlboro-red transition-colors group"
                >
                  <item.icon className="w-6 h-6 text-gray-400 group-hover:text-marlboro-red" />
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-sm font-black text-gray-900">{item.price}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                window.open('https://www.paypal.com/paypalme/kensenich68', '_blank');
                onClose();
              }}
              className="w-full bg-marlboro-red hover:bg-marlboro-dark text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              Spenden via PayPal (@kensenich68)
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
