import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SectorProjectsLayout = ({ sectorName, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f14] font-sans selection:bg-[#D4AF37] selection:text-[#0b0f14] flex flex-col">
      <Helmet>
        <title>{sectorName ? `${sectorName} Projects` : 'Projects'} | AIP - Africa Infrastructure Partners</title>
        <meta 
          name="description" 
          content={`Explore verified ${sectorName} infrastructure projects and investment opportunities across Africa.`} 
        />
      </Helmet>

      <Navigation />

      <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumbs & Back Nav */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/sectors" className="hover:text-white transition-colors">Sectors</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#D4AF37] font-medium">{sectorName}</span>
          </div>

          <button 
            onClick={() => navigate('/sectors')}
            className="group inline-flex items-center text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Sectors
          </button>
        </div>

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
            {sectorName} <span className="text-[#D4AF37]">Projects</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            Access a curated pipeline of bankable opportunities in the {sectorName} sector, ranging from early-stage development to operational assets.
          </p>
        </div>

        {/* Content Area (Grid) */}
        <div className="w-full">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SectorProjectsLayout;