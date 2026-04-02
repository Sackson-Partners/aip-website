import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const PrivacyPolicyPage = () => {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'contact-us', title: 'Contact Us' },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | AFRICA Infrastructure Partners</title>
        <meta name="description" content="Privacy Policy for AFRICA Infrastructure Partners platform." />
      </Helmet>
      
      <ScrollToTop />

      <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-[#C9A23A] selection:text-[#1a1a1a]">
        <Navigation />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-[#C9A23A] font-medium max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
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
                  On this page
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
              <section id="introduction" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Introduction
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    AFRICA Infrastructure Partners ("AIP", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                  </p>
                  <p>
                    This policy applies to the AIP platform and all related services. By accessing or using our platform, you agree to the collection and use of information in accordance with this policy.
                  </p>
                </div>
              </section>

              <section id="information-we-collect" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Information We Collect
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#C9A23A]">
                    <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier, title, date of birth and gender.</li>
                    <li><strong className="text-white">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                    <li><strong className="text-white">Financial Data:</strong> includes bank account and payment card details.</li>
                    <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                    <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                  </ul>
                </div>
              </section>

              <section id="how-we-use" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  How We Use Your Information
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#C9A23A]">
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                  </ul>
                </div>
              </section>

              <section id="data-security" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Data Security
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                  </p>
                  <p>
                    We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                  </p>
                </div>
              </section>

              <section id="your-rights" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Your Rights
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-[#C9A23A]">
                    <li>Request access to your personal data.</li>
                    <li>Request correction of your personal data.</li>
                    <li>Request erasure of your personal data.</li>
                    <li>Object to processing of your personal data.</li>
                    <li>Request restriction of processing your personal data.</li>
                    <li>Request transfer of your personal data.</li>
                    <li>Right to withdraw consent.</li>
                  </ul>
                </div>
              </section>

              <section id="contact-us" className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#C9A23A] rounded-full"></span>
                  Contact Us
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <p className="mb-4">
                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicyPage;