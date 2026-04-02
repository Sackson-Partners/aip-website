import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/customSupabaseClient';
import { format } from 'date-fns';

const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Submissions - Admin AIP</title>
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] font-sans text-gray-300">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-serif font-bold text-white">Contact Submissions</h1>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200">
              Error: {error}
            </div>
          ) : (
            <div className="bg-[#151a21] border border-white/5 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1a2029] border-b border-white/5 text-xs uppercase text-gray-400 font-medium">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">From</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                          No submissions found.
                        </td>
                      </tr>
                    ) : (
                      submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(sub.created_at), 'MMM dd, yyyy')}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {format(new Date(sub.created_at), 'HH:mm')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-white">{sub.name}</div>
                            <div className="text-sm text-[#D4AF37] flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {sub.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {sub.subject || <span className="text-gray-600 italic">No Subject</span>}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                            {sub.message}
                          </td>
                        </tr>
                      ))
                    )}
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

export default AdminContactSubmissions;