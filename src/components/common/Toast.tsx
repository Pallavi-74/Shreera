import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300">
      <div
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold backdrop-blur-md animate-fade-in ${
          toast.type === 'success'
            ? 'bg-slate-900/90 text-white border border-slate-700'
            : toast.type === 'error'
            ? 'bg-rose-900/90 text-rose-100 border border-rose-700'
            : 'bg-blue-900/90 text-blue-100 border border-blue-700'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
