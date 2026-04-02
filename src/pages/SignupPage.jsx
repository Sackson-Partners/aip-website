import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useRegistrationProfileTypes } from '@/hooks/useRegistrationProfileTypes';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const SignupPage = () => {
  const navigate = useNavigate();
  const { types, loading: typesLoading, error: typesError } = useRegistrationProfileTypes();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    accountTypeSlug: '',
    phone: '',
    country: '',
    company: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    
    if (!formData.accountTypeSlug) {
      newErrors.accountTypeSlug = 'Please select a category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            account_type_slug: formData.accountTypeSlug,
            phone: formData.phone,
            company: formData.company,
            country: formData.country,
          }
        }
      });

      if (error) throw error;

      if (data?.user) {
        setSubmitSuccess(true);
        // Optional: Redirect after a few seconds or allow user to read success message
        setTimeout(() => {
            // Check if email confirmation is required based on session
            if (data.session) {
                navigate('/dashboard');
            }
        }, 3000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      // Enhanced error handling for email issues
      const errorMessage = err.message || '';
      if (errorMessage.includes('Error sending confirmation email') || errorMessage.includes('rate limit')) {
        setSubmitError('Account created, but we encountered an issue sending the verification email. Please contact support.');
      } else {
        setSubmitError(errorMessage || 'An error occurred during registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | AFRICA Infrastructure Partners</title>
        <meta name="description" content="Create your account to access exclusive insights and opportunities on the AIP platform." />
      </Helmet>

      <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-[#C9A23A] selection:text-[#1a1a1a]">
        <Navigation />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[560px]"
          >
            {/* Hero Section */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Join <span className="text-[#C9A23A]">AFRICA</span> Infrastructure Partners
              </h1>
              <p className="text-lg text-gray-400">
                Create your account to access exclusive insights and opportunities
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-[#242936] p-8 md:p-10 rounded-2xl shadow-xl border border-white/5">
              
              {submitSuccess ? (
                <div className="bg-[#e9ffe5] border border-[#baf0ba] rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Account Created Successfully!</h3>
                  <p className="text-green-700 mb-4">
                    Please check your email to confirm your account before logging in.
                  </p>
                  <Link to="/login">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold w-full rounded-xl">
                      Proceed to Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {submitError && (
                    <div className="bg-[#ffe5e5] border border-[#ffb3b3] rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-red-800 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">Full Name <span className="text-[#C9A23A]">*</span></label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full bg-white text-[#111111] border ${errors.fullName ? 'border-red-500' : 'border-[#ddd]'} rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address <span className="text-[#C9A23A]">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white text-[#111111] border ${errors.email ? 'border-red-500' : 'border-[#ddd]'} rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400`}
                        placeholder="name@company.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password <span className="text-[#C9A23A]">*</span></label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full bg-white text-[#111111] border ${errors.password ? 'border-red-500' : 'border-[#ddd]'} rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400`}
                        placeholder="Create a password"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                      {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Category / Account Type */}
                    <div>
                      <label htmlFor="accountTypeSlug" className="block text-sm font-medium text-gray-300 mb-2">Category <span className="text-[#C9A23A]">*</span></label>
                      <div className="relative">
                        <select
                          id="accountTypeSlug"
                          name="accountTypeSlug"
                          value={formData.accountTypeSlug}
                          onChange={handleChange}
                          disabled={typesLoading}
                          className={`w-full bg-white text-[#111111] border ${errors.accountTypeSlug ? 'border-red-500' : 'border-[#ddd]'} rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-500`}
                        >
                          <option value="">Select your profile type...</option>
                          {types.map((type) => (
                            <option key={type.id} value={type.slug}>{type.title}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                           {typesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                           )}
                        </div>
                      </div>
                      {errors.accountTypeSlug && <p className="text-red-400 text-xs mt-1">{errors.accountTypeSlug}</p>}
                      {typesError && <p className="text-yellow-500 text-xs mt-1">Failed to load categories. Please refresh.</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company / Organization <span className="text-gray-500 text-xs ml-1">(Optional)</span></label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white text-[#111111] border border-[#ddd] rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400"
                        placeholder="Your organization name"
                      />
                    </div>

                    {/* Phone & Country (Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone <span className="text-gray-500 text-xs ml-1">(Optional)</span></label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-white text-[#111111] border border-[#ddd] rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">Country <span className="text-gray-500 text-xs ml-1">(Optional)</span></label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-white text-[#111111] border border-[#ddd] rounded-[10px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A23A]/50 transition-all placeholder:text-gray-400"
                          placeholder="Country of residence"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || typesLoading}
                      className="w-full bg-[#C9A23A] text-[#111111] hover:bg-[#b08d32] font-bold py-4 rounded-[12px] shadow-lg shadow-[#C9A23A]/20 transition-all transform hover:scale-[1.01] text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" /> Creating...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Footer Links */}
              <div className="mt-8 text-center text-sm text-gray-400">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#C9A23A] hover:underline font-medium">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SignupPage;