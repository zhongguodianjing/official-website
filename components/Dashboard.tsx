import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { Proposal, Asset } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './LazyImage';

const mockProposals: Proposal[] = [
  {
    id: 'SEPT-ACT-2024-001',
    title: 'Apollo Sector: "Neon Beats" Music Festival',
    description: 'Community proposal to launch a global virtual music festival in the Apollo sector. Budget request: 50,000 SEPT.',
    status: 'active',
    votesFor: 850000,
    votesAgainst: 120000,
    endDate: '2024-11-15',
  },
  {
    id: 'SEPT-AST-2024-002',
    title: 'New Asset Launch: "GreenTech" Corporate NFT',
    description: 'Proposal to list GreenTech Corp\'s equity NFT in the Demeter sector for sustainable agriculture funding.',
    status: 'passed',
    votesFor: 1200000,
    votesAgainst: 50000,
    endDate: '2024-10-30',
  },
  {
    id: 'SEPT-GOV-2024-003',
    title: 'Protocol Upgrade v2.1',
    description: 'Technical upgrade to increase transaction throughput for the Hermes Game E-commerce sector.',
    status: 'active',
    votesFor: 450000,
    votesAgainst: 10000,
    endDate: '2024-11-20',
  }
];

const mockAssets: Asset[] = [
  { id: '1', name: 'SEPT Eco Token', type: 'Token', price: '$1.25', change: 12.5, image: 'https://placehold.co/200x200/0f172a/0ea5e9.png?text=SEPT' },
  { id: '2', name: 'Creator Asset: CyberArtist X', type: 'NFT', price: '500 SEPT', change: 5.2, image: 'https://picsum.photos/id/20/200/200' },
  { id: '3', name: 'Enterprise: TechCorp Share', type: 'Equity', price: '1200 SEPT', change: -1.2, image: 'https://picsum.photos/id/30/200/200' },
  { id: '4', name: 'Event Ticket: Major S15', type: 'NFT', price: '50 SEPT', change: 8.9, image: 'https://picsum.photos/id/40/200/200' },
  { id: '5', name: 'Land: Sector 7', type: 'NFT', price: '15000 SEPT', change: 2.1, image: 'https://picsum.photos/id/50/200/200' },
  { id: '6', name: 'Zeus Skin: Thunder', type: 'NFT', price: '25 SEPT', change: 0.5, image: 'https://picsum.photos/id/60/200/200' },
];

const chartData = [
  { name: '00:00', value: 0.8 },
  { name: '04:00', value: 0.95 },
  { name: '08:00', value: 0.90 },
  { name: '12:00', value: 1.1 },
  { name: '16:00', value: 1.05 },
  { name: '20:00', value: 1.2 },
  { name: '24:00', value: 1.25 },
];

// Replace this URL with your actual SEPT Logo URL
const LOGO_URL = "https://placehold.co/200x200/050b14/ffffff?text=SEPT+LOGO";

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'governance' | 'assets'>('overview');
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top smoothly when switching tabs
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0A0F1A] text-slate-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar - Terminal Style */}
      <aside className="w-72 bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-slate-800 flex flex-col hidden md:flex relative z-20 transition-colors duration-300">
        <div className="p-6 flex items-center gap-4 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/20">
          <div className="w-10 h-10 flex-shrink-0">
             <LazyImage src={LOGO_URL} alt="SEPT" className="w-full h-full" imageClassName="object-contain drop-shadow-[0_0_8px_rgba(20,184,166,0.4)] dark:invert-0 invert" />
          </div>
          <div>
             <span className="font-bold text-xl tracking-wider font-display text-slate-900 dark:text-white">SEPT</span>
             <span className="block text-[10px] text-brand-600 dark:text-brand-500 tracking-[0.2em] font-mono mt-0.5">TERMINAL v1.0</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-6">
          <div className="text-[10px] uppercase text-slate-500 dark:text-slate-200 font-mono tracking-widest px-4 mb-3">Main Menu</div>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded transition-all text-sm font-medium tracking-wide ${activeTab === 'overview' ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white border border-transparent'}`}
          >
            <Icons.LayoutDashboard size={18} />
            {t.dashboard.overview}
          </button>
          <button 
            onClick={() => setActiveTab('governance')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded transition-all text-sm font-medium tracking-wide ${activeTab === 'governance' ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white border border-transparent'}`}
          >
            <Icons.Vote size={18} />
            {t.dashboard.governance}
          </button>
          <button 
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded transition-all text-sm font-medium tracking-wide ${activeTab === 'assets' ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white border border-transparent'}`}
          >
            <Icons.Wallet size={18} />
            {t.dashboard.assets}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/20">
          <div className="bg-white dark:bg-[#0b1221] border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 flex items-center gap-3 shadow-sm dark:shadow-none">
            <div className="w-8 h-8 rounded bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center font-bold text-brand-600 dark:text-brand-400 border border-brand-500/30 font-display">U</div>
            <div className="flex-1 overflow-hidden">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate font-mono">User_Creator</div>
              <div className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                {t.dashboard.connected}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50 dark:bg-[#0A0F1A] transition-colors duration-300">
        
        {/* Top Bar */}
        <header className="h-20 bg-white/90 dark:bg-[#0A0F1A]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-6">
             <h2 className="text-xl font-display font-bold uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-brand-500">//</span> 
                {activeTab === 'overview' ? t.dashboard.overview : activeTab === 'governance' ? t.dashboard.governance : t.dashboard.assets}
             </h2>
             <span className="text-[10px] text-slate-500 dark:text-slate-200 font-mono border-l border-slate-300 dark:border-slate-700 pl-6 uppercase tracking-widest">System Status: <span className="text-green-600 dark:text-green-500">Optimal</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-colors border border-slate-300 dark:border-white/10 hover:border-brand-500 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-100"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Icons.Sun size={16} className="text-yellow-400" /> : <Icons.Moon size={16} className="text-brand-600" />}
            </button>

            <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-[#0b1221] px-4 py-2 rounded text-xs font-mono border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-200">
               <span className="w-2 h-2 bg-brand-500 rounded-full shadow-[0_0_8px_#14b8a6]"></span>
               Mainnet: Block 18,245
            </div>
            <button className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded font-display font-bold text-sm transition-all shadow-md dark:shadow-[0_0_15px_rgba(20,184,166,0.3)] dark:hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] border border-brand-400/30 uppercase tracking-wider">
              {t.nav.connect}
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div ref={mainContentRef} className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden group hover:border-brand-500/30 transition-all shadow-sm dark:shadow-none">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icons.TrendingUp size={64} />
                    </div>
                    <h3 className="text-slate-600 dark:text-slate-100 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">{t.dashboard.tvl}</h3>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">$142,593,000</div>
                    <div className="text-green-600 dark:text-green-400 text-xs mt-3 flex items-center gap-1 font-mono bg-green-100 dark:bg-green-900/20 w-fit px-2 py-1 rounded">
                      +15.4% <span className="text-slate-500 dark:text-slate-200">/ 24h</span>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden group hover:border-accent-purple/30 transition-all shadow-sm dark:shadow-none">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icons.Users size={64} />
                    </div>
                    <h3 className="text-slate-600 dark:text-slate-100 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">{t.dashboard.active_members}</h3>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">52,405</div>
                    <div className="text-fuchsia-600 dark:text-accent-purple text-xs mt-3 font-mono bg-fuchsia-100 dark:bg-purple-900/20 w-fit px-2 py-1 rounded">
                      +1,203 New
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-sm dark:shadow-none">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icons.Trophy size={64} />
                    </div>
                    <h3 className="text-slate-600 dark:text-slate-100 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">{t.dashboard.issued_assets}</h3>
                    <div className="text-3xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">1,854</div>
                    <div className="text-blue-600 dark:text-blue-400 text-xs mt-3 font-mono bg-blue-100 dark:bg-blue-900/20 w-fit px-2 py-1 rounded">Total Created</div>
                  </div>

                  <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden group hover:border-brand-500/30 transition-all shadow-sm dark:shadow-none">
                     <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icons.Zap size={64} />
                    </div>
                    <h3 className="text-slate-600 dark:text-slate-100 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">SEPT Price</h3>
                    <div className="text-3xl font-bold font-mono text-[#0d9488] dark:text-[#20B2AA] tracking-tight dark:text-glow">$1.25</div>
                    <div className="text-xs mt-3 text-slate-600 dark:text-slate-200 font-mono bg-slate-100 dark:bg-slate-800/50 w-fit px-2 py-1 rounded">Vol: $45M</div>
                  </div>
                </div>

                {/* Main Layout Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Chart Section - Takes up 2/3 */}
                  <div className="lg:col-span-2 bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 min-h-[450px] relative shadow-sm dark:shadow-none">
                    {/* Grid Pattern BG */}
                    <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden p-1">
                           <LazyImage src={LOGO_URL} alt="SEPT" className="w-full h-full" imageClassName="object-cover dark:invert-0 invert" />
                         </div>
                         <div>
                           <h3 className="text-lg font-display font-bold flex items-center gap-2 text-slate-900 dark:text-white uppercase tracking-wider">
                             {t.dashboard.chart_title}
                           </h3>
                           <span className="text-xs text-slate-500 dark:text-slate-200 font-mono uppercase tracking-widest">SEPT / USDT • BINANCE</span>
                         </div>
                       </div>
                       <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded border border-slate-200 dark:border-slate-800">
                          {['1H', '4H', '1D', '1W'].map(tf => (
                            <button key={tf} className={`px-3 py-1 text-[10px] font-mono rounded-sm transition-colors ${tf === '1D' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white'}`}>
                              {tf}
                            </button>
                          ))}
                       </div>
                    </div>
                    
                    <div className="h-[320px] w-full relative z-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={theme === 'dark' ? "#14b8a6" : "#0d9488"} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={theme === 'dark' ? "#14b8a6" : "#0d9488"} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#1e293b" : "#e2e8f0"} vertical={false} />
                          <XAxis dataKey="name" stroke={theme === 'dark' ? "#e2e8f0" : "#64748b"} tick={{fontSize: 10, fontFamily: 'Space Grotesk', fill: theme === 'dark' ? '#e2e8f0' : '#64748b'}} axisLine={false} tickLine={false} />
                          <YAxis stroke={theme === 'dark' ? "#e2e8f0" : "#64748b"} prefix="$" tick={{fontSize: 10, fontFamily: 'Space Grotesk', fill: theme === 'dark' ? '#e2e8f0' : '#64748b'}} axisLine={false} tickLine={false} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)', borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', color: theme === 'dark' ? '#fff' : '#0f172a', borderRadius: '0px', fontSize: '12px', backdropFilter: 'blur(4px)', fontFamily: 'Space Grotesk' }}
                            itemStyle={{ color: '#2dd4bf' }}
                          />
                          <Area type="monotone" dataKey="value" stroke={theme === 'dark' ? "#14b8a6" : "#0d9488"} strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quick Trade / Activity - Takes up 1/3 */}
                  <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 flex flex-col shadow-sm dark:shadow-none">
                     <h3 className="text-sm font-display font-bold mb-6 uppercase text-slate-900 dark:text-white tracking-[0.2em]">{t.dashboard.trade}</h3>
                     
                     <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-slate-800 group hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
                           <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                              <span>Pay</span>
                              <span>Bal: 0.00</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">0.00</span>
                              <span className="bg-white dark:bg-[#020617] px-3 py-1 text-xs font-bold font-mono border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200">USDT</span>
                           </div>
                        </div>
                        <div className="flex justify-center -my-3 z-10">
                           <div className="bg-white dark:bg-[#020617] p-2 border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:text-white text-slate-400 dark:text-white transition-all cursor-pointer shadow-lg">
                              <Icons.ArrowRight className="rotate-90" size={16} />
                           </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-slate-800 group hover:border-brand-500/50 transition-colors">
                           <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-200 uppercase tracking-wider mb-2 font-mono">
                              <span>Receive</span>
                              <span>~</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-2xl font-mono font-bold text-brand-600 dark:text-brand-400 dark:text-glow">0.00</span>
                              <span className="bg-white dark:bg-[#020617] px-3 py-1 text-xs font-bold font-mono border border-brand-200 dark:border-brand-500/30 text-brand-600 dark:text-brand-400">SEPT</span>
                           </div>
                        </div>

                        <button className="w-full mt-auto bg-brand-600 hover:bg-brand-500 py-4 font-display font-bold text-sm shadow-md dark:shadow-[0_0_20px_rgba(20,184,166,0.2)] dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all uppercase tracking-wider text-white border border-brand-400/20">
                           {t.dashboard.trade}
                        </button>
                     </div>
                  </div>
                </div>
              </>
            )}

            {/* Governance Tab Content */}
            {(activeTab === 'governance' || activeTab === 'overview') && (
              <div className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800/50 pb-4">
                  <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900 dark:text-white">
                    <Icons.Vote className="text-fuchsia-600 dark:text-accent-purple" size={18} /> {t.dashboard.recent_proposals}
                  </h3>
                  {activeTab === 'overview' && (
                    <button onClick={() => setActiveTab('governance')} className="text-xs font-mono text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-white transition-colors uppercase tracking-wider">{t.dashboard.view_all} &rarr;</button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {mockProposals.map(proposal => (
                    <div key={proposal.id} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-5 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center group">
                      <div className="flex-1">
                         <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${proposal.status === 'active' ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-slate-200 dark:bg-slate-600/10 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-600/20'}`}>
                              {proposal.status === 'active' ? t.dashboard.active : t.dashboard.passed}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{proposal.id}</span>
                         </div>
                         <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">{proposal.title}</h4>
                      </div>
                      
                      <div className="w-full md:w-1/3 flex flex-col gap-2">
                         <div className="flex justify-between text-[10px] uppercase text-slate-500 dark:text-slate-300 font-bold tracking-wider">
                            <span>{t.dashboard.votes_for}</span>
                            <span>{t.dashboard.votes_against}</span>
                         </div>
                         <div className="h-2 bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                            <div className="bg-green-500 h-full shadow-[0_0_10px_#22c55e]" style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}></div>
                         </div>
                         <div className="text-right text-[10px] text-slate-500 dark:text-slate-300 font-mono">
                           {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% Approval
                         </div>
                      </div>

                      <button className="hidden md:block px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 font-medium transition-colors border border-slate-300 dark:border-slate-700 font-mono uppercase">
                        {t.dashboard.view_details}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assets Tab Content */}
            {(activeTab === 'assets' || activeTab === 'overview') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/50 pb-4">
                  <h3 className="text-sm font-display font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-slate-900 dark:text-white">
                    <Icons.Wallet className="text-green-500" size={18} /> {t.dashboard.trending_assets}
                  </h3>
                  {activeTab === 'overview' && (
                    <button onClick={() => setActiveTab('assets')} className="text-xs font-mono text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-white transition-colors uppercase tracking-wider">{t.dashboard.go_market} &rarr;</button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockAssets.map(asset => (
                    <div key={asset.id} className="bg-white dark:bg-[#0b1221]/80 backdrop-blur border border-slate-200 dark:border-slate-800 p-4 hover:border-brand-500/50 transition-all group relative overflow-hidden shadow-sm dark:shadow-none">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-500/20 transition-all"></div>
                      
                      <div className="flex items-start gap-4 mb-4 relative z-10">
                         <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-shadow">
                            <LazyImage src={asset.image} alt={asset.name} className="w-full h-full" imageClassName="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <div className="overflow-hidden">
                            <h4 className="font-display font-bold text-sm truncate text-slate-900 dark:text-white tracking-wide group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">{asset.name}</h4>
                            <div className="flex items-center gap-2 mt-2">
                               <span className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-slate-500 dark:text-slate-300 font-mono uppercase">{asset.type}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-end justify-between border-t border-slate-100 dark:border-slate-800/50 pt-3 relative z-10">
                         <div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Price</div>
                            <div className="text-base font-mono font-bold text-slate-900 dark:text-white group-hover:text-glow">{asset.price}</div>
                         </div>
                         <div className={`text-xs font-mono font-bold px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${asset.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                           {asset.change > 0 ? '+' : ''}{asset.change}%
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          
          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em]">
             <div>CONNECTED TO MAINNET • LATENCY: 24ms</div>
             <div className="mt-2">&copy; 2024 SEPT DECENTRALIZED PLATFORM</div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;