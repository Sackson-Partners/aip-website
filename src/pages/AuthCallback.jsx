import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, AlertCircle } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Exchange the auth code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          throw error;
        }

        // Redirect to home page on success
        navigate('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Failed to verify email. The link may have expired or is invalid.');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
        <div className="bg-[#242936] p-8 rounded-xl shadow-2xl border border-red-900/30 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Verification Failed</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="text-[#C9A23A] hover:text-[#b08d32] font-medium text-sm hover:underline"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="bg-[#242936] p-8 rounded-xl shadow-2xl border border-white/5 max-w-md w-full text-center">
        <Loader2 className="w-10 h-10 text-[#C9A23A] animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Finishing sign-in...</h2>
        <p className="text-gray-400">Please wait while we verify your email.</p>
      </div>
    </div>
  );
};

export default AuthCallback;