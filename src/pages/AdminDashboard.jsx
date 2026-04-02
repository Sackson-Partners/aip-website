import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Mic, Mail, Settings, PieChart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const adminModules = [
    {
      title: "Sectors Manager",
      desc: "Manage infrastructure sectors and detailed pages.",
      icon: PieChart,
      link: "/admin/sectors",
      color: "text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
    },
    {
      title: "Services Manager",
      desc: "Update services offerings and descriptions.",
      icon: Briefcase,
      link: "/admin/services",
      color: "text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10"
    },
    {
      title: "Insights & News",
      desc: "Publish articles, briefs, and analytics reports.",
      icon: FileText,
      link: "/admin/insights",
      color: "text-amber-400 border-amber-400/20 hover:bg-amber-400/10"
    },
    {
      title: "Podcast Manager",
      desc: "Manage shows and upload new episodes.",
      icon: Mic,
      link: "/admin/podcast",
      color: "text-purple-400 border-purple-400/20 hover:bg-purple-400/10"
    },
    {
      title: "Contact Submissions",
      desc: "View messages from the contact form.",
      icon: Mail,
      link: "/admin/contact-submissions",
      color: "text-rose-400 border-rose-400/20 hover:bg-rose-400/10"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AIP</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome back, <span className="text-[#D4AF37]">{currentUser?.full_name || 'Admin'}</span>. Manage platform content and data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module, idx) => (
              <Link 
                key={idx} 
                to={module.link}
                className={`p-6 rounded-xl border bg-[#151a21] transition-all duration-300 group ${module.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-[#0F1419] ${module.color.split(' ')[0]}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <Settings className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                <p className="text-sm text-gray-400">{module.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;