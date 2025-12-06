
import React, { useState } from 'react';
import { Icons } from './Icons';
import NetworkBackground from './NetworkBackground';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';
import LazyImage from './LazyImage';
import IPFSTest from './IPFSTest';
import CIDTest from './CIDTest';
import Logo from './logo';

const LandingPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'zh_CN', label: '简体中文' },
    { code: 'zh_TW', label: '繁體中文' },
    { code: 'en', label: 'English' },
  ];

  const LOGO_URL = "https://placehold.co/200x200/020617/ffffff?text=SEPT+LOGO";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative overflow-hidden font-sans selection:bg-brand-500/30 selection:text-brand-900 dark:selection:text-white transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0F1A] border-b border-[#1E293B] transition-all duration-300 shadow-lg dark:shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
               <div className="h-10 w-10 md:h-12 md:w-12">
                 <Logo className="" />
               </div>
             <div className="hidden sm:block">
               <h1 className="text-2xl font-bold tracking-tighter text-white dark:text-white font-display leading-none">SEPT</h1>
               <p className="text-[10px] text-white dark:text-white uppercase tracking-[0.2em] leading-none opacity-90 mt-1 font-medium">International Esports Committee</p>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-white dark:text-white font-display tracking-wide">
            {['tokenomics', 'governance'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="hover:text-brand-400 dark:hover:text-brand-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 after:transition-all hover:after:w-full uppercase text-white"
              >
                {t.nav[item as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
             {/* Theme Toggle */}
             <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors border border-slate-300 dark:border-white/10 hover:border-brand-500 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-100"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Icons.Sun size={16} className="text-yellow-400" /> : <Icons.Moon size={16} className="text-brand-600" />}
            </button>

            <div className="relative">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center gap-2 text-slate-700 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-md transition-colors border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 bg-white dark:bg-[#0f172a]"
              >
                <Icons.Languages size={16} className="text-brand-500 dark:text-brand-400" />
                <span className="text-xs font-bold uppercase font-mono">{language === 'zh_CN' ? 'CN' : language === 'zh_TW' ? 'TW' : 'EN'}</span>
                <Icons.ChevronDown size={12} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-600 rounded-lg shadow-2xl overflow-hidden z-50 animate-fade-in-up ring-1 ring-black/5 dark:ring-white/10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full text-left px-4 py-3 text-xs font-bold font-mono text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 flex items-center justify-between transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                    >
                      {lang.label}
                      {language === lang.code && <Icons.Check size={12} className="text-brand-500 dark:text-brand-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a 
              href="https://dao.e-sport.show/dao/polygon-mainnet/0xd597CEe11FE80f9BFd62b189b7617E9c2F3A3391/dashboard?members=admin&proposals=all" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-bold font-display tracking-wide transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 cursor-pointer"
            >
              {t.nav.enter} <Icons.ArrowRight size={16} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-24 overflow-hidden bg-[#0A0F1A]">
        <NetworkBackground />
        
        {/* HIGH CONTRAST OVERLAY - SOLID TO ENSURE UNIFORMITY */}
        <div className="absolute inset-0 bg-[#0A0F1A]/98 pointer-events-none z-0"></div>
        
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col justify-center relative z-10 w-full px-6 mb-12">
          <div className="max-w-6xl mx-auto text-center w-full flex flex-col items-center">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-500/30 bg-[#0A0F1A] text-brand-200 dark:text-brand-200 text-sm font-bold mb-10 animate-fade-in-up shadow-[0_0_20px_rgba(20,184,166,0.1)] font-mono tracking-wide z-10 hover:border-brand-500/60 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              {t.hero.tag}
            </div>
            
            {/* Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 leading-[0.9] animate-fade-in-up [animation-delay:200ms] uppercase z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">{t.hero.title_prefix}</span> <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-100 to-brand-300 animate-border-flow bg-[length:200%_auto] filter drop-shadow-[0_4px_8px_rgba(0,0,0,1)] pb-2">
                {t.hero.title_highlight}
              </span> 
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-white font-medium tracking-normal mt-4 block drop-shadow-[0_4px_8px_rgba(0,0,0,1)] opacity-100">{t.hero.title_suffix}</span>
            </h1>
            
            {/* Description */}
            <div className="relative z-10 p-8 rounded-2xl bg-[#000000]/80 border border-brand-500/30 mb-12 max-w-3xl mx-auto animate-fade-in-up [animation-delay:400ms] shadow-2xl backdrop-blur-sm">
              <p className="text-lg md:text-xl text-white font-medium leading-relaxed tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                {t.hero.desc}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-md animate-fade-in-up [animation-delay:600ms]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-brand-500/10 blur-[60px] rounded-full -z-10 pointer-events-none"></div>

              <a 
                href="https://dao.e-sport.show" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-8 py-5 bg-white text-emerald-600 hover:text-emerald-700 rounded-sm font-display font-bold text-xl hover:bg-brand-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] flex items-center justify-center gap-3 group border border-transparent hover:scale-[1.02] z-10 cursor-pointer"
              >
                 {t.hero.launch} <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-24 bg-[#0A0F1A] dark:bg-[#0A0F1A] relative overflow-hidden border-t border-slate-900 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white dark:text-white mb-4 drop-shadow-sm dark:drop-shadow-md">{t.tokenomics.title}</h2>
            <p className="text-brand-300 dark:text-brand-300 font-mono uppercase tracking-widest text-sm drop-shadow-sm">{t.tokenomics.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
             {/* Total Supply Visual */}
             <div className="relative flex items-center justify-center p-12 bg-[#020617] dark:bg-[#020617] border border-slate-800 dark:border-slate-800 rounded-3xl shadow-xl dark:shadow-2xl">
                <div className="absolute inset-0 bg-brand-500/5 blur-[100px] rounded-full"></div>
                <div className="text-center relative z-10">
                   <Icons.Hexagon className="w-24 h-24 text-brand-500 mx-auto mb-6 animate-pulse-slow" />
                   <h3 className="text-5xl md:text-7xl font-mono font-bold text-white dark:text-white mb-2 tracking-tighter drop-shadow-sm dark:drop-shadow-lg">21,000,000</h3>
                   <p className="text-slate-300 dark:text-slate-300 uppercase tracking-[0.3em] text-sm">{t.tokenomics.total_supply}</p>
                </div>
             </div>

             {/* Bancor Protocol Text */}
             <div className="bg-[#0f172a] dark:bg-[#0f172a] border border-brand-500/20 dark:border-brand-500/20 p-8 rounded-2xl relative overflow-hidden group hover:border-brand-500/40 transition-colors shadow-lg dark:shadow-none">
                <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
                   <Icons.TrendingUp size={120} className="text-brand-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white dark:text-white mb-4 flex items-center gap-3">
                   <Icons.Zap className="text-brand-600 dark:text-brand-400" /> {t.tokenomics.bancor.title}
                </h3>
                <p className="text-slate-200 dark:text-slate-200 leading-relaxed text-lg">
                   {t.tokenomics.bancor.desc}
                </p>
             </div>
          </div>

          {/* 3 Cards Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Genesis */}
             <div className="bg-[#0f172a] dark:bg-[#0f172a] border border-yellow-500/20 dark:border-yellow-500/20 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] group shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-yellow-400/10 rounded-lg text-yellow-400 dark:text-yellow-400 border border-yellow-400/20 group-hover:scale-110 transition-transform">
                      <Icons.Rocket size={32} />
                   </div>
                   <div className="text-right">
                      <div className="text-3xl font-mono font-bold text-white dark:text-white">{t.tokenomics.sections.genesis.amount}</div>
                      <div className="text-[10px] text-yellow-400 dark:text-yellow-400 uppercase tracking-wider">Genesis</div>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white dark:text-white mb-2">{t.tokenomics.sections.genesis.title}</h3>
                <p className="text-slate-300 dark:text-slate-300 text-sm mb-6 min-h-[60px]">{t.tokenomics.sections.genesis.desc}</p>
                <div className="bg-[#020617] dark:bg-[#020617] p-4 rounded-lg border border-slate-800 dark:border-slate-800 mb-6">
                   <div className="text-xs text-slate-400 dark:text-slate-400 mb-1 font-mono uppercase">Current Price</div>
                   <div className="text-lg font-bold text-yellow-400 dark:text-yellow-400 font-mono">$1.00 USDT</div>
                </div>
                <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-wider text-sm transition-colors rounded-sm shadow-lg">
                   {t.tokenomics.sections.genesis.action}
                </button>
             </div>

             {/* Ecosystem */}
             <div className="bg-[#0f172a] dark:bg-[#0f172a] border border-brand-500/20 dark:border-brand-500/20 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] group shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400 dark:text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                      <Icons.Sparkles size={32} />
                   </div>
                   <div className="text-right">
                      <div className="text-3xl font-mono font-bold text-white dark:text-white">{t.tokenomics.sections.ecosystem.amount}</div>
                      <div className="text-[10px] text-brand-400 dark:text-brand-400 uppercase tracking-wider">Ecosystem</div>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white dark:text-white mb-2">{t.tokenomics.sections.ecosystem.title}</h3>
                <p className="text-slate-300 dark:text-slate-300 text-sm mb-6 min-h-[60px]">{t.tokenomics.sections.ecosystem.desc}</p>
                <div className="bg-[#020617] dark:bg-[#020617] p-4 rounded-lg border border-slate-800 dark:border-slate-800 mb-6">
                   <div className="text-xs text-slate-400 dark:text-slate-400 mb-1 font-mono uppercase">Incentive</div>
                   <div className="text-lg font-bold text-brand-400 dark:text-brand-400 font-mono">{t.tokenomics.sections.ecosystem.price}</div>
                </div>
                <button className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold uppercase tracking-wider text-sm transition-colors rounded-sm shadow-lg">
                   {t.tokenomics.sections.ecosystem.action}
                </button>
             </div>

             {/* Industries */}
             <div className="bg-[#0f172a] dark:bg-[#0f172a] border border-blue-500/20 dark:border-blue-500/20 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group shadow-sm">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 dark:text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <Icons.Globe size={32} />
                   </div>
                   <div className="text-right">
                      <div className="text-3xl font-mono font-bold text-white dark:text-white">{t.tokenomics.sections.industries.amount}</div>
                      <div className="text-[10px] text-blue-400 dark:text-blue-400 uppercase tracking-wider">Industries</div>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white dark:text-white mb-2">{t.tokenomics.sections.industries.title}</h3>
                <p className="text-slate-300 dark:text-slate-300 text-sm mb-6 min-h-[60px]">{t.tokenomics.sections.industries.desc}</p>
                <div className="bg-[#020617] dark:bg-[#020617] p-4 rounded-lg border border-slate-800 dark:border-slate-800 mb-6">
                   <div className="text-xs text-slate-400 dark:text-slate-400 mb-1 font-mono uppercase">Allocation</div>
                   <div className="text-lg font-bold text-blue-400 dark:text-blue-400 font-mono">1M / Sector</div>
                </div>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider text-sm transition-colors rounded-sm shadow-lg">
                   {t.tokenomics.sections.industries.action}
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="governance" className="py-24 bg-[#050b14] dark:bg-[#050b14] relative transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-800 dark:bg-slate-800"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white dark:text-white mb-6 drop-shadow-sm dark:drop-shadow-md">{t.features.title}</h2>
            <p className="text-slate-300 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">{t.features.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group p-8 bg-[#0f172a] dark:bg-[#0f172a] border border-slate-800 dark:border-slate-800 hover:border-purple-500 hover:border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] rounded-2xl">
              <div className="mb-6 inline-block p-4 rounded-xl bg-[#020617] dark:bg-[#020617] text-purple-400 dark:text-purple-400 border border-slate-700 dark:border-slate-700 group-hover:border-purple-500 group-hover:scale-110 transition-all">
                <Icons.Vote size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white dark:text-white group-hover:text-purple-300 dark:group-hover:text-purple-300 transition-colors">{t.features.governance_title}</h3>
              <p className="text-slate-200 dark:text-slate-300 leading-relaxed group-hover:text-white dark:group-hover:text-slate-200">{t.features.governance_desc}</p>
            </div>
            
            <div className="group p-8 bg-[#0f172a] dark:bg-[#0f172a] border border-slate-800 dark:border-slate-800 hover:border-brand-500 hover:border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] rounded-2xl">
              <div className="mb-6 inline-block p-4 rounded-xl bg-[#020617] dark:bg-[#020617] text-brand-400 dark:text-brand-400 border border-slate-700 dark:border-slate-700 group-hover:border-brand-500 group-hover:scale-110 transition-all">
                <Icons.Cpu size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white dark:text-white group-hover:text-brand-300 dark:group-hover:text-brand-300 transition-colors">{t.features.assets_title}</h3>
              <p className="text-slate-200 dark:text-slate-300 leading-relaxed group-hover:text-white dark:group-hover:text-slate-200">{t.features.assets_desc}</p>
            </div>

            <div className="group p-8 bg-[#0f172a] dark:bg-[#0f172a] border border-slate-800 dark:border-slate-800 hover:border-blue-500 hover:border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-2xl">
              <div className="mb-6 inline-block p-4 rounded-xl bg-[#020617] dark:bg-[#020617] text-blue-400 dark:text-blue-400 border border-slate-700 dark:border-slate-700 group-hover:border-blue-500 group-hover:scale-110 transition-all">
                <Icons.Wallet size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white dark:text-white group-hover:text-blue-300 dark:group-hover:text-blue-300 transition-colors">{t.features.treasury_title}</h3>
              <p className="text-slate-200 dark:text-slate-300 leading-relaxed group-hover:text-white dark:group-hover:text-slate-200">{t.features.treasury_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white dark:text-white mb-4 drop-shadow-sm dark:drop-shadow-md">{t.cta.title}</h2>
            <p className="text-slate-300 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">{t.cta.desc}</p>
            <a 
              href="https://dao.e-sport.show/dao/polygon-mainnet/0xd597CEe11FE80f9BFd62b189b7617E9c2F3A3391/dashboard?members=admin&proposals=all" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-5 bg-brand-600 hover:bg-brand-500 text-white font-bold uppercase tracking-wider text-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              {t.cta.button} <Icons.ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] dark:bg-[#020617] border-t border-slate-800 dark:border-slate-800 py-12 text-center relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-10 w-10 mx-auto mb-6">
            <Logo />
          </div>
          <p className="text-slate-400 dark:text-slate-400 text-sm font-mono tracking-widest uppercase">&copy; 2024 International Esports Committee. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
