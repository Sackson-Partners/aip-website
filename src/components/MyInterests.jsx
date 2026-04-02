import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';

const MyInterests = ({ onBack }) => {
  const { currentUser } = useAuth();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const allInterests = JSON.parse(localStorage.getItem('interests') || '[]');
    const userInterests = allInterests.filter(i => i.investorId === currentUser.id);
    setInterests(userInterests);
  }, [currentUser.id]);

  return (
    <>
      <Helmet>
        <title>My Interests - Africa Infrastructure Connect</title>
        <meta name="description" content="Track your investment interests and project engagements." />
      </Helmet>

      <div className="min-h-screen bg-slate-950">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Interests</h1>
              <p className="text-gray-400">Track projects you're interested in</p>
            </div>
          </div>

          {interests.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No interests yet</p>
              <p className="text-gray-500 mt-2">Express interest in projects to track them here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-6 hover:border-teal-600/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{interest.projectName}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(interest.date).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-teal-600/20 text-teal-400 text-xs rounded-full">
                      {interest.status}
                    </span>
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    You expressed interest in this project. The project owner has been notified.
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInterests;