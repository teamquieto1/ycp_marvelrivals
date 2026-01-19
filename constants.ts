
import { Character, CharacterRole } from './types';

export const CHARACTERS: Character[] = [
  // Vanguards (뱅가드)
  { id: 'groot', name: '그루트', role: CharacterRole.VANGUARD, tags: ['포킹', '안티탱커', '궁연계', '메인탱'], imageUrl: 'https://i.namu.wiki/i/MlfvQUuKi-mRx-Xb4WLoXxP6Mp8DGPknqdPfLYWs6sg_a1aaJfW81fJo6h92VQeSx9RYL9FypQ1RucIQqKRr6w.webp' },
  { id: 'strange', name: '닥터 스트레인지', role: CharacterRole.VANGUARD, tags: ['방벽', '궁연계', '히트스캔 카운터', '대치', '메인탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/dr-strange.png' },
  { id: 'rogue', name: '로그', role: CharacterRole.VANGUARD, tags: ['러쉬', '템포', '공격픽', '서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/rogue.png' },
  { id: 'magneto', name: '매그니토', role: CharacterRole.VANGUARD, tags: ['대치', '메인탱', '힐궁카운터'], imageUrl: 'https://marvelrivals.com/assets/images/characters/magneto.png' },
  { id: 'venom', name: '베놈', role: CharacterRole.VANGUARD, tags: ['다이브', '힐궁카운터', '서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/venom.png' },
  { id: 'thing', name: '씽', role: CharacterRole.VANGUARD, tags: ['다이브 카운터', '근딜 카운터', '울버린 카운터', '서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/the-thing.png' },
  { id: 'angela', name: '안젤라', role: CharacterRole.VANGUARD, tags: ['러쉬', '서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/angela.png' },
  { id: 'emma', name: '엠마 프로스트', role: CharacterRole.VANGUARD, tags: ['근딜 카운터', '안티탱커', '포킹', '러쉬', '메인탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/emma-frost.png' },
  { id: 'cap', name: '캡틴 아메리카', role: CharacterRole.VANGUARD, tags: ['러쉬', '서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/captain-america.png' },
  { id: 'thor', name: '토르', role: CharacterRole.VANGUARD, tags: ['서브탱'], imageUrl: 'https://marvelrivals.com/assets/images/characters/thor.png' },
  { id: 'peni', name: '페니파커', role: CharacterRole.VANGUARD, tags: ['서브탱', '근딜 카운터', '러쉬 카운터'], imageUrl: 'https://marvelrivals.com/assets/images/characters/peni-parker.png' },
  { id: 'hulk', name: '헐크', role: CharacterRole.VANGUARD, tags: ['다이브', '러쉬'], imageUrl: 'https://marvelrivals.com/assets/images/characters/hulk.png' },

  // Duelists (듀얼리스트)
  { id: 'namor', name: '네이머', role: CharacterRole.DUELIST, tags: ['근딜카운터', '궁연계', '스파이더맨 카운터', '다이브 카운터', '사이드', '본대', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/namor.png' },
  { id: 'daredevil', name: '데어데블', role: CharacterRole.DUELIST, tags: ['근딜', '다이브', '사이드', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/daredevil.png' },
  { id: 'magik', name: '매직', role: CharacterRole.DUELIST, tags: ['근딜', '다이브', '사이드', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/magik.png' },
  { id: 'moon', name: '문나이트', role: CharacterRole.DUELIST, tags: ['로키 카운터', '포킹 카운터', '사이드', '본대', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/moon-knight.png' },
  { id: 'fantastic', name: '미스터 판타스틱', role: CharacterRole.DUELIST, tags: ['근딜 카운터', '다이브 카운터', '본대', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/mr-fantastic.png' },
  { id: 'widow', name: '블랙위도우', role: CharacterRole.DUELIST, tags: ['사이드', '본대', '포킹', '저격', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/black-widow.png' },
  { id: 'panther', name: '블랙 팬서', role: CharacterRole.DUELIST, tags: ['근딜', '다이브', '서브딜'], imageUrl: 'https://marvelrivals.com/assets/images/characters/black-panther.png' },
  { id: 'blade', name: '블레이드', role: CharacterRole.DUELIST, tags: ['안티탱커', '근딜', '메인딜', '본대', '러쉬'], imageUrl: 'https://marvelrivals.com/assets/images/characters/blade.png' },
  { id: 'psylocke', name: '사일록', role: CharacterRole.DUELIST, tags: ['서브딜', '사이드'], imageUrl: 'https://marvelrivals.com/assets/images/characters/psylocke.png' },
  { id: 'scarlet', name: '스칼렛위치', role: CharacterRole.DUELIST, tags: ['서브딜', '메인딜 가능'], imageUrl: 'https://marvelrivals.com/assets/images/characters/scarlet-witch.png' },
  { id: 'squirrel', name: '스쿼럴 걸', role: CharacterRole.DUELIST, tags: ['포킹 카운터', '메인딜', '포킹'], imageUrl: 'https://marvelrivals.com/assets/images/characters/squirrel-girl.png' },
  { id: 'starlord', name: '스타로드', role: CharacterRole.DUELIST, tags: ['메인딜', '서브딜', '궁밸류높음', '사이드', '본대'], imageUrl: 'https://marvelrivals.com/assets/images/characters/star-lord.png' },
  { id: 'storm', name: '스톰', role: CharacterRole.DUELIST, tags: ['제프단짝', '메인딜', '러쉬'], imageUrl: 'https://marvelrivals.com/assets/images/characters/storm.png' },
  { id: 'spiderman', name: '스파이더맨', role: CharacterRole.DUELIST, tags: ['다이브', '네이머에 취약', '서브딜', '사이드'], imageUrl: 'https://marvelrivals.com/assets/images/characters/spider-man.png' },
  { id: 'ironman', name: '아이언맨', role: CharacterRole.DUELIST, tags: ['메인딜', '본대', '사이드', '궁밸류높음'], imageUrl: 'https://marvelrivals.com/assets/images/characters/iron-man.png' },
  { id: 'ironfist', name: '아이언피스트', role: CharacterRole.DUELIST, tags: ['메인탱카운터', '다이브', '서브딜', '본대', '사이드'], imageUrl: 'https://marvelrivals.com/assets/images/characters/iron-fist.png' },
  { id: 'wolverine', name: '울버린', role: CharacterRole.DUELIST, tags: ['탱커카운터', '러쉬', '서브딜', '메인딜', '본대'], imageUrl: 'https://marvelrivals.com/assets/images/characters/wolverine.png' },
  { id: 'wintersoldier', name: '윈터솔져', role: CharacterRole.DUELIST, tags: ['방벽카운터', '포킹', '메인딜', '본대', '사이드', '러쉬'], imageUrl: 'https://marvelrivals.com/assets/images/characters/winter-soldier.png' },
  { id: 'punisher', name: '퍼니셔', role: CharacterRole.DUELIST, tags: ['메인딜', '본대', '사이드', '궁밸류높음', '히트스캔', '포킹'], imageUrl: 'https://marvelrivals.com/assets/images/characters/punisher.png' },
  { id: 'phoenix', name: '피닉스', role: CharacterRole.DUELIST, tags: ['메인딜', '본대', '사이드', '라쿤 카운터', '히트스캔', '포킹'], imageUrl: 'https://marvelrivals.com/assets/images/characters/jean-grey.png' },
  { id: 'hela', name: '헬라', role: CharacterRole.DUELIST, tags: ['메인딜', '본대', '사이드', '히트스캔', '포킹'], imageUrl: 'https://marvelrivals.com/assets/images/characters/hela.png' },
  { id: 'hawkeye', name: '호크아이', role: CharacterRole.DUELIST, tags: ['메인딜', '본대', '변수창출', '궁밸류높음', '포킹'], imageUrl: 'https://marvelrivals.com/assets/images/characters/hawkeye.png' },
  { id: 'humantorch', name: '휴먼토치', role: CharacterRole.DUELIST, tags: ['서브딜', '본대', '사이드', '지역장악', '포킹카운터'], imageUrl: 'https://marvelrivals.com/assets/images/characters/human-torch.png' },

  // Strategists (스트래티지스트)
  { id: 'gambit', name: '겜빗', role: CharacterRole.STRATEGIST, tags: ['서브힐', '궁밸류 높음', '러쉬', '다이브'], imageUrl: 'https://marvelrivals.com/assets/images/characters/gambit.png' },
  { id: 'jeff', name: '제프', role: CharacterRole.STRATEGIST, tags: ['메인힐', '다이브 대처 유리', '인비지블 카운터', '포킹조합에 어울림'], imageUrl: 'https://marvelrivals.com/assets/images/characters/jeff-the-land-shark.png' },
  { id: 'rocket', name: '로켓 라쿤', role: CharacterRole.STRATEGIST, tags: ['다이브 대처 유리', '러쉬', '포킹', '메인힐'], imageUrl: 'https://marvelrivals.com/assets/images/characters/rocket-raccoon.png' },
  { id: 'loki', name: '로키', role: CharacterRole.STRATEGIST, tags: ['서브힐', '다이브 카운터', '포킹', '궁밸류 높음', '3힐추천'], imageUrl: 'https://marvelrivals.com/assets/images/characters/loki.png' },
  { id: 'luna', name: '루나 스노우', role: CharacterRole.STRATEGIST, tags: ['메인힐', '포킹', '궁밸류 높음', '히트스캔'], imageUrl: 'https://marvelrivals.com/assets/images/characters/luna-snow.png' },
  { id: 'mantis', name: '맨티스', role: CharacterRole.STRATEGIST, tags: ['서브힐', '3힐 추천', '스타로드/블랙위도우/아이언맨과 어울림'], imageUrl: 'https://marvelrivals.com/assets/images/characters/mantis.png' },
  { id: 'adam', name: '아담워록', role: CharacterRole.STRATEGIST, tags: ['다이브 카운터', '러쉬 카운터', '3힐 추천', '히트스캔', '서브힐'], imageUrl: 'https://marvelrivals.com/assets/images/characters/adam-warlock.png' },
  { id: 'ultron', name: '울트론', role: CharacterRole.STRATEGIST, tags: ['포킹', '다이브', '러쉬', '3힐 추천', '히트스캔', '서브딜로 사용가능', '서브힐'], imageUrl: 'https://marvelrivals.com/assets/images/characters/ultron.png' },
  { id: 'invisible', name: '인비지블 우먼', role: CharacterRole.STRATEGIST, tags: ['러쉬', '포킹', '러쉬 카운터', '포킹 카운터', '궁밸류높음', '메인힐'], imageUrl: 'https://marvelrivals.com/assets/images/characters/invisible-woman.png' },
  { id: 'cloak', name: '클록 앤 대거', role: CharacterRole.STRATEGIST, tags: ['메인힐', '닥터스트레인지 카운터', '포킹', '러쉬'], imageUrl: 'https://marvelrivals.com/assets/images/characters/cloak-and-dagger.png' },
];

export const getSafeImageUrl = (url: string) => url;
