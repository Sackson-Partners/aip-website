import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProjectBankabilityCard from '@/components/ProjectBankabilityCard';
import { Button } from '@/components/ui/button';
import { CheckSquare, ArrowRight, FileText } from 'lucide-react';

const AdvisoryDashboard = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const userProjects = allProjects.filter(p => p.ownerId === currentUser.id);
    setProjects(userProjects);
  }, [currentUser.id]);

  // Mock recommendations
  const recommendedServices = [
    { id: 1, name: "Financial Modeling Review", status: "Recommended" },
    { id: 2, name: "ESG Impact Assessment", status: "In Progress" }
  ];

  return (
    <>
      <Helmet>
        <title>Advisory Dashboard - AIP</title>
      </Helmet>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-white mb-8 font-serif">Advisory Dashboard</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-white mb-4">Project Bankability</h2>
                    {projects.length > 0 ? (
                         <div className="grid md:grid-cols-2 gap-6">
                            {projects.map(p => (
                                <div key={p.id} className="relative">
                                    <div className="absolute -top-3 left-4 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
                                        {p.name}
                                    </div>
                                    <ProjectBankabilityCard score={Math.floor(Math.random() * 30) + 50} project={p} />
                                </div>
                            ))}
                         </div>
                    ) : (
                        <div className="bg-secondary/30 p-8 rounded-xl border border-white/5 text-center">
                            <p className="text-gray-400">No projects found. Submit a project to see advisory insights.</p>
                        </div>
                    )}
                </section>

                <section className="bg-secondary/50 p-6 rounded-xl border border-white/5">
                    <h2 className="text-xl font-bold text-white mb-4">Preparation Checklist</h2>
                    <div className="space-y-3">
                        {['Land Rights Verification', 'Feasibility Study', 'Financial Model (5-Year)', 'Environmental Permit'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-primary/30 rounded-lg">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${i < 2 ? 'bg-emerald-400 border-emerald-400 text-primary' : 'border-gray-600'}`}>
                                    {i < 2 && <CheckSquare className="w-3 h-3" />}
                                </div>
                                <span className={i < 2 ? 'text-gray-400 line-through' : 'text-white'}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-b from-secondary to-primary p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-white mb-4">Recommended Services</h3>
                    <div className="space-y-4">
                        {recommendedServices.map(s => (
                            <div key={s.id} className="bg-primary/50 p-4 rounded-lg border border-white/5">
                                <div className="text-white font-medium mb-1">{s.name}</div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{s.status}</span>
                                    <Button size="sm" variant="ghost" className="h-6 text-gray-400 hover:text-white"><ArrowRight className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/10">Browse All Services</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvisoryDashboard;