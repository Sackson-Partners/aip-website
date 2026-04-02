import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const DemoRequestHistory = ({ onBack }) => {
  const { currentUser } = useAuth();
  const [demoRequests, setDemoRequests] = useState([]);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    const userRequests = allRequests.filter(r => r.investorId === currentUser.id);
    setDemoRequests(userRequests);
  }, [currentUser.id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'Scheduled':
        return <Calendar className="w-5 h-5 text-blue-400" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
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
        <meta name="description" content="Track your demo requests and scheduled meetings." />
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
              <p className="text-gray-400">Track your demo requests and scheduled meetings</p>
            </div>
          </div>

          {demoRequests.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No demo requests yet</p>
              <p className="text-gray-500 mt-2">Request demos to see them here</p>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Request Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Scheduled Date</th>
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
                          <div className="text-white font-medium">{request.projectName}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {new Date(request.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {request.scheduledDate
                            ? new Date(request.scheduledDate).toLocaleDateString()
                            : '-'}
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

export default DemoRequestHistory;