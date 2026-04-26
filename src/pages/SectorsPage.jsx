import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Zap, Droplets, Sprout, Truck, Wifi, HeartPulse, CheckCircle2, BarChart3, Layers, Map } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { aipApi } from '@/lib/aipApi';
import { useLanguage } from '@/contexts/LanguageContext';
import AfricaPipelineMap from '@/components/AfricaPipelineMap';

const SectorsPage = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const staticSectorData = [
    {
      name: "Energy & Mining",
      slug: "energy",
      description: "Powering industrialisation and lighting up the continent.",
      icon_name: "Zap",
      cta_text: "150+ energy & mining projects in the pipeline",
      snapshot: [
        { label: "people lack electricity access", value: "600M+" },
        { label: "investment needed per year", value: ">$190bn" },
        { label: "world's best solar resources", value: "60%" }
      ],
      key_coverage: ["Renewable Energy (Solar, Wind, Hydro)", "Transmission & Grid Modernization", "Off-grid & Mini-grid Solutions", "Gas-to-Power Transitions"],
      aip_delivers: ["PPA bankability verification", "Sovereign guarantee alternatives", "Climate finance taxonomy alignment", "Off-taker risk structuring"]
    },
    {
      name: "Water & Sanitation",
      slug: "water",
      description: "Ensuring sustainable access to life's most critical resource.",
      icon_name: "Droplets",
      cta_text: "$30bn mobilisation gap addressable through blended finance",
      snapshot: [
        { label: "have safely managed drinking water", value: "Only 31%" },
        { label: "acceleration needed for SDG targets", value: "6–13×" },
        { label: "mobilisation goal per year", value: "$30bn" }
      ],
      key_coverage: ["Water Treatment & Desalination", "Urban Distribution Networks", "Sanitation & Waste Management", "Agricultural Irrigation Systems"],
      aip_delivers: ["Tariff structuring & subsidy models", "Municipal finance aggregation", "Impact measurement frameworks", "DFI facility structuring"]
    },
    {
      name: "Agriculture & Food Systems",
      slug: "agriculture",
      description: "Transforming subsistence into food security and global export power.",
      icon_name: "Sprout",
      cta_text: "$110bn+ food import bill projected — AIP structures agro-finance solutions",
      snapshot: [
        { label: "food import bill projected", value: "$110bn+" },
        { label: "post-harvest losses", value: "20-40%" },
        { label: "of cultivated area irrigated", value: "Only 6%" }
      ],
      key_coverage: ["Agro-processing Zones & Parks", "Cold Chain Logistics & Warehousing", "Irrigation Infrastructure", "Fertilizer & Input Production"],
      aip_delivers: ["Supply chain financing structures", "Offtake agreement verification", "Crop insurance integration"]
    },
    {
      name: "Transport, Logistics & Real Assets",
      slug: "transport",
      description: "Building the physical backbone of African economies.",
      icon_name: "Truck",
      cta_text: "$181–221bn/year infrastructure needs — AIP structures bankable transport deals",
      snapshot: [
        { label: "per year infrastructure needs", value: "$181–221bn" },
        { label: "intra-African export growth potential", value: "109%" },
        { label: "housing unit shortfall", value: "51m+" }
      ],
      key_coverage: ["Ports, Airports & Railways", "Road Networks & Urban Transit", "Industrial Parks & SEZs", "Affordable Housing Developments"],
      aip_delivers: ["De-risked project structuring", "Traffic/Demand risk mitigation strategies", "Blended finance coordination"]
    },
    {
      name: "TMT (Digital & Connectivity)",
      slug: "tmt",
      description: "Bridging the digital divide to enable the knowledge economy.",
      icon_name: "Wifi",
      cta_text: "Only 38% of Africa is online — AIP structures digital infrastructure deals",
      snapshot: [
        { label: "online in Africa", value: "Only 38%" },
        { label: "mobile subscribers", value: "527m" },
        { label: "economic value generated", value: "$220bn" }
      ],
      key_coverage: ["Fiber Optic Backbones (Terrestrial/Subsea)", "Data Centers & Cloud Infrastructure", "TowerCos & Active Infrastructure", "Last-mile Connectivity Solutions"],
      aip_delivers: ["Spectrum license due diligence", "Anchor tenant verification", "Tech-enabled asset monitoring"]
    },
    {
      name: "Healthcare & Social Infrastructures",
      slug: "healthcare",
      description: "Strengthening resilience through modern medical, education and social infrastructure.",
      icon_name: "HeartPulse",
      cta_text: "$259bn sector by 2030 — AIP structures healthcare & social infrastructure deals",
      snapshot: [
        { label: "health worker shortage by 2030", value: "6.1m" },
        { label: "disease burden, only 3% workforce", value: "25%" },
        { label: "sector size by 2030", value: "$259bn" }
      ],
      key_coverage: ["Hospitals & Specialist Clinics", "Educational Institutions & Schools", "Diagnostic & Laboratory Centers", "Health Tech & Telemedicine Platforms"],
      aip_delivers: ["Equipment financing structures", "Operator due diligence", "Government availability payments", "Social impact bond structuring"]
    }
  ];

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        const data = await aipApi.fetchSectorsCatalog();
        if (data && data.length > 0) {
          const mergedData = data.map(dbSector => {
            const staticMatch = staticSectorData.find(s => s.name.includes(dbSector.name) || dbSector.name.includes(s.name));
            return {
              ...staticMatch,
              ...dbSector,
              slug: dbSector.slug || staticMatch?.slug || dbSector.name.toLowerCase().replace(/\s+/g, '-'),
              snapshot: dbSector.snapshot || staticMatch?.snapshot || [],
              key_coverage: dbSector.key_coverage || staticMatch?.key_coverage || [],
              aip_delivers: dbSector.aip_delivers || staticMatch?.aip_delivers || []
            };
          });
          setSectors(mergedData.slice(0, 6));
        } else {
          setSectors(staticSectorData);
        }
      } catch (err) {
        console.error('Error fetching sectors:', err);
        setSectors(staticSectorData);
      } finally {
        setLoading(false);
      }
    };
    fetchSectors();
  }, []);

  const getIcon = (name) => {
    const cls = "w-6 h-6";
    switch (name) {
      case 'Zap': return <Zap className={cls} />;
      case 'Droplets': return <Droplets className={cls} />;
      case 'Sprout': return <Sprout className={cls} />;
      case 'Truck': return <Truck className={cls} />;
      case 'Wifi': return <Wifi className={cls} />;
      case 'HeartPulse': return <HeartPulse className={cls} />;
      default: return <Zap className={cls} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.sectors.metaTitle}</title>
        <meta name="description" content={t.sectors.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-[#0b1628] font-sans text-[#8b9ab0]">
        <Navigation />

        {/* Hero */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#c9a84c] font-semibold mb-6 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
              Sectors we Operate In
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#f8f8f5] mb-6 leading-tight">
              Verified, investment-ready opportunities across{' '}
              <em className="text-[#c9a84c] not-italic">Africa</em>
            </h1>
            <p className="text-lg text-[#b0bfd4] max-w-2xl mx-auto leading-relaxed">
              Access six high-impact sectors with deep coverage, AI-verified data, and end-to-end deal support.
            </p>
          </motion.div>
        </div>

        {/* Sectors List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#c9a84c] mb-4" />
                <p className="text-[#8b9ab0]">{t.sectors.loading}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {sectors.map((sector, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className="bg-[#192341] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c9a84c]/30 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="px-10 py-8 grid grid-cols-[auto_1fr] gap-6 items-start border-b border-white/8">
                      <div className="w-12 h-12 bg-[#c9a84c]/12 rounded-xl flex items-center justify-center text-[#c9a84c] flex-shrink-0">
                        {getIcon(sector.icon_name || sector.icon)}
                      </div>
                      <div>
                        <h2 className="text-3xl font-serif font-semibold text-[#f8f8f5] mb-2">{sector.name}</h2>
                        <p className="text-sm text-[#b0bfd4] leading-relaxed">{sector.description}</p>
                      </div>
                    </div>

                    {/* Body: 3 columns */}
                    <div className="px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Opportunity Snapshot */}
                      <div>
                        <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
                          <span className="w-4 h-px bg-[#c9a84c]" />
                          Opportunity Snapshot
                        </div>
                        <div className="flex flex-col gap-3">
                          {(sector.snapshot || []).map((stat, i) => (
                            <div key={i} className="bg-white/3 border border-white/8 rounded-lg px-3 py-2.5 text-xs text-[#b0bfd4] leading-snug">
                              {typeof stat === 'string' ? stat : (
                                <>
                                  <strong className="block text-[#c9a84c] text-sm font-semibold mb-0.5">{stat.value}</strong>
                                  {stat.label}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Coverage */}
                      <div>
                        <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
                          <span className="w-4 h-px bg-[#c9a84c]" />
                          Key Coverage
                        </div>
                        <div className="flex flex-col gap-2">
                          {(sector.key_coverage || []).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-[#b0bfd4] leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8b9ab0] mt-1.5 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AIP Delivers */}
                      <div>
                        <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
                          <span className="w-4 h-px bg-[#c9a84c]" />
                          AIP Delivers
                        </div>
                        <div className="flex flex-col gap-2">
                          {(sector.aip_delivers || []).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-[#b0bfd4] leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="px-10 py-5 border-t border-white/8 flex items-center justify-between gap-4">
                      <span className="text-xs text-[#8b9ab0]">{sector.cta_text || `Explore ${sector.name} projects`}</span>
                      <Link
                        to={`/sectors/${sector.slug}/projects`}
                        className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0b1628] hover:bg-[#e0c07a] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 flex-shrink-0"
                      >
                        Explore Projects <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Africa Pipeline Map */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111e38]/30 border-t border-white/5 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-4 px-3 py-1 border border-[#c9a84c]/30 rounded-full">
                <Map className="w-3.5 h-3.5" /> Live Coverage
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#f8f8f5] mb-4">
                Africa Infrastructure Pipeline Map
              </h2>
              <p className="text-[#8b9ab0] max-w-2xl mx-auto">
                Explore AIP's active project pipeline and partner countries across Sub-Saharan Africa — powered by OpenStreetMap.
              </p>
            </div>
            <AfricaPipelineMap />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SectorsPage;
