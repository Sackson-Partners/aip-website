import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Zap, Droplets, Sprout, Truck, Wifi, HeartPulse, CheckCircle2, BarChart3, Layers } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { aipApi } from '@/lib/aipApi';
import { useLanguage } from '@/contexts/LanguageContext';

const SectorsPage = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const staticSectorData = [
    {
      name: "Energy",
      slug: "energy",
      description: "Powering industrialization and lighting up the continent.",
      icon_name: "Zap",
      image_url: "https://images.unsplash.com/photo-1697869162556-ab57db502c09",
      snapshot: [
        { label: "600m people lack electricity access", value: "" }, 
        { label: ">$190bn/year investment needed", value: "" },
        { label: "60% of world's best solar resources", value: "" }
      ],
      key_coverage: ["Renewable Energy (Solar, Wind, Hydro)", "Transmission & Grid Modernization", "Off-grid & Mini-grid Solutions", "Gas-to-Power Transitions"],
      aip_delivers: ["PPA bankability verification", "Sovereign guarantee alternatives", "Climate finance taxonomy alignment"]
    },
    {
      name: "Water & Sanitation",
      slug: "water",
      description: "Ensuring sustainable access to life's most critical resource.",
      icon_name: "Droplets",
      image_url: "https://images.unsplash.com/photo-1614195975309-a3baf592274f",
      snapshot: [
         { label: "Only 31% have safely managed drinking water", value: "" },
         { label: "6-13x acceleration needed for SDG targets", value: "" },
         { label: "$30bn/year mobilization goal", value: "" }
      ],
      key_coverage: ["Water Treatment & Desalination", "Urban Distribution Networks", "Sanitation & Waste Management", "Agricultural Irrigation Systems"],
      aip_delivers: ["Tariff structuring & subsidy models", "Municipal finance aggregation", "Impact measurement frameworks"]
    },
    {
      name: "Agriculture & Food Systems",
      slug: "agriculture",
      description: "Transforming subsistence into food security and global export power.",
      icon_name: "Sprout",
      image_url: "https://images.unsplash.com/photo-1547059503-d1705f0bbdb2",
      snapshot: [
         { label: "$110bn+ food import bill projected", value: "" },
         { label: "20-40% post-harvest losses", value: "" },
         { label: "Only 6% of cultivated area irrigated", value: "" }
      ],
      key_coverage: ["Agro-processing Zones & Parks", "Cold Chain Logistics & Warehousing", "Irrigation Infrastructure", "Fertilizer & Input Production"],
      aip_delivers: ["Supply chain financing structures", "Offtake agreement verification", "Crop insurance integration"]
    },
    {
      name: "Transport, Logistics & Real Assets",
      slug: "transport",
      description: "Building the physical backbone of African economies.",
      icon_name: "Truck",
      image_url: "https://images.unsplash.com/photo-1558318830-853081b6bb6e",
      snapshot: [
        { label: "$181–$221bn/year infrastructure needs", value: "" },
        { label: "109% intra-African export growth potential", value: "" },
        { label: "51m+ housing unit shortfall", value: "" }
      ],
      key_coverage: ["Ports, Airports & Railways", "Road Networks & Urban Transit", "Industrial Parks & SEZs", "Affordable Housing Developments"],
      aip_delivers: ["De-risked project structuring", "Traffic/Demand risk mitigation strategies", "Blended finance coordination"]
    },
    {
      name: "TMT (Digital & Connectivity)",
      slug: "tmt",
      description: "Bridging the digital divide to enable the knowledge economy.",
      icon_name: "Wifi",
      image_url: "https://images.unsplash.com/photo-1594915440248-1e419eba6611",
      snapshot: [
        { label: "Only 38% online in Africa", value: "" },
        { label: "527m mobile subscribers", value: "" },
        { label: "220bn economic value generated", value: "" }
      ],
      key_coverage: ["Fiber Optic Backbones (Terrestrial/Subsea)", "Data Centers & Cloud Infrastructure", "TowerCos & Active Infrastructure", "Last-mile Connectivity Solutions"],
      aip_delivers: ["Spectrum license due diligence", "Anchor tenant verification", "Tech-enabled asset monitoring"]
    },
    {
      name: "Healthcare",
      slug: "healthcare",
      description: "Strengthening resilience through modern medical infrastructure.",
      icon_name: "HeartPulse",
      image_url: "https://images.unsplash.com/photo-1607838720191-0d8eba3e9040",
      snapshot: [
        { label: "6.1m health worker shortage by 2030", value: "" },
        { label: "25% disease burden, 3% workforce", value: "" },
        { label: "$259bn sector by 2030", value: "" }
      ],
      key_coverage: ["Hospitals & Specialist Clinics", "Diagnostic & Laboratory Centers", "Pharmaceutical Manufacturing", "Health Tech & Telemedicine Platforms"],
      aip_delivers: ["Equipment financing structures", "Operator due diligence", "Social impact bond structuring"]
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
                 image_url: staticMatch?.image_url || dbSector.image_url,
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
    switch (name) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Droplets': return <Droplets className="w-6 h-6" />;
      case 'Sprout': return <Sprout className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'Wifi': return <Wifi className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const handleSectorClick = (slug) => {
    navigate(`/sectors/${slug}/projects`);
  };

  return (
    <>
      <Helmet>
        <title>{t.sectors.metaTitle}</title>
        <meta name="description" content={t.sectors.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />

        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0F1419] text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6">
                {t.sectors.title1} <span className="text-[#D4AF37]">{t.sectors.title2}</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                {t.sectors.subtitle}
              </p>
            </motion.div>
        </div>

        {/* Sectors Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#0F1419]">
          <div className="max-w-7xl mx-auto">
            {loading ? (
               <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37] mb-4" />
                  <p>{t.sectors.loading}</p>
               </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sectors.map((sector, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-[#151a21] rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 flex flex-col cursor-pointer"
                        onClick={() => handleSectorClick(sector.slug)}
                    >
                        {/* Image Header */}
                        <div className="relative h-64 overflow-hidden bg-gray-800">
                            {sector.image_url ? (
                                <img 
                                  src={sector.image_url} 
                                  alt={sector.name} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "https://horizons-cdn.hostinger.com/02be81db-dbc5-44e9-9552-e26b6e734eb6/9cd474c237641b769f66d7b88ac4554b.png";
                                  }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#1a2029] text-gray-600">{t.sectors.noImage}</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151a21] via-transparent to-transparent opacity-90" />
                            
                            <div className="absolute top-4 left-4">
                                <div className="w-10 h-10 rounded-lg bg-[#0F1419]/80 backdrop-blur border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                                    {getIcon(sector.icon_name || sector.icon)}
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 md:p-8 -mt-20 relative z-10">
                             <h3 className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-md group-hover:text-[#D4AF37] transition-colors">
                                {sector.name}
                            </h3>
                            <p className="text-gray-300 mb-8 leading-relaxed font-medium text-lg drop-shadow-sm">
                                {sector.description}
                            </p>

                            {/* Opportunity Snapshot */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                                    <BarChart3 className="w-4 h-4" /> {t.sectors.opportunitySnapshot}
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {(sector.snapshot || []).map((stat, i) => (
                                        <div key={i} className="bg-[#0F1419] p-3 rounded border border-white/5 text-center">
                                            <p className="text-xs text-gray-300 font-medium leading-tight">
                                                {typeof stat === 'string' ? stat : (stat.label || stat.value)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Key Coverage */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-white text-xs font-bold uppercase tracking-widest">
                                        <Layers className="w-4 h-4 text-[#D4AF37]" /> {t.sectors.keyCoverage}
                                    </div>
                                    <ul className="space-y-2">
                                        {(sector.key_coverage || []).slice(0, 4).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                <span className="w-1 h-1 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* AIP Delivers */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-white text-xs font-bold uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> {t.sectors.aipDelivers}
                                    </div>
                                    <ul className="space-y-2">
                                        {(sector.aip_delivers || []).slice(0, 3).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button 
                              asChild
                              className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold py-6 text-lg rounded-lg shadow-lg shadow-[#D4AF37]/10 transition-all duration-300 group-hover:scale-[1.02]"
                            >
                              <Link to={`/sectors/${sector.slug}/projects`} onClick={(e) => e.stopPropagation()}>
                                {t.sectors.exploreProjects} <ArrowRight className="w-5 h-5 ml-2" />
                              </Link>
                            </Button>
                        </div>
                    </motion.div>
                ))}
                </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SectorsPage;