import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import InsightCard from './InsightCard';
import { aipApi } from '@/lib/aipApi';

const LatestAnalysisSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Fetch exactly 9 posts using aipApi
        const data = await aipApi.fetchInsights(9);
        setPosts(data);
      } catch (err) {
        console.error('Error fetching latest analysis:', err);
        setError('Failed to load analysis. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="latest-analysis">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">Latest Analysis</h2>
          <p className="text-lg text-gray-400">
            Fresh analysis, market briefs, and playbooks—written for decision-makers.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-12 h-12 text-[#d4b04c] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400 bg-[#0f1620] rounded-xl border border-red-500/20">
          <p>{error}</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {posts.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post) => (
                <InsightCard key={post.id} post={post} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-32 text-gray-500 bg-[#0f1620] rounded-xl border border-white/5">
              <p>No analysis articles available at the moment.</p>
            </div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default LatestAnalysisSection;