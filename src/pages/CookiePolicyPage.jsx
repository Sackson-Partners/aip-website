import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const CookiePolicyPage = () => {
  const sections = [
    { id: 'what-are-cookies', title: 'What Are Cookies' },
    { id: 'types-of-cookies', title: 'Types of Cookies We Use' },
    { id: 'cookie-management', title: 'Cookie Management' },
    { id: 'third-party', title: 'Third-Party Cookies' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <>
      <Helmet>
        <title>Cookie Policy | AFRICA Infrastructure Partners</title>
        <meta name="description" content="Cookie Policy explaining how we use cookies on the AFRICA Infrastructure Partners platform." />
      </Helmet>
      
      <ScrollToTop />

      <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-[#C9A23A] selection:text-[#1a1a1a]">
        <Navigation />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-[#C9A23A] font-medium max-w-2xl mx-auto">
              This policy explains how we use cookies and similar technologies to recognize you when you visit our website.
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
              <section id="what-are-cookies" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  What Are Cookies
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                  </p>
                  <p>
                    Cookies set by the website owner (in this case, AIP) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics).
                  </p>
                </div>
              </section>

              <section id="types-of-cookies" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Types of Cookies We Use
                </h2>
                <div className="space-y-6 leading-relaxed text-gray-300">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-2">Essential Cookies</h3>
                    <p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-2">Performance and Functionality Cookies</h3>
                    <p>These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-2">Analytics and Customization Cookies</h3>
                    <p>These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</p>
                  </div>
                </div>
              </section>

              <section id="cookie-management" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Cookie Management
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                  </p>
                  <p>
                    You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                  </p>
                </div>
              </section>

              <section id="third-party" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Third-Party Cookies
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                  </p>
                </div>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Contact Us
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <p className="mb-4">
                    If you have any questions about our use of cookies or other technologies, please email us at:
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-white">Email:</strong> privacy@africa-infra.com</p>
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

export default CookiePolicyPage;