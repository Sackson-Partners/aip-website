import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Droplets, Truck, Phone, TrendingUp, ArrowUpRight } from 'lucide-react';

const SectorAnalytics = () => {
  const sectors = [
    {
      id: 'energy',
      name: 'Energy',
      icon: Zap,
      stats: { marketSize: '$45B', growth: '+12%', activeProjects: 124 },
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400'
    },
    {
      id: 'transport',
      name: 'Transportation',
      icon: Truck,
      stats: { marketSize: '$62B', growth: '+8%', activeProjects: 85 },
      color: 'text-blue-400',
      bgColor: 'bg-blue-400'
    },
    {
      id: 'water',
      name: 'Water',
      icon: Droplets,
      stats: { marketSize: '$15B', growth: '+15%', activeProjects: 45 },
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400'
    },
    {
      id: 'telecom',
      name: 'Telecom',
      icon: Phone,
      stats: { marketSize: '$38B', growth: '+22%', activeProjects: 210 },
      color: 'text-purple-400',
      bgColor: 'bg-purple-400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sector Analytics - AIP</title>
      </Helmet>

      <div className="min-h-screen bg-primary">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/5 pb-8">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2 font-serif">Sector Analytics</h1>
               <p className="text-gray-400">Deep-dive intelligence into African infrastructure sectors.</p>
            </div>
            <div className="mt-4 md:mt-0">
               <Button variant="outline" className="border-white/10 text-white">Download Full Report</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Overview Chart Card */}
            <div className="bg-secondary/50 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6">Investment Distribution</h2>
                <div className="h-64 flex items-end justify-between gap-4 px-4">
                    {sectors.map(s => (
                        <div key={s.id} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity mb-1">{s.stats.marketSize}</div>
                            <div 
                                className={`w-full rounded-t-lg opacity-80 group-hover:opacity-100 transition-all ${s.bgColor}`} 
                                style={{ height: `${Math.random() * 60 + 20}%` }}
                            />
                            <div className="text-sm text-gray-400">{s.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Growth Comparison */}
             <div className="bg-secondary/50 rounded-xl border border-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6">YoY Growth Rates</h2>
                <div className="space-y-6">
                    {sectors.map(s => (
                        <div key={s.id}>
                            <div className="flex justify-between text-sm mb-2">
                                <div className="flex items-center gap-2">
                                    <s.icon className={`w-4 h-4 ${s.color}`} />
                                    <span className="text-white">{s.name}</span>
                                </div>
                                <span className={s.color}>{s.stats.growth}</span>
                            </div>
                            <div className="h-2 bg-primary rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${s.bgColor}`} 
                                    style={{ width: s.stats.growth.replace('+', '').replace('%', '') * 4 + '%' }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map(sector => (
                <div key={sector.id} className="bg-secondary rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl bg-primary ${sector.color}`}>
                            <sector.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs text-gray-500 bg-primary px-2 py-1 rounded">2023-24</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{sector.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-gray-500 text-xs">Market Size</div>
                            <div className="text-white font-medium">{sector.stats.marketSize}</div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-xs">Projects</div>
                            <div className="text-white font-medium">{sector.stats.activeProjects}</div>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-accent hover:text-white hover:bg-white/5 text-sm">
                        View Details <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectorAnalytics;