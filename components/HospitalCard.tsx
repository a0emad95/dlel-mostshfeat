import React, { useState } from 'react';
import { Hospital } from '../types';

interface HospitalCardProps {
  hospital: Hospital;
  index: number;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCall = () => {
    if (hospital.phone && hospital.phone !== '-') {
      window.location.href = `tel:${hospital.phone}`;
    }
  };

  const handleCopy = () => {
    if (hospital.phone && hospital.phone !== '-') {
      navigator.clipboard.writeText(hospital.phone).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const hasPhone = hospital.phone && hospital.phone !== '-';

  return (
    <div
      className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/40 transition-all duration-200 overflow-hidden group"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {hospital.area}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {hospital.gov}
              </span>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${hasPhone ? 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200' : 'bg-slate-50 dark:bg-slate-700/30 text-slate-400 dark:text-slate-600'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span dir="ltr">{hasPhone ? hospital.phone : 'غير متاح'}</span>
          </div>

          {hasPhone && (
            <>
              <button
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-all duration-150 active:scale-90 flex-shrink-0"
                title="نسخ الرقم"
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 dark:text-slate-400">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                )}
              </button>
              <button
                onClick={handleCall}
                className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 flex items-center justify-center transition-all duration-150 active:scale-90 flex-shrink-0 shadow-sm shadow-sky-500/30"
                title="اتصال"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
