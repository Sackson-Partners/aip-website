import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import PremiumProjectCard from '@/components/PremiumProjectCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
    Search, Filter, ShieldCheck, PieChart, TrendingUp, Briefcase, 
    Bookmark, BarChart3, Globe, Activity, FileCheck
} from 'lucide-react';

const InvestorDashboard = () => {
  const { currentUser } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('opportunities'); // opportunities, watchlist, analytics
  const [searchQuery, setSearchQuery] = useState('');
  
  // Enhanced Filtering
  const [filters, setFilters] = useState({
    location: '',
    sectors: [],
    investmentRange: [0, 50000000],
    riskLevel: '',
    stage: '',
    verifiedOnly: false,
    minBankability: 0
  });

  // Mock Deals
  const [projects] = useState([
    {
        id: 'mock-1',
        name: "Solar Farm Development",
        location: "Kenya",
        sector: "Energy",
        stage: "Feasibility",
        investmentNeeded: 5000000,
        expectedROI: 18,
        description: "1000 MW solar farm project to power 500,000 homes in rural Kenya.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
        verificationStatus: "Verified",
        riskLevel: "Low",
        bankabilityScore: 85
    },
    {
        id: 'mock-2',
        name: "Lagos Port Logistics Hub",
        location: "Nigeria",
        sector: "Transportation",
        stage: "Construction",
        investmentNeeded: 15000000,
        expectedROI: 15,
        description: "Expansion of container terminal and logistics park.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
        verificationStatus: "Verified",
        riskLevel: "Medium",
        bankabilityScore: 72
    },
    // ... more projects would be here
  ]);

  return (
    <>
      <Helmet>
        <title>Investor Dashboard - AIP</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f1218]">
        <Navigation />

        <div className="flex pt-20 h-[calc(100vh-80px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#151925] border-r border-white/5 hidden lg:block overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                            <span className="font-bold text-[#D4AF37]">II</span>
                        </div>
                        <div>
                            <div className="text-white font-medium text-sm">{currentUser?.companyName || "Investor"}</div>
                            <div className="text-xs text-gray-500">Institutional Investor</div>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('opportunities')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'opportunities' ? 'bg-[#D4AF37] text-[#1a1f2e]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Globe className="w-4 h-4" />
                            Deal Discovery
                        </button>
                        <button 
                            onClick={() => setActiveTab('pipeline')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pipeline' ? 'bg-[#D4AF37] text-[#1a1f2e]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            My Pipeline
                        </button>
                        <button 
                            onClick={() => setActiveTab('watchlist')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'watchlist' ? 'bg-[#D4AF37] text-[#1a1f2e]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Bookmark className="w-4 h-4" />
                            Watchlist
                        </button>
                        <button 
                            onClick={() => setActiveTab('analytics')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-[#D4AF37] text-[#1a1f2e]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            Portfolio Analytics
                        </button>
                    </nav>

                    {/* Quick Stats */}
                    <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/5">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Pipeline Status</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs text-gray-300">
                                <span>Under Review</span>
                                <span className="font-bold text-white">4</span>
                            </div>
                            <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                                <div className="bg-[#D4AF37] h-full w-1/3"></div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-300">
                                <span>Due Diligence</span>
                                <span className="font-bold text-white">2</span>
                            </div>
                            <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-1/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {activeTab === 'opportunities' && (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2 font-serif">Deal Discovery</h1>
                                <p className="text-gray-400">AI-matched infrastructure opportunities aligned with your thesis.</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37]">
                                    <Activity className="w-4 h-4 mr-2" />
                                    Thesis Match
                                </Button>
                            </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input 
                                    type="text" 
                                    placeholder="Search by keyword, sector, or country..." 
                                    className="w-full pl-10 pr-4 py-3 bg-[#151925] border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-[#D4AF37] outline-none"
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                <select className="bg-[#151925] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none">
                                    <option>All Sectors</option>
                                    <option>Energy</option>
                                    <option>Transport</option>
                                </select>
                                <select className="bg-[#151925] border border-white/10 text-gray-300 rounded-xl px-4 py-3 outline-none">
                                    <option>Any Stage</option>
                                    <option>Greenfield</option>
                                    <option>Brownfield</option>
                                </select>
                            </div>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <PremiumProjectCard 
                                    key={project.id}
                                    project={project}
                                    onClick={setSelectedProject}
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                {activeTab !== 'opportunities' && (
                     <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                        <Briefcase className="w-16 h-16 mb-4 opacity-20" />
                        <h3 className="text-xl font-bold text-gray-400">Coming Soon</h3>
                        <p>This module is currently being enhanced for institutional investors.</p>
                     </div>
                )}
            </main>
        </div>

        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </>
  );
};

export default InvestorDashboard;