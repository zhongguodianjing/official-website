
import React, { useState } from 'react';
import { Icons } from './Icons';
import NetworkBackground from './NetworkBackground';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Language } from '../types';
import LazyImage from './LazyImage';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
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

  const getGodConfig = (key: string) => {
    const map: Record<string, { icon: any, color: string, bg: string, border: string, shadow: string }> = {
      zeus: { icon: Icons.Zap, color: 'text-yellow-600 dark:text-yellow-300', bg: 'bg-yellow-400/10', border: 'group-hover:border-yellow-400', shadow: 'shadow-yellow-400/20' },
      hera: { icon: Icons.MonitorPlay, color: 'text-fuchsia-600 dark:text-fuchsia-300', bg: 'bg-fuchsia-400/10', border: 'group-hover:border-fuchsia-400', shadow: 'shadow-fuchsia-400/20' },
      athena: { icon: Icons.BrainCircuit, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-400/10', border: 'group-hover:border-blue-400', shadow: 'shadow-blue-400/20' },
      apollo: { icon: Icons.Music, color: 'text-orange-600 dark:text-orange-300', bg: 'bg-orange-400/10', border: 'group-hover:border-orange-400', shadow: 'shadow-orange-400/20' },
      aphrodite: { icon: Icons.Sparkles, color: 'text-pink-600 dark:text-pink-300', bg: 'bg-pink-400/10', border: 'group-hover:border-pink-400', shadow: 'shadow-pink-400/20' },
      ares: { icon: Icons.Swords, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', border: 'group-hover:border-red-500', shadow: 'shadow-red-500/20' },
      artemis: { icon: Icons.Compass, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-400/10', border: 'group-hover:border-emerald-400', shadow: 'shadow-emerald-400/20' },
      hermes: { icon: Icons.Rocket, color: 'text-cyan-600 dark:text-cyan-300', bg: 'bg-cyan-400/10', border: 'group-hover:border-cyan-400', shadow: 'shadow-cyan-400/20' },
      dionysus: { icon: Icons.Utensils, color: 'text-violet-600 dark:text-violet-300', bg: 'bg-violet-400/10', border: 'group-hover:border-violet-400', shadow: 'shadow-violet-400/20' },
      demeter: { icon: Icons.Leaf, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', border: 'group-hover:border-green-500', shadow: 'shadow-green-500/20' },
      hephaestus: { icon: Icons.Hammer, color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-600/10', border: 'group-hover:border-amber-600', shadow: 'shadow-amber-600/20' },
      poseidon: { icon: Icons.Waves, color: 'text-blue-700 dark:text-blue-500', bg: 'bg-blue-600/10', border: 'group-hover:border-blue-600', shadow: 'shadow-blue-600/20' },
    };
    return map[key] || map['zeus'];
  };

  const LOGO_URL = "https://placehold.co/200x200/020617/ffffff?text=SEPT+LOGO";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white relative overflow-hidden font-sans selection:bg-brand-500/30 selection:text-brand-900 dark:selection:text-white transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0F1A] border-b border-[#1E293B] transition-all duration-300 shadow-lg dark:shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
             <LazyImage 
               src={LOGO_URL} 
               alt="SEPT Logo" 
               className="h-10 w-10 md:h-12 md:w-12"
               imageClassName="object-contain drop-shadow-[0_0_15px_rgba(20,184,166,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(20,184,166,0.6)] transition-all duration-300 dark:invert-0 invert"
             />
             <div className="hidden sm:block">
               <h1 className="text-2xl font-bold tracking-tighter text-white dark:text-white font-display leading-none">SEPT</h1>
               <p className="text-[10px] text-white dark:text-white uppercase tracking-[0.2em] leading-none opacity-90 mt-1 font-medium">International Esports Committee</p>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-white dark:text-white font-display tracking-wide">
            {['olympians', 'tokenomics', 'governance', 'assets'].map((item) => (
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

            <button 
              onClick={onEnterApp}
              className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-bold font-display tracking-wide transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:-translate-y-0.5"
            >
              {t.nav.enter} <Icons.ArrowRight size={16} />
            </button>
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
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-500/30 bg-[#0A0F1A] text-white dark:text-white text-sm font-bold mb-10 animate-fade-in-up shadow-[0_0_20px_rgba(20,184,166,0.1)] font-mono tracking-wide z-10 hover:border-brand-500/60 transition-colors">
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

              <button 
                onClick={onEnterApp}
                className="w-full px-8 py-5 bg-white text-emerald-600 hover:text-emerald-700 rounded-sm font-display font-bold text-xl hover:bg-brand-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] flex items-center justify-center gap-3 group border border-transparent hover:scale-[1.02] z-10"
              >
                 {t.hero.launch} <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full px-8 py-5 bg-slate-800 border border-slate-600 rounded-sm font-display font-bold text-xl hover:bg-slate-700 transition-all text-white hover:border-brand-400 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] z-10">
                {t.hero.whitepaper}
              </button>
            </div>
          </div>
        </div>

        {/* Live Stats Footer */}
        <div className="w-full z-30 relative bg-[#0A0F1A]">
          <div className="w-full border-t border-brand-500 bg-[#0A0F1A] shadow-2xl py-10 relative transition-colors duration-300">
             {/* Glowing Top Border Effect */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-500 shadow-[0_0_15px_#2dd4bf]"></div>
             
             <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
                
                <div className="flex flex-col items-center md:items-start w-full md:w-auto border-b md:border-b-0 border-slate-800 pb-6 md:pb-0">
                   <span className="text-sm text-white dark:text-white uppercase tracking-[0.25em] font-mono mb-2 font-bold flex items-center gap-2 drop-shadow-sm">
                     <Icons.TrendingUp size={16} className="text-white" /> {t.hero.stats.price}
                   </span>
                   <span className="text-4xl font-mono font-bold text-white dark:text-white flex items-center gap-3 drop-shadow-md">
                     $1.24 <span className="text-sm text-slate-900 bg-brand-300 dark:bg-brand-300 px-3 py-1 rounded font-bold shadow-[0_0_10px_rgba(94,234,212,0.4)]">+5.2%</span>
                   </span>
                </div>
                
                <div className="flex flex-col items-center md:items-start w-full md:w-auto border-b md:border-b-0 border-slate-800 pb-6 md:pb-0">
                   <span className="text-sm text-white dark:text-white uppercase tracking-[0.25em] font-mono mb-2 font-bold flex items-center gap-2 drop-shadow-sm">
                     <Icons.Hexagon size={16} className="text-white" /> {t.hero.stats.supply}
                   </span>
                   <span className="text-4xl font-mono font-bold text-white dark:text-white drop-shadow-md">
                     21,000,000
                   </span>
                </div>

                <div className="flex flex-col items-center md:items-start w-full md:w-auto border-b md:border-b-0 border-slate-800 pb-6 md:pb-0">
                   <span className="text-sm text-white dark:text-white uppercase tracking-[0.25em] font-mono mb-2 font-bold flex items-center gap-2 drop-shadow-sm">
                     <Icons.Vote size={16} className="text-white" /> {t.hero.stats.proposals}
                   </span>
                   <span className="text-4xl font-mono font-bold text-white dark:text-white drop-shadow-md">
                     1,204
                   </span>
                </div>

                <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                   <span className="text-sm text-white dark:text-white uppercase tracking-[0.25em] font-mono mb-2 font-bold flex items-center gap-2 drop-shadow-sm">
                     <Icons.Cpu size={16} className="text-white" /> {t.hero.stats.nodes}
                   </span>
                   <span className="text-4xl font-mono font-bold text-white dark:text-white flex items-center gap-2 drop-shadow-md">
                     12 <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                   </span>
                </div>

             </div>
          </div>
        </div>
      </section>

      {/* Olympians Section */}
      <section id="olympians" className="py-24 bg-[#050b14] dark:bg-[#050b14] relative transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 dark:via-brand-900 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white dark:text-white tracking-tight drop-shadow-sm dark:drop-shadow-md">{t.olympians.title}</h2>
            <p className="text-brand-300 dark:text-brand-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-sm">{t.olympians.subtitle}</p>
            <p className="text-slate-300 dark:text-slate-200 mt-6 max-w-4xl mx-auto leading-relaxed">{t.olympians.desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(t.olympians.gods).map(([key, god]) => {
              const config = getGodConfig(key);
              const Icon = config.icon;
              return (
                <div key={key} className={`group relative bg-[#0f172a] dark:bg-[#0f172a] border border-slate-800 dark:border-slate-800 p-8 hover:bg-[#1e293B] dark:hover:bg-[#1e293B] transition-all duration-300 ease-out hover:scale-[1.02] ${config.border} hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden rounded-lg`}>
                  {/* Hover Glow Background */}
                  <div className={`absolute -right-10 -top-10 w-40 h-40 ${config.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-lg bg-[#020617] dark:bg-[#020617] border border-slate-700 dark:border-slate-700 flex items-center justify-center mb-6 ${config.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${config.color}`} />
                    </div>
                    <h3 className={`text-2xl font-display font-bold text-white dark:text-white mb-2 group-hover:${config.color} transition-colors`}>{god.name}</h3>
                    <div className={`text-xs font-mono uppercase tracking-widest ${config.color} mb-4 opacity-80`}>{god.industry}</div>
                    <p className="text-slate-300 dark:text-slate-300 text-sm leading-relaxed group-hover:text-white dark:group-hover:text-white transition-colors">{god.desc}</p>
                  </div>
                </div>
              );
            })}
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

      {/* Showcase Section */}
      <section id="assets" className="py-24 bg-[#0A0F1A] dark:bg-[#0A0F1A] border-t border-slate-800 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        {/* Subtle background glow */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-900/10 dark:bg-brand-900/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white dark:text-white drop-shadow-sm dark:drop-shadow-md">
              {t.showcase.title} <br />
              <span className="text-brand-400 dark:text-brand-400 text-glow">{t.showcase.title_highlight}</span>
            </h2>
            <p className="text-lg text-slate-200 dark:text-slate-200 mb-10 leading-relaxed max-w-lg">
              {t.showcase.desc}
            </p>
            
            <ul className="space-y-6 mb-10">
              {[t.showcase.list1, t.showcase.list2, t.showcase.list3].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-slate-200 dark:text-slate-200 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500/10 dark:bg-brand-500/10 border border-brand-500/30 dark:border-brand-500/30 flex items-center justify-center text-brand-400 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-black transition-all">
                    <Icons.Check size={16} />
                  </span>
                  <span className="group-hover:text-white dark:group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            <button className="bg-white dark:bg-white text-black dark:text-black hover:bg-brand-50 dark:hover:bg-brand-50 px-8 py-4 rounded-sm font-bold font-display uppercase tracking-wider transition-all shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center gap-2 group">
              {t.showcase.btn} <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 dark:from-brand-500/20 to-purple-500/20 dark:to-purple-500/20 blur-[60px] rounded-full group-hover:opacity-75 transition-opacity duration-700"></div>
            <div className="relative z-10 bg-[#0f172a] dark:bg-[#0f172a] border border-slate-700 dark:border-slate-700 p-2 rounded-2xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <LazyImage 
                 src={LOGO_URL}
                 alt="SEPT Asset Showcase"
                 className="w-full h-auto rounded-xl"
                 imageClassName="object-cover rounded-xl border border-slate-800 dark:border-slate-800"
               />
               
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 bg-[#020617] dark:bg-[#020617] border border-slate-700 dark:border-slate-700 p-4 rounded-lg shadow-xl flex items-center gap-4 animate-float">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/10 flex items-center justify-center text-green-400 dark:text-green-400">
                    <Icons.TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Growth</div>
                    <div className="text-xl font-bold text-white dark:text-white font-mono">+128.5%</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] dark:bg-[#020617] border-t border-slate-800 dark:border-slate-800 py-12 text-center relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <LazyImage 
             src={LOGO_URL} 
             alt="SEPT Logo" 
             className="h-10 w-10 mx-auto mb-6"
             imageClassName="object-contain opacity-50 dark:invert-0 invert grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
           />
          <p className="text-slate-400 dark:text-slate-400 text-sm font-mono tracking-widest uppercase">&copy; 2024 International Esports Committee. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
