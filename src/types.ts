export interface Character {
  id: string;
  name: string;
  gender: '여' | '남' | '전체' | '공통' | '?' | string;
  rating: '알파' | '베타' | '감마' | '델타' | '엡실론' | '오메가' | '오메가 최하위' | '오메가 최상위' | '오메가 상위' | '오메가 중위' | '오메가 하위' | '없음' | string;
  personality: string[];
  speechStyle?: string;
  role: string;
  sectorId: number;
  appearance?: string;
  addonName?: string;
  addonDescription?: string;
  externalName?: string;
  externalDescription?: string;
  quote: string;
  secretDetails?: {
    revealedName?: string;
    trueIdentity?: string;
    hiddenAddonName?: string;
    hiddenAddonDesc?: string;
    revealedRating?: string;
    hiddenExternalName?: string;
    hiddenExternalDescription?: string;
    backstory?: string;
  };
}

export interface Sector {
  id: number;
  name: string;
  subName: string;
  description: string;
  detailedInfo: string;
  dangerLevel: '안전' | '보통' | '경계' | '위험' | '매우 위험' | '최악' | string;
  king: string;
  population: string;
  vanguardPresence: '높음' | '중간' | '낮음' | '없음' | string;
  coordinates: { x: number; y: number; z: number }; // For 3D layout simulation
}
