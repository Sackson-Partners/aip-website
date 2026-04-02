import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useFormModal } from '@/contexts/FormModalContext';

const RequestConsultationModal = () => {
  const { activeModal, closeModal } = useFormModal();
  const isOpen = activeModal === 'consultation';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    consultationType: 'Strategy',
    message: ''
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
        .from('consultation_requests')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          consultation_type: formData.consultationType,
          message: formData.message
        }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to submit. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus('idle');
      setFormData({ fullName: '', email: '', organization: '', consultationType: 'Strategy', message: '' });
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
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif">Request Sent</h3>
                  <p className="text-gray-400 mb-6">
                    We'll contact you shortly to schedule your consultation.
                  </p>
                  <Button onClick={handleClose} className="bg-[#d4b04c] text-[#0b0f14] hover:bg-white font-bold w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-2 font-serif">Request a Consultation</h2>
                  <p className="text-gray-400 mb-6 text-sm">
                    Expert advisory for your infrastructure projects.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Organization</label>
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Consultation Type</label>
                      <select name="consultationType" value={formData.consultationType} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all">
                        <option value="Strategy">Strategy & Planning</option>
                        <option value="Implementation">Project Implementation</option>
                        <option value="Advisory">Financial Advisory</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Message / Details</label>
                      <textarea name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full bg-[#151a21] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4b04c] focus:outline-none transition-all resize-none" placeholder="Tell us more about your needs..." />
                    </div>

                    {status === 'error' && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{errorMessage}</div>}

                    <Button type="submit" disabled={loading} className="w-full bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#d4b04c]/10">
                      {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...</> : "Submit Request"}
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

export default RequestConsultationModal;