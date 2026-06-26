export interface Language {
  id: string;
  code: string;
  name: string;
  flagIconUrl?: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Level {
  id: string;
  languageId: string;
  code: string; // VD: A1, A2
  name: string;
  orderIndex: number;
  description?: string;
}
