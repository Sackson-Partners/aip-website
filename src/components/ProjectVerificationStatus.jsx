import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectVerificationStatus = ({ status = 'In Review', step = 2 }) => {
  const steps = [
    { id: 1, label: 'Submission', description: 'Project submitted successfully' },
    { id: 2, label: 'Initial Review', description: 'Basic criteria check' },
    { id: 3, label: 'Due Diligence', description: 'Detailed verification' },
    { id: 4, label: 'Verified', description: 'Ready for investment' },
  ];

  const getStepStatus = (index) => {
    if (index + 1 < step) return 'completed';
    if (index + 1 === step) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h3 className="text-xl font-bold text-white mb-2">Verification Status</h3>
            <p className="text-gray-400 text-sm">Track your project's verification progress</p>
        </div>
        <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <span className="text-accent font-bold uppercase text-sm tracking-wide">{status}</span>
        </div>
      </div>

      <div className="relative">
        {/* Progress Line Background */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-700 rounded-full" />
        
        {/* Active Progress Line */}
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            className="absolute top-5 left-0 h-0.5 bg-accent rounded-full z-0"
            transition={{ duration: 1, delay: 0.5 }}
        />

        <div className="relative z-10 flex justify-between">
          {steps.map((s, idx) => {
            const stepStatus = getStepStatus(idx);
            return (
              <div key={s.id} className="flex flex-col items-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-500 bg-secondary ${
                        stepStatus === 'completed' ? 'border-accent text-accent' :
                        stepStatus === 'current' ? 'border-accent/50 text-white bg-accent shadow-[0_0_15px_rgba(212,175,55,0.5)]' :
                        'border-gray-700 text-gray-500'
                    }`}
                >
                  {stepStatus === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                   stepStatus === 'current' ? <Clock className="w-5 h-5 animate-pulse" /> :
                   <Circle className="w-5 h-5" />}
                </motion.div>
                <div className="mt-4 text-center max-w-[120px]">
                  <p className={`text-sm font-semibold mb-1 ${stepStatus === 'current' ? 'text-white' : 'text-gray-400'}`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-500 hidden md:block">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-4 bg-primary/30 p-4 rounded-lg">
        <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
            <h4 className="text-white font-medium text-sm mb-1">Next Steps</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
                Our team is currently reviewing your financial documents. Estimated completion: 3-5 business days. 
                Please ensure all contact information is up to date for any clarifying questions.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectVerificationStatus;