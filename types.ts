
export enum CharacterRole {
  VANGUARD = 'Vanguard',
  DUELIST = 'Duelist',
  STRATEGIST = 'Strategist'
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  tags: string[];
  imageUrl: string;
}

export interface Recommendation {
  characters: Character[];
  reasoning: string;
}
