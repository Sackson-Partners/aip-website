import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'investor' // Default
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
        const result = await register({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            userType: formData.userType,
            companyName: formData.fullName // Simplification for now
        });

        if (result.success) {
          toast({
            title: "Registration Successful",
            description: "Welcome to AFRICA Infrastructure Partners!",
            className: "bg-[#0F1419] border-[#D4AF37] text-white"
          });
          navigate('/dashboard'); // Auto-login handles session usually, redirect
        } else {
          // Handle specific email errors
          const errorMessage = result.error?.message || result.error || "Registration failed";
          
          if (errorMessage.includes('Error sending confirmation email')) {
             toast({
                title: "Email Service Error",
                description: "Account created, but confirmation email failed to send. Please contact support.",
                variant: "destructive",
             });
          } else {
             toast({
                title: "Registration Failed",
                description: errorMessage, 
                variant: "destructive",
             });
          }
        }
    } catch (error) {
        console.error("Registration error:", error);
        
        let msg = "An unexpected error occurred";
        const errorMessage = error.message || '';
        
        if (errorMessage.includes('confirmation email') || errorMessage.includes('SMTP')) {
            msg = "Error sending confirmation email. Please try again later or contact support.";
        } else {
            msg = errorMessage;
        }

        toast({
            title: "Error",
            description: msg,
            variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - AFRICA Infrastructure Partners</title>
      </Helmet>

      <div className="min-h-screen bg-[#0F1419] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622115469132-124ec9f88fca')] opacity-5 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="relative z-10 mb-8">
           <Link to="/">
             <Logo size="lg" />
           </Link>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md relative z-10"
        >
           <div className="bg-[#151a21]/80 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-2 font-serif text-center">Create Account</h2>
                <p className="text-gray-400 text-sm mb-6 text-center">Join the infrastructure platform.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input 
                            type="text" 
                            required 
                            className="w-full px-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            required 
                            className="w-full px-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full px-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            required 
                            className="w-full px-4 py-3 bg-[#0F1419] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-[#D4AF37] outline-none"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#D4AF37] text-[#1a1f2e] hover:bg-white font-bold py-6 rounded-xl mt-4 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center border-t border-white/5 pt-6">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#D4AF37] hover:text-white font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
            </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;