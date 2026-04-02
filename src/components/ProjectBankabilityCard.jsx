import React from 'react';
import { TrendingUp, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectBankabilityCard = ({ score = 65, project, compact = false }) => {
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-emerald-400 border-emerald-400';
    if (s >= 50) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  const colorClass = getScoreColor(score);

  if (compact) {
    return (
        <div className="bg-primary/50 rounded-lg p-3 border border-white/10 flex items-center justify-between">
            <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Bankability Score</div>
                <div className={`text-xl font-bold ${colorClass.split(' ')[0]}`}>{score}/100</div>
            </div>
            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${colorClass}`}>
                <TrendingUp className="w-4 h-4" />
            </div>
        </div>
    );
  }

  return (
    <div className="bg-secondary rounded-xl border border-white/10 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
            <h3 className="text-lg font-bold text-white mb-1">Bankability Assessment</h3>
            <p className="text-sm text-gray-400">Readiness for institutional capital</p>
        </div>
        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-primary ${colorClass}`}>
            <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-300">
                <FileCheck className="w-4 h-4 text-blue-400" /> Documentation
            </div>
            <div className="w-24 h-2 bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-blue-400" style={{ width: '80%' }}></div>
            </div>
        </div>
        <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-300">
                <AlertTriangle className="w-4 h-4 text-yellow-400" /> Risk Mitigation
            </div>
            <div className="w-24 h-2 bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: '60%' }}></div>
            </div>
        </div>
      </div>

      <div className="bg-primary/30 p-4 rounded-lg mb-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-2">Recommendation</h4>
        <p className="text-sm text-gray-400">
            {score < 70 ? "Focus on securing off-take agreements to improve revenue certainty." : "Ready for due diligence. Update data room."}
        </p>
      </div>

      <Button variant="outline" className="w-full border-white/10 text-accent hover:text-white hover:bg-white/5">
        View Advisory Services
      </Button>
    </div>
  );
};

export default ProjectBankabilityCard;