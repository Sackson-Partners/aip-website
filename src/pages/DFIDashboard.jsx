import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { 
    Globe, PieChart, ShieldCheck, TrendingUp, Users, 
    FileText, Calculator, ArrowRight 
} from 'lucide-react';

const DFIDashboard = () => {
  return (
    <>
      <Helmet>
        <title>DFI Dashboard - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-[#0f1218] text-white">
        <Navigation />
        
        <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <Globe className="w-3 h-3" />
                    Development Finance Interface
                </div>
                <h1 className="text-4xl font-bold font-serif mb-3">Impact & Blended Finance</h1>
                <p className="text-gray-400 max-w-2xl">Coordinate capital, structure blended finance deals, and track development impact goals across the continent.</p>
            </header>

            {/* Main Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Impact Metrics */}
                <div className="bg-[#151925] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <PieChart className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Impact Tracker</h3>
                    <p className="text-gray-400 text-sm mb-4">Monitor SDG alignment and development outcomes of portfolio projects.</p>
                    <div className="flex gap-2">
                        <span className="text-xs bg-white/5 px-2 py-1 rounded">SDG 7</span>
                        <span className="text-xs bg-white/5 px-2 py-1 rounded">SDG 9</span>
                        <span className="text-xs bg-white/5 px-2 py-1 rounded">Job Creation</span>
                    </div>
                </div>

                {/* De-Risking */}
                <div className="bg-[#151925] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">De-Risking Tools</h3>
                    <p className="text-gray-400 text-sm mb-4">Deploy guarantees, insurance, and first-loss capital to mobilize private investment.</p>
                    <Button variant="link" className="text-emerald-400 p-0 h-auto">View Instruments <ArrowRight className="w-4 h-4 ml-1"/></Button>
                </div>

                {/* Blended Finance */}
                <div className="bg-[#151925] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Calculator className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Structuring Lab</h3>
                    <p className="text-gray-400 text-sm mb-4">Design blended finance structures with concessional and commercial tranches.</p>
                    <Button variant="link" className="text-purple-400 p-0 h-auto">Open Calculator <ArrowRight className="w-4 h-4 ml-1"/></Button>
                </div>
            </div>

            {/* Pipeline Section */}
            <div className="bg-[#151925] rounded-xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Co-Investment Pipeline</h3>
                    <Button variant="outline" className="text-xs border-white/10">Export Report</Button>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded bg-gray-800 flex-shrink-0"></div>
                                <div className="flex-grow">
                                    <h4 className="font-bold">Regional Hydropower Initiative</h4>
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                        <span>West Africa</span>
                                        <span>•</span>
                                        <span>$450M Total Size</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">Gap: $50M</span>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-500">Review Deal</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default DFIDashboard;