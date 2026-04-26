import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Briefcase, Landmark, HardHat, Scale, CheckCircle, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ActionModal from '@/components/ActionModal';

const founders = [
  {
    id: 1,
    role: "Co-Founder & Chief Executive Officer",
    affiliations: "INSEAD · Sorbonne",
    description: "Over two decades of experience in African infrastructure finance and project structuring. Has advised governments, DFIs, and private sponsors across the energy, transport, and digital sectors, closing deals totalling over $2 billion across sub-Saharan Africa.",
    photo: "/founder-1.png"
  },
  {
    id: 2,
    role: "Co-Founder & Head of Research",
    affiliations: "Harvard · University of Oslo · PRIO",
    description: "Leads AIP's research and verification frameworks, drawing on academic work in conflict-sensitive development and political economy across fragile states. The proprietary PETFEL methodology combines AI-driven risk assessment with deep field knowledge.",
    photo: "/founder-2.jpg"
  }
];

const leadershipTeam = [
  { initials: "CIO", role: "Chief Investment Officer" },
  { initials: "CP", role: "Chief of Products" },
  { initials: "DPS", role: "Director, Project Structuring" },
  { initials: "APS", role: "Analyst, Project Structuring & Data" },
  { initials: "ADD", role: "Analyst, Due Diligence" },
  { initials: "MS", role: "Marketing & Sales" },
  { initials: "HPP", role: "Head of Public & Private Partnership" },
  { initials: "HCE", role: "Head of Communication & Events" },
];

const activeCountries = [
  { name: "Guinea", flag: "🇬🇳" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Côte d'Ivoire", flag: "🇨🇮" },
  { name: "Liberia", flag: "🇱🇷" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Guinea-Bissau", flag: "🇬🇼" },
  { name: "Niger", flag: "🇳🇪" },
];

const comingSoonCountries = [
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Burkina Faso", flag: "🇧🇫" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "DRC", flag: "🇨🇩" },
  { name: "Tanzania", flag: "🇹🇿" },
  { name: "Ethiopia", flag: "🇪🇹" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Rwanda", flag: "🇷🇼" },
  { name: "Botswana", flag: "🇧🇼" },
];

const stats = [
  { value: "$300M+", label: "Projects Listed" },
  { value: "8", label: "Countries Covered" },
  { value: "100+", label: "Global Investors" },
  { value: "70%", label: "Faster Time to Investment" },
];

const AboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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

      <div className="min-h-screen bg-[#0b1628] font-sans text-[#8b9ab0] selection:bg-[#c9a84c] selection:text-[#0b1628]">
        <Navigation />

        {/* Hero */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-6 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              About Us
            </div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-5xl md:text-7xl font-bold font-serif text-[#f8f8f5] mb-6 leading-tight"
            >
              The digital bridge connecting<br />
              <em className="text-[#c9a84c] not-italic">Africa's infrastructure</em><br />
              with global capital
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-lg text-[#b0bfd4] max-w-2xl mx-auto leading-relaxed"
            >
              An independent investment and advisory platform dedicated to closing Africa's infrastructure delivery gap — built with institutional-grade rigour and AI-first intelligence.
            </motion.p>
          </div>
        </div>

        {/* Who We Are — split layout */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111e38]/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <div className="text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4">Who We Are</div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-6 leading-tight">
                  Beyond a marketplace — a complete ecosystem for delivery
                </h2>
                <p className="text-[#b0bfd4] leading-relaxed mb-5 text-base">
                  We are an independent investment and advisory platform dedicated to closing Africa's infrastructure delivery gap. We support the development, verification, and financing of high-quality infrastructure projects across the continent, going beyond a marketplace to build a complete ecosystem for delivery.
                </p>
                <p className="text-[#b0bfd4] leading-relaxed text-base">
                  By leveraging advanced technology, data analytics, and deep industry expertise, we remove the traditional frictions associated with investing in African infrastructure — equipping project owners with the tools to become bankable, while providing global investors with a transparent, de-risked pipeline of high-impact opportunities.
                </p>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx} variants={fadeIn}
                    className="bg-[#192341] border border-white/8 rounded-2xl p-8 text-center hover:border-[#c9a84c]/30 transition-colors"
                  >
                    <div className="text-4xl font-serif font-bold text-[#c9a84c] mb-2">{stat.value}</div>
                    <div className="text-sm text-[#8b9ab0]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values — 3-column numbered grid */}
        <section className="border-y border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Transparency & Trust",
                body: "We believe that radical transparency is the key to unlocking capital. Our platform provides verifiable data and clear audit trails for every stakeholder in the value chain."
              },
              {
                num: "02",
                title: "Pan-African Impact",
                body: "We are committed to sustainable development that transcends borders, fostering economic growth and improving quality of life across our active markets on the continent."
              },
              {
                num: "03",
                title: "Innovation with Purpose",
                body: "We harness technology not for its own sake, but to solve real-world problems — reducing costs, accelerating timelines, and mitigating risks for infrastructure delivery."
              }
            ].map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`bg-[#192341] px-10 py-12 ${idx < 2 ? 'md:border-r border-white/8' : ''} border-b border-white/8 md:border-b-0`}
              >
                <div className="text-7xl font-serif font-bold text-[#c9a84c]/8 leading-none mb-2">{v.num}</div>
                <h3 className="text-xl font-serif font-semibold text-[#f8f8f5] mb-3">{v.title}</h3>
                <p className="text-sm text-[#8b9ab0] leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b1628]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
                Leadership
              </div>
              <motion.h2
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-3xl md:text-5xl font-serif font-bold text-[#f8f8f5]"
              >
                Our Founders
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder) => (
                <motion.div
                  key={founder.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                  className="bg-[#192341] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c9a84c]/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="h-80 overflow-hidden bg-[#111e38]">
                    <img
                      src={founder.photo}
                      alt={founder.role}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: 'grayscale(20%)' }}
                      onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                      onMouseOut={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-[#c9a84c] font-medium text-base mb-1">{founder.role}</div>
                    <div className="text-xs text-[#8b9ab0] uppercase tracking-widest mb-4 pb-4 border-b border-white/10">
                      {founder.affiliations}
                    </div>
                    <p className="text-sm text-[#b0bfd4] leading-relaxed">{founder.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111e38]/30 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
                Management Team
              </div>
              <motion.h2
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-3"
              >
                Our Leadership Team
              </motion.h2>
              <p className="text-[#8b9ab0] max-w-xl mx-auto">Seasoned professionals combining deep African market knowledge with global institutional expertise.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {leadershipTeam.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.07, duration: 0.5 }}
                  className="bg-[#192341] border border-white/8 rounded-xl p-6 text-center hover:border-[#c9a84c]/30 hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#111e38] border-2 border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#c9a84c] transition-colors">
                    <span className="font-serif text-xl font-semibold text-[#c9a84c]">{member.initials}</span>
                  </div>
                  <div className="text-xs text-[#c9a84c] font-medium leading-tight">{member.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors — Coming Soon */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b1628]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              Governance
            </div>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-4"
            >
              Board of Directors
            </motion.h2>
            <p className="text-[#8b9ab0] mb-10">Distinguished leaders from global finance, development, and public policy providing strategic oversight.</p>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="inline-flex items-center gap-4 bg-[#192341] border border-[#c9a84c]/20 rounded-2xl px-12 py-10"
            >
              <Clock className="w-7 h-7 text-[#c9a84c]" />
              <span className="text-[#b0bfd4] text-lg font-medium">Announcement Coming Soon</span>
            </motion.div>
          </div>
        </section>

        {/* Country Partners */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111e38]/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
                Pan-African Network
              </div>
              <motion.h2
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-4"
              >
                Country Partners
              </motion.h2>
              <motion.p
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-[#8b9ab0] max-w-xl mx-auto"
              >
                Actively operating in 8 active partner countries, with expansion across Sub-Saharan Africa underway.
              </motion.p>
            </div>

            {/* Active countries — 4-col grid */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <h3 className="text-[#f8f8f5] font-semibold">Active Partners</h3>
                <span className="ml-auto text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-2 py-0.5 rounded-full font-semibold">
                  {activeCountries.length} Countries
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {activeCountries.map((country) => (
                  <div key={country.name} className="bg-[#192341] border border-white/8 rounded-xl px-6 py-5 hover:border-[#c9a84c]/30 transition-colors">
                    <div className="text-3xl mb-2">{country.flag}</div>
                    <div className="font-serif text-base font-semibold text-[#f8f8f5] mb-1">{country.name}</div>
                    <div className="text-xs text-[#c9a84c] uppercase tracking-widest font-medium">● Active Partner</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coming soon countries */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
                <h3 className="text-[#f8f8f5] font-semibold">Coming Soon</h3>
                <span className="ml-auto text-xs bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 px-2 py-0.5 rounded-full font-semibold">
                  {comingSoonCountries.length} Countries
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {comingSoonCountries.map((country) => (
                  <div key={country.name} className="bg-[#192341]/50 border border-white/5 rounded-xl px-6 py-5 opacity-55 hover:opacity-70 transition-opacity">
                    <div className="text-3xl mb-2">{country.flag}</div>
                    <div className="font-serif text-base font-semibold text-[#f8f8f5] mb-1">{country.name}</div>
                    <div className="text-xs text-[#8b9ab0] uppercase tracking-widest">● Coming Soon</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Partners */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b1628]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <motion.h2
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-4"
              >
                Our Partners
              </motion.h2>
              <motion.p
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="text-[#8b9ab0] max-w-xl mx-auto"
              >
                We collaborate with a world-class ecosystem of public, private and institutional partners to ensure project success from concept to completion.
              </motion.p>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerStagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
            >
              {[
                { title: "Public Sector", icon: Landmark, partners: "Governments, PPP Units, State-Owned Enterprises, and Investment Promotion Agencies across our 8 active African markets." },
                { title: "Capital Partners", icon: Briefcase, partners: "DFIs, Sovereign Wealth Funds, Private Equity Funds, Pension Funds, and Impact Investors seeking African infrastructure exposure." },
                { title: "Technical Partners", icon: HardHat, partners: "EPC Contractors, Engineering Firms, Environmental Consultants, and Project Management companies operating across the continent." },
                { title: "Advisory Partners", icon: Scale, partners: "Legal Firms, Transaction Advisors, Tax Consultants, and Regulatory Specialists ensuring compliance and deal integrity." }
              ].map((partner, idx) => (
                <motion.div
                  key={idx} variants={fadeIn}
                  className="bg-[#0b1628] p-6 rounded-xl border-l-4 border-[#c9a84c] hover:bg-[#192341] transition-all duration-300 shadow-md"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <partner.icon className="w-6 h-6 text-[#c9a84c]" />
                    <h3 className="text-lg font-bold text-[#f8f8f5]">{partner.title}</h3>
                  </div>
                  <p className="text-sm text-[#8b9ab0]">{partner.partners}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12 flex justify-center">
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-[#c9a84c] text-[#0b1628] hover:bg-[#e0c07a] font-bold py-6 px-10 text-lg shadow-lg transition-all duration-300"
              >
                Join Our Ecosystem
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
