import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Shield, HelpCircle, Activity, Award, Layers, Zap } from 'lucide-react';

export default function SecretVault() {
  const [activeTab, setActiveTab] = useState<'world' | 'lore'>('world');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 text-[#d4d4d8]" id="secret-vault-container">
      
      {/* Page Header */}
      <div className="space-y-2 mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4.5 h-4.5 text-zinc-400" />
          <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">Worldview Database</span>
        </div>
        <h2 className="text-3xl font-light text-zinc-100 tracking-wider" id="secrets-title">
          세계관 공식 데이터베이스
        </h2>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          더스크 시티의 시대상, 정치 구조, 핵심 전투 이능 시스템(애드온/익스터널/몬스터) 및 등급 체계를 정리한 공식 가이드라인입니다.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-8 gap-2">
        <button
          onClick={() => setActiveTab('world')}
          className={`px-5 py-3 text-sm font-bold tracking-wider transition-all border-b-2 cursor-pointer ${
            activeTab === 'world'
              ? 'border-zinc-300 text-zinc-100'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="btn-tab-world"
        >
          기본 세계관
        </button>
        <button
          onClick={() => setActiveTab('lore')}
          className={`px-5 py-3 text-sm font-bold tracking-wider transition-all border-b-2 cursor-pointer ${
            activeTab === 'lore'
              ? 'border-zinc-300 text-zinc-100'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="btn-tab-lore"
        >
          월드 로어
        </button>
      </div>

      {/* Content Container */}
      <div className="min-h-[500px]">
        {/* TAB 1: 기본 세계관 */}
        {activeTab === 'world' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 시대상 & 더스크 시티 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl space-y-4 corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Activity className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-bold text-zinc-100">도시 및 시대상</h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
                  <div>
                    <span className="text-xs text-zinc-500 font-mono block mb-1">■ 시대상</span>
                    <p>기본적으로 개인 모바일 기기와 첨단 전자기기가 공존하는 현대 사회이지만, 각 섹터별 인프라 수준에 따라 문명 발달 수준의 편차가 존재합니다.</p>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 font-mono block mb-1">■ 더스크 시티</span>
                    <p>거대한 장벽과 자장에 의해 11개의 독자적인 섹터로 분리되어 있습니다. 웬만한 대륙 전체보다 넓은 면적을 자랑하며, 도시 경계 바깥은 황무지 상태이기에 사실상 더스크 시티 자체가 인류에게 알려진 유일한 세계입니다.</p>
                  </div>
                </div>
              </div>

              {/* 지배 세력 및 직위 (마스터 / 킹) */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl space-y-4 corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Layers className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-bold text-zinc-100">지배 권력 구조</h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
                  <div>
                    <span className="text-xs text-zinc-500 font-mono block mb-1">■ 마스터 (MASTER)</span>
                    <p>더스크 시티에서 최강의 무력을 지닌 정점의 6인을 지칭합니다. 이들은 공식 도전을 거쳐 이전 마스터를 꺾거나 죽임으로써 그 지위를 찬탈할 수 있습니다.</p>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 font-mono block mb-1">■ 킹 (KING)</span>
                    <p>각 섹터를 실질적으로 통치하고 관장하는 최고 권력자입니다. 마스터와는 별개로 부여되는 직위이지만, 현실적으로는 대부분의 마스터들이 한 섹터의 킹을 겸임하고 있습니다. 압도적인 무력을 갖추지 못하면 다른 킹들의 표적이 되기 쉬워 함부로 왕좌를 탐내지 않습니다.</p>
                  </div>
                </div>
              </div>

              {/* 전설의 마스터와 무명검사 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl space-y-4 md:col-span-2 corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Award className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-bold text-zinc-100">역사적 대결 및 기원</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-zinc-300">
                  <div className="space-y-2">
                    <span className="text-xs text-zinc-400 font-bold font-mono block">■ 과거 전설의 마스터 (말소된 이름)</span>
                    <p className="text-zinc-300">
                      과거 제로 섹터의 정점에서 도시 전체를 쥐고 흔들었던 미지의 마스터입니다. 가늠할 수 없는 강력한 무력과 광기로 여러 파괴적인 행위를 남겼으나, 어느 날 의문의 무명검사와의 사투 끝에 패배하여 사살당했습니다. 그의 이름과 상세한 권능에 대한 공식 기록은 역사에서 완전히 말소되었으며, 현재는 오직 단편적인 구전으로만 전해집니다.
                    </p>
                    <p className="text-zinc-400 text-xs bg-zinc-900/50 p-3 rounded border border-zinc-800">
                      <strong>전해지는 소문:</strong> 눈부신 백색 제복을 착용했다고 하며, 하늘의 벼락을 자유자재로 부리던 가공할 고유 애드온 능력을 지녔었다고 전해집니다.<br />
                      <strong>보유 애드온:</strong> 천뢰 (공식 기록 말소)
                    </p>
                    <p className="text-zinc-400 text-xs">
                      * 본래 마스터는 총 7명이었으나, 과거의 지배적인 마스터를 쓰러뜨린 무명검사가 그 자리를 거부하고 종적을 감추었기 때문에 공석이 생겨 현재는 6명 체제로 유지되고 있습니다.
                    </p>
                  </div>
                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6">
                    <span className="text-xs text-zinc-400 font-bold font-mono block">■ 무명검사</span>
                    <p className="text-zinc-300">
                      백뢰가 절정의 힘으로 도시를 위협하던 시기에 어떠한 징후도 없이 혜성처럼 나타나 그를 격살한 정체불명의 검사입니다. 백뢰의 야욕을 종식시킨 후 어떤 찬탈이나 보상도 요구하지 않은 채 홀연히 사라졌습니다.
                    </p>
                    
                    <span className="text-xs text-zinc-400 font-bold font-mono block pt-4">■ 레이븐 (RAVEN)</span>
                    <p className="text-zinc-300">
                      악행을 지은 인물만을 사냥하고 연기처럼 증발하는 미지의 집행자입니다. 도시의 아이들에게는 "나쁜 짓을 저지르면 어둠 속에서 까마귀가 찾아와 채어간다"는 오랜 동화 속 경고의 주인공으로 각인되어 있습니다.<br />
                      레이븐은 단 한 명의 개인이 아니라 역대로 대물림되는 <strong>비공식 칭호</strong>입니다. 익스터널 '까마귀 브로치 \'울토\''가 소리를 내면, 브로치에 선택받은 현재의 계약자가 레이븐으로서 어두운 암살 작전을 개시하게 됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 치안 단체 뱅가드 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl space-y-4 md:col-span-2 corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Shield className="w-5 h-5 text-zinc-400" />
                  <h3 className="text-lg font-bold text-zinc-100">치안 기구: 뱅가드 (VANGUARD)</h3>
                </div>
                <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
                  <p>
                    섹터 5를 거점으로 군사력을 구축한 대규모 연합 치안 유지 기관입니다. 인류가 상주하는 거의 모든 섹터마다 지부를 두고 원활한 협조 체계를 구성하고 있습니다. 이들의 궁극적 목적은 불합리한 이능력에 노출된 비능력자들과 스스로를 지킬 수 없는 사회적 약자들의 생존권을 보호하는 일입니다. 일반 비능력자들도 의지만 있다면 다수 수용하고 있어, 초월적인 무력을 지닌 일탈자들은 이들을 하급 경비병처럼 여겨 무시하기도 하지만 압도적인 전술적 총원과 체계적인 화력망은 그 어떤 마스터도 함부로 정면돌파할 수 없는 거대한 위협으로 기능합니다.
                  </p>
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850 space-y-2 mt-2">
                    <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">뱅가드 군사 체계 및 내부 계급 가이드라인:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                      <div className="bg-[#1e1e1f] p-2.5 rounded border border-zinc-800">
                        <strong className="text-zinc-400 block mb-0.5">5급 대원</strong>
                        <span className="text-zinc-500">조직에 갓 입단한 훈련병 직급입니다. 주거 관리나 경비 보조 등 사소한 업무를 도맡으며 가혹한 실전 전장에는 배치되지 않고 집중 훈련 교육과정을 밟습니다.</span>
                      </div>
                      <div className="bg-[#1e1e1f] p-2.5 rounded border border-zinc-800">
                        <strong className="text-zinc-400 block mb-0.5">4급 대원</strong>
                        <span className="text-zinc-500">전술 타격 및 실전에 투입되는 최일선 인력입니다. 가장 거대하고 탄탄한 대원 분모를 담당하여 치안 현장에서 몸을 사리지 않습니다.</span>
                      </div>
                      <div className="bg-[#1e1e1f] p-2.5 rounded border border-zinc-800">
                        <strong className="text-zinc-400 block mb-0.5">3급 대원</strong>
                        <span className="text-zinc-500">야전 지휘 능력이 검증된 숙련자로서 분대를 직접 지휘하고 통솔하는 현장 지휘관 내지 중간 분대장의 책무를 수행합니다.</span>
                      </div>
                      <div className="bg-[#1e1e1f] p-2.5 rounded border border-zinc-800">
                        <strong className="text-zinc-400 block mb-0.5">2급 대원</strong>
                        <span className="text-zinc-500">지부의 중책을 분담하는 고급 지휘관 내무 간부 역할입니다. 전반적인 작전 조율 및 수색 임무를 독자적으로 수립하는 권한을 가집니다.</span>
                      </div>
                      <div className="bg-[#1e1e1f] p-2.5 rounded border border-zinc-800">
                        <strong className="text-zinc-400 block mb-0.5">1급 대원</strong>
                        <span className="text-zinc-500">특정 거대 섹터를 전담하는 뱅가드 지부장 수준의 지위입니다. 현장 병력에 대한 무제한적인 작전 통제권을 소유한 명예로운 엘리트입니다.</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2 italic">
                      * 뱅가드의 최고 사령관이자 총책임자인 <strong>커맨더</strong>(레인더스트)는 이 정형화된 군사 서열을 아늑히 뛰어넘어 전체를 총괄합니다.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: 월드 로어 */}
        {activeTab === 'lore' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* 세 가지 주요 이능 시스템 분할 칸 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 애드온 시스템 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl flex flex-col justify-between corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-zinc-100">애드온 (Add-on)</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    전 인류 중 약 10% 비율로 불규칙하게 발현되는 선천적 초상 이능력입니다. 이 고유 권능은 각 개인의 인격, 삶의 이정표, 정신적 트라우마 등의 요소들과 밀접하게 동화되어 성질이 규정됩니다.
                  </p>
                </div>
                <div className="mt-6 bg-zinc-900/60 p-3.5 rounded border border-zinc-800 text-xs space-y-2 text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-300">구체적 특이점:</span>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>발현자는 유전적 노화가 억제되어 오랜 시간 불로에 가까운 신체 연령을 유지하게 됩니다.</li>
                    <li>고유 에너지가 신진대사를 순환하며 일반 성인의 한계를 가볍게 추월하는 강인한 체력을 지니게 됩니다.</li>
                    <li>정신적인 고뇌와 극적인 계기, 신념의 변화에 따라 능력 자체가 전혀 다르게 개조되거나 진화하기도 합니다.</li>
                  </ul>
                </div>
              </div>

              {/* 익스터널 시스템 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl flex flex-col justify-between corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-zinc-100">익스터널 (External)</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    특정 물질이나 가공품에 강력한 고유 애드온 에너지가 깃들거나 응집되어, 고유한 마력적 특성을 발산하는 보구를 명명합니다.
                  </p>
                </div>
                <div className="mt-6 bg-zinc-900/60 p-3.5 rounded border border-zinc-800 text-xs space-y-2 text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-300">구체적 특이점:</span>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>애드온 자질이 없는 평범한 비발현자라 하더라도 도구의 사용법을 습득한다면 온전히 권능을 휘두를 수 있습니다.</li>
                    <li>신화적인 고등급 익스터널의 경우 자율적인 자아나 인격을 구축하여 주체적인 생각과 판단을 내리기도 합니다.</li>
                    <li>도구 자체가 까다로운 영적 궁합이나 정신 조건을 판독한 후 자신에게 합당한 주인을 낙점하여 독점적 계약을 맺습니다.</li>
                  </ul>
                </div>
              </div>

              {/* 몬스터 시스템 */}
              <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl flex flex-col justify-between corner-container tech-hover-card">
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Compass className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-bold text-zinc-100">몬스터 (Monster)</h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    도시 외곽과 황무지 내의 특정 야생동물이나 맹수류가 환경 자장 및 강력한 이질적 에너지를 급격하게 흡수하여 흉포한 괴수로 전이된 사례입니다.
                  </p>
                </div>
                <div className="mt-6 bg-zinc-900/60 p-3.5 rounded border border-zinc-800 text-xs space-y-2 text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-300">구체적 특이점:</span>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>세포 단위부터 기괴한 돌기가 솟아나는 등 가공할 정도로 팽창되어 공격성이 비약적으로 자극됩니다.</li>
                    <li>고농도 환경에서 탄생한 일부 돌연변이 개체들은 자연재해에 준하는 파괴적인 광역 마법이나 인지 저해 초능력을 휘두릅니다.</li>
                    <li>토벌 이후 사멸하더라도 강력한 마력의 핵이나 특화 장기에는 초상적 기운이 고스란히 정체되어 강력한 고성능 장비의 귀중한 가공 원자재가 됩니다.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* 통합 등급 체계 (알파 -> 오메가) */}
            <div className="bg-[#151516] border border-zinc-800 p-6 rounded-xl space-y-4 corner-container tech-hover-card">
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Award className="w-5 h-5 text-zinc-300" />
                <h3 className="text-lg font-bold text-zinc-100">공식 위협 및 전투력 등급 체계</h3>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
                <p>
                  등급은 <strong>애드온 사용자, 익스터널, 몬스터</strong> 모두에게 공통 적용되는 척도입니다. 
                  단, 세부 등급을 매기는 방식에는 엄밀한 가이드라인이 따릅니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-400 font-bold block mb-1">■ 사람의 등급 산정 방식</span>
                    <p className="text-zinc-500">인간의 등급은 초상 애드온 능력 그 자체의 특이성이나 위력이 아니라, 순수한 "종합 전투력"을 기반으로 엄격하게 산정됩니다.</p>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-bold block mb-1">■ 몬스터 등급 산정 기준</span>
                    <p className="text-zinc-500">몬스터의 등급은 "동급 수준의 등급을 소유한 애드온 사용자 한 명이 단독으로 완전히 토벌하는 것이 가능하다"는 것을 뜻합니다.</p>
                  </div>
                </div>

                {/* 등급 화살표 타임라인 */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs text-zinc-400 font-bold block">■ 등급 스펙트럼</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                    
                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-850/80 text-center">
                      <span className="text-xs font-bold text-zinc-400 block uppercase mb-1">Alpha (알파)</span>
                      <p className="text-[11px] text-zinc-500">대부분의 평범한 초급 능력자 수준</p>
                    </div>

                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-850/80 text-center">
                      <span className="text-xs font-bold text-zinc-400 block uppercase mb-1">Beta (베타)</span>
                      <p className="text-[11px] text-zinc-500">실전 병력으로 분류되는 대중적인 등급</p>
                    </div>

                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-850/80 text-center">
                      <span className="text-xs font-bold text-zinc-400 block uppercase mb-1">Gamma (감마)</span>
                      <p className="text-[11px] text-zinc-500">대다수 능력자들의 평생 최대 성취 목표</p>
                    </div>

                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-850/80 text-center border-amber-900/30">
                      <span className="text-xs font-bold text-amber-400 block uppercase mb-1">Delta (델타)</span>
                      <p className="text-[11px] text-zinc-400">인간의 범주를 일탈한 '탈인간' 무력 상태</p>
                    </div>

                    <div className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-850/80 text-center border-amber-900/40">
                      <span className="text-xs font-bold text-amber-500 block uppercase mb-1">Epsilon (엡실론)</span>
                      <p className="text-[11px] text-zinc-400">국가급 전략 재해를 통제 및 제어하는 정예</p>
                    </div>

                    <div className="bg-[#1f1618] p-4 rounded-lg border border-red-900/40 text-center">
                      <span className="text-xs font-black text-red-500 block uppercase mb-1">Omega (오메가)</span>
                      <p className="text-[11px] text-zinc-300">격이 전혀 다르게 취급되는 초월적 절대 강자</p>
                    </div>

                  </div>

                  <p className="text-xs text-zinc-400 italic bg-[#1e1e1f] p-3 rounded border border-zinc-800">
                    * <strong>마스터</strong>에 등극하여 도시의 최고 정점에 설 수 있는 이들은 전원 예외 없이 <strong>오메가(Omega)</strong> 등급에 도달해야만 합니다.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </div>

    </div>
  );
}
