import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

// Comprehensive list of countries for the dropdown
const countries = [
  { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Antigua and Barbuda", code: "+1-268" },
  { name: "Argentina", code: "+54" }, { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" }, { name: "Azerbaijan", code: "+994" }, { name: "Bahamas", code: "+1-242" },
  { name: "Bahrain", code: "+973" }, { name: "Bangladesh", code: "+880" }, { name: "Barbados", code: "+1-246" },
  { name: "Belarus", code: "+375" }, { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" }, { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" }, { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" }, { name: "Bulgaria", code: "+359" }, { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" }, { name: "Cabo Verde", code: "+238" }, { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" }, { name: "Canada", code: "+1" }, { name: "Central African Republic", code: "+236" },
  { name: "Chad", code: "+235" }, { name: "Chile", code: "+56" }, { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" }, { name: "Comoros", code: "+269" }, { name: "Congo (DRC)", code: "+243" },
  { name: "Congo (Republic)", code: "+242" }, { name: "Costa Rica", code: "+506" }, { name: "Cote d'Ivoire", code: "+225" },
  { name: "Croatia", code: "+385" }, { name: "Cuba", code: "+53" }, { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" }, { name: "Denmark", code: "+45" }, { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1-767" }, { name: "Dominican Republic", code: "+1-809" }, { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" }, { name: "El Salvador", code: "+503" }, { name: "Equatorial Guinea", code: "+240" },
  { name: "Eritrea", code: "+291" }, { name: "Estonia", code: "+372" }, { name: "Eswatini", code: "+268" },
  { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" }, { name: "Finland", code: "+358" },
  { name: "France", code: "+33" }, { name: "Gabon", code: "+241" }, { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" }, { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" }, { name: "Grenada", code: "+1-473" }, { name: "Guatemala", code: "+502" },
  { name: "Guinea", code: "+224" }, { name: "Guinea-Bissau", code: "+245" }, { name: "Guyana", code: "+592" },
  { name: "Haiti", code: "+509" }, { name: "Honduras", code: "+504" }, { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" }, { name: "India", code: "+91" }, { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" }, { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" }, { name: "Jamaica", code: "+1-876" },
  { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" }, { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" }, { name: "Kiribati", code: "+686" }, { name: "Korea, North", code: "+850" },
  { name: "Korea, South", code: "+82" }, { name: "Kosovo", code: "+383" }, { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" }, { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" }, { name: "Lesotho", code: "+266" }, { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" }, { name: "Liechtenstein", code: "+423" }, { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" }, { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" }, { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" }, { name: "Marshall Islands", code: "+692" }, { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" }, { name: "Mexico", code: "+52" }, { name: "Micronesia", code: "+691" },
  { name: "Moldova", code: "+373" }, { name: "Monaco", code: "+377" }, { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" }, { name: "Morocco", code: "+212" }, { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" }, { name: "Namibia", code: "+264" }, { name: "Nauru", code: "+674" },
  { name: "Nepal", code: "+977" }, { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" }, { name: "Niger", code: "+227" }, { name: "Nigeria", code: "+234" },
  { name: "North Macedonia", code: "+389" }, { name: "Norway", code: "+47" }, { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" }, { name: "Palau", code: "+680" }, { name: "Palestine", code: "+970" },
  { name: "Panama", code: "+507" }, { name: "Papua New Guinea", code: "+675" }, { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" }, { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" }, { name: "Qatar", code: "+974" }, { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" }, { name: "Rwanda", code: "+250" }, { name: "Saint Kitts and Nevis", code: "+1-869" },
  { name: "Saint Lucia", code: "+1-758" }, { name: "Saint Vincent and Grenadines", code: "+1-784" }, { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" }, { name: "Sao Tome and Principe", code: "+239" }, { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" }, { name: "Serbia", code: "+381" }, { name: "Seychelles", code: "+248" },
  { name: "Sierra Leone", code: "+232" }, { name: "Singapore", code: "+65" }, { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" }, { name: "Solomon Islands", code: "+677" }, { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" }, { name: "South Sudan", code: "+211" }, { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" }, { name: "Sudan", code: "+249" }, { name: "Suriname", code: "+597" },
  { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" }, { name: "Tajikistan", code: "+992" }, { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" }, { name: "Timor-Leste", code: "+670" }, { name: "Togo", code: "+228" },
  { name: "Tonga", code: "+676" }, { name: "Trinidad and Tobago", code: "+1-868" }, { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" }, { name: "Turkmenistan", code: "+993" }, { name: "Tuvalu", code: "+688" },
  { name: "Uganda", code: "+256" }, { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" }, { name: "United States", code: "+1" }, { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" }, { name: "Vanuatu", code: "+678" }, { name: "Vatican City", code: "+39" },
  { name: "Venezuela", code: "+58" }, { name: "Vietnam", code: "+84" }, { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" }, { name: "Zimbabwe", code: "+263" }
];

// Custom styled Checkbox
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-white data-[state=checked]:border-[#D4AF37]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const ProjectsDataPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneCountry: 'France',
    phoneNumber: '',
    companyName: '',
    industry: '',
    role: '',
    tools: []
  });

  const toolsOptions = [
    "Smart search",
    "Tender & pipeline alerts",
    "Verification / Risk Assessments",
    "Bankability score",
    "Investor–project matching",
    "Local insights",
    "Stakeholder interviews / podcasts",
    "Not applicable"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToolToggle = (tool) => {
    setFormData(prev => {
      if (prev.tools.includes(tool)) {
        return { ...prev, tools: prev.tools.filter(t => t !== tool) };
      } else {
        return { ...prev, tools: [...prev.tools, tool] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic Validation
    if (!formData.fullName || !formData.workEmail || !formData.phoneNumber || !formData.companyName || !formData.industry || !formData.role) {
       toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email Validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.workEmail)) {
        toast({
        title: "Invalid Email",
        description: "Please enter a valid work email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Submitted Successfully",
        description: "Thank you! Our team will contact you shortly regarding data access.",
        variant: "default", // Success
      });
      // Optional: Reset form or navigate away
      setFormData({
        fullName: '',
        workEmail: '',
        phoneCountry: 'France',
        phoneNumber: '',
        companyName: '',
        industry: '',
        role: '',
        tools: []
      });
      navigate('/');
    }, 1500);
  };

  const getSelectedCountryCode = () => {
    const country = countries.find(c => c.name === formData.phoneCountry);
    return country ? country.code : "+33";
  };

  return (
    <>
      <Helmet>
        <title>Access Project Data - AFRICA Infrastructure Partners</title>
        <meta name="description" content="Request access to powerful infrastructure project data and analytics." />
      </Helmet>

      {/* Background updated to blue/white scheme */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* Header Logo */}
        <div className="mb-8 w-full flex justify-center">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
               <Logo size="lg" />
            </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 md:p-12 rounded-xl shadow-2xl shadow-blue-100/50 w-full max-w-4xl border border-blue-50"
        >
          {/* Form Title - Updated */}
          <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-10 text-center font-serif leading-tight">
            Access project data. Complete the form to get started
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-blue-900">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Work Email */}
            <div className="space-y-2">
              <label htmlFor="workEmail" className="block text-sm font-semibold text-blue-900">
                Work email <span className="text-red-500">*</span>
              </label>
              <div className="space-y-1">
                <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    required
                />
                <p className="text-xs text-blue-400">We will never share your email with anyone</p>
              </div>
            </div>

            {/* Phone Number - Updated to include comprehensive country list */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-blue-900">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="space-y-1">
                <div className="flex gap-3">
                    <div className="relative w-1/3 md:w-1/4">
                        <select
                            name="phoneCountry"
                            value={formData.phoneCountry}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none cursor-pointer truncate pr-8"
                        >
                            {countries.map((country, idx) => (
                                <option key={idx} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm select-none">
                            {getSelectedCountryCode()}
                        </span>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full pl-14 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>
                <p className="text-xs text-blue-400">We will never share your phone number with anyone</p>
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-semibold text-blue-900">
                Company name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Industry & Role (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="industry" className="block text-sm font-semibold text-blue-900">
                        Company Industry
                    </label>
                    <div className="relative">
                        <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none cursor-pointer"
                            required
                        >
                            <option value="" disabled>Please Select</option>
                            <option value="Energy">Energy</option>
                            <option value="Water & Sanitation">Water & Sanitation</option>
                            <option value="Transport/Logistics">Transport/Logistics/Real Assets</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="TMT">TMT</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-semibold text-blue-900">
                        Your Role <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400"
                        required
                    />
                </div>
            </div>

            {/* Tools Multi-select Checkboxes - Updated Question and Options */}
            <div className="space-y-4 pt-2">
                <label className="block text-base font-semibold text-blue-950">
                    Which of these project data and information tools are you interested in?
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                    {toolsOptions.map((tool) => (
                        <div key={tool} className="flex items-start space-x-3 p-2 rounded-md hover:bg-blue-50 transition-colors">
                            <Checkbox 
                                id={`tool-${tool}`} 
                                checked={formData.tools.includes(tool)}
                                onCheckedChange={() => handleToolToggle(tool)}
                                className="mt-0.5 border-gray-300"
                            />
                            <label
                                htmlFor={`tool-${tool}`}
                                className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 cursor-pointer"
                            >
                                {tool}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
                <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-[#0F1419] hover:bg-blue-900 text-white font-bold py-6 px-12 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </div>

          </form>
        </motion.div>
        
        {/* Simple Footer for this page */}
        <div className="mt-12 text-center text-blue-400 text-sm">
             <p>© {new Date().getFullYear()} Africa Infrastructure Partners. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default ProjectsDataPage;