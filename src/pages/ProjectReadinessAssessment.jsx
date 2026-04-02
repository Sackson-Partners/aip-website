import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, Circle, AlertCircle, Download, ArrowRight } from 'lucide-react';

const ProjectReadinessAssessment = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    {
      id: 'fundamentals',
      title: 'Project Fundamentals',
      questions: [
        { id: 'f1', text: 'Is the project scope clearly defined with fixed boundaries?' },
        { id: 'f2', text: 'Has a pre-feasibility study been completed?' },
        { id: 'f3', text: 'Is the land secured or rights clearly established?' },
        { id: 'f4', text: 'Is the ownership structure legally incorporated?' }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Readiness',
      questions: [
        { id: 'fi1', text: 'Do you have a detailed financial model (5+ years)?' },
        { id: 'fi2', text: 'Are capital expenditure (CAPEX) estimates verified?' },
        { id: 'fi3', text: 'Have you identified potential revenue streams clearly?' },
        { id: 'fi4', text: 'Is there a clear break-even analysis?' }
      ]
    },
    {
      id: 'market',
      title: 'Market Positioning',
      questions: [
        { id: 'm1', text: 'Is there a verified demand study for the output?' },
        { id: 'm2', text: 'Have you analyzed the competitive landscape?' },
        { id: 'm3', text: 'Are there signed offtake agreements or LOIs?' }
      ]
    },
    {
      id: 'risk',
      title: 'Risk Management',
      questions: [
        { id: 'r1', text: 'Have political and regulatory risks been assessed?' },
        { id: 'r2', text: 'Is there an environmental impact assessment (EIA)?' },
        { id: 'r3', text: 'Are mitigation strategies documented for key risks?' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let totalQuestions = 0;
    let yesAnswers = 0;
    categories.forEach(cat => {
      cat.questions.forEach(q => {
        totalQuestions++;
        if (answers[q.id] === 'yes') yesAnswers++;
      });
    });
    return Math.round((yesAnswers / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Assessment Completed",
      description: "Your readiness report is ready for download.",
    });
  };

  const score = calculateScore();

  const getReadinessLevel = (score) => {
    if (score >= 80) return { label: "Highly Prepared", color: "text-emerald-400", bg: "bg-emerald-400" };
    if (score >= 50) return { label: "Developing", color: "text-yellow-400", bg: "bg-yellow-400" };
    return { label: "Early Stage", color: "text-red-400", bg: "bg-red-400" };
  };

  const level = getReadinessLevel(score);

  return (
    <>
      <Helmet>
        <title>Readiness Assessment - AIP</title>
      </Helmet>

      <div className="min-h-screen bg-primary">
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-white mb-2 font-serif">Project Readiness Assessment</h1>
            <p className="text-gray-400">Evaluate your project's maturity and identify gaps before approaching investors.</p>
          </div>

          {!isSubmitted ? (
            <div className="bg-secondary/50 rounded-2xl border border-white/5 p-8 backdrop-blur-sm">
              {/* Progress Steps */}
              <div className="flex justify-between mb-8 border-b border-white/5 pb-6">
                {categories.map((cat, idx) => (
                  <div 
                    key={cat.id} 
                    className={`flex items-center gap-2 text-sm ${idx === activeStep ? 'text-accent font-bold' : idx < activeStep ? 'text-emerald-400' : 'text-gray-500'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${idx === activeStep ? 'border-accent text-accent' : idx < activeStep ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400' : 'border-gray-600'}`}>
                      {idx < activeStep ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="hidden md:block">{cat.title}</span>
                  </div>
                ))}
              </div>

              {/* Question Section */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-6">{categories[activeStep].title}</h2>
                {categories[activeStep].questions.map((q) => (
                  <div key={q.id} className="bg-primary p-4 rounded-xl border border-white/5">
                    <p className="text-white mb-4">{q.text}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAnswer(q.id, 'yes')}
                        className={`flex-1 py-2 rounded-lg border transition-all ${answers[q.id] === 'yes' ? 'bg-accent text-primary font-bold border-accent' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(q.id, 'no')}
                        className={`flex-1 py-2 rounded-lg border transition-all ${answers[q.id] === 'no' ? 'bg-secondary text-white border-white/20' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                  <Button
                    variant="outline"
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="border-gray-700 text-gray-300"
                  >
                    Back
                  </Button>
                  {activeStep < categories.length - 1 ? (
                    <Button
                      onClick={() => setActiveStep(prev => prev + 1)}
                      className="bg-accent text-primary hover:bg-white"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      Complete Assessment
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-secondary/50 rounded-2xl border border-white/5 p-8 backdrop-blur-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary mb-6 relative">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${score * 2.51} 251`} className={level.color} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                    {score}%
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Readiness Level: <span className={level.color}>{level.label}</span></h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                {score < 50 
                  ? "Your project requires significant structuring before approaching institutional investors. We recommend focusing on fundamentals and financial modeling."
                  : score < 80 
                  ? "Good progress. Focus on risk mitigation and market positioning to reach bankability." 
                  : "Your project is well-structured and ready for investor engagement."}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="bg-primary/50 p-4 rounded-xl border border-white/5">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-accent" /> Key Gaps</h3>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        <li>Financial modeling details</li>
                        <li>Environmental impact study</li>
                    </ul>
                </div>
                <div className="bg-primary/50 p-4 rounded-xl border border-white/5">
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strengths</h3>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        <li>Land security</li>
                        <li>Market demand</li>
                    </ul>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button className="bg-accent text-primary hover:bg-white">
                  <Download className="w-4 h-4 mr-2" /> Download Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Recommended Services
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectReadinessAssessment;