import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Search, ShieldCheck, BarChart3, Users, Lock, CheckCircle,
  ArrowRight, ArrowLeft, Play, ChevronRight, Building2, TrendingUp,
  Database, Globe, Zap, Clock, Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const steps = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Project Intake",
    subtitle: "Submit & Register Your Project",
    icon: FileText,
    color: "#D4AF37",
    description:
      "Project sponsors upload essential project documents through our secure intake portal. AIP captures key parameters: sector, location, CAPEX size, development stage, and financing structure.",
    features: [
      "Structured project questionnaire",
      "Secure document upload vault",
      "Automated classification & tagging",
      "Immediate intake confirmation",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    simulation: {
      label: "Project Registered",
      fields: [
        { name: "Project Name", value: "Dakar Solar Power Plant" },
        { name: "Sector", value: "Energy (Solar)" },
        { name: "Country", value: "Senegal" },
        { name: "CAPEX", value: "USD 85M" },
        { name: "Stage", value: "Pre-Feasibility" },
      ],
    },
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "AI-Powered Screening",
    subtitle: "Automated Bankability Assessment",
    icon: Search,
    color: "#4F9EF5",
    description:
      "Our proprietary AI engine instantly screens the project against 120+ bankability criteria — regulatory environment, offtake risk, sovereign risk ratings, and sector benchmarks.",
    features: [
      "120+ automated screening criteria",
      "Country & sector risk scoring",
      "Comparable transaction benchmarking",
      "Preliminary bankability score generated",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    simulation: {
      label: "Screening Score",
      fields: [
        { name: "Bankability Score", value: "74 / 100" },
        { name: "Country Risk", value: "B+ (Moderate)" },
        { name: "Offtake Risk", value: "Low (PPA Backed)" },
        { name: "Regulatory", value: "Compliant" },
        { name: "Status", value: "✓ Progressed to DD" },
      ],
    },
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Due Diligence",
    subtitle: "Deep Verification & Risk Analysis",
    icon: ShieldCheck,
    color: "#34D399",
    description:
      "Our analyst team conducts structured due diligence: financial model review, legal document audit, environmental & social assessment, and technical feasibility validation.",
    features: [
      "Financial model stress-testing",
      "Legal & regulatory compliance audit",
      "ESMS / ESG risk assessment",
      "Technical & engineering review",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    simulation: {
      label: "Due Diligence Report",
      fields: [
        { name: "Financial Model", value: "✓ Verified" },
        { name: "Legal Docs", value: "✓ 23 docs reviewed" },
        { name: "ESMS Rating", value: "Category B" },
        { name: "Technical", value: "✓ 3rd party validated" },
        { name: "Red Flags", value: "None" },
      ],
    },
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Project Structuring",
    subtitle: "Financing Architecture & Optimisation",
    icon: BarChart3,
    color: "#A78BFA",
    description:
      "AIP advisors work with the project sponsor to optimise the capital structure — blended finance, mezzanine, equity/debt mix — and prepare investor-grade documentation.",
    features: [
      "Capital structure optimisation",
      "Blended finance & DFI alignment",
      "Information Memorandum (IM) preparation",
      "Financial model packaging",
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    simulation: {
      label: "Capital Structure",
      fields: [
        { name: "Senior Debt", value: "55% — $46.75M" },
        { name: "Mezzanine", value: "15% — $12.75M" },
        { name: "Equity", value: "20% — $17M" },
        { name: "Grant / DFI", value: "10% — $8.5M" },
        { name: "IRR (Equity)", value: "18.4%" },
      ],
    },
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "Investor Matching",
    subtitle: "Targeted Capital Sourcing",
    icon: Users,
    color: "#F59E0B",
    description:
      "Verified projects are matched to AIP's curated investor network — DFIs, pension funds, private equity, and sovereign wealth funds — based on ticket size, sector appetite, and risk profile.",
    features: [
      "Investor preference algorithm",
      "Automated NDA & data room access",
      "Investor communication dashboard",
      "Expression of Interest (EOI) tracking",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    simulation: {
      label: "Investor Matches",
      fields: [
        { name: "Matched Investors", value: "12 qualified" },
        { name: "NDAs Signed", value: "8" },
        { name: "Data Room Views", value: "47 sessions" },
        { name: "EOIs Received", value: "4" },
        { name: "Lead Investor", value: "DFI — $40M" },
      ],
    },
  },
  {
    id: 6,
    phase: "Phase 6",
    title: "Deal Room",
    subtitle: "Secure Negotiation & Transaction Management",
    icon: Lock,
    color: "#EF4444",
    description:
      "Shortlisted investors and the project sponsor collaborate inside AIP's encrypted Deal Room — negotiating terms, exchanging final documents, and coordinating legal close.",
    features: [
      "Encrypted, permission-based data room",
      "Version-controlled document exchange",
      "Term sheet negotiation workspace",
      "Multi-party audit trail",
    ],
    image: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800&q=80",
    simulation: {
      label: "Deal Room Status",
      fields: [
        { name: "Parties", value: "Sponsor + 2 Investors" },
        { name: "Documents Shared", value: "34 files" },
        { name: "Term Sheet", value: "✓ v3 — Agreed" },
        { name: "Legal Review", value: "In Progress" },
        { name: "Target Close", value: "Q3 2025" },
      ],
    },
  },
  {
    id: 7,
    phase: "Phase 7",
    title: "Financial Close",
    subtitle: "Execution, Disbursement & Monitoring",
    icon: CheckCircle,
    color: "#10B981",
    description:
      "Agreements are executed, funds disbursed, and the project moves into construction. AIP's monitoring dashboard tracks KPIs, milestone payments, and ESG compliance through the lifecycle.",
    features: [
      "Closing checklist & condition management",
      "Disbursement schedule tracking",
      "Construction milestone dashboard",
      "ESG & impact reporting module",
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    simulation: {
      label: "Closing Summary",
      fields: [
        { name: "Total Raised", value: "USD 85M ✓" },
        { name: "Financial Close", value: "14 Jun 2025" },
        { name: "Construction Start", value: "01 Aug 2025" },
        { name: "COD Target", value: "Q2 2027" },
        { name: "Jobs Created", value: "1,200+ (est.)" },
      ],
    },
  },
];

const SimulationPanel = ({ step }) => (
  <motion.div
    key={step.id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4 }}
    className="bg-[#0a1628] border border-white/10 rounded-2xl p-6 font-mono text-sm"
  >
    <div className="flex items-center gap-2 mb-4">
      <span className="w-3 h-3 rounded-full bg-red-500" />
      <span className="w-3 h-3 rounded-full bg-yellow-500" />
      <span className="w-3 h-3 rounded-full bg-green-500" />
      <span className="ml-2 text-gray-500 text-xs uppercase tracking-widest">
        AIP Platform — {step.simulation.label}
      </span>
    </div>
    <div className="space-y-3">
      {step.simulation.fields.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0"
        >
          <span className="text-gray-500">{f.name}</span>
          <span className="text-white font-semibold">{f.value}</span>
        </motion.div>
      ))}
    </div>
    <div
      className="mt-5 text-center text-xs font-bold tracking-widest uppercase py-2 rounded-lg"
      style={{ background: step.color + '22', color: step.color }}
    >
      {step.phase} — {step.title}
    </div>
  </motion.div>
);

const DemoPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const current = steps[activeStep];
  const Icon = current.icon;

  const goNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <Helmet>
        <title>Platform Demo — End-to-End Process | AIP</title>
        <meta
          name="description"
          content="Explore how AIP takes a project from intake to financial close — an end-to-end walkthrough of our infrastructure investment platform."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0a1628] font-sans text-gray-300">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
              <Play className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-wide">Interactive Platform Walkthrough</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold font-serif text-white mb-6">
              From <span className="text-[#D4AF37]">Project Intake</span><br /> to Deal Room
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              A step-by-step simulation of how AIP's platform transforms raw infrastructure projects into bankable, investor-ready deals — from first submission to financial close.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {[
                { icon: Clock, label: "Avg. 90 Days to Close" },
                { icon: Database, label: "120+ Screening Criteria" },
                { icon: Globe, label: "8 Active Countries" },
                { icon: Star, label: "End-to-End Platform" },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <I className="w-4 h-4 text-[#D4AF37]" /><span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Step Navigator */}
        <section className="py-8 px-4 border-y border-white/5 bg-[#112036]/40">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {steps.map((s, i) => {
                const SI = s.icon;
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white'
                        : isDone
                        ? 'border-green-500/40 bg-green-500/10 text-green-400'
                        : 'border-white/10 bg-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <SI className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? s.color : undefined }} />
                    )}
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#D4AF37]"
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">Step {activeStep + 1} of {steps.length}</p>
          </div>
        </section>

        {/* Main Step View */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Left: Info */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest"
                    style={{ borderColor: current.color + '50', background: current.color + '15', color: current.color }}>
                    <Icon className="w-3.5 h-3.5" />
                    {current.phase}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                    {current.title}
                  </h2>
                  <p className="text-[#D4AF37] font-medium mb-6">{current.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    {current.description}
                  </p>

                  <div className="space-y-3 mb-10">
                    {current.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: current.color + '25' }}>
                          <CheckCircle className="w-3 h-3" style={{ color: current.color }} />
                        </div>
                        <span className="text-gray-300">{f}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={goPrev}
                      disabled={activeStep === 0}
                      className="bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 px-6 py-3"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    {activeStep < steps.length - 1 ? (
                      <Button
                        onClick={goNext}
                        className="bg-[#D4AF37] text-[#0a1628] hover:bg-[#bfa035] font-bold px-6 py-3"
                      >
                        Next Step <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => navigate('/get-started')}
                        className="bg-[#D4AF37] text-[#0a1628] hover:bg-[#bfa035] font-bold px-6 py-3"
                      >
                        Get Started <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Image + Simulation */}
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-white/10 h-56 relative">
                    <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white/60">
                      {current.phase} — {current.title}
                    </div>
                  </div>
                  <SimulationPanel step={current} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#112036]/30 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                The Complete Pipeline
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Seven integrated phases transform an idea into a financial close — all managed inside a single secure platform.
              </p>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
              <div className="space-y-6">
                {steps.map((s, i) => {
                  const SI = s.icon;
                  return (
                    <motion.button
                      key={s.id}
                      onClick={() => { setActiveStep(i); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`w-full text-left flex items-start gap-6 p-5 rounded-xl border transition-all duration-200 group ${
                        i === activeStep
                          ? 'border-[#D4AF37]/40 bg-[#D4AF37]/10'
                          : 'border-white/5 bg-[#0a1628]/50 hover:border-white/20'
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                          style={{ background: s.color + '20', border: `1px solid ${s.color}40` }}>
                          <SI className="w-7 h-7" style={{ color: s.color }} />
                        </div>
                        <span className="absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-[#0a1628] border border-white/10 text-gray-400">
                          {i + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.phase}</div>
                        <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{s.subtitle}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 text-center bg-[#0a1628]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to bring your<br /><span className="text-[#D4AF37]">project to market?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-10">
              Join infrastructure sponsors, investors, and advisors already using the AIP platform to accelerate Africa's infrastructure pipeline delivery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={() => navigate('/get-started')}
                className="bg-[#D4AF37] text-[#0a1628] hover:bg-[#bfa035] font-bold text-lg px-8 py-6"
              >
                <Building2 className="w-5 h-5 mr-2" /> Submit a Project
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
              >
                <TrendingUp className="w-5 h-5 mr-2" /> Talk to Our Team
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DemoPage;
