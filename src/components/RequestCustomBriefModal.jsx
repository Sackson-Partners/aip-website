import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFormModal } from '@/contexts/FormModalContext';
import RequestCustomBriefForm from '@/components/RequestCustomBriefForm';
import { Button } from '@/components/ui/button';

const RequestCustomBriefModal = () => {
  const { activeModal, closeModal } = useFormModal();
  const isOpen = activeModal === 'customBrief' || activeModal === 'requestCustomBrief'; // Handle both

  const handleClose = () => {
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#0f1620] border border-[#d4b04c]/20 rounded-2xl shadow-2xl shadow-[#d4b04c]/10 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">Request Custom Brief</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Get tailored intelligence for your specific market needs.
              </p>

              <RequestCustomBriefForm onSuccess={handleClose} />

              <div className="mt-4 pt-4 border-t border-white/5 text-center">
                 <Button 
                   variant="ghost" 
                   onClick={handleClose}
                   className="text-sm text-gray-500 hover:text-white"
                 >
                   Cancel
                 </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequestCustomBriefModal;