import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setReady(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 dark:bg-slate-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #0284c7 0%, transparent 50%)`
        }} />
      </div>

      {/* Grid dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }} />

      <div className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-sky-500/20">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="36" height="32" rx="4" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="2"/>
              <path d="M24 16V32M16 24H32" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="#0ea5e9" opacity="0.6"/>
              <circle cx="36" cy="12" r="3" fill="#0ea5e9" opacity="0.6"/>
            </svg>
          </div>
          <div className="absolute -inset-2 rounded-[32px] bg-sky-500/10 animate-pulse-soft" />
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black text-white leading-tight">
            دليل المستشفيات
          </h1>
          <p className="text-base text-sky-400 font-semibold tracking-wide">
            الخدمات الطبية
          </p>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            دليلك الشامل للمستشفيات والمراكز الطبية والمعامل المتعاقدة مع صندوق الخدمات الطبية
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          {[
            { value: '151+', label: 'مستشفى' },
            { value: '16+', label: 'معمل' },
            { value: '19', label: 'محافظة' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-black text-sky-400">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className={`mt-2 px-10 py-4 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-sky-500/30 transition-all duration-200 active:scale-95 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.2s ease' }}
        >
          ابدأ الاستعراض
        </button>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-8 text-xs text-slate-600 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        صندوق الخدمات الطبية
      </div>
    </div>
  );
};

export default SplashScreen;
