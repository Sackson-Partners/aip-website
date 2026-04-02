import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, TrendingUp, ShieldAlert, Globe, 
  CheckSquare, FileSearch, LineChart, Lightbulb, ArrowRight 
} from 'lucide-react';

const ServicesHub = () => {
  const [filter, setFilter] = useState('All');

  const services = [
    {
      id: 1,
      title: "Project Structuring",
      icon: Briefcase,
      desc: "Expert advisory on legal, financial, and operational structuring to meet international investment standards.",
      benefits: ["Optimize capital structure", "Legal entity formation", "Governance framework"],
      category: "Developer"
    },
    {
      id: 2,
      title: "Financial Modeling",
      icon: LineChart,
      desc: "Robust financial models including sensitivity analysis, ROI projections, and cash flow forecasting.",
      benefits: ["5-10 year projections", "Scenario analysis", "Valuation services"],
      category: "Developer"
    },
    {
      id: 3,
      title: "Risk Assessment",
      icon: ShieldAlert,
      desc: "Comprehensive identification and mitigation strategies for political, currency, and operational risks.",
      benefits: ["Risk matrix development", "Mitigation strategies", "Insurance advisory"],
      category: "Both"
    },
    {
      id: 4,
      title: "Market Analysis",
      icon: Globe,
      desc: "Deep-dive research into local market dynamics, demand forecasting, and competitive landscape.",
      benefits: ["Demand/Supply studies", "Competitor analysis", "Regulatory review"],
      category: "Investor"
    },
    {
      id: 5,
      title: "Investor Readiness",
      icon: CheckSquare,
      desc: "Preparing project documentation and data rooms to withstand institutional due diligence.",
      benefits: ["Data room management", "Pitch deck refinement", "Gap analysis"],
      category: "Developer"
    },
    {
      id: 6,
      title: "Due Diligence Support",
      icon: FileSearch,
      desc: "Independent verification of project claims, technical feasibility, and compliance status.",
      benefits: ["Technical audits", "Legal compliance", "ESG assessment"],
      category: "Investor"
    },
    {
      id: 7,
      title: "Bankability Scoring",
      icon: TrendingUp,
      desc: "Proprietary scoring mechanism to assess the likelihood of securing debt and equity financing.",
      benefits: ["Standardized score", "Improvement roadmap", "Lender alignment"],
      category: "Developer"
    },
    {
      id: 8,
      title: "Sector Intelligence",
      icon: Lightbulb,
      desc: "Real-time insights and trend analysis for key infrastructure sectors across Africa.",
      benefits: ["Emerging trends", "Policy updates", "Investment flows"],
      category: "Investor"
    }
  ];

  const filteredServices = filter === 'All' 
    ? services 
    : services.filter(s => s.category === filter || s.category === 'Both');

  return (
    <>
      <Helmet>
        <title>Advisory Services - AIP</title>
        <meta name="description" content="Expert advisory services for infrastructure development and investment." />
      </Helmet>

      <div className="relative min-h-screen bg-primary overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center mb-16 pt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Advisory & Services Hub
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Accelerate your success with our suite of specialized services designed to bridge the gap between ambition and execution.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-12">
            <div className="bg-secondary/50 p-1 rounded-xl border border-white/10 flex gap-2">
              {['All', 'Developer', 'Investor'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === cat 
                      ? 'bg-accent text-primary font-bold shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat} Services
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-secondary rounded-xl border border-white/5 p-6 hover:border-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-primary rounded-lg border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                  <service.icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-400 mb-6 flex-grow">
                  {service.desc}
                </p>

                <div className="mb-6 space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-white/5 hover:bg-accent hover:text-primary text-white border border-white/10 transition-all">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <section className="mt-24 bg-secondary/30 rounded-3xl p-12 text-center border border-white/5">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to accelerate your infrastructure goals?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Partner with AIP to de-risk, structure, and finance your next major project across the continent.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-accent text-primary hover:bg-white font-bold text-lg px-8 py-6 rounded-lg transition-all shadow-lg">
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              {/* Task 2: 'Request a Consultation' button is intentionally hidden from this specific section */}
              <Button className="hidden">
                Request a Consultation
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesHub;