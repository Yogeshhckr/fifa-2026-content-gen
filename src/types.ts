export interface VisualBreakdownItem {
  timeRange: string;
  suggestion: string;
}

export interface ThumbnailIdea {
  text: string;
  concept: string;
  emotionTrigger: string;
}

export interface ViralPackage {
  title: string;
  alternativeTitles: string[];
  seoDescription: string;
  hashtags: string[];
  seoKeywords: string[];
}

export interface EngagementHooks {
  openingHooks: string[];
  endCtas: string[];
}

export interface GeneratedScriptData {
  id: string; // unique ID for loading from history
  timestamp: string;
  topic: string;
  style: string;
  duration: string;
  language: string;
  tone: string;
  scriptText: string;
  visualBreakdown: VisualBreakdownItem[];
  thumbnail: ThumbnailIdea;
  viralPackage: ViralPackage;
  engagementHooks: EngagementHooks;
}
