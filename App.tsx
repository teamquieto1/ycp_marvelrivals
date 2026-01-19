
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
      if (isAlreadyIn) return prev.filter(c => c.id !== char.id);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500/30">
      {/* Header - Desktop App Style */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center font-black text-2xl italic tracking-tighter shadow-lg border-2 border-white/10">YCP</div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                YCP <span className="text-red-500">MARA COUNTER</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Desktop Intelligence Guide</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden flex items-center justify-center transition-all ${enemyTeam[i] ? 'ring-2 ring-red-500 scale-110 z-10' : 'opacity-40'}`}>
                  {enemyTeam[i] ? (
                    <img src={enemyTeam[i].imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-500 text-xs font-black">{i + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEnemyTeam([])} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">초기화</button>
              <button 
                onClick={handleAnalyze} 
                disabled={enemyTeam.length === 0 || isLoading}
                className={`px-8 py-2.5 rounded-full font-black text-sm transition-all shadow-xl ${enemyTeam.length > 0 && !isLoading ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-slate-800 text-slate-500 opacity-50'}`}
              >
                {isLoading ? '분석 중...' : '분석 실행'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-8 space-y-12">
          {/* 역할군 섹션들 */}
          {[
            { label: 'Vanguards', sub: '탱커', color: 'bg-blue-500', list: vanguards },
            { label: 'Duelists', sub: '딜러', color: 'bg-red-600', list: duelists },
            { label: 'Strategists', sub: '서포터', color: 'bg-green-500', list: strategists }
          ].map(group => (
            <div key={group.label} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className={`w-1.5 h-8 ${group.color} rounded-full`}></div>
                <h2 className="text-2xl font-black italic uppercase">{group.label} <span className="text-slate-500 font-normal ml-2">{group.sub}</span></h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {group.list.map(char => (
                  <CharacterIcon 
                    key={char.id} 
                    character={char} 
                    isSelected={enemyTeam.some(e => e.id === char.id)}
                    onClick={() => toggleEnemy(char)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside className="lg:col-span-4">
          <div className="bg-slate-900/80 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl sticky top-32 backdrop-blur-md">
            <h3 className="text-xl font-black italic uppercase flex items-center gap-3 mb-8">
              <span className="p-2 bg-yellow-500/20 rounded-xl">⚡</span>
              AI 전략 리포트
            </h3>

            {recommendation && !isLoading ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-950 p-6 rounded-[2rem] border border-white/5 shadow-inner">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Tactical Logic</p>
                  <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line italic font-medium">{recommendation.reasoning}</p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-700"></span> 추천 스쿼드
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {recommendation.characters.map(char => (
                      <div key={char.id} className="text-center group">
                        <div className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all group-hover:scale-105 ${char.role === CharacterRole.VANGUARD ? 'border-blue-500/30' : char.role === CharacterRole.DUELIST ? 'border-red-500/30' : 'border-green-500/30'}`}>
                          <img src={char.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] font-black mt-2 truncate uppercase italic">{char.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 opacity-30">
                <p className="text-lg font-bold">대상을 선택하고<br/>분석을 시작하세요</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
