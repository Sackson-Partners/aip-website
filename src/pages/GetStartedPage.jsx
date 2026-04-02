import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle, ArrowLeft, Building2, Globe, User, Mail, Lock } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const GetStartedPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userTypes, setUserTypes] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    country: '',
    termsAccepted: false
  });

  // Fetch User Types
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('user_types')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) {
          console.error('Supabase error fetching user types:', error);
          throw new Error('Failed to load user types. Please try again later.');
        }
        setUserTypes(data || []);
      } catch (err) {
        console.error('Error fetching user types:', err);
        setError('Unable to load registration options. Please refresh the page.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchUserTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.userType) return "Please select a User Type.";
    if (!formData.fullName.trim()) return "Full Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.password || formData.password.length < 8) return "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
    if (!formData.termsAccepted) return "You must accept the Terms of Service.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            user_type_slug: formData.userType,
            organization: formData.company,
            country: formData.country,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (data) {
        setSuccess(true);
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account.",
          className: "bg-green-600 text-white border-none",
        });
      }

    } catch (err) {
      console.error('Signup error:', err);
      
      // Specific handling for email confirmation errors (SMTP misconfiguration or rate limits)
      const errorMessage = err.message || '';
      if (errorMessage.includes('Error sending confirmation email') || errorMessage.includes('rate limit')) {
        setError('Account created, but we could not send the verification email. This is likely a temporary service issue. Please contact support.');
        toast({
          title: "Email Delivery Issue",
          description: "We couldn't send the verification email. Please try again later or contact support.",
          variant: "destructive",
        });
      } else {
        setError(errorMessage || 'An error occurred during sign up.');
        toast({
          title: "Registration Failed",
          description: errorMessage || "Could not create account.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A23A] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Get Started | AFRICA Infrastructure Partners</title>
        <meta name="description" content="Create your account to access exclusive insights and opportunities." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#0f1218] font-sans text-gray-300 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <Logo size="xl" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 tracking-tight">
            Join the Platform
          </h1>
          <p className="text-[#C9A23A] text-lg font-medium max-w-xl mx-auto">
            Access exclusive infrastructure insights and investment opportunities
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[600px] bg-[#242936] p-8 md:p-10 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A23A]/5 rounded-bl-full pointer-events-none" />
          
          {success ? (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                We've sent a confirmation link to <span className="text-white font-medium">{formData.email}</span>. 
                Please click the link to verify your account and complete your registration.
              </p>
              <div className="space-y-4">
                 <Link to="/login">
                  <Button className="w-full bg-white text-[#1a1a1a] hover:bg-gray-200 font-bold py-3 rounded-lg">
                    Proceed to Login
                  </Button>
                </Link>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-sm text-gray-500 hover:text-gray-300"
                >
                  Back to Sign Up
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* User Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">
                  I am a... <span className="text-[#C9A23A]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all"
                  >
                    <option value="" disabled>Select your role</option>
                    {userTypes.map((type) => (
                      <option key={type.slug} value={type.slug}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Name & Email */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Full Name <span className="text-[#C9A23A]">*</span></label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address <span className="text-[#C9A23A]">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password <span className="text-[#C9A23A]">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 8 chars"
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Confirm <span className="text-[#C9A23A]">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Organization & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Company <span className="text-gray-500 text-xs">(Optional)</span></label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Organization Ltd."
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Country <span className="text-gray-500 text-xs">(Optional)</span></label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="South Africa"
                      className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 focus:border-[#C9A23A] transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-600 bg-[#1a1a1a] transition-all checked:border-[#C9A23A] checked:bg-[#C9A23A] group-hover:border-[#C9A23A]"
                    />
                    <CheckCircle className="absolute inset-0 w-5 h-5 text-[#111] opacity-0 peer-checked:opacity-100 pointer-events-none p-0.5" />
                  </div>
                  <span className="text-sm text-gray-400 leading-tight">
                    I agree to the <Link to="/terms-of-service" className="text-[#C9A23A] hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-[#C9A23A] hover:underline">Privacy Policy</Link>.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#C9A23A] text-[#111111] hover:bg-[#b08d32] font-bold py-4 h-auto rounded-xl shadow-lg shadow-[#C9A23A]/10 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center space-y-4">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C9A23A] hover:text-[#b08d32] font-semibold hover:underline">
                Log In
              </Link>
            </p>
            <Link to="/" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-300 transition-colors">
                <ArrowLeft className="w-3 h-3 mr-1" /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default GetStartedPage;