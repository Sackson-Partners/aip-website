import React, { useEffect, useState } from 'react';
import { validateEnv } from '@/lib/validateEnv';
import { AlertCircle, Terminal } from 'lucide-react';

const ConfigurationValidator = ({ children }) => {
  const [validationState, setValidationState] = useState({ isValid: true, error: null });

  useEffect(() => {
    const result = validateEnv();
    setValidationState(result);
  }, []);

  if (!validationState.isValid) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-[#151a21] border border-red-500/30 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-red-500/10 p-6 border-b border-red-500/20 flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Configuration Error</h1>
              <p className="text-red-400">The application cannot start due to invalid configuration.</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="bg-black/50 rounded-lg p-4 border border-white/5 font-mono text-sm text-gray-300">
              <div className="flex items-center gap-2 text-gray-500 mb-2 pb-2 border-b border-white/10">
                <Terminal className="w-4 h-4" />
                <span>System Output</span>
              </div>
              <p className="text-red-400">&gt; Error: {validationState.error}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Troubleshooting Steps</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Check your <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-sm">.env</code> or <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-sm">.env.local</code> file.</li>
                <li>Ensure <code className="text-[#C9A23A]">VITE_SUPABASE_URL</code> is the Project URL (e.g., <span className="text-gray-500">https://xyz.supabase.co</span>), NOT the dashboard URL.</li>
                <li>Verify <code className="text-[#C9A23A]">VITE_SUPABASE_ANON_KEY</code> is correct and has no extra spaces.</li>
                <li>Restart the development server after making changes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ConfigurationValidator;