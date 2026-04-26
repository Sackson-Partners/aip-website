import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Users, PieChart, HardHat,
  Search, FileCheck, Scale, TrendingUp,
  Globe, Landmark, ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
// Note: useFormModal removed as consultation modal is not used on this page

const servicesList = [
  {
    icon: Search,
    title: "Project Intelligence & Pipeline Curation",
    desc: "Proprietary data and verified pipelines to identify high-potential opportunities before they reach the mainstream market.",
    bullets: [
      "Early-stage project scanning",
      "Risk-adjusted filtering",
      "Sector analytics & market mapping",
      "Country risk intelligence"
    ]
  },
  {
    icon: FileCheck,
    title: "Project Preparation & Bankability",
    desc: "Technical assistance to restructure projects and mitigate risks for financing — transforming concepts into investment-grade assets.",
    bullets: [
      "Feasibility review & optimisation",
      "Risk matrix optimisation",
      "Financial modelling & structuring",
      "Executive Investment Note (EIN) generation"
    ],
    featured: true
  },
  {
    icon: Scale,
    title: "PPP & Procurement Advisory",
    desc: "Strategic guidance on structuring transparent and competitive tenders that attract quality bidders and achieve best value.",
    bullets: [
      "Tender documentation",
      "Bid evaluation & scoring",
      "Regulatory compliance",
      "VfM & affordability analysis"
    ]
  },
  {
    icon: TrendingUp,
    title: "Capital Matching & Investor Relations",
    desc: "AI-powered matching connects verified projects with the right capital — DFIs, private equity, sovereign wealth, and pension funds.",
    bullets: [
      "Investor profiling & targeting",
      "Mandate matching engine",
      "Deal room management",
      "Term sheet negotiation support"
    ]
  },
  {
    icon: PieChart,
    title: "PETFEL Due Diligence Engine",
    desc: "Our proprietary AI-powered due diligence framework scores projects across six dimensions: Political, Economic, Technical, Financial, Environmental, and Legal.",
    bullets: [
      "Multi-dimensional risk scoring",
      "Red-flag detection & flagging",
      "Automated verification workflows",
      "Human analyst oversight layer"
    ]
  },
  {
    icon: Globe,
    title: "Market Intelligence & Insights",
    desc: "Real-time data, policy briefs, and executive reports that keep investors and sponsors ahead of opportunities and regulatory changes.",
    bullets: [
      "Country risk dashboards",
      "Pipeline analytics",
      "Monthly investment briefs",
      "Ground Truth Podcast"
    ]
  }
];

const whoWeServe = [
  {
    icon: Building2,
    title: "Governments & PPP Units",
    desc: "Structuring viable tenders and policy frameworks that attract private investment and deliver public outcomes."
  },
  {
    icon: Users,
    title: "Sponsors & Developers",
    desc: "Accelerating project preparation and capital raising — from concept to bankable asset to financial close."
  },
  {
    icon: PieChart,
    title: "Institutional Investors",
    desc: "Accessing de-risked, bankable deal flow with AI-verified due diligence, EIN reports, and full transparency."
  },
  {
    icon: HardHat,
    title: "EPCs & Operators",
    desc: "Connecting with shovel-ready infrastructure projects, tender opportunities, and corridor analysis across our active markets."
  }
];

const ourPartners = [
  {
    icon: Landmark,
    title: "Public Sector",
    body: "Governments, PPP Units, State-Owned Enterprises, and Investment Promotion Agencies across our 8 active African markets."
  },
  {
    icon: TrendingUp,
    title: "Capital Partners",
    body: "DFIs, Sovereign Wealth Funds, Private Equity Funds, Pension Funds, and Impact Investors seeking African infrastructure exposure."
  },
  {
    icon: HardHat,
    title: "Technical Partners",
    body: "EPC Contractors, Engineering Firms, Environmental Consultants, and Project Management companies operating across the continent."
  },
  {
    icon: Scale,
    title: "Advisory Partners",
    body: "Legal Firms, Transaction Advisors, Tax Consultants, and Regulatory Specialists ensuring compliance and deal integrity."
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1628] font-sans text-[#8b9ab0]">
      <Helmet>
        <title>Services | AIP</title>
        <meta name="description" content="AIP Services: Supporting the infrastructure value chain from concept to capital." />
      </Helmet>

      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-6 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
            Our Services
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold font-serif text-[#f8f8f5] mb-6 leading-tight"
          >
            End-to-end support from<br />
            <em className="text-[#c9a84c] not-italic">concept to capital</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#b0bfd4] max-w-2xl mx-auto leading-relaxed"
          >
            We support the entire infrastructure investment lifecycle — from project discovery to deal closure — with cutting-edge technology and deep industry expertise.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.07 }}
                className={`rounded-2xl p-10 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 ${
                  service.featured
                    ? 'bg-gradient-to-br from-[#c9a84c]/7 to-[#c9a84c]/2 border-[#c9a84c]/20'
                    : 'bg-[#192341] border-white/8 hover:border-[#c9a84c]/25'
                }`}
              >
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center text-[#c9a84c] mb-5">
                  <service.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#f8f8f5] mb-3 leading-snug">{service.title}</h3>
                <p className="text-sm text-[#b0bfd4] leading-relaxed mb-5">{service.desc}</p>
                <div className="space-y-2">
                  {service.bullets.map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2 text-sm text-[#b0bfd4]">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c] flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insights Band */}
          <div className="mt-16 bg-[#c9a84c] rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-10 p-12 md:p-14 items-center">
              <div>
                <h3 className="text-3xl font-serif font-semibold text-[#0b1628] mb-3">Partner with AIP Insights</h3>
                <p className="text-[#0b1628] text-base leading-relaxed opacity-75 mb-8">
                  Local insights and knowledge on Africa's infrastructure pipelines to support decision-making. Gain access to exclusive market briefs and expert analysis.
                </p>
                <Button
                  onClick={() => navigate('/insights')}
                  className="bg-[#0b1628] text-white hover:bg-[#192341] font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Access Insights <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-56 h-56 rounded-full border-4 border-[#0b1628]/10 flex flex-col items-center justify-center text-center shadow-xl"
                    style={{ background: '#c9a84c' }}
                  >
                    <span className="text-6xl font-serif font-bold text-[#0b1628] leading-none mb-1">15k+</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-[#0b1628]/70">Subscribers</span>
                  </motion.div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#0b1628]/5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111e38]/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              Who We Serve
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] leading-tight">
              Tailored solutions for every stakeholder<br className="hidden md:block" /> in the infrastructure value chain
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#192341] border border-white/8 rounded-2xl px-7 py-8 text-center hover:border-[#c9a84c]/30 transition-colors"
              >
                <div className="w-14 h-14 bg-[#c9a84c]/8 rounded-full flex items-center justify-center text-[#c9a84c] mx-auto mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#f8f8f5] mb-3">{item.title}</h3>
                <p className="text-sm text-[#8b9ab0] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b1628]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              Our Partners
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-4 leading-tight">
              A world-class ecosystem<br className="hidden md:block" /> of institutional partners
            </h2>
            <p className="text-[#8b9ab0] max-w-xl mx-auto">
              We collaborate with public, private, and institutional partners to ensure project success from concept to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {ourPartners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-[#192341] border border-white/8 rounded-xl p-6 flex gap-5 items-start hover:border-[#c9a84c]/25 transition-colors"
              >
                <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                  <partner.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#f8f8f5] mb-2">{partner.title}</h3>
                  <p className="text-sm text-[#8b9ab0] leading-relaxed">{partner.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate('/contact')}
              className="bg-[#c9a84c] text-[#0b1628] hover:bg-[#e0c07a] font-semibold px-10 py-3 text-base rounded-xl shadow-lg transition-all duration-300"
            >
              Join Our Ecosystem →
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
