import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const TermsOfServicePage = () => {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'use-license', title: 'Use License' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'limitations', title: 'Limitations of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact', title: 'Contact Information' },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service | AFRICA Infrastructure Partners</title>
        <meta name="description" content="Terms of Service for using the AFRICA Infrastructure Partners platform." />
      </Helmet>
      
      <ScrollToTop />

      <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-[#C9A23A] selection:text-[#1a1a1a]">
        <Navigation />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-[#C9A23A] font-medium max-w-2xl mx-auto">
              Please read these terms carefully before using the AIP platform.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 space-y-2 border-l border-white/10 pl-6">
                <h3 className="text-[#C9A23A] font-bold text-sm uppercase tracking-wider mb-4">
                  Sections
                </h3>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-gray-400 hover:text-white hover:border-l-2 hover:border-[#C9A23A] -ml-[26px] pl-[24px] py-1 text-sm transition-all duration-200"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              <section id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Acceptance of Terms
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    By accessing and using the AFRICA Infrastructure Partners (AIP) website and platform, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                  </p>
                  <p>
                    ANY PARTICIPATION IN THIS SERVICE WILL CONSTITUTE ACCEPTANCE OF THIS AGREEMENT. IF YOU DO NOT AGREE TO ABIDE BY THE ABOVE, PLEASE DO NOT USE THIS SERVICE.
                  </p>
                </div>
              </section>

              <section id="use-license" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Use License
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    Permission is granted to temporarily download one copy of the materials (information or software) on AIP's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#C9A23A]">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on AIP's website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                  </ul>
                  <p>
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by AIP at any time.
                  </p>
                </div>
              </section>

              <section id="disclaimer" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Disclaimer
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    The materials on AIP's website are provided on an 'as is' basis. AIP makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                  <p>
                    Further, AIP does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                  </p>
                </div>
              </section>

              <section id="limitations" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Limitations of Liability
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    In no event shall AIP or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AIP's website, even if AIP or an AIP authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                  <p>
                    Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                  </p>
                </div>
              </section>

              <section id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Governing Law
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of Senegal and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </div>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Contact Information
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <p className="mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-white">Email:</strong> legal@africa-infra.com</p>
                    <p><strong className="text-white">Address:</strong> Routes des Almadies, Dakar, Senegal</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfServicePage;