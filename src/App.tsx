import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MainCover from './components/MainCover';
import SectorMap from './components/SectorMap';
import CharacterDirectory from './components/CharacterDirectory';
import SecretVault from './components/SecretVault';
import { Compass, BookOpen, Terminal, Skull, AlertCircle, HelpCircle } from 'lucide-react';

type TabType = 'home' | 'map' | 'characters' | 'secrets';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [sectorFilter, setSectorFilter] = useState<number | null>(null);

  // Transition helper from Map to Character list with automatic filter
  const handleSelectSectorCharacters = (sectorId: number) => {
    setSectorFilter(sectorId);
    setActiveTab('characters');
  };

  const handleClearSectorFilter = () => {
    setSectorFilter(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1b] text-[#d4d4d8] font-sans selection:bg-[#3f3f46]/50 selection:text-zinc-100 flex flex-row relative overflow-x-hidden">
      
      {/* Fixed Dust Overlay from Design */}
      <div className="dust-overlay pointer-events-none" />
      <div className="cyber-grid pointer-events-none" />
      <div className="cyber-scanline pointer-events-none" />

      {/* Elegant Left Sidebar - visible on medium screens and up */}
      <aside className="w-16 border-r border-zinc-800 hidden md:flex flex-col items-center justify-between py-8 bg-[#151516] shrink-0 sticky top-0 h-screen z-50 self-start">
        <div 
          className="flex flex-col items-center gap-1.5 cursor-pointer group" 
          onClick={() => { setActiveTab('home'); setSectorFilter(null); }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#27272a] border border-[#3f3f46] flex items-center justify-center group-hover:border-[#d4d4d8] transition-all">
            <span className="text-zinc-300 font-mono font-black text-xs tracking-tighter">DC</span>
          </div>
        </div>

        {/* Vertical text navigation */}
        <div className="flex flex-col gap-6 items-center w-full text-[10px] tracking-[0.25em] font-bold text-zinc-500">
          <button 
            onClick={() => { setActiveTab('home'); setSectorFilter(null); }}
            className={`w-full h-20 flex items-center justify-center relative cursor-pointer group transition-colors uppercase font-bold ${activeTab === 'home' ? 'text-zinc-100 font-black' : 'text-zinc-500 hover:text-zinc-200'}`}
            id="nav-tab-home-aside"
          >
            <span className="transform -rotate-90 origin-center whitespace-nowrap select-none pointer-events-none">
              INDEX
            </span>
          </button>
          <button 
            onClick={() => { setActiveTab('map'); setSectorFilter(null); }}
            className={`w-full h-20 flex items-center justify-center relative cursor-pointer group transition-colors uppercase font-bold ${activeTab === 'map' ? 'text-zinc-100 font-black' : 'text-zinc-500 hover:text-zinc-200'}`}
            id="nav-tab-map-aside"
          >
            <span className="transform -rotate-90 origin-center whitespace-nowrap select-none pointer-events-none">
              WORLD MAP
            </span>
          </button>
          <button 
            onClick={() => { setActiveTab('characters'); }}
            className={`w-full h-20 flex items-center justify-center relative cursor-pointer group transition-colors uppercase font-bold ${activeTab === 'characters' ? 'text-zinc-100 font-black' : 'text-zinc-500 hover:text-zinc-200'}`}
            id="nav-tab-chars-aside"
          >
            <span className="transform -rotate-90 origin-center whitespace-nowrap select-none pointer-events-none relative">
              REGISTRY
              {sectorFilter !== null && (
                <span className="absolute -top-1 -right-2.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </span>
          </button>
          <button 
            onClick={() => { setActiveTab('secrets'); setSectorFilter(null); }}
            className={`w-full h-20 flex items-center justify-center relative cursor-pointer group transition-colors uppercase font-bold ${activeTab === 'secrets' ? 'text-red-400 font-black' : 'text-zinc-500 hover:text-red-400'}`}
            id="nav-tab-secrets-aside"
          >
            <span className="transform -rotate-90 origin-center whitespace-nowrap select-none pointer-events-none">
              SYSTEM
            </span>
          </button>
        </div>

        {/* Help circle / system status indicator */}
        <div className="w-8 h-8 rounded-full border border-zinc-800/80 flex items-center justify-center cursor-help group transition-all hover:bg-zinc-900/30">
          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover:bg-amber-500 transition-colors"></div>
        </div>
      </aside>

      {/* Main Container Area on the right */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#1a1a1b] z-10 overflow-x-hidden">
        
        {/* Global Header Navigation styled like the Design HTML */}
        <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#1a1a1b]/80 backdrop-blur-md px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile-only logo / tab drawer activator */}
            <div 
              className="md:hidden flex items-center gap-2 cursor-pointer" 
              onClick={() => { setActiveTab('home'); setSectorFilter(null); }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#27272a] border border-[#3f3f46] flex items-center justify-center">
                <span className="text-zinc-300 font-mono font-black text-xs tracking-tighter">DC</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 tracking-tighter uppercase">DUSK CITY / PROTOCOL v4.12</span>
              <h1 className="text-base md:text-2xl font-light tracking-widest text-zinc-100 flex items-baseline">
                더스크 시티 
                <span className="text-zinc-600 text-[10px] md:text-xs italic font-normal ml-2 tracking-wider uppercase font-mono">MASTER DATASET</span>
              </h1>
            </div>
          </div>

          {/* Right Header info blocks */}
          <div className="flex gap-4 md:gap-8 text-[10px] font-mono">
            <div className="flex flex-col items-end">
              <span className="text-zinc-500 uppercase tracking-wider">Population</span>
              <span className="text-zinc-300 font-bold">4,120,551</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-zinc-500 uppercase tracking-wider">Active Kings</span>
              <span className="text-zinc-300 font-bold">06 / 11</span>
            </div>
          </div>
        </header>

        {/* Mobile-only Top Navigation Tab Bar */}
        <nav className="flex md:hidden items-center justify-around bg-[#151516] border-b border-zinc-800/80 py-2.5 px-4 sticky top-20 z-30">
          <button
            onClick={() => { setActiveTab('home'); setSectorFilter(null); }}
            className={`text-[10px] uppercase font-bold tracking-wider ${activeTab === 'home' ? 'text-zinc-100 border-b border-zinc-300 pb-0.5' : 'text-zinc-500'}`}
            id="nav-tab-home"
          >
            INDEX
          </button>
          <button
            onClick={() => { setActiveTab('map'); setSectorFilter(null); }}
            className={`text-[10px] uppercase font-bold tracking-wider ${activeTab === 'map' ? 'text-zinc-100 border-b border-zinc-300 pb-0.5' : 'text-zinc-500'}`}
            id="nav-tab-map"
          >
            MAP
          </button>
          <button
            onClick={() => { setActiveTab('characters'); }}
            className={`relative text-[10px] uppercase font-bold tracking-wider ${activeTab === 'characters' ? 'text-zinc-100 border-b border-zinc-300 pb-0.5' : 'text-zinc-500'}`}
            id="nav-tab-characters"
          >
            REGISTRY
            {sectorFilter !== null && (
              <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('secrets'); setSectorFilter(null); }}
            className={`text-[10px] uppercase font-bold tracking-wider ${activeTab === 'secrets' ? 'text-red-400 border-b border-red-500/80 pb-0.5' : 'text-zinc-500'}`}
            id="nav-tab-secrets"
          >
            SYSTEM
          </button>
        </nav>

        {/* Main App Content View Wrapper */}
        <main className="flex-1 w-full relative">
          <div className="relative z-10 w-full min-h-[75vh]">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <MainCover onNavigate={(tab) => {
                    setActiveTab(tab as TabType);
                    setSectorFilter(null);
                  }} />
                </motion.div>
              )}

              {activeTab === 'map' && (
                <motion.div
                  key="map-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <SectorMap onSelectSectorCharacters={handleSelectSectorCharacters} />
                </motion.div>
              )}

              {activeTab === 'characters' && (
                <motion.div
                  key="characters-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <CharacterDirectory 
                    initialSectorFilter={sectorFilter} 
                    onClearInitialSectorFilter={handleClearSectorFilter} 
                  />
                </motion.div>
              )}

              {activeTab === 'secrets' && (
                <motion.div
                  key="secrets-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <SecretVault />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Global Footer matched to the Elegant Dark styling */}
        <footer className="h-16 border-t border-zinc-850 bg-[#151516] flex flex-col sm:flex-row items-center justify-between px-6 md:px-10 text-[9px] font-mono text-zinc-600 gap-2 py-4 sm:py-0 shrink-0">
          <div className="flex gap-4 sm:gap-6 uppercase tracking-widest">
            <span>Encryption: Active</span>
            <span>System: Stable</span>
            <span>Dusk_OS_v11.0.2</span>
          </div>
          <div className="uppercase tracking-widest text-center sm:text-right">
            &copy; DUSK CITY MANAGEMENT BUREAU
          </div>
        </footer>

      </div>
    </div>
  );
}
