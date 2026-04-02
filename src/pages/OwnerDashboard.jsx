import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import ProjectUploadForm from '@/components/ProjectUploadForm';
import ProjectVerificationStatus from '@/components/ProjectVerificationStatus';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Building2, Users, Calendar, Trash2, Edit, AlertCircle, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import VerificationBadge from '@/components/VerificationBadge';

const OwnerDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const userProjects = allProjects.filter(p => p.ownerId === currentUser.id);
    
    // Add default mock status for demo if missing
    const enhancedProjects = userProjects.map(p => ({
        ...p,
        verificationStatus: p.verificationStatus || 'In Review',
        verificationStep: p.verificationStep || 2,
        bankabilityScore: p.bankabilityScore || 60
    }));
    
    setProjects(enhancedProjects);
  };

  const handleDeleteProject = (projectId) => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = allProjects.filter(p => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    loadProjects();
    toast({
      title: "Project Deleted",
      description: "Your project has been removed successfully",
    });
  };

  if (showUploadForm) {
    return (
      <ProjectUploadForm
        onClose={() => {
          setShowUploadForm(false);
          loadProjects();
        }}
      />
    );
  }

  // Calculate generic stats
  const totalViews = projects.reduce((acc, curr) => acc + (Math.floor(Math.random() * 50) + 10), 0);
  const totalInterests = projects.length * 3; // Mock logic

  return (
    <>
      <Helmet>
        <title>Owner Dashboard - AIP</title>
      </Helmet>

      <div className="min-h-screen bg-primary">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 font-serif">Project Management</h1>
              <p className="text-gray-400">Track verification status and investor engagement.</p>
            </div>
            <Button
              onClick={() => setShowUploadForm(true)}
              className="bg-accent text-primary hover:bg-white hover:text-primary font-bold shadow-lg shadow-accent/20"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submit New Project
            </Button>
          </div>

          {/* New Advisory Teaser */}
          <div className="bg-gradient-to-r from-secondary to-primary border border-white/10 rounded-2xl p-6 mb-12 flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="relative z-10">
                 <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                     <TrendingUp className="w-6 h-6 text-accent" />
                     Advisory Recommendations Available
                 </h2>
                 <p className="text-gray-400 max-w-xl">
                     Based on your recent project submissions, we've identified 3 services that could increase your bankability score by up to 20%.
                 </p>
             </div>
             <div className="relative z-10">
                 <Button onClick={() => navigate('/advisory-dashboard')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                     View Advisory Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
             </div>
          </div>

          {/* Verification Status - Show for most recent or first pending project */}
          {projects.length > 0 && (
             <div className="mb-12">
                <ProjectVerificationStatus 
                    status={projects[0].verificationStatus} 
                    step={projects[0].verificationStep} 
                />
             </div>
          )}

          {/* Analytics Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary/50 border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg"><Building2 className="w-6 h-6 text-blue-400" /></div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">All Time</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{projects.length}</div>
                <div className="text-sm text-gray-400">Active Projects</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-secondary/50 border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg"><Users className="w-6 h-6 text-accent" /></div>
                    <span className="text-xs text-green-400 flex items-center gap-1">+12% <BarChart3 className="w-3 h-3" /></span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{totalInterests}</div>
                <div className="text-sm text-gray-400">Interested Investors</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-secondary/50 border border-white/5 rounded-xl p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg"><Calendar className="w-6 h-6 text-purple-400" /></div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Pending</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">2</div>
                <div className="text-sm text-gray-400">Demo Requests</div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Project List */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-white mb-4 font-serif">Your Projects</h2>
                {projects.map((project) => (
                    <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-secondary rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{project.name}</h3>
                                    <VerificationBadge status={project.verificationStatus} showText={false} className="h-6 w-6 p-0 justify-center bg-accent/20" />
                                </div>
                                <div className="text-sm text-gray-400 mb-4">{project.location} • {project.sector}</div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white"><Edit className="w-4 h-4" /></Button>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteProject(project.id)}><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5 mt-2">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Status</div>
                                <div className={`text-sm font-medium ${project.verificationStatus === 'Verified' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                    {project.verificationStatus}
                                </div>
                            </div>
                             <div>
                                <div className="text-xs text-gray-500 mb-1">Bankability</div>
                                <div className="text-sm font-medium text-white">{project.bankabilityScore}/100</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Posted</div>
                                <div className="text-sm font-medium text-white">{new Date(project.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                
                {projects.length === 0 && (
                    <div className="text-center py-12 bg-secondary/30 rounded-xl border border-dashed border-gray-700">
                        <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No projects uploaded yet.</p>
                    </div>
                )}
            </div>

            {/* Sidebar Guidance */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-secondary to-primary border border-white/10 p-6 rounded-xl">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-accent" />
                        Verification Tips
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Ensure all financial projections cover at least 5 years.",
                            "Upload high-resolution site images to improve credibility.",
                            "Provide proof of land ownership early to speed up due diligence."
                        ].map((tip, i) => (
                            <li key={i} className="text-sm text-gray-300 flex gap-3">
                                <span className="text-accent font-bold">{i+1}.</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                    <Button variant="link" className="text-accent p-0 mt-4 h-auto">Read full guidelines &rarr;</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;