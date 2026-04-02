import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { HardHat, Search, Users, ClipboardCheck } from 'lucide-react';

const EPCDashboard = () => {
  return (
    <>
      <Helmet>
        <title>EPC Dashboard - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-[#0f1218] text-white">
        <Navigation />
         <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
             <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <HardHat className="w-3 h-3" />
                    Contractor Hub
                </div>
                <h1 className="text-4xl font-bold font-serif mb-3">Tender & Consortium Center</h1>
                <p className="text-gray-400 max-w-2xl">Find major infrastructure tenders, form winning consortiums, and showcase your track record.</p>
            </header>

            <div className="bg-[#151925] rounded-xl border border-white/5 p-8 mb-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Find Opportunities</h2>
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5"/>
                    <input type="text" placeholder="Search tenders by sector, country or keywords..." className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#151925] p-6 rounded-xl border border-white/5">
                    <Users className="w-8 h-8 text-orange-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Partner Search</h3>
                    <p className="text-gray-400 text-sm mb-4">Find local partners, sub-contractors, or technology providers for joint bids.</p>
                    <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10">Find Partners</Button>
                </div>
                 <div className="bg-[#151925] p-6 rounded-xl border border-white/5">
                    <ClipboardCheck className="w-8 h-8 text-orange-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Bid Management</h3>
                    <p className="text-gray-400 text-sm mb-4">Track your expressions of interest, pre-qualifications, and final proposals.</p>
                    <Button variant="outline" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10">Manage Bids</Button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default EPCDashboard;