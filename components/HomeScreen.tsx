import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HOSPITALS, LABS } from '../constants';
import { Hospital } from '../types';
import HospitalCard from './HospitalCard';

interface HomeScreenProps {
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

type Tab = 'hospitals' | 'labs';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onBack, isDark, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState<Tab>('hospitals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGov, setSelectedGov] = useState('الكل');
  const [showGovDropdown, setShowGovDropdown] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const data = activeTab === 'hospitals' ? HOSPITALS : LABS;

  const governorates = useMemo(() => {
    const govs = Array.from(new Set(data.map(h => h.gov))).sort((a, b) => {
      if (a === 'جميع المحافظات') return -1;
      if (b === 'جميع المحافظات') return 1;
      return a.localeCompare(b, 'ar');
    });
    return ['الكل', ...govs];
  }, [data]);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return data.filter(h => {
      const matchesGov = selectedGov === 'الكل' || h.gov === selectedGov;
      if (!query) return matchesGov;
      return matchesGov && (
        h.name.toLowerCase().includes(query) ||
        h.area.toLowerCase().includes(query) ||
        h.gov.toLowerCase().includes(query) ||
        h.phone.includes(query)
      );
    });
  }, [data, searchQuery, selectedGov]);

  useEffect(() => {
    setSelectedGov('الكل');
    setSearchQuery('');
  }, [activeTab]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowGovDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm pt-safe">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 dark:text-slate-300 rotate-180">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate">
              دليل المستشفيات
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              الخدمات الطبية
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="no-print w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors active:scale-90"
              title="طباعة"
            >
              <PrintIcon />
            </button>
            <button
              onClick={toggleTheme}
              className="no-print w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors active:scale-90"
              title={isDark ? 'وضع النهار' : 'وضع الليل'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-0 gap-1">
          {([
            { id: 'hospitals' as Tab, label: 'المستشفيات', count: HOSPITALS.length },
            { id: 'labs' as Tab, label: 'المعامل والأشعة', count: LABS.length },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-sky-600 dark:text-sky-400 border-sky-500 bg-sky-50/50 dark:bg-sky-500/10'
                  : 'text-slate-500 dark:text-slate-500 border-transparent hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id
                  ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2.5">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <SearchIcon />
          </div>
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مستشفى، منطقة، أو رقم..."
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 text-sm rounded-xl pr-10 pl-9 py-2.5 border border-transparent focus:border-sky-400 dark:focus:border-sky-500 focus:outline-none focus:bg-white dark:focus:bg-slate-700 transition-all duration-200"
            dir="rtl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {/* Governorate Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {governorates.map(gov => (
            <button
              key={gov}
              onClick={() => setSelectedGov(gov)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                selectedGov === gov
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {gov}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex-shrink-0 px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-500">
          {filtered.length === data.length
            ? `${data.length} نتيجة`
            : `${filtered.length} من ${data.length} نتيجة`
          }
        </span>
        {(searchQuery || selectedGov !== 'الكل') && (
          <button
            onClick={() => { setSearchQuery(''); setSelectedGov('الكل'); }}
            className="text-xs text-sky-500 dark:text-sky-400 font-medium hover:underline"
          >
            مسح الفلاتر
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scroll-smooth px-4 pb-safe">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">لا توجد نتائج</p>
            <p className="text-sm text-slate-400 mt-1">جرّب كلمات بحث مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 print-grid">
            {filtered.map((hospital, i) => (
              <HospitalCard key={hospital.id} hospital={hospital} index={i} />
            ))}
          </div>
        )}

        {/* Print only header */}
        <div className="print-only mb-6">
          <h1 className="text-2xl font-black text-center">دليل المستشفيات - الخدمات الطبية</h1>
          <p className="text-center text-gray-600 mt-1">
            {activeTab === 'hospitals' ? 'قائمة المستشفيات والمراكز الطبية' : 'قائمة المعامل ومراكز الأشعة'}
            {selectedGov !== 'الكل' ? ` - ${selectedGov}` : ''}
          </p>
          <hr className="mt-3"/>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
