import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Landmark, Briefcase, FileText, BarChart } from 'lucide-react';

const GovernmentDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Government Dashboard - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-[#0f1218] text-white">
        <Navigation />
        <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
             <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600 text-gray-300 text-xs font-bold uppercase tracking-wider mb-4">
                    <Landmark className="w-3 h-3" />
                    Public Sector Portal
                </div>
                <h1 className="text-4xl font-bold font-serif mb-3">PPP Management Unit</h1>
                <p className="text-gray-400 max-w-2xl">Manage national infrastructure pipelines, conduct market soundings, and oversee tender processes.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                 {/* PPP Pipeline */}
                <div className="bg-[#151925] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer">
                    <Briefcase className="w-8 h-8 text-[#D4AF37] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Project Pipeline</h3>
                    <p className="text-gray-400 text-sm mb-4">Upload and manage priority infrastructure projects for investor visibility.</p>
                    <div className="text-2xl font-bold text-white">0 Projects</div>
                </div>
                
                {/* Tenders */}
                <div className="bg-[#151925] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer">
                    <FileText className="w-8 h-8 text-[#D4AF37] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Tender Management</h3>
                    <p className="text-gray-400 text-sm mb-4">Publish EOIs and RFPs, manage data rooms, and track bidder submissions.</p>
                    <div className="text-2xl font-bold text-white">0 Active</div>
                </div>

                {/* Analytics */}
                <div className="bg-[#151925] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer">
                    <BarChart className="w-8 h-8 text-[#D4AF37] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Economic Impact</h3>
                    <p className="text-gray-400 text-sm mb-4">Track job creation, FDI inflows, and infrastructure gap reduction.</p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentDashboard;