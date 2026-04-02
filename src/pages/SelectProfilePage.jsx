import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Building2, Landmark, HardHat, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

const SelectProfilePage = () => {
  const navigate = useNavigate();

  const profiles = [
    {
      id: 'investor',
      title: "Impact Investor",
      description: "Funds and organizations focused on social and environmental returns.",
      icon: Briefcase,
      path: "/investor-dashboard"
    },
    {
      id: 'sponsor',
      title: "Project Sponsor",
      description: "Developers and private sponsors raising capital for infrastructure.",
      icon: Building2,
      path: "/sponsor-dashboard"
    },
    {
      id: 'government',
      title: "Government & PPP Unit",
      description: "Public sector entities structuring and tendering infrastructure projects.",
      icon: Landmark,
      path: "/government-dashboard"
    },
    {
      id: 'epc',
      title: "EPC Contractor",
      description: "Engineering, procurement, and construction firms building Africa's future.",
      icon: HardHat,
      path: "/epc-dashboard"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Select Profile | AIP - Get Started</title>
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] font-sans flex flex-col relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        </div>

        {/* Header */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
             <Logo />
          </Link>
          <div className="hidden sm:block text-sm text-gray-500 font-medium">
             Building Africa's Infrastructure Together
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center px-4 py-8 relative z-10">
          <div className="max-w-5xl w-full">
            
            {/* Progress Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center mb-12"
            >
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0F1419] font-bold flex items-center justify-center text-lg shadow-[0_0_15px_rgba(212,176,76,0.5)]">1</div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Role</span>
                 </div>
                 <div className="w-16 h-[2px] bg-gray-800 rounded-full" />
                 <div className="flex flex-col items-center gap-2 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#151a21] border border-gray-700 text-gray-500 font-bold flex items-center justify-center text-lg">2</div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Details</span>
                 </div>
                 <div className="w-16 h-[2px] bg-gray-800 rounded-full" />
                 <div className="flex flex-col items-center gap-2 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-[#151a21] border border-gray-700 text-gray-500 font-bold flex items-center justify-center text-lg">3</div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Access</span>
                 </div>
              </div>
            </motion.div>

            {/* Title Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Select Your <span className="text-[#D4AF37]">Profile</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Choose the role that best describes your organization to access tailored tools and intelligence.
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {profiles.map((profile, idx) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  onClick={() => navigate(profile.path)}
                  className="group cursor-pointer bg-[#151a21]/80 backdrop-blur-sm border border-white/5 hover:border-[#D4AF37] rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,176,76,0.1)] hover:-translate-y-2 flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300 relative z-10">
                    <profile.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#0F1419] transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors relative z-10 leading-tight">
                    {profile.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-8 leading-relaxed text-sm flex-grow relative z-10">
                    {profile.description}
                  </p>
                  
                  <div className="flex items-center text-[#D4AF37] font-bold text-sm tracking-wide uppercase mt-auto relative z-10">
                    Select <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Footer Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
                 <p className="text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#D4AF37] hover:text-white font-bold transition-colors ml-1">
                       Sign in
                    </Link>
                 </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProfilePage;