import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTORS } from '../data';
import { Sector } from '../types';
import { Shield, Users, Compass, ShieldAlert, ArrowRight, Plus, Minus, RotateCcw, X, Info, Move, Maximize2, Minimize2 } from 'lucide-react';

interface SectorMapProps {
  onSelectSectorCharacters: (sectorId: number) => void;
}

// Math helpers for SVG annulus segment drawing
const getSectorPath = (cx: number, cy: number, rIn: number, rOut: number, startAngle: number, endAngle: number) => {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1_in = cx + rIn * Math.cos(startRad);
  const y1_in = cy + rIn * Math.sin(startRad);
  const x2_in = cx + rIn * Math.cos(endRad);
  const y2_in = cy + rIn * Math.sin(endRad);

  const x1_out = cx + rOut * Math.cos(startRad);
  const y1_out = cy + rOut * Math.sin(startRad);
  const x2_out = cx + rOut * Math.cos(endRad);
  const y2_out = cy + rOut * Math.sin(endRad);

  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

  return `
    M ${x1_out} ${y1_out}
    A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2_out} ${y2_out}
    L ${x2_in} ${y2_in}
    A ${rIn} ${rIn} 0 ${largeArc} 0 ${x1_in} ${y1_in}
    Z
  `.trim();
};

// Clean visual presentation without complex 3D overlays

export default function SectorMap({ onSelectSectorCharacters }: SectorMapProps) {
  const [selectedSectorId, setSelectedSectorId] = useState<number | null>(null);
  const [hoveredSectorId, setHoveredSectorId] = useState<number | null>(null);
  
  // Interactive navigation states
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1.0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Drag tracking refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartAngleRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);
  const dragStartPosRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef<boolean>(false);

  const getSectorName = (id: number) => {
    return SECTORS.find(s => s.id === id)?.name || `섹터 ${id}`;
  };

  // Colors based on danger levels
  const getSectorColors = (dangerLevel: string, isSelected: boolean, isHovered: boolean) => {
    const norm = dangerLevel.toLowerCase();
    
    if (norm.includes('안전')) {
      return {
        fill: isSelected 
          ? 'rgba(20, 184, 166, 0.35)' 
          : isHovered 
            ? 'rgba(20, 184, 166, 0.22)' 
            : 'rgba(20, 184, 166, 0.08)',
        stroke: isSelected ? '#14b8a6' : isHovered ? 'rgba(20, 184, 166, 0.7)' : 'rgba(20, 184, 166, 0.35)',
        extrusion: isSelected ? 'rgba(13, 148, 136, 0.9)' : 'rgba(13, 148, 136, 0.45)',
        text: 'text-teal-300',
        badge: 'text-teal-400 border-teal-500/30 bg-teal-500/10'
      };
    }
    if (norm.includes('경계')) {
      return {
        fill: isSelected 
          ? 'rgba(217, 119, 6, 0.35)' 
          : isHovered 
            ? 'rgba(217, 119, 6, 0.22)' 
            : 'rgba(217, 119, 6, 0.08)',
        stroke: isSelected ? '#d97706' : isHovered ? 'rgba(217, 119, 6, 0.7)' : 'rgba(217, 119, 6, 0.35)',
        extrusion: isSelected ? 'rgba(180, 83, 9, 0.9)' : 'rgba(180, 83, 9, 0.45)',
        text: 'text-amber-300',
        badge: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      };
    }
    if (norm.includes('위험')) {
      return {
        fill: isSelected 
          ? 'rgba(234, 88, 12, 0.35)' 
          : isHovered 
            ? 'rgba(234, 88, 12, 0.22)' 
            : 'rgba(234, 88, 12, 0.08)',
        stroke: isSelected ? '#ea580c' : isHovered ? 'rgba(234, 88, 12, 0.7)' : 'rgba(234, 88, 12, 0.35)',
        extrusion: isSelected ? 'rgba(194, 65, 12, 0.9)' : 'rgba(194, 65, 12, 0.45)',
        text: 'text-orange-300',
        badge: 'text-orange-400 border-orange-500/30 bg-orange-500/10'
      };
    }
    if (norm.includes('최악') || norm.includes('나락') || norm.includes('매우 위험')) {
      return {
        fill: isSelected 
          ? 'rgba(190, 18, 60, 0.38)' 
          : isHovered 
            ? 'rgba(190, 18, 60, 0.25)' 
            : 'rgba(190, 18, 60, 0.09)',
        stroke: isSelected ? '#be123c' : isHovered ? 'rgba(190, 18, 60, 0.75)' : 'rgba(190, 18, 60, 0.35)',
        extrusion: isSelected ? 'rgba(159, 18, 57, 0.9)' : 'rgba(159, 18, 57, 0.5)',
        text: 'text-red-300',
        badge: 'text-red-500 border-red-500/30 bg-red-500/10 animate-pulse'
      };
    }
    if (norm.includes('보통')) {
      return {
        fill: isSelected 
          ? 'rgba(148, 163, 184, 0.32)' 
          : isHovered 
            ? 'rgba(148, 163, 184, 0.18)' 
            : 'rgba(148, 163, 184, 0.06)',
        stroke: isSelected ? '#94a3b8' : isHovered ? 'rgba(148, 163, 184, 0.7)' : 'rgba(148, 163, 184, 0.35)',
        extrusion: isSelected ? 'rgba(71, 85, 105, 0.9)' : 'rgba(71, 85, 105, 0.45)',
        text: 'text-slate-300',
        badge: 'text-slate-400 border-slate-500/30 bg-slate-500/10'
      };
    }
    // Default / Center
    return {
      fill: isSelected 
        ? 'rgba(148, 163, 184, 0.25)' 
        : isHovered 
          ? 'rgba(148, 163, 184, 0.15)' 
          : 'rgba(148, 163, 184, 0.05)',
      stroke: isSelected ? '#cbd5e1' : isHovered ? 'rgba(148, 163, 184, 0.65)' : 'rgba(148, 163, 184, 0.2)',
      extrusion: isSelected ? 'rgba(71, 85, 105, 0.9)' : 'rgba(71, 85, 105, 0.45)',
      text: 'text-zinc-200',
      badge: 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10'
    };
  };

  // Compute angle relative to SVG container center for rotation tracking
  const getAngleFromCenter = (clientX: number, clientY: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };

    const angle = getAngleFromCenter(e.clientX, e.clientY, containerRef.current);
    dragStartAngleRef.current = angle;
    currentRotationRef.current = rotationAngle;
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;

      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 5) {
        hasDraggedRef.current = true;
      }

      if (hasDraggedRef.current) {
        const angle = getAngleFromCenter(e.clientX, e.clientY, containerRef.current);
        const delta = angle - dragStartAngleRef.current;
        setRotationAngle(currentRotationRef.current + delta);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      setIsDragging(false);

      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // If we didn't drag, treat as a click
      if (dist <= 5) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const sectorGroup = element?.closest('[data-sector-id]');
        if (sectorGroup) {
          const sectorIdAttr = sectorGroup.getAttribute('data-sector-id');
          if (sectorIdAttr !== null) {
            const sectorId = parseInt(sectorIdAttr, 10);
            setSelectedSectorId(sectorId);
          }
        } else {
          // If the clicked element is inside the 3D stage or SVG but not on a sector, toggle fullscreen!
          const stageEl = containerRef.current;
          if (stageEl && element && (stageEl.contains(element) || element.closest('#tactical-3d-stage'))) {
            setIsFullscreen(prev => !prev);
          }
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  // Scroll wheel to zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = 0.08;
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(2.0, parseFloat((prev + zoomFactor).toFixed(2))));
    } else {
      setZoom(prev => Math.max(0.6, parseFloat((prev - zoomFactor).toFixed(2))));
    }
  };

  // Reset viewport orientation
  const handleReset = () => {
    setRotationAngle(0);
    setZoom(1.0);
  };

  const selectedSector = SECTORS.find(s => s.id === selectedSectorId) || null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 text-[#d4d4d8]">
      
      {/* Sleek Top Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-850 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-amber-500/90" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-zinc-500">Holographic Concentric Map</span>
          </div>
          <h2 className="text-2xl font-black text-zinc-100 tracking-tight">더스크 시티 전술 지형도</h2>
        </div>
        {/* Danger level legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-zinc-400 bg-zinc-950/40 px-4 py-2.5 rounded-xl border border-zinc-850/80">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-extrabold mr-1">위험 척도 (DANGER LEVEL)</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_6px_#14b8a6]" />
            <span>안전</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#94a3b8] shadow-[0_0_6px_#94a3b8]" />
            <span>보통</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d97706] shadow-[0_0_6px_#d97706]" />
            <span>경계</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea580c] shadow-[0_0_6px_#ea580c]" />
            <span>위험</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#be123c] shadow-[0_0_6px_#be123c] animate-pulse" />
            <span>최악/나락</span>
          </div>
        </div>
      </div>

      {/* Main Full-Size Map Workspace */}
      <div className={isFullscreen 
        ? "fixed inset-0 z-50 bg-[#121213]/98 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-300" 
        : "w-full bg-transparent flex flex-col items-center justify-center p-0 relative min-h-[580px] overflow-visible transition-all duration-300"
      }>
        
        {/* Subtle Interactive Guideline Indicators in background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zinc-950/80 pointer-events-none" />

        {/* Floating Instruction overlay */}
        <div className="absolute top-6 left-6 z-10 flex flex-col space-y-1 text-zinc-500 font-mono pointer-events-none select-none">
          <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">System Protocol // Radar Tactician</span>
          <div className="flex items-center gap-2 mt-1">
            <Move className="w-3.5 h-3.5 text-amber-500/70" />
            <span className="text-[10px]">드래그: 구도 회전  •  휠: 확대/축소  •  구획: 보고서 개방</span>
          </div>
        </div>

        {/* Active Telemetry Widget (Bottom-Left) */}
        <div className="absolute bottom-6 left-6 z-10 hidden sm:block pointer-events-none select-none font-mono text-[9px] text-zinc-500 space-y-1">
          <p>ROTATION_Z: <span className="text-zinc-300 font-bold">{(rotationAngle % 360).toFixed(1)}°</span></p>
          <p>ZOOM_SCALE: <span className="text-zinc-300 font-bold">{Math.round(zoom * 100)}%</span></p>
          <p>ENGINE_STATE: <span className="text-green-500 font-bold">LIVE_READY</span></p>
        </div>

        {/* Concentric Map 3D Stage Wrapper */}
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onWheel={handleWheel}
          className={`relative w-full ${isFullscreen ? 'max-w-[700px]' : 'max-w-[500px]'} aspect-square flex items-center justify-center select-none overflow-visible my-auto cursor-grab active:cursor-grabbing transition-all duration-300 ${
            isDragging ? 'shadow-[0_0_50px_rgba(251,191,36,0.02)]' : ''
          }`}
          style={{
            perspective: '1200px',
            touchAction: 'none' // Prevent scrolling on mobile while dragging
          }}
          id="tactical-3d-stage"
        >
          {/* Tactical Static HUD Brackets */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-zinc-700/80 pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-zinc-700/80 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-zinc-700/80 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-zinc-700/80 pointer-events-none" />
          
          <div className="absolute top-3 left-10 pointer-events-none select-none font-mono text-[7px] text-zinc-500/60 tracking-widest hidden sm:block">
            SYS.STATUS // LOCK_ACTIVE
          </div>
          <div className="absolute bottom-3 right-10 pointer-events-none select-none font-mono text-[7px] text-zinc-500/60 tracking-widest hidden sm:block">
            SECTOR_ARRAY_INIT_00 // 10
          </div>

          {/* Isometric 3D tilted card container */}
          <div 
            className="w-full h-full transition-transform duration-100 ease-out"
            style={{
              transform: 'rotateX(34deg) rotateY(-8deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* The SVG containing both extruded 3D base and top face */}
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full overflow-visible"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: '200px 200px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Animated Compass Dials and Grid Circles in back-planes */}
              <g opacity="0.12" style={{ transform: 'translateZ(-15px)' }}>
                <circle cx="200" cy="200" r="185" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="200" cy="200" r="195" fill="none" stroke="#fff" strokeWidth="0.8" />
                
                {/* Compass markers */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const deg = i * 30;
                  const rad = (deg * Math.PI) / 180;
                  const x1 = 200 + 185 * Math.cos(rad);
                  const y1 = 200 + 185 * Math.sin(rad);
                  const x2 = 200 + 195 * Math.cos(rad);
                  const y2 = 200 + 195 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth="1.2" />;
                })}
              </g>

              {/* ROTATING CONTENT GROUP */}
              <g 
                style={{ 
                  transform: `rotate(${rotationAngle}deg)`,
                  transformOrigin: '200px 200px',
                  transformStyle: 'preserve-3d'
                }}
                className="transition-transform duration-150 ease-out"
              >
                
                {/* 1. EXTENSION LAYER (3D Depth extrusion beneath each sector segment) */}
                {SECTORS.map((sector) => {
                  if (sector.id === 0) return null;

                  const i = sector.id;
                  const startAngle = -90 + (i - 1) * 36;
                  const endAngle = -90 + i * 36;
                  const isSelected = selectedSectorId === sector.id;
                  const isHovered = hoveredSectorId === sector.id;
                  const colors = getSectorColors(sector.dangerLevel, isSelected, isHovered);

                  // Extruded path translated downward along the Z/Y direction to represent height/thickness
                  return (
                    <path
                      key={`extrusion-${sector.id}`}
                      d={getSectorPath(200, 202.5, 35, 182, startAngle, endAngle)}
                      fill={colors.extrusion}
                      opacity={isSelected ? 0.95 : isHovered ? 0.8 : 0.45}
                      className="pointer-events-none"
                    />
                  );
                })}

                {/* Extrusion block for center ZERO sector */}
                {(() => {
                  const sector0 = SECTORS.find(s => s.id === 0)!;
                  const isSelected = selectedSectorId === 0;
                  const isHovered = hoveredSectorId === 0;
                  const colors = getSectorColors(sector0.dangerLevel, isSelected, isHovered);
                  return (
                    <circle
                      cx="200"
                      cy="202.5"
                      r="30"
                      fill={colors.extrusion}
                      opacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.45}
                      className="pointer-events-none"
                    />
                  );
                })()}


                {/* Tactical HUD Crosshairs & Radar Guides (Replaces growth-ring concentric circles) */}
                <g className="pointer-events-none" opacity="0.12">
                  <line x1="30" y1="195" x2="370" y2="195" stroke="#fff" strokeWidth="0.8" strokeDasharray="3 4" />
                  <line x1="200" y1="25" x2="200" y2="365" stroke="#fff" strokeWidth="0.8" strokeDasharray="3 4" />
                  
                  {/* Subtle Radar Range Circles */}
                  <circle cx="200" cy="195" r="182" fill="none" stroke="#fff" strokeWidth="0.6" />
                  <circle cx="200" cy="195" r="110" fill="none" stroke="#fff" strokeWidth="0.6" strokeDasharray="2 6" />
                  <circle cx="200" cy="195" r="55" fill="none" stroke="#fff" strokeWidth="0.6" />
                  
                  {/* Scope Corner brackets */}
                  <path d="M 45,185 L 45,195 L 55,195" fill="none" stroke="#fff" strokeWidth="1" />
                  <path d="M 355,185 L 355,195 L 345,195" fill="none" stroke="#fff" strokeWidth="1" />
                </g>

                {/* 2. TOP INTERACTIVE FACE LAYER (Resting high on the 3D plane) */}
                {SECTORS.map((sector) => {
                  if (sector.id === 0) return null;

                  const i = sector.id;
                  const startAngle = -90 + (i - 1) * 36;
                  const endAngle = -90 + i * 36;
                  const midAngle = startAngle + 18;
                  const midRad = (midAngle * Math.PI) / 180;

                  const isSelected = selectedSectorId === sector.id;
                  const isHovered = hoveredSectorId === sector.id;
                  const colors = getSectorColors(sector.dangerLevel, isSelected, isHovered);

                  // Label positions pushed to outer rim (162px) to clear concept graphics area
                  const labelRadius = 162;
                  const labelX = 200 + labelRadius * Math.cos(midRad);
                  const labelY = 200 + labelRadius * Math.sin(midRad);

                  return (
                    <g
                      key={`face-${sector.id}`}
                      data-sector-id={sector.id}
                      onClick={(e) => {
                        e.stopPropagation(); // Stop propagation to container dragging
                        setSelectedSectorId(sector.id);
                      }}
                      onMouseEnter={() => setHoveredSectorId(sector.id)}
                      onMouseLeave={() => setHoveredSectorId(null)}
                      className="cursor-pointer group animate-fade-in"
                    >
                      {/* Top plate segment - gaps removed for a seamless solid continuous disc surface */}
                      <path
                        d={getSectorPath(200, 195, 35, 182, startAngle, endAngle)}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth={isSelected ? '1.8' : isHovered ? '1.2' : '0.4'}
                        className="transition-all duration-200"
                        style={{
                          filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' : 'none'
                        }}
                      />

                      {/* Left empty for clean color-only wedge segments */}

                      {/* Radial Sector Number */}
                      <text
                        x={labelX}
                        y={labelY - 1}
                        textAnchor="middle"
                        transform={`rotate(${midAngle + 90}, ${labelX}, ${labelY})`}
                        className={`font-mono text-[10px] font-black transition-all duration-200 pointer-events-none select-none ${
                          isSelected ? 'fill-zinc-100 font-extrabold' : isHovered ? 'fill-zinc-200' : 'fill-zinc-500'
                        }`}
                      >
                        {i < 10 ? `0${i}` : i}
                      </text>
                    </g>
                  );
                })}

                {/* Central Circle Face (Sector 0) */}
                {(() => {
                  const sector0 = SECTORS.find(s => s.id === 0)!;
                  const isSelected = selectedSectorId === 0;
                  const isHovered = hoveredSectorId === 0;
                  const colors = getSectorColors(sector0.dangerLevel, isSelected, isHovered);

                  return (
                    <g
                      data-sector-id={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSectorId(0);
                      }}
                      onMouseEnter={() => setHoveredSectorId(0)}
                      onMouseLeave={() => setHoveredSectorId(null)}
                      className="cursor-pointer"
                    >
                      {/* Top Plate Center */}
                      <circle 
                        cx="200" 
                        cy="195" 
                        r="30" 
                        fill={colors.fill} 
                        stroke={colors.stroke} 
                        strokeWidth={isSelected ? '2.5' : isHovered ? '1.8' : '1.2'}
                        className="transition-all duration-200"
                        style={{
                          filter: isSelected ? 'drop-shadow(0 0 10px rgba(255,255,255,0.25))' : 'none'
                        }}
                      />

                      {/* Clean center dot instead of sword */}
                      <circle cx="200" cy="195" r="3" fill="#fff" opacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.4} />

                      {/* Center Text Labels */}
                      <text
                        x="200"
                        y="173"
                        textAnchor="middle"
                        className={`font-mono text-[9px] font-black pointer-events-none select-none tracking-wider ${
                          isSelected ? 'fill-zinc-100' : 'fill-zinc-400'
                        }`}
                      >
                        ZERO
                      </text>
                    </g>
                  );
                })()}

              </g>
            </svg>
          </div>
        </div>

        {/* View Control Panel overlay (Top-Right) */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
          {/* Zoom controls */}
          <div className="glass flex items-center gap-1.5 p-1 rounded-xl border border-zinc-850 bg-zinc-950/85 shadow-lg">
            <button 
              onClick={() => setZoom(prev => Math.max(0.6, parseFloat((prev - 0.15).toFixed(2))))}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800/80 cursor-pointer"
              title="축소 (Scroll Down)"
              id="btn-3d-zoom-out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1.5 text-zinc-300 min-w-[38px] text-center select-none font-bold">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(prev => Math.min(2.0, parseFloat((prev + 0.15).toFixed(2))))}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors border border-zinc-800/80 cursor-pointer"
              title="확대 (Scroll Up)"
              id="btn-3d-zoom-in"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {/* Reset Angle button */}
          <button 
            onClick={handleReset}
            className="glass h-9 px-3.5 flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold rounded-xl border border-zinc-850 bg-zinc-950/85 text-zinc-300 hover:text-white cursor-pointer shadow-lg transition-all"
            id="btn-3d-reset-view"
          >
            <RotateCcw className="w-3 h-3 text-amber-500/80" />
            <span>각도 초기화</span>
          </button>

          {/* Fullscreen Toggle button */}
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="glass h-9 px-3.5 flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold rounded-xl border border-[#3f3f46]/45 bg-zinc-950/85 text-zinc-300 hover:text-white cursor-pointer shadow-lg transition-all"
            id="btn-3d-fullscreen"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3 h-3 text-amber-500" />
                <span>화면 환원</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 text-amber-500" />
                <span>전체화면</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Cybernetic Radial Sector Info Pop-up Dialogue / Modal */}
      <AnimatePresence>
        {selectedSector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop Blur Close Trigger */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSectorId(null)}
              className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-lg glass border border-zinc-800 bg-[#121213]/95 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 corner-container"
              id="sector-popup-modal"
            >
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedSectorId(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-500 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-all cursor-pointer"
                title="닫기"
                id="btn-close-sector-popup"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                
                {/* Modal Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-black tracking-widest text-zinc-500">
                      SEC_DOSSIER :: 0{selectedSector.id}
                    </span>
                    <span className={`text-[9px] font-mono border rounded-md px-2 py-0.5 font-bold ${
                      getSectorColors(selectedSector.dangerLevel, true, false).badge
                    }`}>
                      위협 등급: {selectedSector.dangerLevel}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-zinc-100 tracking-tight flex items-baseline gap-2">
                    <span>{selectedSector.name}</span>
                    <span className="text-zinc-500 font-normal text-sm">‘{selectedSector.subName}’</span>
                  </h3>
                </div>

                {/* Description Quote Block */}
                <p className="text-xs text-zinc-300 leading-relaxed font-sans border-l-2 border-zinc-700 pl-4 py-1 italic bg-[#151516]/50 rounded-r-lg">
                  {selectedSector.description}
                </p>

                {/* Lore detailed report */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-zinc-600" />
                    지리적 정찰 데이터 (Detailed Intelligence)
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans bg-zinc-950/20 p-4 rounded-xl border border-zinc-850 max-h-[140px] overflow-y-auto custom-scrollbar">
                    {selectedSector.detailedInfo}
                  </p>
                </div>

                {/* Metrics stats */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">구역 지배 지표 (Registry Metrics)</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-900 text-center flex flex-col justify-center">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 mb-1 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3 text-zinc-600" /> 지배자
                      </span>
                      <span className="text-xs font-bold text-zinc-200 truncate">{selectedSector.king}</span>
                    </div>

                    <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-900 text-center flex flex-col justify-center">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 mb-1 flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-zinc-600" /> 인구
                      </span>
                      <span className="text-xs font-bold text-zinc-200">{selectedSector.population}</span>
                    </div>

                    <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-900 text-center flex flex-col justify-center">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 mb-1 flex items-center justify-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-zinc-600" /> 치안 지수
                      </span>
                      <span className="text-xs font-bold text-zinc-200 truncate">{selectedSector.vanguardPresence}</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      onSelectSectorCharacters(selectedSector.id);
                      setSelectedSectorId(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-800 bg-[#1e1e1f] hover:bg-[#232325] text-zinc-200 hover:text-white font-extrabold text-xs transition-all duration-300 group cursor-pointer shadow-lg"
                    id={`btn-modal-view-characters-${selectedSector.id}`}
                  >
                    <span>{selectedSector.name} 소속 인물 명단 조회</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => setSelectedSectorId(null)}
                    className="py-3 px-5 rounded-xl border border-zinc-850 bg-transparent hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
                    id="btn-modal-close"
                  >
                    닫기
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
