import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS, SECTORS } from '../data';
import { Character } from '../types';
import { Search, SlidersHorizontal, Eye, ShieldCheck, Flame, Zap, Compass, User } from 'lucide-react';

interface CharacterDirectoryProps {
  initialSectorFilter: number | null;
  onClearInitialSectorFilter: () => void;
}

const getCharacterImage = (id: string, gender: string) => {
  const images: Record<string, string> = {
    mirinae: 'https://mul3.uk/du/a1/1.webp',
    ego: 'https://mul3.uk/du/b/1.webp',
    jina: 'https://mul3.uk/du/c/1.webp',
    petra: 'https://mul3.uk/du/d/1.webp',
    ame: 'https://mul3.uk/du/e/1.webp',
    aive: 'https://mul3.uk/du/f/1.webp',
    jenny: 'https://mul3.uk/du/g/1.webp',
    finn: 'https://mul3.uk/du/h/1.webp',
    zeta: 'https://mul3.uk/du/i/1.webp',
    ester: 'https://mul3.uk/du/j/1.webp',
    reindust: 'https://mul3.uk/du/k/1.webp',
    sena: 'https://mul3.uk/du/l/1.webp',
    jent: 'https://mul3.uk/du/m/1.webp',
    aby: 'https://mul3.uk/du/n/1.webp',
    erin: 'https://mul3.uk/du/o/1.webp',
    jin: 'https://mul3.uk/du/p/1.webp',
    ara: 'https://mul3.uk/du/q/1.webp',
    jack: 'https://mul3.uk/du/r/1.webp',
    jade: 'https://mul3.uk/du/s/1.webp',
    jester: 'https://mul3.uk/du/t/1.webp',
    mina: 'https://mul3.uk/du/u/1.webp',
    vengeance: 'https://mul3.uk/du/v/1.webp',
    lacaren: 'https://mul3.uk/du/w1/1.webp',
    leky: 'https://mul3.uk/du/x/1.webp',
    selezia: 'https://mul3.uk/du/y/1.webp',
    ren: 'https://mul3.uk/du/z/w.webp'
  };
  return images[id] || (gender === '여' 
    ? 'https://mul3.uk/du/za/1.webp'
    : 'https://mul3.uk/du/zb/1.webp');
};

const getRatingBorderAndShadow = (rating: string) => {
  if (rating.includes('오메가')) {
    return 'border-red-500/25 hover:border-red-500/50 shadow-[inset_0_0_12px_rgba(239,68,68,0.03)] hover:shadow-[0_0_15px_rgba(239,68,68,0.06)]';
  }
  if (rating.includes('엡실론')) {
    return 'border-purple-500/20 hover:border-purple-500/45 shadow-[inset_0_0_12px_rgba(168,85,247,0.03)] hover:shadow-[0_0_15px_rgba(168,85,247,0.06)]';
  }
  if (rating.includes('델타')) {
    return 'border-blue-500/20 hover:border-blue-500/40 shadow-[inset_0_0_12px_rgba(59,130,246,0.02)] hover:shadow-[0_0_15px_rgba(59,130,246,0.05)]';
  }
  if (rating.includes('감마')) {
    return 'border-green-500/20 hover:border-green-500/40 shadow-[inset_0_0_12px_rgba(34,197,94,0.02)] hover:shadow-[0_0_15px_rgba(34,197,94,0.05)]';
  }
  if (rating.includes('베타')) {
    return 'border-zinc-800 hover:border-zinc-500 shadow-[inset_0_0_12px_rgba(255,255,255,0.01)]';
  }
  return 'border-zinc-900 hover:border-zinc-700';
};

const getRatingAccentBg = (rating: string) => {
  if (rating.includes('오메가')) return 'bg-red-500/80';
  if (rating.includes('엡실론')) return 'bg-purple-500/80';
  if (rating.includes('델타')) return 'bg-blue-500/80';
  if (rating.includes('감마')) return 'bg-green-500/80';
  return 'bg-zinc-600';
};

export default function CharacterDirectory({ 
  initialSectorFilter, 
  onClearInitialSectorFilter 
}: CharacterDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<number | 'ALL'>('ALL');
  const [selectedRating, setSelectedRating] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  // Reset secret state when changing characters
  useEffect(() => {
    setIsSecretRevealed(false);
  }, [selectedCharacter]);

  // Sync initial sector filter if redirected from Map tab
  useEffect(() => {
    if (initialSectorFilter !== null) {
      setSelectedSector(initialSectorFilter);
      // Scroll to top of directory
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialSectorFilter]);

  const handleClearSectorFilter = () => {
    setSelectedSector('ALL');
    onClearInitialSectorFilter();
  };

  // Extract all unique ratings for filter dropdown
  const ratingCategories = ['ALL', '오메가', '엡실론', '델타', '감마', '베타', '없음'];

  // Filtered Characters
  const filteredCharacters = CHARACTERS.filter((char) => {
    const matchesSearch = 
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (char.addonName && char.addonName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (char.externalName && char.externalName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      char.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = selectedSector === 'ALL' || char.sectorId === selectedSector;
    
    const matchesRating = selectedRating === 'ALL' || char.rating.includes(selectedRating);
    
    const matchesGender = selectedGender === 'ALL' || char.gender === selectedGender;

    return matchesSearch && matchesSector && matchesRating && matchesGender;
  });

  const getSectorName = (id: number) => {
    const s = SECTORS.find(sec => sec.id === id);
    return s ? `${s.name} '${s.subName}'` : `섹터 ${id}`;
  };

  const getRatingBadgeClass = (rating: string) => {
    if (rating.includes('오메가')) return 'bg-red-500/10 text-red-400 border-red-500/30 font-extrabold shadow-[0_0_8px_rgba(239,68,68,0.2)]';
    if (rating.includes('엡실론')) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (rating.includes('델타')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (rating.includes('감마')) return 'bg-green-500/10 text-green-400 border-green-500/30';
    if (rating.includes('베타')) return 'bg-zinc-500/10 text-zinc-400 border-zinc-700';
    return 'bg-zinc-900 text-zinc-500 border-zinc-800';
  };

  // Computed values for selected character's secret status
  const hasSecret = !!selectedCharacter?.secretDetails;
  
  const displayedName = (isSecretRevealed && selectedCharacter?.secretDetails?.revealedName)
    ? selectedCharacter.secretDetails.revealedName 
    : selectedCharacter?.name;

  const displayedRole = (isSecretRevealed && selectedCharacter?.secretDetails?.trueIdentity)
    ? selectedCharacter.secretDetails.trueIdentity
    : selectedCharacter?.role;

  const displayedRating = (isSecretRevealed && selectedCharacter?.secretDetails?.revealedRating)
    ? selectedCharacter.secretDetails.revealedRating
    : selectedCharacter?.rating;

  const displayedAddonName = (isSecretRevealed && selectedCharacter?.secretDetails?.hiddenAddonName)
    ? selectedCharacter.secretDetails.hiddenAddonName
    : selectedCharacter?.addonName;

  const displayedAddonDesc = (isSecretRevealed && selectedCharacter?.secretDetails?.hiddenAddonDesc)
    ? selectedCharacter.secretDetails.hiddenAddonDesc
    : selectedCharacter?.addonDescription;

  const displayedExternalName = (isSecretRevealed && selectedCharacter?.secretDetails?.hiddenExternalName)
    ? selectedCharacter.secretDetails.hiddenExternalName
    : selectedCharacter?.externalName;

  const displayedExternalDesc = (isSecretRevealed && selectedCharacter?.secretDetails?.hiddenExternalDescription)
    ? selectedCharacter.secretDetails.hiddenExternalDescription
    : selectedCharacter?.externalDescription;

  const displayedRatingBadgeClass = selectedCharacter ? getRatingBadgeClass(displayedRating || '') : '';

  const displayedImageSrc = (selectedCharacter?.id === 'mirinae' && isSecretRevealed)
    ? 'https://mul3.uk/du/a2/1.webp'
    : (selectedCharacter ? getCharacterImage(selectedCharacter.id, selectedCharacter.gender) : '');

  const displayedImageFilterClass = (selectedCharacter?.id === 'mirinae' && isSecretRevealed)
    ? 'grayscale-40 contrast-125 brightness-75 sepia saturate-150 scale-102 filter transition-all duration-700'
    : 'opacity-75 transition-all duration-700';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 text-[#d4d4d8]">
      
      {/* Top filter dashboard */}
      <div className="space-y-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Personnel Dossier</span>
            </div>
            <h2 className="text-3xl font-black text-zinc-100 tracking-tight" id="directory-title">
              인물 정보 관리자
            </h2>
            <p className="text-[9px] text-zinc-500 font-mono">DUSK_CITY_REGISTRY_DATABASE_LIVE_V2.7</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              placeholder="이름, 역할, 이능력(애드온) 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#151516] border border-[#3f3f46] rounded-lg text-xs text-[#d4d4d8] placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors font-mono"
              id="directory-search"
            />
            <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Filter controls panel */}
        <div className="glass p-5 rounded-lg grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          {/* Sector filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">소속 섹터별</label>
            <div className="flex items-center gap-1.5">
              <select 
                value={selectedSector}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedSector(val === 'ALL' ? 'ALL' : Number(val));
                  if (val === 'ALL') onClearInitialSectorFilter();
                }}
                className="w-full py-1.5 px-3 bg-[#151516] border border-[#3f3f46] rounded-lg text-xs text-[#d4d4d8] focus:outline-none focus:border-zinc-400 font-mono"
                id="filter-sector"
              >
                <option value="ALL">전체 섹터</option>
                {SECTORS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.subName})</option>
                ))}
              </select>
              {selectedSector !== 'ALL' && (
                <button 
                  onClick={handleClearSectorFilter}
                  className="text-[10px] text-zinc-400 hover:text-zinc-200 hover:underline font-mono cursor-pointer"
                  id="btn-clear-sector-filter"
                >
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Rating filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">애드온 등급별</label>
            <select 
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full py-1.5 px-3 bg-[#151516] border border-[#3f3f46] rounded-lg text-xs text-[#d4d4d8] focus:outline-none focus:border-zinc-400 font-mono"
              id="filter-rating"
            >
              {ratingCategories.map(cat => (
                <option key={cat} value={cat}>{cat === 'ALL' ? '전체 등급' : cat}</option>
              ))}
            </select>
          </div>

          {/* Gender filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">성별 성상</label>
            <select 
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full py-1.5 px-3 bg-[#151516] border border-[#3f3f46] rounded-lg text-xs text-[#d4d4d8] focus:outline-none focus:border-zinc-400 font-mono"
              id="filter-gender"
            >
              <option value="ALL">전체 성별</option>
              <option value="여">여성 (Female)</option>
              <option value="남">남성 (Male)</option>
              <option value="?">미확인 (?)</option>
            </select>
          </div>

          {/* Roster counts */}
          <div className="sm:col-span-3 lg:col-span-1 text-right text-xs text-zinc-500 font-mono self-end py-1.5">
            검색 결과: <span className="text-zinc-300 font-bold">{filteredCharacters.length}</span> / {CHARACTERS.length} 명
          </div>
        </div>
      </div>

      {/* Grid of Character cards */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/5">
          <p className="text-zinc-500 font-mono text-xs">NO_FILES_MATCHED_REGISTRY_SEARCH</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedSector('ALL');
              setSelectedRating('ALL');
              setSelectedGender('ALL');
              onClearInitialSectorFilter();
            }}
            className="mt-4 text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer"
            id="btn-reset-all-filters"
          >
            모든 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((char) => {
            return (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`glass relative group rounded-lg p-5 flex flex-col justify-between transition-all duration-300 tech-hover-card corner-container ${getRatingBorderAndShadow(char.rating)}`}
                id={`char-card-${char.id}`}
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />

                {/* Visual Accent Lines */}
                <div className={`absolute top-0 left-0 w-2 h-[1px] ${getRatingAccentBg(char.rating)}`} />
                <div className={`absolute top-0 left-0 w-[1px] h-2 ${getRatingAccentBg(char.rating)}`} />

                <div className="space-y-4">
                  {/* Card Header: Rating & Gender & Sector */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                      <Compass className="w-3 h-3 text-zinc-600" />
                      <span>{getSectorName(char.sectorId)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-500">[{char.gender}]</span>
                      <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono ${getRatingBadgeClass(char.rating)}`}>
                        {char.rating}
                      </span>
                    </div>
                  </div>

                  {/* Character Portrait Placeholder */}
                  <div className="aspect-[16/10] w-full rounded-md overflow-hidden bg-zinc-950 border border-zinc-850/80 relative group-hover:border-zinc-700/60 transition-colors">
                    <img 
                      src={getCharacterImage(char.id, char.gender)} 
                      alt={char.name}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-102 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent pointer-events-none" />
                    
                    {/* Corner accents inside the image */}
                    <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-zinc-600/40" />
                    <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-zinc-600/40" />
                    <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-zinc-600/40" />
                    <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-zinc-600/40" />
                  </div>

                  {/* Name & Role */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 group-hover:text-zinc-200 transition-colors">
                      {char.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium font-sans">
                      {char.role}
                    </p>
                    <p className="text-xs text-zinc-400 font-sans italic leading-relaxed line-clamp-2 pl-2 border-l border-zinc-800">
                      "{char.quote}"
                    </p>
                  </div>

                  {/* Quick look block (Addon / External names) */}
                  <div className="space-y-1 text-xs">
                    {char.addonName && (
                      <div className="flex items-center gap-1.5 bg-[#151516]/50 rounded px-2.5 py-1 text-[10px] text-zinc-400 border border-[#3f3f46]/30">
                        <Flame className="w-3 h-3 text-red-500/60 shrink-0" />
                        <span className="truncate font-sans font-medium"><strong className="text-zinc-500 font-mono font-normal">ADDON:</strong> {char.addonName.split(' - ')[0]}</span>
                      </div>
                    )}
                    {char.externalName && (
                      <div className="flex items-center gap-1.5 bg-[#151516]/50 rounded px-2.5 py-1 text-[10px] text-zinc-400 border border-[#3f3f46]/30">
                        <Zap className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span className="truncate font-sans font-medium"><strong className="text-zinc-500 font-mono font-normal">EXTER:</strong> {char.externalName.split(' - ')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inspect Button */}
                <div className="mt-5 pt-3 border-t border-zinc-800/40">
                  <button
                    onClick={() => setSelectedCharacter(char)}
                    className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-[#151516] border border-[#3f3f46] hover:bg-zinc-800 hover:text-white hover:border-zinc-400 text-xs text-zinc-300 font-mono transition-all duration-250 cursor-pointer"
                    id={`btn-inspect-char-${char.id}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                    <span>Dossier_Check</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Character Dossier Modal Overlay */}
      <AnimatePresence>
        {selectedCharacter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`glass relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg p-6 md:p-8 text-[#d4d4d8] space-y-6 shadow-2xl custom-scrollbar transition-all duration-500 border ${
                isSecretRevealed 
                  ? 'border-red-900/50 shadow-[0_0_45px_rgba(239,68,68,0.12)] bg-[#0d0a0a]/95' 
                  : 'border-zinc-800'
              }`}
              id="character-modal-content"
            >
              {/* Corner accents */}
              <div className={`absolute top-0 left-0 w-3 h-[1px] transition-colors duration-350 ${isSecretRevealed ? 'bg-red-500' : 'bg-zinc-500'}`} />
              <div className={`absolute top-0 left-0 w-[1px] h-3 transition-colors duration-350 ${isSecretRevealed ? 'bg-red-500' : 'bg-zinc-500'}`} />

              {/* Close button */}
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-100 transition-colors font-mono text-[10px] border border-[#3f3f46] px-2.5 py-1 rounded bg-[#151516] cursor-pointer"
                id="btn-close-modal"
              >
                [ESC_CLOSE]
              </button>

              {/* Modal Header */}
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 transition-colors duration-350 ${isSecretRevealed ? 'border-red-950' : 'border-[#3f3f46]'}`}>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    {getSectorName(selectedCharacter.sectorId)}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-tight transition-all duration-350">{displayedName}</h2>
                    <span className="text-xs text-zinc-500 font-mono">({selectedCharacter.gender})</span>
                  </div>
                  <p className="text-xs font-medium text-zinc-400 font-sans transition-all duration-350">{displayedRole}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Addon Rating</span>
                  <span className={`text-xs border px-2.5 py-1 rounded font-mono font-bold transition-all duration-350 ${displayedRatingBadgeClass}`}>
                    {displayedRating}
                  </span>
                </div>
              </div>

              {/* Character Banner Image Placeholder */}
              <div className={`w-full h-[320px] md:h-[480px] rounded-lg overflow-hidden bg-zinc-950 border relative transition-all duration-500 ${
                isSecretRevealed && selectedCharacter.id === 'mirinae'
                  ? 'border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                  : 'border-zinc-800'
              }`}>
                <img 
                  src={displayedImageSrc} 
                  alt={displayedName}
                  className={`w-full h-full object-cover transition-all duration-700 ${displayedImageFilterClass}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151516]/95 via-transparent to-transparent pointer-events-none" />
                
                {/* Scanner feed details overlay */}
                <div className={`absolute bottom-3 left-4 flex items-center gap-2 text-[9px] font-mono bg-zinc-950/80 px-2.5 py-0.5 rounded border transition-colors duration-350 ${
                  isSecretRevealed 
                    ? 'text-red-400 border-red-950 shadow-[0_0_8px_rgba(239,68,68,0.2)]' 
                    : 'text-zinc-500 border-zinc-850'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isSecretRevealed ? 'bg-red-500' : 'bg-amber-500/85'}`} />
                  <span>{isSecretRevealed ? 'DUSK_SYS::CLASSIFIED_OVERRIDE_ACTIVE' : 'DUSK_SYS::PORTRAIT_STREAM_OK'}</span>
                </div>
              </div>

              {/* Character Signature Quote */}
              <div className={`p-4 rounded-lg bg-zinc-950/40 border transition-all duration-300 pl-4 border-l-2 italic ${
                isSecretRevealed ? 'border-red-950/60 border-l-red-500/80 bg-red-950/5' : 'border-zinc-900 border-l-amber-500/60'
              }`}>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  "{selectedCharacter.quote}"
                </p>
              </div>

              {/* Classified Secrets Access Terminal Button */}
              {hasSecret && (
                <div className="w-full">
                  <button
                    onClick={() => setIsSecretRevealed(!isSecretRevealed)}
                    className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all duration-300 font-mono text-xs uppercase tracking-wider cursor-pointer border ${
                      isSecretRevealed 
                        ? 'bg-red-950/45 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-900/40' 
                        : 'bg-[#151516] border-[#3f3f46] hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white'
                    }`}
                    id="btn-toggle-secret"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSecretRevealed ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isSecretRevealed ? 'bg-red-600' : 'bg-amber-600'}`}></span>
                    </span>
                    <span>{isSecretRevealed ? '기밀 정보 잠금 (LOCK_DOSSIER)' : '비밀 및 진실 보기 (ACCESS CLASSIFIED DOSSIER)'}</span>
                  </button>
                </div>
              )}

              {/* Dossier Grid Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sector & Role */}
                <div className={`p-4 rounded-lg flex flex-col justify-between transition-colors duration-300 bg-[#151516]/50 border ${isSecretRevealed ? 'border-red-950/40' : 'border-zinc-800/80'}`}>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest">소속 구역 / 역할</span>
                  <div className="mt-2.5">
                    <p className="text-xs font-bold text-zinc-300 font-mono">{getSectorName(selectedCharacter.sectorId)}</p>
                    <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{displayedRole}</p>
                  </div>
                </div>

                {/* Bio Attributes */}
                <div className={`p-4 rounded-lg flex flex-col justify-between transition-colors duration-300 bg-[#151516]/50 border ${isSecretRevealed ? 'border-red-950/40' : 'border-zinc-800/80'}`}>
                  <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest">생체 상태 / 애드온 등급</span>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-zinc-300 font-mono">성별: {selectedCharacter.gender}성</p>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">등급: {displayedRating}</p>
                    </div>
                    <span className={`text-[9px] border px-2 py-0.5 rounded font-mono font-extrabold transition-all duration-300 ${displayedRatingBadgeClass}`}>
                      {(displayedRating || '').split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid: Details */}
              <div className="space-y-5 pt-2">
                {/* Personality Tags */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">고유 성격 지형도 (Personality)</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.personality.map((p, idx) => (
                      <span key={idx} className="text-[11px] bg-[#151516]/80 border border-zinc-800 px-3 py-1.5 rounded-md text-zinc-400 font-sans font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secret Backstory Reveal */}
                {isSecretRevealed && selectedCharacter.secretDetails?.backstory && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-lg border border-red-900/35 bg-red-950/10 space-y-2 text-xs text-zinc-300 leading-relaxed shadow-[inset_0_0_15px_rgba(239,68,68,0.05)]"
                  >
                    <h4 className="text-[10px] font-mono uppercase text-red-400 tracking-widest flex items-center gap-2 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      <span>기밀 기록: 숨겨진 진실 (CLASSIFIED DOSSIER ARCHIVE)</span>
                    </h4>
                    <p className="font-sans whitespace-pre-line">
                      {selectedCharacter.secretDetails.backstory}
                    </p>
                  </motion.div>
                )}

                <div className="h-[1px] bg-zinc-850 my-2" />

                {/* Abilities Block (Add-on & External) */}
                {(displayedAddonName || displayedExternalName) && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">이능력 기어 보고서 (Ability Data)</h4>
                    
                    {displayedAddonName && (
                      <div className="p-4 rounded-lg border border-red-950/40 bg-red-950/10 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                          <Flame className="w-4 h-4 shrink-0" />
                          <span>고유 애드온: {displayedAddonName}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {displayedAddonDesc}
                        </p>
                      </div>
                    )}

                    {displayedExternalName && (
                      <div className="p-4 rounded-lg border border-zinc-800 bg-[#151516]/40 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                          <Zap className="w-4 h-4 shrink-0" />
                          <span>고유 익스터널: {displayedExternalName}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {displayedExternalDesc}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
