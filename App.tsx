import React, { useState, useCallback, useMemo } from 'react';
import { Character, CharacterRole, Recommendation } from './types';
import { CHARACTERS } from './constants';
import { getTeamRecommendation } from './services/geminiService';
import CharacterIcon from './components/CharacterIcon';

function App() {
  const [enemyTeam, setEnemyTeam] = useState<Character[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const vanguards = useMemo(() => CHARACTERS.filter(c => c.role === CharacterRole.VANGUARD), []);
  const duelists = useMemo(() => CHARACTERS.filter(c => c.role === CharacterRole.DUELIST), []);
  const strategists = useMemo(() => CHARACTERS.filter(c => c.role === CharacterRole.STRATEGIST), []);

  const toggleEnemy = useCallback((char: Character) => {
    setEnemyTeam(prev => {
      const isAlreadyIn = prev.some(c => c.id === char.id);
      if (isAlreadyIn) {
        return prev.filter(c => c.id !== char.id);
      }
      if (prev.length >= 6) return prev;
      return [...prev, char];
    });
  }, []);

  const handleAnalyze = async () => {
    if (enemyTeam.length === 0) return;
    setIsLoading(true);
    try {
      const result = await getTeamRecommendation(enemyTeam);
      setRecommendation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    setEnemyTeam([]);
    setRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-black text-2xl italic tracking-tighter shadow-lg shadow-red-900/40 border-2 border-white/10 shrink-0">YCP</div>
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">
                YCP용 <span className="text-red-500">마라 가위바위보</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Team Selection Intelligence Guide</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex -space-x-3 flex-1 justify-center md:justify-start">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden flex items-center justify-center transition-all ${enemyTeam[i] ? 'ring-2 ring-red-500 scale-110 z-10' : 'opacity-40'}`}>
                  {enemyTeam[i] ? (
                    <img src={enemyTeam[i].imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(enemyTeam[i].name)}&background=334155&color=fff&bold=true`;
                    }} />
                  ) : (
                    <span className="text-slate-500 text-xs font-black">{i + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={resetSelection}
                className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-white transition-colors"
              >
                초기화
              </button>
              <button 
                onClick={handleAnalyze}
                disabled={enemyTeam.length === 0 || isLoading}
                className={`px-8 py-2.5 rounded-full font-black text-sm shadow-xl transition-all ${enemyTeam.length > 0 && !isLoading ? 'bg-red-600 hover:bg-red-500 hover:scale-105 active:scale-95 text-white ring-2 ring-red-400/50' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    분석 중...
                  </div>
                ) : '분석 결과 보기'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Character Picker */}
        <section className="lg:col-span-8 space-y-12">
          {/* Vanguards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Vanguards <span className="text-blue-500">탱커</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {vanguards.map(char => (
                <CharacterIcon 
                  key={char.id} 
                  character={char} 
                  isSelected={enemyTeam.some(e => e.id === char.id)}
                  onClick={() => toggleEnemy(char)}
                />
              ))}
            </div>
          </div>

          {/* Duelists */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-red-600 rounded-full"></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Duelists <span className="text-red-500">딜러</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {duelists.map(char => (
                <CharacterIcon 
                  key={char.id} 
                  character={char} 
                  isSelected={enemyTeam.some(e => e.id === char.id)}
                  onClick={() => toggleEnemy(char)}
                />
              ))}
            </div>
          </div>

          {/* Strategists */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Strategists <span className="text-green-500">서포터</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
              {strategists.map(char => (
                <CharacterIcon 
                  key={char.id} 
                  character={char} 
                  isSelected={enemyTeam.some(e => e.id === char.id)}
                  onClick={() => toggleEnemy(char)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Results/Guide */}
        <aside className="lg:col-span-4">
          <div className="bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl sticky top-32 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black italic tracking-tight uppercase flex items-center gap-3">
                <span className="p-2 bg-yellow-500/20 rounded-xl">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
                  </svg>
                </span>
                전략 리포트
              </h3>
            </div>

            {!recommendation && !isLoading && (
              <div className="text-center py-16 space-y-6">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-slate-800">
                  <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-slate-400 font-bold">상대 팀을 선택하세요</p>
                  <p className="text-slate-600 text-sm leading-relaxed px-4">최대 6명의 상대 캐릭터를 선택하고 분석 버튼을 눌러주세요.</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="space-y-8 animate-pulse">
                <div className="h-40 bg-slate-800 rounded-3xl"></div>
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-slate-800 rounded-xl"></div>)}
                </div>
              </div>
            )}

            {recommendation && !isLoading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 1. 전략 분석 텍스트 */}
                <div className="bg-slate-950/80 rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Strategic Analysis</p>
                  </div>
                  <p className="text-[14px] leading-relaxed text-slate-300 whitespace-pre-line font-medium italic">
                    {recommendation.reasoning}
                  </p>
                </div>

                {/* 2. 최종 추천 영웅 리스트 */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                    <span className="w-4 h-px bg-slate-700"></span>
                    최종 추천 스쿼드 (2-2-2)
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {recommendation.characters.map(char => (
                      <div key={char.id} className="relative group flex flex-col items-center">
                        <div className={`w-full aspect-square rounded-2xl overflow-hidden border-2 shadow-xl transition-all group-hover:scale-105 ${
                          char.role === CharacterRole.VANGUARD ? 'border-blue-500/50' : 
                          char.role === CharacterRole.DUELIST ? 'border-red-500/50' : 
                          'border-green-500/50'
                        }`}>
                          <img 
                            src={char.imageUrl} 
                            alt={char.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(char.name)}&background=1e293b&color=fff&bold=true`;
                            }}
                          />
                        </div>
                        <p className="text-[11px] font-black text-center mt-2 truncate italic tracking-tighter uppercase w-full">{char.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleAnalyze}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-black text-sm transition-all border border-white/5 flex items-center justify-center gap-2 group"
                  >
                    조합 재구성
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto p-12 text-center opacity-30">
        <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase italic">© 2024 YCP Intelligence. Marvel Rivals Professional Counter App.</p>
      </footer>
    </div>
  );
}

export default App;