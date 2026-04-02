import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { 
    LayoutDashboard, UploadCloud, Users, BarChart, 
    FileCheck, MessageSquare, ArrowUpRight 
} from 'lucide-react';

const SponsorDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Sponsor Dashboard - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-[#0f1218] text-white">
        <Navigation />
        
        <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Project Control Center</h1>
                    <p className="text-gray-400">Manage your capital raising, documentation, and investor relations.</p>
                </div>
                <Button className="bg-[#D4AF37] text-black hover:bg-white font-bold">
                    <UploadCloud className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#151925] p-5 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Capital Raised</div>
                    <div className="text-2xl font-bold text-[#D4AF37]">$0.00</div>
                </div>
                 <div className="bg-[#151925] p-5 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Active Investors</div>
                    <div className="text-2xl font-bold text-white">0</div>
                </div>
                 <div className="bg-[#151925] p-5 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Profile Views</div>
                    <div className="text-2xl font-bold text-white">0</div>
                </div>
                 <div className="bg-[#151925] p-5 rounded-xl border border-white/5">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">Readiness Score</div>
                    <div className="text-2xl font-bold text-emerald-400">--</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#151925] rounded-xl border border-white/5 p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-[#D4AF37]" />
                        Readiness Checklist
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-gray-300">Financial Model Validation</span>
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Missing</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-gray-300">Environmental Impact Assessment</span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Draft</span>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm text-gray-300">Legal Title / Land Rights</span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Verified</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#151925] rounded-xl border border-white/5 p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#D4AF37]" />
                        Investor Matching
                    </h3>
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">Complete your project profile to unlock AI-powered investor matching.</p>
                        <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">Complete Profile</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SponsorDashboard;