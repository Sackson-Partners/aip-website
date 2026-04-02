import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LogOut, LayoutDashboard, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to || (to === '/insights' && location.pathname.startsWith('/insight'));
    return (
      <Link 
        to={to} 
        onClick={() => setIsOpen(false)}
        className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[#C9A23A]' : 'text-gray-300 hover:text-[#C9A23A]'}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#0F1419]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-[#0F1419] py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]">
            <Logo size={scrolled ? "sm" : "md"} showContainer={false} />
          </Link>

          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/sectors">{t.nav.sectors}</NavLink>
            <NavLink to="/services">{t.nav.services}</NavLink>
            <NavLink to="/insights">{t.nav.insights}</NavLink>
            <NavLink to="/contact">{t.nav.contact}</NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <LanguageSwitcher />
             {isAuthenticated ? (
                <div className="flex items-center gap-4">
                   <Link to="/dashboard">
                    <Button className="bg-[#C9A23A] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#C9A23A]/10"><LayoutDashboard className="w-4 h-4 mr-2" />{t.nav.dashboard}</Button>
                  </Link>
                  <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[#C9A23A]"><User className="w-4 h-4" /></div>
                      <Button onClick={handleLogout} variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"><LogOut className="w-4 h-4" /></Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <a href="https://app.africa-infra.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#C9A23A] text-[#0F1419] hover:bg-white hover:text-[#0F1419] font-bold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-[#C9A23A]/10 hover:scale-105">
                      AIP Platform
                    </Button>
                  </a>
                </div>
              )}
          </div>
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:text-[#C9A23A] transition-colors">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-[#0F1419] border-b border-white/10 overflow-hidden">
            <div className="px-4 py-6 space-y-4 flex flex-col items-center text-center">
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/sectors">{t.nav.sectors}</NavLink>
              <NavLink to="/services">{t.nav.services}</NavLink>
              <NavLink to="/insights">{t.nav.insights}</NavLink>
              <NavLink to="/contact">{t.nav.contact}</NavLink>
              
              <div className="pt-4 border-t border-white/10 mt-4 w-full">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}><Button className="w-full bg-[#C9A23A] text-[#0F1419] font-bold">{t.nav.dashboard}</Button></Link>
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><LogOut className="w-4 h-4 mr-2" /><span className="font-medium text-sm">{t.nav.logout}</span></button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <a href="https://app.africa-infra.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#C9A23A] text-[#0F1419] font-bold">
                        AIP Platform
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;