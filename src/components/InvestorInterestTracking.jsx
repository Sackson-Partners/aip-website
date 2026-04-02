import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Users, Mail, Building2, DollarSign } from 'lucide-react';

const InvestorInterestTracking = ({ onBack }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const userProjects = allProjects.filter(p => p.ownerId === currentUser.id);
    const projectIds = userProjects.map(p => p.id);

    const allInterests = JSON.parse(localStorage.getItem('interests') || '[]');
    const relevantInterests = allInterests.filter(i => projectIds.includes(i.projectId));
    setInterests(relevantInterests);
  }, [currentUser.id]);

  const handleContact = (interest) => {
    toast({
      title: "Contact Investor",
      description: `Email: ${interest.investorEmail}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Investor Interest - Africa Infrastructure Connect</title>
        <meta name="description" content="View and manage investors interested in your projects." />
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
              <h1 className="text-3xl font-bold text-white mb-2">Investor Interest</h1>
              <p className="text-gray-400">View investors interested in your projects</p>
            </div>
          </div>

          {interests.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No investor interest yet</p>
              <p className="text-gray-500 mt-2">When investors express interest, they'll appear here</p>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Investor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Investment Range</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {interests.map((interest) => (
                      <motion.tr
                        key={interest.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-600/20 rounded-full flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-teal-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{interest.investorName}</div>
                              <div className="text-gray-400 text-sm">{interest.investorEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white">{interest.projectName}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <DollarSign className="w-4 h-4 text-teal-400" />
                            {interest.investmentRange}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(interest.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => handleContact(interest)}
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700 text-white"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvestorInterestTracking;