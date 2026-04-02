import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Globe, TrendingUp, Check, ArrowRight, Sparkles, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useFormModal } from '@/contexts/FormModalContext';
import { useLanguage } from '@/contexts/LanguageContext';

const PublicHomePage = () => {
  const navigate = useNavigate();
  const { openModal } = useFormModal();
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.home.metaTitle}</title>
        <meta name="description" content={t.home.metaDesc} />
      </Helmet>
      
      <div className="min-h-screen bg-[#0F1419] font-sans selection:bg-[#D4AF37] selection:text-[#0F1419] overflow-x-hidden">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419] via-[#0F1419] to-[#161b26] z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] z-0" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.5 }} 
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8"
             >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-medium tracking-wide">{t.home.accelerating}</span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.5, delay: 0.1 }} 
               className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-serif leading-tight"
             >
                {t.home.title1} <br />
                <span className="text-[#D4AF37]">{t.home.title2}</span> <br />
                {t.home.title3}
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.5, delay: 0.2 }} 
               className="text-lg md:text-xl text-gray-400 mb-10 max-w-4xl mx-auto leading-relaxed"
             >
                {t.home.description}
             </motion.p>

             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.5, delay: 0.3 }} 
               className="flex flex-col sm:flex-row items-center justify-center gap-4"
             >
                <Button 
                   onClick={() => openModal('subscribe')}
                  className="bg-[#D4AF37] text-[#0F1419] hover:bg-[#bfa035] font-bold text-lg px-8 py-7 rounded-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 hover:scale-105"
                >
                    {t.home.accessData}
                </Button>
                
                <Button 
                   onClick={() => openModal('demo')}
                  className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 font-bold text-lg px-8 py-7 rounded-lg transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                    <Laptop className="w-5 h-5" />
                    {t.home.requestDemo}
                </Button>
             </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-[#0F1419] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[{
                      label: t.home.stats.projectsListed,
                      value: "300M+"
                    }, {
                      label: t.home.stats.activeProjects,
                      value: "150+"
                    }, {
                      label: t.home.stats.countries,
                      value: "4"
                    }, {
                      label: t.home.stats.globalInvestors,
                      value: "100+" 
                    }].map((stat, idx) => (
                        <div key={idx} className="bg-[#151a21] border border-white/5 rounded-xl p-8 text-center hover:border-[#D4AF37]/30 transition-all duration-300 shadow-lg hover:shadow-xl group">
                            <div className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] mb-2 group-hover:scale-105 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose AIP? Section */}
        <section id="why-aip" className="py-24 bg-[#0F1419] relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.home.whyAip.title}</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t.home.whyAip.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[{
                      icon: Shield,
                      title: t.home.whyAip.feature1Title,
                      desc: t.home.whyAip.feature1Desc
                    }, {
                      icon: Zap,
                      title: t.home.whyAip.feature2Title,
                      desc: t.home.whyAip.feature2Desc
                    }, {
                      icon: Globe,
                      title: t.home.whyAip.feature3Title, 
                      desc: t.home.whyAip.feature3Desc
                    }, {
                      icon: TrendingUp,
                      title: t.home.whyAip.feature4Title,
                      desc: t.home.whyAip.feature4Desc
                    }].map((feature, idx) => (
                        <div key={idx} className="bg-[#151a21] border border-white/5 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                            <div className="w-14 h-14 bg-[#D4AF37] rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Built for Modern Infrastructure delivery Section */}
        <section id="how-it-works" className="py-24 bg-[#0F1419] relative z-10 mb-20">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-white/10 rounded-3xl p-8 md:p-16 bg-[#151a21]/50 backdrop-blur-sm">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                                {t.home.builtFor.title1} <br />
                                {t.home.builtFor.title2} <span className="text-[#D4AF37]">{t.home.builtFor.title3}</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                {t.home.builtFor.desc}
                            </p>
                            <Button className="bg-[#D4AF37] text-[#0F1419] hover:bg-[#bfa035] font-bold px-8 py-6 rounded-lg text-lg transition-all shadow-lg shadow-[#D4AF37]/10" onClick={() => navigate('/get-started')}>
                                {t.home.builtFor.btn}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {t.home.builtFor.points.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-[#0F1419] border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
                                    <div className="w-6 h-6 rounded-full border border-[#D4AF37] flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-[#D4AF37]" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PublicHomePage;