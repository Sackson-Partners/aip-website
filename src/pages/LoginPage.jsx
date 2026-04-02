import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Lock, User, Building2, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          className: "bg-[#0F1419] border-[#D4AF37] text-white"
        });
        navigate('/dashboard');
      } else {
        console.error("Login failed:", result.error);
        toast({
          title: "Login Failed",
          description: result.error?.message || result.error || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login unexpected error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - AFRICA Infrastructure Partners</title>
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1698316738298-7f92b28225e4')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-transparent to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-[#151a21]/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/5 p-8">
            <div className="flex justify-center mb-8">
              <Link to="/">
                <Logo size="lg" />
              </Link>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 font-serif">Welcome Back</h1>
              <p className="text-gray-400">Sign in to access the platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] text-[#0F1419] hover:bg-white hover:text-[#0F1419] py-6 rounded-xl text-lg font-bold shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#D4AF37] hover:text-white font-medium transition-colors">
                  Register now
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
                 <Link to="/" className="text-xs text-gray-500 hover:text-gray-300">Return to Home</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;