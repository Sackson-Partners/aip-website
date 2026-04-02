import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

const InvestmentInsights = () => {
  return (
    <>
      <Helmet>
        <title>Investment Insights - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">Investment Insights</h1>
            <p className="text-gray-400">Market trends and strategic opportunities for institutional investors.</p>
          </div>

          {/* Featured Insight */}
          <div className="bg-gradient-to-r from-secondary to-primary border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="relative z-10">
                <span className="text-accent text-sm font-bold uppercase tracking-wide mb-2 block">Market Report • Q1 2024</span>
                <h2 className="text-3xl font-bold text-white mb-4 font-serif max-w-2xl">Renewable Energy transition accelerates in East Africa</h2>
                <p className="text-gray-300 max-w-2xl mb-6 text-lg">
                    New policy frameworks in Kenya and Tanzania have unlocked $2.5B in potential solar and wind projects. 
                    Early-stage entry offers projected IRRs of 18-22%.
                </p>
                <Button className="bg-accent text-primary hover:bg-white font-bold">Read Full Report</Button>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary/50 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-white">Top Performers</h3>
                </div>
                <div className="space-y-4">
                    {[
                        { name: "Solar PV (Utility)", return: "16-18%" },
                        { name: "Telecom Towers", return: "14-16%" },
                        { name: "Data Centers", return: "20-24%" }
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                            <span className="text-gray-300">{item.name}</span>
                            <span className="text-emerald-400 font-bold">{item.return}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Risk Watch</h3>
                </div>
                 <div className="space-y-4">
                    {[
                        { name: "Currency Volatility (West Africa)", level: "High" },
                        { name: "Regulatory Changes (Mining)", level: "Medium" },
                    ].map((item, i) => (
                        <div key={i} className="border-b border-white/5 pb-3 last:border-0">
                            <div className="text-gray-300 mb-1">{item.name}</div>
                            <span className={`text-xs px-2 py-1 rounded bg-white/5 ${item.level === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>{item.level} Impact</span>
                        </div>
                    ))}
                </div>
            </div>

             <div className="bg-secondary/50 p-6 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Regional Focus</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                    Southern Africa represents 40% of deal flow this quarter, driven by logistics and port modernization.
                </p>
                <Button variant="link" className="text-accent p-0">View Regional Map <ArrowUpRight className="w-4 h-4 ml-1" /></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentInsights;