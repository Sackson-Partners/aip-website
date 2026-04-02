import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#151925] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <Logo size="lg" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/africa-infrastructure-partners/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1f2e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-white/5 hover:border-[#D4AF37]/30">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/aip_africa26" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1f2e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-white/5 hover:border-[#D4AF37]/30">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/aip_africa26/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#1a1f2e] flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-white/5 hover:border-[#D4AF37]/30">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
              {t.footer.platform}
            </span>
            <ul className="space-y-4">
              <li>
                <Link to="/sectors" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                  {t.nav.sectors}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                  {t.nav.insights}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                  {t.nav.login}
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></span>
                  {t.nav.getStarted}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
              {t.footer.legal}
            </span>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">{t.footer.privacyPolicy}</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-[#D4AF37] transition-colors">{t.footer.termsOfService}</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">{t.footer.cookiePolicy}</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <span className="text-white font-serif font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#D4AF37] rounded-full"></span>
              {t.footer.contact}
            </span>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <span>Routes des Almadies, Dakar, Senegal</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <a href="mailto:info@africa-infra.com" className="hover:text-white transition-colors">info@africa-infra.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <a href="tel:+221774867927" className="hover:text-white transition-colors">+221 77 486 79 27</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2023 - {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
             <span>{t.footer.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;