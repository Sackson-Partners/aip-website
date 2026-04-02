import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Target, Briefcase, Globe, Shield, Zap, Search, HeartHandshake as Handshake, Landmark, HardHat, Scale, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ActionModal from '@/components/ActionModal';
import { useLanguage } from '@/contexts/LanguageContext';

const teamMembers = [
  {
    id: 1,
    name: "Jean-Baptiste Koffi",
    role: "Co-Founder & CEO",
    description: "Former infrastructure advisor at the African Development Bank with over 15 years structuring cross-border projects across Sub-Saharan Africa.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Amina Diallo",
    role: "Co-Founder & COO",
    description: "Infrastructure finance specialist with experience at IFC and leading private equity firms, focused on energy and water projects across West Africa.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emmanuel Asante",
    role: "Head of Technology",
    description: "Technology entrepreneur and software architect who has built data platforms for emerging market financial institutions across Africa and Southeast Asia.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Sophie Marchand",
    role: "Head of Investor Relations",
    description: "Former institutional investor relations lead at a Paris-based DFI, connecting European and North American capital to high-impact African infrastructure.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Ibrahim Touré",
    role: "Head of Project Development",
    description: "Civil engineer and project finance expert who has overseen feasibility studies and technical reviews for over 40 infrastructure projects across Francophone Africa.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Ngozi Okafor",
    role: "Legal & Compliance Director",
    description: "International infrastructure lawyer specializing in PPP frameworks, cross-border transactions, and regulatory compliance across African jurisdictions.",
    linkedin: "https://www.linkedin.com/",
    photo: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&crop=face",
  },
];

const TeamMemberCard = ({ member }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 group">
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#C5A028]/40 transition-all duration-300">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(ev) => {
            ev.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=1a1a1a&color=C5A028&size=200&bold=true';
          }}
        />
      </div>
      <h3 className="text-white font-semibold text-base mb-1 group-hover:text-[#C5A028] transition-colors duration-200">
        {member.name}
      </h3>
      <p className="text-[#C5A028] text-xs font-medium uppercase tracking-wider mb-3">
        {member.role}
      </p>
      <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
        {member.description}
      </p>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-white/40 hover:text-[#0A66C2] transition-colors duration-200 mt-auto"
      >
        <Linkedin className="w-5 h-5" />
        <span className="text-xs font-medium">LinkedIn</span>
      </a>
    </div>
  );
};

const TeamSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block text-xs uppercase tracking-[0.2em] text-[#C5A028] font-semibold mb-4 px-3 py-1 border border-[#C5A028]/30 rounded-full">
            {t?.aip?.team?.title || 'Our Team'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t?.aip?.team?.title || 'Our Team'}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t?.aip?.team?.subtitle || 'Meet the experts behind the Africa Infrastructure Platform.'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

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

      <div className="min-h-screen bg-[#0F1419] font-sans selection:bg-[#D4AF37] selection:text-[#0F1419]">
        <Navigation />

        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0F1419] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold font-serif text-white mb-6"
            >
              About <span className="text-[#D4AF37]">us</span>
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#151a21]/50 border-y border-white/5">
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

        {/* What We Stand For Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1419]">
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
                  className="bg-[#151a21] p-8 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                    <value.icon className="w-7 h-7 text-[#D4AF37] group-hover:text-[#0F1419] transition-colors duration-300" />
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#151a21] relative overflow-hidden">
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
              <div className="inline-block p-6 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                <span className="font-bold text-lg">Outcome:</span> Faster closing times, reduced transaction costs, and successful project delivery.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Partners Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1419]">
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
                  className="bg-[#151a21] p-6 rounded-xl border-l-4 border-[#D4AF37] hover:bg-[#1a2029] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <partner.icon className="w-6 h-6 text-[#D4AF37]" />
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
                   className="bg-[#D4AF37] text-[#0F1419] hover:bg-white font-bold py-6 px-10 text-lg shadow-lg"
                >
                  Join Our Ecosystem
                </Button>
            </motion.div>
          </div>
        </section>

        <TeamSection />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;