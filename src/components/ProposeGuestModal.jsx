import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useFormModal } from '@/contexts/FormModalContext';

const ProposeGuestModal = () => {
  const { activeModal, closeModal } = useFormModal();
  const isOpen = activeModal === 'guestProposal';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    guestName: '',
    guestBio: '',
    topicSuggestion: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('guest_proposals')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          guest_name: formData.guestName,
          guest_bio: formData.guestBio,
          topic_suggestion: formData.topicSuggestion
        }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to submit proposal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus('idle');
      setFormData({ fullName: '', email: '', guestName: '', guestBio: '', topicSuggestion: '' });
      setErrorMessage('');
    }, 300);
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
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#d4b04c]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#d4b04c]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">Proposal Sent</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for the guest proposal. We'll review it shortly.
                  </p>
                  <Button onClick={handleClose} className="bg-[#d4b04c] text-[#0b0f14] hover:bg-white font-bold w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2 font-serif">Propose a Guest</h2>
                  <p className="text-gray-400 mb-6 text-sm">
                    Suggest an industry leader for our next insights session.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Your Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Guest Name *</label>
                      <input type="text" name="guestName" required value={formData.guestName} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" placeholder="Who should we invite?" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Guest Bio / Background</label>
                      <textarea name="guestBio" rows="3" value={formData.guestBio} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all resize-none" placeholder="Brief details about the guest..." />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Topic Suggestion</label>
                      <textarea name="topicSuggestion" rows="2" value={formData.topicSuggestion} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all resize-none" placeholder="What should they talk about?" />
                    </div>

                    {status === 'error' && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{errorMessage}</div>}

                    <Button type="submit" disabled={loading} className="w-full bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#d4b04c]/10">
                      {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Submitting...</> : "Submit Proposal"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProposeGuestModal;