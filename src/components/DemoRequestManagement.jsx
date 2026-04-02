import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const DemoRequestManagement = ({ onBack }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [demoRequests, setDemoRequests] = useState([]);

  useEffect(() => {
    loadDemoRequests();
  }, [currentUser.id]);

  const loadDemoRequests = () => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const userProjects = allProjects.filter(p => p.ownerId === currentUser.id);
    const projectIds = userProjects.map(p => p.id);

    const allRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    const relevantRequests = allRequests.filter(r => projectIds.includes(r.projectId));
    setDemoRequests(relevantRequests);
  };

  const handleSchedule = (requestId) => {
    const allRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    const updatedRequests = allRequests.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'Scheduled',
          scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        };
      }
      return r;
    });

    localStorage.setItem('demoRequests', JSON.stringify(updatedRequests));
    loadDemoRequests();

    toast({
      title: "Demo Scheduled",
      description: "The investor has been notified of the scheduled demo",
    });
  };

  const handleComplete = (requestId) => {
    const allRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    const updatedRequests = allRequests.map(r => {
      if (r.id === requestId) {
        return { ...r, status: 'Completed' };
      }
      return r;
    });

    localStorage.setItem('demoRequests', JSON.stringify(updatedRequests));
    loadDemoRequests();

    toast({
      title: "Demo Marked Complete",
      description: "This demo has been marked as completed",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'Scheduled':
        return 'bg-blue-600/20 text-blue-400';
      case 'Completed':
        return 'bg-green-600/20 text-green-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <>
      <Helmet>
        <title>Demo Requests - Africa Infrastructure Connect</title>
        <meta name="description" content="Manage demo requests from interested investors." />
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
              <h1 className="text-3xl font-bold text-white mb-2">Demo Requests</h1>
              <p className="text-gray-400">Manage demo requests from interested investors</p>
            </div>
          </div>

          {demoRequests.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No demo requests yet</p>
              <p className="text-gray-500 mt-2">Demo requests from investors will appear here</p>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Investor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Request Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Scheduled</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {demoRequests.map((request) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{request.investorName}</div>
                              <div className="text-gray-400 text-sm">{request.investorEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white">{request.projectName}</td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(request.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {request.scheduledDate
                            ? new Date(request.scheduledDate).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {request.status === 'Pending' && (
                              <Button
                                onClick={() => handleSchedule(request.id)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                Schedule
                              </Button>
                            )}
                            {request.status === 'Scheduled' && (
                              <Button
                                onClick={() => handleComplete(request.id)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Complete
                              </Button>
                            )}
                          </div>
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

export default DemoRequestManagement;