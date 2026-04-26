import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,

  Users,
  Building2,
  Globe2,
  Shield,
  Calendar,
  ChevronDown,
  Loader2,
  Send
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ActionModal from '@/components/ActionModal';
import { supabase } from '@/lib/customSupabaseClient';
import { sendConfirmationEmail } from '@/lib/emailService';

const profiles = [
  "Government / PPP Unit",
  "Sponsor / Developer",
  "Institutional Investor",
  "EPC / Operator",
  "DFI / Development Partner",
  "Other",
];

const subjects = [
  "Project Submission",
  "Investment Opportunity",
  "Partnership Inquiry",
  "Platform Access",
  "Advisory Services",
  "Media / Press",
  "Other",
];

const contactDetails = [
  {
    icon: Users,
    label: "Investor Relations",
    value: "investors@africa-infra.com",
    href: "mailto:investors@africa-infra.com"
  },
  {
    icon: Building2,
    label: "Project Submissions",
    value: "projects@africa-infra.com",
    href: "mailto:projects@africa-infra.com"
  },
  {
    icon: Globe2,
    label: "Partnership & Country Partners",
    value: "partnerships@africa-infra.com",
    href: "mailto:partnerships@africa-infra.com"
  },
  {
    icon: Shield,
    label: "Press & Media",
    value: "press@africa-infra.com",
    href: "mailto:press@africa-infra.com"
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const openModal = (type, title) => {
    setModalConfig({ type, title });
    setModalOpen(true);
  };

  const [selectedProfile, setSelectedProfile] = useState('Government / PPP Unit');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.fullName || !formData.email || !formData.organization || !formData.consent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          user_type: selectedProfile,
          message: formData.message
        }]);

      if (dbError) throw dbError;

      await sendConfirmationEmail({
        email: formData.email,
        name: formData.fullName,
        formType: 'contact'
      });

      toast({
        title: "Message Sent Successfully",
        description: "Confirmation email sent. Our team will review your inquiry and respond shortly.",
        className: "bg-[#0b1628] border-[#c9a84c] text-white"
      });

      setFormData({ fullName: '', email: '', organization: '', phone: '', subject: '', message: '', consent: false });
      setSelectedProfile('Government / PPP Unit');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <>
      <Helmet>
        <title>Contact Us - AFRICA Infrastructure Partners</title>
        <meta name="description" content="Get in touch with AIP for project submissions, platform demos, or partnership opportunities." />
      </Helmet>

      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        formType={modalConfig.type}
      />

      <div className="min-h-screen bg-[#0b1628] font-sans text-[#8b9ab0] selection:bg-[#c9a84c] selection:text-[#0b1628]">
        <Navigation />

        {/* Hero */}
        <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-6 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              Contact
            </div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-5xl md:text-7xl font-bold font-serif text-[#f8f8f5] mb-4 leading-tight"
            >
              How can we <em className="text-[#c9a84c] not-italic">help?</em>
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-lg text-[#b0bfd4] leading-relaxed"
            >
              Tell us about your organisation and what you're looking for. Our team typically responds within 24 hours.
            </motion.p>
          </div>
        </div>

        {/* 3 Info Cards */}
        <div className="bg-[#111e38] border-b border-white/8 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Mail, value: "info@africa-infra.com", label: "General Enquiries", href: "mailto:info@africa-infra.com" },
                { icon: Phone, value: "+221 77 486 79 27", label: "Call Our Team", href: "tel:+221774867927" },
                { icon: MapPin, value: "Routes des Almadies", label: "Dakar, Senegal", href: null },
              ].map((card, idx) => (
                <div key={idx} className="bg-[#192341] border border-white/8 rounded-2xl p-8 text-center hover:border-[#c9a84c]/30 transition-colors">
                  <card.icon className="w-7 h-7 text-[#c9a84c] mx-auto mb-4" />
                  {card.href ? (
                    <a href={card.href} className="font-serif text-base font-semibold text-[#f8f8f5] hover:text-[#c9a84c] transition-colors block mb-1">
                      {card.value}
                    </a>
                  ) : (
                    <div className="font-serif text-base font-semibold text-[#f8f8f5] mb-1">{card.value}</div>
                  )}
                  <div className="text-xs text-[#8b9ab0]">{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Contact Section: 2-col layout */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left: Info */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#f8f8f5] leading-tight mb-4">
                  Let's build Africa's infrastructure{' '}
                  <em className="text-[#c9a84c] not-italic">together.</em>
                </h2>
                <p className="text-base text-[#b0bfd4] leading-relaxed mb-12">
                  Whether you need capital, verified projects, strategic advisory, or partnership opportunities — our team is ready to assist. We serve governments, investors, sponsors, EPCs, and development partners across our 8 active African markets.
                </p>

                <div className="space-y-7">
                  {contactDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                        <detail.icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8b9ab0] mb-1">{detail.label}</div>
                        <a href={detail.href} className="text-[#c9a84c] text-sm hover:underline">{detail.value}</a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Response badge */}
                <div className="mt-10 flex items-center gap-3 p-5 bg-[#c9a84c]/6 border border-[#c9a84c]/18 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
                  <div>
                    <div className="text-sm font-medium text-[#f8f8f5]">Response within 24 hours</div>
                    <div className="text-xs text-[#8b9ab0]">Our partnerships team is online Mon–Fri, 8am–6pm WAT</div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className="bg-[#192341] border border-white/8 rounded-2xl p-10 md:p-12">
                  <h3 className="text-2xl font-serif font-semibold text-[#f8f8f5] mb-1">Send us a message</h3>
                  <p className="text-sm text-[#8b9ab0] mb-8">Fill in the details below and we'll be in touch shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Full Name <span className="text-[#c9a84c]">*</span></label>
                        <input
                          type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                          placeholder="John Doe" required disabled={isSubmitting}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] placeholder:text-[#8b9ab0] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Email Address <span className="text-[#c9a84c]">*</span></label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          placeholder="john@company.com" required disabled={isSubmitting}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] placeholder:text-[#8b9ab0] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Organisation <span className="text-[#c9a84c]">*</span></label>
                        <input
                          type="text" name="organization" value={formData.organization} onChange={handleInputChange}
                          placeholder="Company Name" required disabled={isSubmitting}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] placeholder:text-[#8b9ab0] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Phone</label>
                        <input
                          type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                          placeholder="+1 234 567 890" disabled={isSubmitting}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] placeholder:text-[#8b9ab0] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all"
                        />
                      </div>
                    </div>

                    {/* Profile selector */}
                    <div>
                      <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">I am a… <span className="text-[#c9a84c]">*</span></label>
                      <div className="grid grid-cols-2 gap-2">
                        {profiles.map((p) => (
                          <button
                            key={p} type="button"
                            onClick={() => setSelectedProfile(p)}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm text-left transition-all duration-150 border ${
                              selectedProfile === p
                                ? 'bg-[#c9a84c]/8 border-[#c9a84c]/30 text-[#f8f8f5]'
                                : 'bg-white/3 border-white/8 text-[#b0bfd4] hover:border-[#c9a84c]/20 hover:text-[#f8f8f5]'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${selectedProfile === p ? 'bg-[#c9a84c]' : 'bg-white/20'}`} />
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Subject</label>
                      <div className="relative">
                        <select
                          name="subject" value={formData.subject} onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select a topic</option>
                          {subjects.map(s => <option key={s} value={s} className="bg-[#111e38]">{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b9ab0] pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-[#b0bfd4] mb-2 tracking-wide">Message</label>
                      <textarea
                        name="message" value={formData.message} onChange={handleInputChange}
                        rows={4} disabled={isSubmitting}
                        placeholder="Please provide details about your inquiry, project, or how we can help…"
                        className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-[#f8f8f5] placeholder:text-[#8b9ab0] outline-none focus:border-[#c9a84c] focus:bg-[#c9a84c]/4 transition-all resize-none"
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox" id="consent" name="consent"
                        checked={formData.consent} onChange={handleInputChange}
                        required disabled={isSubmitting}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#c9a84c] cursor-pointer"
                      />
                      <label htmlFor="consent" className="text-xs text-[#8b9ab0] leading-relaxed cursor-pointer">
                        By submitting, you confirm you are authorised to share this information and agree to be contacted by AIP at info@africa-infra.com regarding your inquiry.
                      </label>
                    </div>

                    <Button
                      type="submit" disabled={isSubmitting}
                      className="w-full bg-[#c9a84c] text-[#0b1628] hover:bg-[#e0c07a] font-semibold py-3.5 text-sm rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Schedule a Call */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="mt-20 bg-[#111e38] border border-white/8 rounded-2xl py-14 px-10 text-center"
            >
              <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#c9a84c]">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-serif font-semibold text-[#f8f8f5] mb-3">Prefer a quick call?</h3>
              <p className="text-[#b0bfd4] text-sm mb-8 max-w-md mx-auto">Schedule a 15-minute introductory call with our partnerships team — no commitment required.</p>
              <Button
                onClick={() => openModal('call', 'Schedule a Call')}
                variant="outline"
                className="border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0b1628] font-semibold px-8 py-3 text-sm rounded-xl transition-all duration-300"
              >
                Schedule a Call →
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
