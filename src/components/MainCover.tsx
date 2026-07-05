import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Skull, AlertOctagon, HelpCircle, Globe } from 'lucide-react';

interface MainCoverProps {
  onNavigate: (tab: string) => void;
}

export default function MainCover({ onNavigate }: MainCoverProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center px-4 md:px-8 py-16 text-[#d4d4d8]">
      {/* Background Hero Image with Parallax & Dark Dusty Overlay */}
      <div 
        className="absolute inset-0 z-0 select-none pointer-events-none"
        style={{
          transform: `translateY(${offsetY * 0.1}px)`,
        }}
      >
        <img 
          src="/src/assets/images/dusk_city_hero_1783213432862.jpg" 
          alt="Dusk Cityscape" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-30 filter brightness-[35%] contrast-125 scale-105"
        />
        {/* Gradients to blend into grey/black backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1b] via-[#27272a]/40 to-[#1a1a1b]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#1a1a1b]/95" />
      </div>

      {/* Floating Ash/Dust Particle Canvas */}
      <AshParticles />

      {/* Hero Content Panel */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-1 mb-3"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-amber-500 font-mono font-semibold">
            Dusk City Database & Guide
          </span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-zinc-100 mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          id="hero-title"
        >
          더스크 시티
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed mb-12 drop-shadow-sm"
        >
          더스크 시티는 중심의 제로 섹터를 필두로 원형으로 에둘러 싸인 11개의 독자적인 섹터로 구획된 거대한 도시 세계입니다.
          이 거대한 콘크리트 무덤 밖에는 오직 적막만이 흐를 뿐입니다. 각 구역을 지배하는 절대적 강자 <span className="text-amber-500/90 font-medium">‘킹’</span>과 
          역사의 기적을 움켜쥔 마스터들이 뿜어내는 이능력 <span className="text-zinc-200 font-medium">‘애드온’</span>의 전장으로 여러분을 초대합니다.
        </motion.p>

        {/* Feature Bento Buttons styled to match Elegant Dark layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-12"
        >
          {/* Worldview Map Link */}
          <button
            onClick={() => onNavigate('map')}
            className="glass group relative flex flex-col items-start p-6 rounded-lg text-left hover:bg-[#27272a]/40 transition-all duration-300 cursor-pointer tech-hover-card corner-container"
            id="btn-worldview-map"
          >
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            <Compass className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 mb-4" />
            <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors duration-200 font-display text-lg">도시 가상 지도</h3>
            <p className="text-xs text-[#52525b] group-hover:text-zinc-400 mt-2 font-sans leading-relaxed">
              11개 구역의 연계 구조와 위협 수준을 3D 형태의 집중 전사 시스템으로 살펴봅니다.
            </p>
          </button>

          {/* Characters Link */}
          <button
            onClick={() => onNavigate('characters')}
            className="glass group relative flex flex-col items-start p-6 rounded-lg text-left hover:bg-[#27272a]/40 transition-all duration-300 cursor-pointer tech-hover-card corner-container"
            id="btn-character-directory"
          >
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            <BookOpen className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 mb-4" />
            <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors duration-200 font-display text-lg">인물 도감</h3>
            <p className="text-xs text-[#52525b] group-hover:text-zinc-400 mt-2 font-sans leading-relaxed">
              킹, 마스터, 레이븐 등 27인의 영웅과 지배자들의 신상, 성격, 고유 능력을 확인합니다.
            </p>
          </button>

          {/* Secrets Link */}
          <button
            onClick={() => onNavigate('secrets')}
            className="glass group relative flex flex-col items-start p-6 rounded-lg text-left hover:bg-[#27272a]/40 hover:border-zinc-700/60 transition-all duration-300 cursor-pointer tech-hover-card corner-container"
            id="btn-secret-vault"
          >
            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
            <Globe className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 mb-4" />
            <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors duration-200 font-display text-lg">세계관</h3>
            <p className="text-xs text-[#52525b] group-hover:text-zinc-300 mt-2 font-sans leading-relaxed">
              도시의 지배 세력, 공식 전투력 등급, 그리고 고유 능력(애드온/익스터널) 작동 메커니즘을 규명합니다.
            </p>
          </button>
        </motion.div>

        {/* Global Level Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2 border border-zinc-800 rounded-lg bg-zinc-900/10 px-4 py-1.5 text-xs text-zinc-500 font-mono"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-zinc-600 animate-pulse" />
          <span>SYSTEM ACTIVE // TOTAL SECTORS: 11 // CODEX CHARS: 27</span>
        </motion.div>
      </div>

      {/* Decorative Ash Grungy Border Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a1b] to-transparent pointer-events-none" />
    </div>
  );
}

// Ash Particle Generator Canvas
function AshParticles() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      x = Math.random() * width;
      y = Math.random() * height;
      size = Math.random() * 2.5 + 0.5;
      speedY = -(Math.random() * 0.8 + 0.2);
      speedX = Math.random() * 0.6 - 0.3;
      opacity = Math.random() * 0.6 + 0.1;
      color = Math.random() > 0.8 ? '217, 119, 6' : '156, 163, 175'; // Amber or Gray particles

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset particle if it drifts off screen
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
}
