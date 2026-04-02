import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Briefcase, Landmark, HardHat, Scale, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ActionModal from '@/components/ActionModal';
import { useLanguage } from '@/contexts/LanguageContext';

const founders = [
  {
    id: 1,
    name: "Vamo Soko Sako",
    role: "Co-Founder",
    affiliations: "INSEAD · Sorbonne",
    description: "Vamo brings over two decades of experience in African infrastructure finance and project structuring.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/c72183db1299e73ea083f5d8dffb60ec.png"
  },
  {
    id: 2,
    name: "Dr. Bintu Zahara Sakor",
    role: "Co-Founder & Head of Research",
    affiliations: "Harvard · University of Oslo · PRIO",
    description: "Dr. Sakor leads AIP's research and verification frameworks, drawing on her academic work in conflict-sensitive development.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/00235fbc392bf4383688b609034fc98a.jpg"
  }
];

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us - AIP</title>
        <meta name="description" content="Learn about Africa Infrastructure Partners (AIP), our mission, values, and how we connect global capital to African infrastructure projects." />
      </Helmet>

      <ActionModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title="Join Our Ecosystem" 
        description="Connect with us to explore partnership opportunities."
      />

      <div className="min-h-screen bg-[#0a1628] font-sans selection:bg-[#c9a84c] selection:text-[#0a1628]">
        <Navigation />

        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0a1628] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold font-serif text-white mb-6"
            >
              About <span className="text-[#c9a84c]">us</span>
            </motion.h1>
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              The digital bridge connecting Africa's infrastructure opportunities with global capital
            </motion.p>
          </div>
        </div>

        {/* Who We Are Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#112036]/50 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">Who We Are</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed text-left md:text-center">
                <p>
                  We are an independent investment and advisory platform dedicated to closing Africa's infrastructure delivery gap. We support the development, verification, and financing of high-quality infrastructure projects across the continent, going beyond a marketplace to build a complete ecosystem for delivery.
                </p>
                <p>
                  By leveraging advanced technology, data analytics, and deep industry expertise, we remove the traditional frictions associated with investing in African infrastructure. We equip project owners and sponsors with the tools to become bankable, while providing global investors with a transparent, de-risked pipeline of high-impact opportunities. Our vision is to be a trusted partner in accelerating sustainable infrastructure and unlocking scalable investment across Africa.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a1628]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
                Leadership
              </div>
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
              >
                Our Founders
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              {founders.map((founder) => (
                <motion.div 
                  key={founder.id}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#112036] rounded-2xl border border-white/5 hover:border-[#c9a84c]/30 shadow-xl transition-all duration-500 flex flex-col overflow-hidden group"
                >
                  <div className="relative h-80 w-full overflow-hidden bg-[#1a2b42]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112036] to-transparent z-10 opacity-60"></div>
                    <img 
                      src={founder.photo} 
                      alt={founder.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow relative z-20 -mt-6">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#c9a84c] transition-colors">{founder.name}</h3>
                    <div className="text-[#c9a84c] font-medium mb-3">{founder.role}</div>
                    
                    <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-6 pb-4 border-b border-white/10">
                      {founder.affiliations}
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed flex-grow text-sm mb-6">
                      {founder.description}
                    </p>
                    
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/40 hover:text-[#0A66C2] transition-colors duration-300 mt-auto w-fit"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm font-medium">Connect on LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Stand For Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112036]/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-serif font-bold text-white mb-16 text-center"
            >
              What We Stand For
            </motion.h2>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerStagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Transparency & Trust",
                  icon: Shield,
                  desc: "We believe that radical transparency is the key to unlocking capital. Our platform provides verifiable data and clear audit trails for every stakeholder."
                },
                {
                  title: "Pan-African Impact",
                  icon: Globe,
                  desc: "We are committed to sustainable development that transcends borders, fostering economic growth and improving quality of life across all 54 nations."
                },
                {
                  title: "Innovation with Purpose",
                  icon: Zap,
                  desc: "We harness technology not for its own sake, but to solve real-world problems—reducing costs, accelerating timelines, and mitigating risks."
                }
              ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeIn}
                  className="bg-[#0a1628] p-8 rounded-xl border border-[#c9a84c]/20 hover:border-[#c9a84c] shadow-lg hover:shadow-2xl hover:shadow-[#c9a84c]/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#c9a84c] transition-colors duration-300">
                    <value.icon className="w-7 h-7 text-[#c9a84c] group-hover:text-[#0a1628] transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-serif">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1628] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">
                How We Work
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                We combine human and machine intelligence. Our proprietary process transforms complex infrastructure deals into standardized, investable assets.
              </p>
              <div className="inline-block p-6 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
                <span className="font-bold text-lg">Outcome:</span> Faster closing times, reduced transaction costs, and successful project delivery.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Partners Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112036]/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-3xl md:text-4xl font-serif font-bold text-white mb-6"
              >
                Our Partners
              </motion.h2>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-gray-400 max-w-2xl mx-auto"
              >
                We collaborate with a world-class ecosystem of public, private and institutional partners to ensure project success from concept to completion.
              </motion.p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerStagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  title: "Public Sector",
                  icon: Landmark,
                  partners: "Governments, PPP Units, State-Owned Enterprises"
                },
                {
                  title: "Capital Partners",
                  icon: Briefcase,
                  partners: "DFIs, Sovereign Wealth Funds, Private Equity, Pension Funds"
                },
                {
                  title: "Technical Partners",
                  icon: HardHat,
                  partners: "EPC Contractors, Engineering Firms, Environmental Consultants"
                },
                {
                  title: "Advisory Partners",
                  icon: Scale,
                  partners: "Legal Firms, Transaction Advisors, Tax Consultants"
                }
              ].map((partner, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeIn}
                  className="bg-[#0a1628] p-6 rounded-xl border-l-4 border-[#c9a84c] hover:bg-[#112036] transition-all duration-300 shadow-md"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <partner.icon className="w-6 h-6 text-[#c9a84c]" />
                    <h3 className="text-lg font-bold text-white">{partner.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {partner.partners}
                  </p>
                </motion.div>
              ))}
              
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="mt-12 flex justify-center"
            >
                <Button 
                   onClick={() => setModalOpen(true)}
                   className="bg-[#c9a84c] text-[#0a1628] hover:bg-white font-bold py-6 px-10 text-lg shadow-lg"
                >
                  Join Our Ecosystem
                </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;