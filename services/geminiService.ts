
import { GoogleGenAI, Type } from "@google/genai";
import { Character, Recommendation } from "../types";
import { CHARACTERS } from "../constants";

export async function getTeamRecommendation(enemyTeam: Character[]): Promise<Recommendation> {
  // 호출 직전에 인스턴스를 생성하여 최신 API 키를 사용하도록 합니다.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return { characters: [], reasoning: "API 키가 설정되지 않았습니다. Vercel 환경 변수 설정을 확인해주세요." };
  }

  const ai = new GoogleGenAI({ apiKey });

  if (enemyTeam.length === 0) {
    return { characters: [], reasoning: "상대 팀을 선택해주세요." };
  }

  const enemyInfo = enemyTeam.map(c => `${c.name} (${c.role}): [${c.tags.join(', ')}]`).join('\n');
  const availableInfo = CHARACTERS.map(c => `${c.name} (${c.role}): [${c.tags.join(', ')}]`).join('\n');

  const prompt = `
    Marvel Rivals game expert analysis.
    Based on the enemy composition, recommend a counter team from the available characters.
    Recommend a standard 2-2-2 composition: exactly 2 Vanguards, 2 Duelists, and 2 Strategists (Total 6 characters).
    
    Enemy Team:
    ${enemyInfo}
    
    Available Characters (including tags):
    ${availableInfo}
    
    Return a JSON response with:
    - recommendedIds: string[] (IDs of exactly 6 recommended characters: 2 Vang, 2 Duel, 2 Strat)
    - reasoning: string (Detailed strategy explanation in Korean. Explain specific counters based on the character tags provided)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING }
          },
          required: ["recommendedIds", "reasoning"]
        }
      }
    });

    const text = response.text || '';
    const result = JSON.parse(text);
    const recommendedChars = result.recommendedIds
      .map((id: string) => CHARACTERS.find(c => c.id === id))
      .filter((c: Character | undefined): c is Character => !!c);
    
    return {
      characters: recommendedChars,
      reasoning: result.reasoning
    };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    let errorMessage = "추천을 불러오는 중 오류가 발생했습니다.";
    if (error.message?.includes("403") || error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "API 키가 유효하지 않거나 권한이 없습니다.";
    }
    return { characters: [], reasoning: errorMessage };
  }
}
