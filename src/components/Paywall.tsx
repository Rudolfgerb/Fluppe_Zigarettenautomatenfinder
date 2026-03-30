import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, Zap, Navigation, MessageSquare, Star, AlertTriangle } from 'lucide-react';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const Paywall: React.FC<PaywallProps> = ({ isOpen, onClose, onUpgrade }) => {
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
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
          >
            {/* Smoke Background for Paywall */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="absolute inset-0 bg-gradient-to-br from-marlboro-red to-transparent" />
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-marlboro-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                <Zap className="w-10 h-10 text-white fill-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fluppe Pro</h2>
              <p className="text-gray-500 mb-8">Schalte das volle Potenzial frei und unterstütze die Community.</p>

              <div className="space-y-4 mb-8 text-left">
                {[
                  { icon: Navigation, text: 'Direkte Navigation starten' },
                  { icon: MessageSquare, text: 'Kommentare lesen & schreiben' },
                  { icon: Star, text: 'Bewertungen sehen & abgeben' },
                  { icon: AlertTriangle, text: 'Defektstatus & Meldungen' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-marlboro-red" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Einmaliger Kauf</div>
                <div className="text-4xl font-black text-gray-900">2,99 €</div>
              </div>

              <button
                onClick={onUpgrade}
                className="w-full bg-marlboro-red hover:bg-marlboro-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Jetzt Pro werden
              </button>
              
              <button className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                Kauf wiederherstellen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
