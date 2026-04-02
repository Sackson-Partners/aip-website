import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, PieChart, HardHat, Search, FileCheck, Scale, TrendingUp, HeartHandshake as Handshake, Laptop, Mic2, Play, Download, Loader2, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useFormModal } from '@/contexts/FormModalContext';
import styles from './ServicesInsights.module.css';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { openModal } = useFormModal();
  const [episodes, setEpisodes] = useState([]);
  const [loadingPodcast, setLoadingPodcast] = useState(true);
  const [podcastError, setPodcastError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoadingPodcast(true);
        const { data, error } = await supabase
          .from('podcast_episodes')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setEpisodes(data || []);
      } catch (err) {
        console.error('Error fetching episodes:', err);
        setPodcastError('Failed to load recent episodes.');
      } finally {
        setLoadingPodcast(false);
      }
    };
    fetchEpisodes();
  }, []);

  const whoWeServe = [
    {
      title: "Governments & PPP Units",
      icon: <Building2 className="w-8 h-8 text-[#d4b04c]" />,
      desc: "Structuring viable tenders and policy frameworks."
    },
    {
      title: "Sponsors & Developers",
      icon: <Users className="w-8 h-8 text-[#d4b04c]" />,
      desc: "Accelerating project preparation and capital raising."
    },
    {
      title: "Institutional Investors",
      icon: <PieChart className="w-8 h-8 text-[#d4b04c]" />,
      desc: "Accessing de-risked, bankable deal flow."
    },
    {
      title: "EPCs & Operators",
      icon: <HardHat className="w-8 h-8 text-[#d4b04c]" />,
      desc: "Connecting with shovel-ready infrastructure projects."
    }
  ];

  const servicesList = [
    {
      title: "Project Intelligence & Pipeline Curation",
      icon: <Search className="w-6 h-6" />,
      desc: "Proprietary data and verified pipelines to identify high-potential opportunities.",
      bullets: ["Early-stage scanning", "Risk-adjusted filtering", "Sector analytics"]
    },
    {
      title: "Project Preparation & Bankability",
      icon: <FileCheck className="w-6 h-6" />,
      desc: "Technical assistance to restructure projects and mitigate risks for financing.",
      bullets: ["Feasibility review", "Risk matrix optimization", "Financial modeling"]
    },
    {
      title: "PPP & Procurement Advisory",
      icon: <Scale className="w-6 h-6" />,
      desc: "Strategic guidance on structuring transparent and competitive tenders.",
      bullets: ["Tender documentation", "Bid evaluation", "Regulatory compliance"]
    },
    {
      title: "Capital Mobilization & Investor Matching",
      icon: <TrendingUp className="w-6 h-6" />,
      desc: "Connecting verified projects with the right mix of DFI and private capital.",
      bullets: ["Deal structuring", "Investor roadshows", "Blended finance"]
    },
    {
      title: "Transaction Execution Support",
      icon: <Handshake className="w-6 h-6" />,
      desc: "Hands-on support through negotiation, due diligence, and financial close.",
      bullets: ["Term sheet negotiation", "Data room management", "Closing support"]
    },
    {
      title: "Performance Operations & Digital Enablement",
      icon: <Laptop className="w-6 h-6" />,
      desc: "Post-close monitoring tools to ensure assets deliver projected returns.",
      bullets: ["Asset monitoring", "ESG reporting", "Digital twins"]
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Helmet>
        <title>Services | AIP</title>
        <meta name="description" content="AIP Services: Supporting the infrastructure value chain from concept to capital." />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-white ${styles.serifHeading}`}>
            Our <span className={styles.goldText}>Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            End-to-end support for the entire infrastructure value chain, from concept to capital.
          </p>
        </motion.div>
      </section>

      {/* Service Cards (Now First) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`${styles.glassPanel} ${styles.cardHover} ${styles.goldBorderLeft} p-8 rounded-r-xl relative overflow-hidden group`}
            >
              <div className="mb-6 p-3 bg-[#d4b04c]/10 rounded-lg inline-block text-[#d4b04c]">
                {service.icon}
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 ${styles.serifHeading} group-hover:text-[#d4b04c] transition-colors`}>
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-2">
                {service.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4b04c] mt-1.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who We Serve (Now Second) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1620]/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${styles.serifHeading}`}>Who We Serve</h2>
             <p className="text-xl text-white max-w-2xl mx-auto font-medium">Tailored solutions for every stakeholder in the infrastructure value chain</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${styles.glassPanel} p-8 rounded-xl text-center hover:border-[#d4b04c]/30 transition-colors shadow-lg`}
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with AIP Insights Section - Updated with Gold Theme */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="bg-[#C9A23A] rounded-2xl overflow-hidden relative shadow-2xl">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4b04c]/10 to-transparent pointer-events-none" />
             <div className="grid lg:grid-cols-2 gap-12 p-12 items-center relative z-10">
                 <div>
                    <h2 className={`text-4xl font-bold text-[#0F1419] mb-6 ${styles.serifHeading}`}>Partner with AIP Insights</h2>
                    <p className="text-lg text-[#0F1419] mb-8 leading-relaxed font-medium">
                       Local insights and knowledge on Africa's infrastructure pipelines to support decision-making. Gain access to exclusive market briefs and expert analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                       <Button 
                         onClick={() => navigate('/insights')}
                         className="bg-white text-[#0b0f14] hover:bg-gray-50 font-bold px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
                       >
                          Access Insights
                          <ArrowRight className="w-5 h-5 ml-2" />
                       </Button>
                    </div>
                 </div>
                 
                 <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-full border-[3px] border-[#0F1419]/10 flex flex-col items-center justify-center text-center bg-[#C9A23A] shadow-xl relative z-10"
                        >
                          <span className="text-5xl md:text-6xl font-serif font-bold text-[#0F1419] mb-2">15k+</span>
                          <span className="text-sm font-bold tracking-widest uppercase text-[#0F1419]/80">Subscribers</span>
                        </motion.div>
                        {/* Decorative circles */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#0F1419]/5 z-0 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#0F1419]/5 z-0 pointer-events-none" />
                    </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Ready to Accelerate CTA */}
      <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f14] to-[#1a2332] z-0"></div>
          <div className="absolute inset-0 bg-[#d4b04c]/5 mix-blend-overlay z-0"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${styles.serifHeading}`}>
                 Ready to accelerate your <br/> <span className="text-[#d4b04c]">infrastructure goals?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                 Whether you need capital, verified projects, or strategic advisory, our team is ready to assist.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Button 
                   onClick={() => openModal('consultation')}
                   className="bg-[#d4b04c] text-[#0b0f14] hover:bg-white hover:text-[#0b0f14] font-bold text-lg px-8 py-7 rounded-lg shadow-xl shadow-[#d4b04c]/20 transition-all hover:scale-105"
                 >
                    Request a Consultation
                 </Button>
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;