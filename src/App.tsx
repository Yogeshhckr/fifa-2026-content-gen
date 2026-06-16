import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Clock, 
  Globe, 
  Flame, 
  RefreshCw, 
  FileText, 
  History, 
  Trash2, 
  Share2, 
  Volume2, 
  Video, 
  Image as ImageIcon, 
  Tag, 
  CornerDownRight, 
  Info, 
  CheckSquare, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { GeneratedScriptData } from './types';

// classified suggestion chips to make suggestions organized and professional
const SUGGESTION_CATEGORIES = [
  {
    name: "🏆 Legends & Players",
    chips: [
      "Lionel Messi's Last Dance", 
      "Cristiano Ronaldo's 2026 Prediction", 
      "Kylian Mbappé Golden Boot", 
      "Lamine Yamal Young Superstar", 
      "Erling Haaland Norway Dream", 
      "Jude Bellingham's England Promise"
    ]
  },
  {
    name: "🌎 Host Nations & Venues",
    chips: [
      "MetLife Stadium Final Setup", 
      "SoFi Stadium Opening Spectacle", 
      "Estadio Azteca Historical Return", 
      "USA vs Mexico Rivalry 2026", 
      "Canada Dark Horse Campaign"
    ]
  },
  {
    name: "🔥 Records & Drama",
    chips: [
      "FIFA 2026 Final Surprise Winner", 
      "Greatest World Cup Upsets History", 
      "Untold FIFA Qualification Stories", 
      "Conspiracy behind 48-Team Expansion", 
      "Golden Boot Race Forecast"
    ]
  }
];

const CONTENT_STYLES = [
  "Facts",
  "Untold Stories",
  "Shocking Facts",
  "Conspiracy Theories",
  "Emotional Story",
  "Player Journey",
  "Match Analysis",
  "Historical Comparison",
  "What If Scenario",
  "Top 5 Ranking",
  "Hidden Secrets",
  "Crazy Records",
  "Fan Debate",
  "Prediction",
  "Viral Documentary Style"
];

const DURATIONS = ["30 Seconds", "45 Seconds", "60 Seconds", "90 Seconds"];

const LANGUAGES = ["English", "Hindi", "Hinglish", "Spanish", "Portuguese"];

const TONES = [
  "Viral",
  "Documentary",
  "Emotional",
  "Suspenseful",
  "Energetic",
  "Dramatic",
  "Storytelling",
  "Professional"
];

// Pre-populated high-quality initial mock sample so the landing layout is never empty and looks pristine
const INITIAL_SAMPLE_SCRIPT: GeneratedScriptData = {
  id: "sample-1",
  timestamp: new Date().toLocaleString(),
  topic: "Lionel Messi's Last Dance",
  style: "Viral Documentary Style",
  duration: "60 Seconds",
  language: "English",
  tone: "Suspenseful",
  scriptText: "Imagine this. It’s July 2026. The world is watching. One final kick of the ball could change football history forever. Lionel Messi stands over the spot at MetLife Stadium. But there’s a secret about this match that nobody is talking about... yet.\n\nFor decades, critics said he couldn't do it. Then 2022 happened. But 2026 is different. It’s not just about a trophy anymore—it's about a legacy that transcends time itself. Did you know that the 2026 final is projected to be the most watched event in human history? Over 5 billion people. One legacy. One Goal.\n\nHe has trained his entire life for this specific minute. The pressure is heavier than a mountain range. The drama is just beginning. Who do you think takes the Golden Boot? Drop your prediction in the comments and subscribe if you think Messi is the undisputed GOAT of soccer history!",
  visualBreakdown: [
    { timeRange: "0-6 sec", suggestion: "Ultra slow-motion close-up of Lionel Messi tying his boots on the pitch, lights glimmering in stadium background." },
    { timeRange: "6-15 sec", suggestion: "Dramatic flash cuts of the massive MetLife Stadium layout in New Jersey packed with 82,000 screaming supporters." },
    { timeRange: "15-28 sec", suggestion: "High-contrast split screen showing critics highlighting negative articles, transition to Messi holding 2022 trophy." },
    { timeRange: "28-42 sec", suggestion: "Dynamic CGI infographic showing 5.2 Billion global viewership tracker climbing exponentially." },
    { timeRange: "42-53 sec", suggestion: "Fast-paced montage of magical dribbles, intense crowd reaction, and spectacular cinematic final penalties." },
    { timeRange: "53-60 sec", suggestion: "A vibrant text slide 'DROP YOUR PREDICTIONS' with subscription button icon floating in the center." }
  ],
  thumbnail: {
    text: "THE LAST DANCE?",
    concept: "Hyper-realistic graphic of Lionel Messi walking into a golden glowing portal at MetLife Stadium with 2026 World Cup background visual.",
    emotionTrigger: "High Nostalgia, Suspense & Fear of Missing Out (FOMO)"
  },
  viralPackage: {
    title: "The Lionel Messi Conspiracy? 2026 World Cup Secret Revealed! 👑🏆",
    alternativeTitles: [
      "Messi's Secret Plan For FIFA 2026! 🤫",
      "Why Everyone Is Wrong About Messi's Last World Cup",
      "The Most Watched 60 Seconds in Football History is Coming...",
      "Will Messi Shock the World in 2026? 🐐",
      "MetLife Stadium: The Dark Secret of the 2026 Final"
    ],
    seoDescription: "Will Lionel Messi secure another FIFA World Cup victory in 2026? We dive into the surprising statistics, the MetLife Stadium lineup, and secret legacy forecasts that have soccer critics speechless. Timestamps: 0:00 - The final kick, 0:25 - Legend statistics, 0:50 - Fan prediction comments.",
    hashtags: [
      "#FIFA2026", "#LionelMessi", "#WorldCup2026", "#MessiLastDance", "#MetLifeStadium", 
      "#FootballSecrets", "#SoccerNews", "#DiegoMaradona", "#ArgentinaFootball", "#YouTubeShorts", 
      "#TrendingSports", "#GoldenBoot", "#CristianoRonaldo", "#InsideFootball", "#WorldCupSecrets", 
      "#ViralSports", "#InterMiami", "#ShortsViral", "#FootballHistory", "#GOAT"
    ],
    seoKeywords: [
      "Messi last dance 2026", "FIFA World Cup New Jersey", "World Cup final predictions", "Lionel Messi World Cup return", "Messi retirement news", 
      "MetLife Stadium FIFA Final", "World Cup records Messi", "Argentina squad 2026", "Messi vs Ronaldo world cup", "football video documentary", 
      "viral soccer shorts", "YouTube growth sports", "Golden Boot race 2026", "soccer controversies", "Messi legacy facts", 
      "greatest football moments", "FIFA 2026 opening match", "Lionel Messi current statistics", "World cup updates", "Messi skills shorts"
    ]
  },
  engagementHooks: {
    openingHooks: [
      "This simple detail about Lionel Messi in 2026 changes EVERYTHING.",
      "Five billion people are going to witness this shock in New Jersey.",
      "The FIFA World Cup has a hidden secret, and it involves Messi...",
      "What if I told you the 2026 final is already written in football history?",
      "No one is prepared for what Messi is planning for his ultimate game."
    ],
    endCtas: [
      "Will he do it? Comment your pick and subscribe for more untold elite soccer stories!",
      "If you think Messi is the undisputed GOAT, smash that subscribe button right now!",
      "Share this to an Argentina fan and let us know your team prediction down below!",
      "Subscribe before the tournament starts to prove you were here before the viral boom!",
      "Is this the craziest sports scenario ever? Subscribe and leave your thoughts!"
    ]
  }
};

// Loading step messages to keep user engaged during generation
const LOADING_STEPS = [
  "Analyzing target topic and recent FIFA World Cup database parameters...",
  "Applying professional YouTube Shorts pacing formulas...",
  "Drafting high-retention auditory hook trigger sentences...",
  "Composing visual storyboard and high energy scene metadata...",
  "Assembling metadata package, tags, descriptions, and hashtags...",
  "Perfecting SEO keyword matrices and alternative emotional hooks...",
  "Polishing clean vocal audio-friendly script narration text..."
];

export default function App() {
  // Input states
  const [topic, setTopic] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(CONTENT_STYLES[1]); // Untold Stories
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[2]); // 60 Seconds
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]); // English
  const [selectedTone, setSelectedTone] = useState(TONES[0]); // Viral

  // Generation & Output states
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [currentScript, setCurrentScript] = useState<GeneratedScriptData | null>(INITIAL_SAMPLE_SCRIPT);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Layout states
  const [activeTab, setActiveTab] = useState<'script' | 'visuals' | 'viral' | 'hooks'>('script');
  const [historyList, setHistoryList] = useState<GeneratedScriptData[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Custom suggestion search filter
  const [suggestFilter, setSuggestFilter] = useState("");

  // Set up loading steps cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1800);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fifa_shorts_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistoryList(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history helper
  const saveToHistory = (newScript: GeneratedScriptData) => {
    try {
      const updated = [newScript, ...historyList.filter(h => h.id !== newScript.id)].slice(0, 30);
      setHistoryList(updated);
      localStorage.setItem("fifa_shorts_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  // Delete from history
  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = historyList.filter(item => item.id !== id);
    setHistoryList(filtered);
    localStorage.setItem("fifa_shorts_history", JSON.stringify(filtered));
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete all saved generated scripts?")) {
      setHistoryList([]);
      localStorage.removeItem("fifa_shorts_history");
    }
  };

  // Generate Script Core Handler
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage("Please enter or select a topic for your World Cup script.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setLoadingStepIndex(0);

    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          style: selectedStyle,
          duration: selectedDuration,
          language: selectedLanguage,
          tone: selectedTone
        })
      });

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.error || `Server responded with status ${resp.status}`);
      }

      const rawResult = await resp.json();
      
      const newScriptRecord: GeneratedScriptData = {
        id: `script-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        topic: topic.trim(),
        style: selectedStyle,
        duration: selectedDuration,
        language: selectedLanguage,
        tone: selectedTone,
        ...rawResult
      };

      setCurrentScript(newScriptRecord);
      saveToHistory(newScriptRecord);
      setActiveTab('script'); // Swings preview back to script tab upon success
    } catch (err: any) {
      console.error("Script generation failure:", err);
      setErrorMessage(err.message || "Something went wrong while composing your script. Please check your network and retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy helper with visual feedback
  const handleCopyText = (textToCopy: string, label: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedSection(label);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  // Copy Full Compiled Script Package for quick pasting into workspace/docs
  const handleCopyFullPackage = () => {
    if (!currentScript) return;
    const fullPackageText = `================ FIFA 2026 SHORTS SCRIPT PACKAGE ================
Topic: ${currentScript.topic}
Style: ${currentScript.style} | Tone: ${currentScript.tone} | Duration: ${currentScript.duration}

1. FULL NARRATION SCRIPT:
${currentScript.scriptText}

2. PRIMARY TITLE:
${currentScript.viralPackage.title}

3. DESCRIPTION & TAGS:
${currentScript.viralPackage.seoDescription}

HASHTAGS:
${currentScript.viralPackage.hashtags.join(' ')}

KEYWORDS:
${currentScript.viralPackage.seoKeywords.join(', ')}`;

    handleCopyText(fullPackageText, 'full_package');
  };

  // Dynamic file Export to single professional TXT format
  const handleExportTxt = () => {
    if (!currentScript) return;

    const separator = "=".repeat(60);
    const subsep = "-".repeat(60);

    const textPayload = `${separator}
FIFA 2026 WORLD CUP YouTube Shorts COMPLETE Script & Metadata
${separator}
Topic: ${currentScript.topic}
Style: ${currentScript.style}
Duration: ${currentScript.duration}
Language: ${currentScript.language}
Tone: ${currentScript.tone}
Generated on: ${currentScript.timestamp}

${subsep}
1. FULL AUDIO NARRATION (Clean spoken content - ready for recording)
${subsep}
${currentScript.scriptText}

${subsep}
2. DYNAMIC VISUAL SUGGESTIONS & BREAKDOWN
${subsep}
${currentScript.visualBreakdown.map(v => `[${v.timeRange}] -> ${v.suggestion}`).join('\n')}

${subsep}
3. ENGAGING HOOKS FOR RETENTION TEST
${subsep}
Alternative Opening Hooks:
${currentScript.engagementHooks.openingHooks.map((h, i) => `  [#${i + 1}] ${h}`).join('\n')}

Alternative End CTAs:
${currentScript.engagementHooks.endCtas.map((c, i) => `  [#${i + 1}] ${c}`).join('\n')}

${subsep}
4. CLICK-BAIT THUMBNAIL DESIGN CONCEPT
${subsep}
Text on Graphic: "${currentScript.thumbnail.text}"
Visual Layout: ${currentScript.thumbnail.concept}
Core Psychological Emotion Trigger: ${currentScript.thumbnail.emotionTrigger}

${subsep}
5. SYSTEMATIC VIRAL METADATA PACKAGE
${subsep}
Primary Short Title: ${currentScript.viralPackage.title}

Alternative Titles (Choose 1 to A/B test):
${currentScript.viralPackage.alternativeTitles.map((t, idx) => `  [Option ${idx + 1}] ${t}`).join('\n')}

Search Optimized Description:
${currentScript.viralPackage.seoDescription}

20 High-Relevance Hashtags:
${currentScript.viralPackage.hashtags.join(' ')}

20 High-Ranking SEO Keywords:
${currentScript.viralPackage.seoKeywords.join(', ')}

${separator}
Generated via FIFA 2026 Shorts Script Generator Engine. Protect this draft.
${separator}
`;

    const blob = new Blob([textPayload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `FIFA2026_ShortsScript_${currentScript.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Native styled document Print/PDF layout trigger
  const handleExportPdf = () => {
    window.print();
  };

  // Word count and Character count metrics
  const getWordCount = (str: string) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = (str: string) => {
    return str ? str.length : 0;
  };

  // Suggestion chips filtered dynamically by search text
  const filteredSuggestionCategories = SUGGESTION_CATEGORIES.map(category => {
    return {
      ...category,
      chips: category.chips.filter(c => 
        c.toLowerCase().includes(suggestFilter.toLowerCase())
      )
    };
  }).filter(cat => cat.chips.length > 0);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative overflow-x-hidden select-none pb-8 text-sm">
      
      {/* Dynamic FIFA Glowing Lines Background Decoration inside client */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#10387D]/15 via-[#030712]/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-10 right-[-100px] w-[350px] h-[350px] bg-[#F2C94C]/3 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-[-100px] w-[350px] h-[350px] bg-[#00FF87]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* TOP HEADER */}
      <header className="no-print relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div id="app-title-card" className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] font-extrabold text-[#00FF87] uppercase flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00FF87] animate-pulse"></span>
              North America 2026 Exclusive
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none uppercase">
            FIFA 2026 <span className="text-[#F2C94C] drop-shadow-[0_2px_12px_rgba(242,201,76,0.3)]">SHORTS</span> SCRIPTWRITER
          </h1>
          <p className="text-xs text-slate-400 mt-2 max-w-2xl font-light">
            Empowering professional documentarians and creators to craft retention-engineered TikTok, Reels, and YT Shorts for the historic 2026 World Cup. Include visual suggestions, thumbnails, and tags.
          </p>
        </div>

        {/* Global Control Bar */}
        <div id="global-controls" className="flex flex-wrap gap-2 sm:self-end">
          <button 
            id="toggle-history-btn"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
              isHistoryOpen 
                ? 'bg-[#F2C94C] text-black border-[#F2C94C]' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <History size={14} />
            Script Archives ({historyList.length})
          </button>
          
          {currentScript && (
            <div className="flex gap-2">
              <button
                id="export-txt-global"
                onClick={handleExportTxt}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                title="Download pristine formatted TXT"
              >
                <Download size={14} />
                TXT
              </button>
              <button
                id="export-pdf-global"
                onClick={handleExportPdf}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                title="Print copy or Save to local PDF vector file"
              >
                <FileText size={14} />
                Print / PDF
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main id="main-scripter-layout" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ARCHIVE LIST (IF OPEN) OR INPUT CONTROLS */}
        <section id="scripter-left-panel" className="no-print lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          
          {/* ARCHIVE DRAWER / SIDEBAR SECTION */}
          {isHistoryOpen && (
            <div id="archive-panel-card" className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border border-[#F2C94C]/20 shadow-xl max-h-[750px] overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="font-display text-xl text-[#F2C94C] tracking-wide flex items-center gap-2">
                  <History size={18} />
                  DRAFT ARCHIVES
                </h2>
                <div className="flex gap-2">
                  {historyList.length > 0 && (
                    <button 
                      id="clear-all-archive-btn"
                      onClick={clearAllHistory}
                      className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold tracking-wider hover:underline bg-none border-none cursor-pointer"
                    >
                      CLEAR ALL
                    </button>
                  )}
                  <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className="text-slate-400 hover:text-white font-bold text-xs"
                  >
                    CLOSE [X]
                  </button>
                </div>
              </div>

              {historyList.length === 0 ? (
                <div className="py-12 text-center text-slate-500 flex flex-col items-center gap-2">
                  <Flame className="opacity-10 stroke-[1.2]" size={42} />
                  <p className="text-xs">No saved scripts yet.</p>
                  <p className="text-[11px] max-w-[200px] mx-auto text-slate-600">Your generated viral script drafts will automatically save locally here.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 max-h-[500px]">
                  {historyList.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setCurrentScript(item);
                        setTopic(item.topic);
                        setSelectedStyle(item.style);
                        setSelectedDuration(item.duration);
                        setSelectedLanguage(item.language);
                        setSelectedTone(item.tone);
                      }}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-150 relative group ${
                        currentScript?.id === item.id 
                          ? 'bg-[#10387D]/35 border-[#F2C94C] shadow-md' 
                          : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <button 
                        onClick={(e) => deleteHistoryItem(item.id, e)}
                        className="absolute right-2 top-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/5 cursor-pointer"
                        title="Delete archive item"
                      >
                        <Trash2 size={13} />
                      </button>
                      
                      <div className="text-xs font-bold text-slate-100 pr-5 line-clamp-1 truncate">{item.topic}</div>
                      
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5 text-[10px] text-slate-400">
                        <span className="text-[#F2C94C] font-semibold">{item.style}</span>
                        <span>•</span>
                        <span>{item.duration}</span>
                        <span>•</span>
                        <span className="bg-white/5 px-1 rounded">{item.language}</span>
                      </div>
                      
                      <div className="text-[9px] text-slate-600 font-mono mt-1 text-right">{item.timestamp}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {currentScript && (
                <button
                  id="close-archive-btn"
                  onClick={() => setIsHistoryOpen(false)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-xs font-bold uppercase transition-all mt-2 cursor-pointer"
                >
                  Return to Input Form
                </button>
              )}
            </div>
          )}

          {/* SCRIPT CONFIGURATION FORM */}
          <div className={`glass-panel p-5 rounded-2xl flex flex-col gap-4 shadow-[#030712]/80 shadow-2xl transition-all duration-300 border ${isHistoryOpen ? 'opacity-80' : 'opacity-100 border-white/10'}`}>
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <div className="p-1 w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/30">
                <Sparkles className="text-[#F2C94C]" size={16} />
              </div>
              <div>
                <h2 className="font-display text-lg uppercase text-white tracking-wide">VIRAL PARAMETERS</h2>
                <p className="text-[10px] text-slate-400 font-light leading-none">Complete World Cup script system</p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              
              {/* INPUT 1: Topic */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold">
                  <label htmlFor="topic-input" className="text-slate-300">What is your topic?</label>
                  {topic && (
                    <button 
                      type="button" 
                      onClick={() => setTopic("")}
                      className="text-[10px] text-[#F2C94C] normal-case tracking-normal hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="topic-input"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Lionel Messi, Stadium name, Greatest match drama..."
                    maxLength={100}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#F2C94C] rounded-xl px-4 py-3 placeholder-slate-500 text-slate-100 text-sm outline-none transition-all duration-150"
                  />
                  <span className="absolute right-3 top-3.5 text-[9px] text-slate-500 font-mono">
                    {topic.length}/100
                  </span>
                </div>

                {/* Search suggestion filter */}
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Suggested Viral Angles</span>
                    <input 
                      type="text" 
                      placeholder="Refine suggestions..."
                      value={suggestFilter}
                      onChange={(e) => setSuggestFilter(e.target.value)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] rounded px-2 py-0.5 outline-none text-slate-300 w-32 focus:border-[#F2C94C]/50 transition-all font-light"
                    />
                  </div>

                  {/* Suggestion categories rendered beautifully */}
                  <div className="max-h-[170px] overflow-y-auto pr-1 flex flex-col gap-2 bg-black/30 p-2.5 rounded-lg border border-white/5">
                    {filteredSuggestionCategories.length === 0 ? (
                      <span className="text-[10px] text-slate-500 italic">No matches. Try searching other players or venues.</span>
                    ) : (
                      filteredSuggestionCategories.map((cat, catIdx) => (
                        <div key={catIdx} className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold tracking-wider text-[#00FF87]/80 uppercase">{cat.name}</span>
                          <div className="flex flex-wrap gap-1.5 pt-0.5 pb-1">
                            {cat.chips.map((chip, chipIdx) => (
                              <button
                                key={chipIdx}
                                type="button"
                                onClick={() => setTopic(chip)}
                                className={`text-[11px] font-medium transition-all duration-150 px-2.5 py-1 rounded-full border text-left cursor-pointer ${
                                  topic === chip 
                                    ? 'bg-[#F2C94C] text-black border-[#F2C94C]' 
                                    : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/15 hover:text-white hover:border-[#F2C94C]/30'
                                }`}
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* GRID: Style & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* INPUT 2: Style */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="style-select" className="text-xs uppercase tracking-wider font-semibold text-slate-300">Content Style</label>
                  <select
                    id="style-select"
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#F2C94C] rounded-xl px-3 py-2.5 text-slate-100 text-xs outline-none transition-all cursor-pointer"
                  >
                    {CONTENT_STYLES.map((style) => (
                      <option key={style} value={style} className="bg-[#030712] text-slate-200">
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* INPUT 3: Duration */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="duration-select" className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1">
                    <Clock size={12} className="text-[#F2C94C]" />
                    Script Duration
                  </label>
                  <select
                    id="duration-select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#F2C94C] rounded-xl px-3 py-2.5 text-slate-100 text-xs outline-none transition-all cursor-pointer"
                  >
                    {DURATIONS.map((dur) => (
                      <option key={dur} value={dur} className="bg-[#030712] text-slate-200">
                        {dur}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* GRID: Language & Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* INPUT 4: Language */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="language-select" className="text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1">
                    <Globe size={12} className="text-[#F2C94C]" />
                    Language
                  </label>
                  <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#F2C94C] rounded-xl px-3 py-2.5 text-slate-100 text-xs outline-none transition-all cursor-pointer"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang} className="bg-[#030712] text-slate-200">
                        {lang}
                      </option>
                    ))}
                  </select>
                  {selectedLanguage === "Hinglish" && (
                    <span className="text-[10px] text-slate-400 italic font-light leading-tight">
                      * Uses Latin letters to type Hindi sounds. Viral format in India!
                    </span>
                  )}
                </div>

                {/* INPUT 5: Tone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tone-select" className="text-xs uppercase tracking-wider font-semibold text-slate-300">Tone</label>
                  <select
                    id="tone-select"
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 focus:border-[#F2C94C] rounded-xl px-3 py-2.5 text-slate-100 text-xs outline-none transition-all cursor-pointer"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t} className="bg-[#030712] text-slate-200">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* GENERATE SUBMIT BUTTON */}
              <button
                id="generate-script-btn"
                type="submit"
                disabled={isGenerating}
                className={`glow-btn group mt-3 w-full py-4 rounded-xl text-black font-extrabold uppercase text-xs sm:text-sm tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isGenerating 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#F2C94C] via-[#F2C94C] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(242,201,76,0.35)] active:scale-[0.98]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin text-black" size={16} />
                    <span>SYSTEM WRITING...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} className="text-black group-hover:scale-125 transition-all text-black" />
                    <span>Generate Viral Shorts Script</span>
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-white/5 pt-3.5 flex items-center gap-2 text-[11px] text-slate-400">
              <Info size={14} className="text-[#00FF87]" />
              <p className="leading-tight">
                Script generated with the extreme sport-documentary model. Includes high attention retention markers.
              </p>
            </div>
          </div>

          {/* APP STATS PANEL */}
          <div className="glass-panel p-4 rounded-xl flex justify-between items-center text-[10px] text-slate-500 font-mono border border-white/5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] block"></span>
              PORT CONTAINER STABLE
            </span>
            <span>MODEL: GEMINI-3.5-FLASH</span>
          </div>
        </section>

        {/* RIGHT COLUMN: PREVIEW SCREEN (PDF-PRINT EXPORTABLE DRAFT) */}
        <section id="scripter-right-panel" className="lg:col-span-12 lg:col-start-6 xl:col-span-8 flex flex-col gap-6 w-full">
          
          {/* CRITICAL STATE: ERROR MESSAGE */}
          {errorMessage && (
            <div id="error-banner" className="bg-red-950/40 border border-red-500/30 p-4 rounded-xl text-xs text-red-200 flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-bold uppercase tracking-wider mb-1">CATASTROPHIC ENGINE ERROR</p>
                <p>{errorMessage}</p>
                <p className="mt-1 text-[10px] text-slate-400">Please verify your GEMINI_API_KEY inside the Secrets drawer of the editor or check the topic characters.</p>
              </div>
            </div>
          )}

          {/* CRITICAL STATE: GENERATING LOADER */}
          {isGenerating && (
            <div id="generating-loader" className="glass-panel p-10 py-16 rounded-2xl flex flex-col items-center justify-center gap-6 border-amber-500/20 text-center shadow-2xl relative overflow-hidden">
              
              {/* Dynamic decorative soccer ring animation */}
              <div className="relative w-24 h-24 mb-2 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-dashed border-[#F2C94C]/20 rounded-full animate-spin [animation-duration:15s]" />
                <div className="absolute inset-2 border-4 border-solid border-t-[#00FF87] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:1.5s]" />
                <div className="absolute inset-4 border border-dashed border-[#10387D]/40 rounded-full" />
                <Award size={36} className="text-[#F2C94C] animate-pulse" />
              </div>

              <div className="z-10 max-w-md flex flex-col gap-2">
                <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#F2C94C] uppercase">
                  WRITING FIFA DRAFT
                </span>
                <h3 className="font-display text-2xl text-white">GENERATING YOUR SCRIPT</h3>
                
                {/* Active step readout with simulated progress bar */}
                <div className="mt-4 bg-black/60 border border-white/5 p-3 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] font-mono text-[#00FF87]">
                    <span>PROCESS PROGRESS</span>
                    <span>{Math.round(((loadingStepIndex + 1) / LOADING_STEPS.length) * 100)}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-[#00FF87] to-[#F2C94C] h-full transition-all duration-1000"
                      style={{ width: `${((loadingStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
                    />
                  </div>
                  
                  <span className="text-[10px] text-slate-300 italic animate-pulse tracking-wide block mt-1">
                    "{LOADING_STEPS[loadingStepIndex]}"
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MAIN OUTPUT DASHBOARD PANEL */}
          {!isGenerating && currentScript && (
            <div id="full-generated-document" className="flex flex-col gap-6">
              
              {/* Draft Overview Ribbon */}
              <div className="no-print glass-panel p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-[#00FF87]/20 shadow-lg md:px-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#10387D] rounded-xl flex items-center justify-center border border-[#F2C94C]/30 shrink-0">
                    <TrendingUp className="text-[#F2C94C]" size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#10387D] text-[#F2C94C] rounded-full border border-[#F2C94C]/20">
                        {currentScript.tone} Tone
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {currentScript.timestamp}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                      Active: {currentScript.topic}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    id="copy-full-package-btn"
                    onClick={handleCopyFullPackage}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#00FF87] hover:bg-[#00e075] text-black transition-all cursor-pointer"
                  >
                    {copiedSection === 'full_package' ? (
                      <>
                        <Check size={14} />
                        COPIED PACKAGE!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Entire Draft Package
                      </>
                    )}
                  </button>
                  
                  {historyList.length > 0 && (
                    <button
                      id="regenerate-script-btn"
                      onClick={() => handleGenerate()}
                      className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                      title="Regenerate this specific topic with current parameters"
                    >
                      <RefreshCw size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* TABS SELECTOR (NO-PRINT) */}
              <div className="no-print border-b border-white/10 flex flex-wrap gap-1">
                <button
                  onClick={() => setActiveTab('script')}
                  className={`py-3 px-4 font-display uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${
                    activeTab === 'script' 
                      ? 'border-[#F2C94C] text-[#F2C94C] font-bold bg-white/5' 
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  📄 1. Ready-to-use Script
                </button>
                <button
                  onClick={() => setActiveTab('visuals')}
                  className={`py-3 px-4 font-display uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${
                    activeTab === 'visuals' 
                      ? 'border-[#F2C94C] text-[#F2C94C] font-bold bg-white/5' 
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  🎞️ 2. Visual Breakdown & Thumbnail
                </button>
                <button
                  onClick={() => setActiveTab('viral')}
                  className={`py-3 px-4 font-display uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${
                    activeTab === 'viral' 
                      ? 'border-[#F2C94C] text-[#F2C94C] font-bold bg-white/5' 
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  🚀 3. Viral Package Meta Space
                </button>
                <button
                  onClick={() => setActiveTab('hooks')}
                  className={`py-3 px-4 font-display uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${
                    activeTab === 'hooks' 
                      ? 'border-[#F2C94C] text-[#F2C94C] font-bold bg-white/5' 
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/2'
                  }`}
                >
                  🪝 4. Engagement Hooks
                </button>
              </div>

              {/* TAB 1 CONTENT: FULL SCRIPT */}
              {activeTab === 'script' && (
                <div id="script-preview-section" className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border-slate-800 shadow-xl min-h-[350px]">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-display uppercase text-2xl tracking-tight text-white">
                        # FULL SCRIPT
                      </span>
                      <span className="text-[10px] uppercase font-mono bg-white/5 px-2 py-0.5 rounded-full text-slate-400">
                        VOICEOVER READ
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="hidden sm:inline">WORDS: <strong className="text-white">{getWordCount(currentScript.scriptText)}</strong></span>
                      <span className="hidden sm:inline">CHARS: <strong className="text-white">{getCharCount(currentScript.scriptText)}</strong></span>
                      <button 
                        id="copy-script-text-btn"
                        onClick={() => handleCopyText(currentScript.scriptText, 'script_text')}
                        className="text-[#F2C94C] hover:text-[#fff] uppercase font-bold tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'script_text' ? <Check size={12} /> : <Copy size={12} />}
                        {copiedSection === 'script_text' ? 'COPIED!' : 'COPY VO SCRIPT'}
                      </button>
                    </div>
                  </div>

                  {/* Narration guidelines box */}
                  <div className="bg-[#10387D]/10 border border-[#10387D]/30 p-3 rounded-lg flex items-start gap-2 text-xs text-slate-300">
                    <Volume2 className="text-[#F2C94C] shrink-0 mt-0.5" size={15} />
                    <p className="leading-relaxed">
                      <strong>Narrator Pacing Guide:</strong> Read with heavy emphasis on the hook (first 3 lines), maintain strong dramatic pauses at punctuation, and finish with rapid suspenseful enthusiasm. Absolute clean copy - no production cues to edit out!
                    </p>
                  </div>

                  {/* Clean Voiceover Print-optimized Display Container */}
                  <div className="flex-1 bg-black/40 border border-white/5 p-5 rounded-xl font-sans text-base sm:text-lg leading-relaxed text-slate-100 italic select-text whitespace-pre-wrap font-light tracking-wide">
                    {currentScript.scriptText || "No narration text has been returned by generator model."}
                  </div>

                  {/* Print preview stats */}
                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
                    <span>Target duration is calibrated exactly to {currentScript.duration}</span>
                    <span className="sm:hidden">WORDS: {getWordCount(currentScript.scriptText)} | CHARS: {getCharCount(currentScript.scriptText)}</span>
                  </div>
                </div>
              )}

              {/* TAB 2 CONTENT: KEYBREAKDOWN AND THUMBNAIL */}
              {activeTab === 'visuals' && (
                <div id="visuals-preview-section" className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left subgrid panel: VISUAL SUGGESTIONS TABLE (8 cols) */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-slate-800 shadow-xl md:col-span-7">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1.5 font-display text-xl uppercase tracking-tight text-white">
                        <Video size={16} className="text-[#F2C94C]" />
                        # VISUAL BREAKDOWN
                      </div>
                      
                      <button
                        onClick={() => handleCopyText(
                          currentScript.visualBreakdown.map(v => `[${v.timeRange}] ${v.suggestion}`).join('\n'), 
                          'visual_timeline'
                        )}
                        className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'visual_timeline' ? <Check size={12} /> : <Copy size={12} />}
                        COPY TIMELINE
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 font-mono tracking-wider uppercase">
                            <th className="py-2.5 w-20">Time</th>
                            <th className="py-2.5">Visual Suggestion (Pro Documentarian Directives)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300">
                          {currentScript.visualBreakdown.map((item, index) => (
                            <tr key={index} className="hover:bg-white/2 transition-colors">
                              <td className="py-3 font-mono font-bold text-[#F2C94C]">
                                {item.timeRange}
                              </td>
                              <td className="py-3 text-slate-200 leading-relaxed italic pr-2">
                                {item.suggestion}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right subgrid panel: THUMBNAIL DESIGN (5 cols) */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-slate-800 shadow-xl md:col-span-5">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1.5 font-display text-xl uppercase tracking-tight text-white">
                        <ImageIcon size={16} className="text-[#00FF87]" />
                        # THUMBNAIL IDEA
                      </div>
                      
                      <button 
                        onClick={() => handleCopyText(
                          `TEXT: ${currentScript.thumbnail.text}\nCONCEPT: ${currentScript.thumbnail.concept}\nEMOTION: ${currentScript.thumbnail.emotionTrigger}`,
                          'thumbnail_idea'
                        )}
                        className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'thumbnail_idea' ? <Check size={12} /> : <Copy size={12} />}
                        COPY DESIGN
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 font-sans">
                      
                      {/* Bold thumbnail text preview box */}
                      <div className="bg-black/80 rounded-xl p-4 border border-white/10 relative overflow-hidden flex flex-col justify-center items-center min-h-[110px] text-center">
                        <div className="absolute inset-0 bg-gradient-radial from-[#10387D]/10 to-transparent opacity-80" />
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-1.5">THUMBNAIL BOLD TEXT</span>
                        <h4 className="font-display text-2xl uppercase text-yellow-300 font-extrabold tracking-wider leading-tight z-10 drop-shadow-[0_3px_5px_rgba(0,0,0,1)]">
                          {currentScript.thumbnail.text || "NO TEXT DEFINED"}
                        </h4>
                      </div>

                      {/* Concept detail */}
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Composition Concept</span>
                        <p className="bg-slate-900/50 p-2.5 rounded-lg border border-white/5 text-slate-200 leading-relaxed italic">
                          {currentScript.thumbnail.concept}
                        </p>
                      </div>

                      {/* Emotion driver indicator */}
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Psychological Trigger</span>
                        <div className="flex items-center gap-2 p-2 bg-red-950/20 border border-red-900/40 rounded-lg text-red-300 text-xs">
                          <Flame size={14} className="text-[#00FF87]" />
                          <strong>{currentScript.thumbnail.emotionTrigger}</strong>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3 CONTENT: VIRAL PACKAGE */}
              {activeTab === 'viral' && (
                <div id="marketing-preview-section" className="glass-panel p-6 rounded-2xl flex flex-col gap-6 border-slate-800 shadow-xl">
                  
                  {/* Row: TITLE DETAILS */}
                  <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-start border-b border-white/5 pb-5">
                    
                    <div className="md:col-span-7 flex flex-col gap-3.5 w-full">
                      <div className="flex justify-between items-center">
                        <div className="text-xs uppercase tracking-wider font-extrabold text-[#F2C94C] flex items-center gap-1">
                          <Tag size={12} />
                          A/B Test Viral Shorts Titles
                        </div>
                        <button 
                          onClick={() => handleCopyText(
                            `PRIMARY TITLE: ${currentScript.viralPackage.title}\n\nALT OPTIONS:\n${currentScript.viralPackage.alternativeTitles.join('\n')}`,
                            'all_titles'
                          )}
                          className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === 'all_titles' ? <Check size={12} /> : <Copy size={12} />}
                          COPY ALL TITLES
                        </button>
                      </div>

                      {/* Title display */}
                      <div className="bg-black/60 rounded-xl p-3 border border-[#F2C94C]/20 flex justify-between items-center gap-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Primary (Super-Hook)</span>
                          <span className="text-slate-100 font-bold select-text text-normal">{currentScript.viralPackage.title}</span>
                        </div>
                        <button 
                          onClick={() => handleCopyText(currentScript.viralPackage.title, 'primary_title')}
                          className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded block shrink-0 cursor-pointer"
                          title="Copy first title only"
                        >
                          {copiedSection === 'primary_title' ? <Check size={14} className="text-[#00FF87]" /> : <Copy size={14} />}
                        </button>
                      </div>

                      {/* Alternatives */}
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">5 High CTR Alternative Titles</span>
                        <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto">
                          {currentScript.viralPackage.alternativeTitles.map((altTitle, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-slate-900/40 p-2 rounded-lg border border-white/5 text-xs hover:border-slate-700 transition-colors">
                              <span className="text-slate-300 font-light select-text flex items-center gap-2">
                                <span className="font-mono text-[9px] text-[#F2C94C] bg-[#F2C94C]/10 px-1 py-0.5 rounded">Option {idx + 1}</span>
                                {altTitle}
                              </span>
                              <button 
                                onClick={() => handleCopyText(altTitle, `title_alt_${idx}`)}
                                className="text-slate-500 hover:text-white p-0.5 cursor-pointer"
                              >
                                {copiedSection === `title_alt_${idx}` ? <Check size={12} className="text-[#00FF87]" /> : <Copy size={12} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SEO Description details (5 cols) */}
                    <div className="md:col-span-5 flex flex-col gap-3 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-[#00FF87] block">
                          SEO Description Text
                        </span>
                        <button 
                          onClick={() => handleCopyText(currentScript.viralPackage.seoDescription, 'seo_desc')}
                          className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === 'seo_desc' ? <Check size={12} /> : <Copy size={12} />}
                          COPY DESCRIPTION
                        </button>
                      </div>

                      <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 flex flex-col gap-1 text-xs">
                        <p className="text-slate-300 leading-relaxed font-light italic select-text">
                          {currentScript.viralPackage.seoDescription}
                        </p>
                        <span className="text-[9px] text-slate-500 text-right mt-1 font-mono uppercase">
                          Search algorithm friendly structure
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* BOTTOM: TAGS AND KEYWORDS CONTAINER */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Hasthtags */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          🔥 Exactly 20 Hashtags
                        </span>
                        <button 
                          onClick={() => handleCopyText(currentScript.viralPackage.hashtags.join(' '), 'viral_hashtags')}
                          className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === 'viral_hashtags' ? <Check size={12} /> : <Copy size={12} />}
                          COPY ALL TAGS
                        </button>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 max-h-[175px] overflow-y-auto">
                        <div className="flex flex-wrap gap-1.5">
                          {currentScript.viralPackage.hashtags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              onClick={() => handleCopyText(tag, `tag_${tagIndex}`)}
                              className="text-[11px] font-mono text-[#00FF87] hover:text-[#fff] bg-[#00FF87]/5 hover:bg-[#00FF87]/15 border border-[#00FF87]/10 rounded px-2 py-0.5 cursor-pointer transition-all"
                              title="Click to copy this hashtag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SEO Key phrases */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          📊 Exactly 20 SEO Tag Keywords
                        </span>
                        <button 
                          onClick={() => handleCopyText(currentScript.viralPackage.seoKeywords.join(', '), 'viral_keywords')}
                          className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === 'viral_keywords' ? <Check size={12} /> : <Copy size={12} />}
                          COPY KEYWORDS
                        </button>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 max-h-[175px] overflow-y-auto">
                        <div className="flex flex-wrap gap-1.5">
                          {currentScript.viralPackage.seoKeywords.map((keyword, kwIndex) => (
                            <span 
                              key={kwIndex}
                              onClick={() => handleCopyText(keyword, `kw_${kwIndex}`)}
                              className="text-[11px] font-sans text-[#F2C94C] hover:text-[#fff] bg-[#F2C94C]/5 hover:bg-[#F2C94C]/15 border border-[#F2C94C]/10 rounded px-2 py-0.5 cursor-pointer transition-all"
                              title="Click to copy this precise tag keyword"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 4 CONTENT: ENGAGEMENT HOOKS */}
              {activeTab === 'hooks' && (
                <div id="hooks-preview-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Opening alternative hooks */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-slate-800 shadow-xl">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1.5 font-display text-lg uppercase tracking-tight text-white">
                        <Zap size={15} className="text-[#00FF87]" />
                        # 5 Alternative Opening Hooks
                      </div>
                      
                      <button 
                        onClick={() => handleCopyText(
                          currentScript.engagementHooks.openingHooks.map((h, i) => `${i+1}. ${h}`).join('\n'),
                          'alternate_openers'
                        )}
                        className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'alternate_openers' ? <Check size={12} /> : <Copy size={12} />}
                        COPY OPENERS
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      Swap the first sentence of your script with one of these high energy openers to test algorithm audience retention variations.
                    </p>

                    <div className="flex flex-col gap-2">
                      {currentScript.engagementHooks.openingHooks.map((h, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleCopyText(h, `opener_${idx}`)}
                          className="group p-3 rounded-lg border border-white/5 bg-slate-900/40 hover:bg-[#00FF87]/5 hover:border-[#00FF87]/30 transition-all text-xs flex justify-between gap-3 cursor-pointer items-center"
                        >
                          <span className="text-slate-200 font-light flex gap-2 select-text">
                            <span className="text-[#00FF87] font-mono font-extrabold shrink-0">#{idx + 1}</span>
                            "{h}"
                          </span>
                          <span className="text-slate-500 group-hover:text-white shrink-0">
                            {copiedSection === `opener_${idx}` ? <Check size={13} className="text-[#00FF87]" /> : <Copy size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: End alternative CTAs */}
                  <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-slate-800 shadow-xl">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <div className="flex items-center gap-1.5 font-display text-lg uppercase tracking-tight text-white">
                        <Flame size={15} className="text-[#F2C94C]" />
                        # 5 Alternative End CTAs
                      </div>
                      
                      <button 
                        onClick={() => handleCopyText(
                          currentScript.engagementHooks.endCtas.map((c, i) => `${i+1}. ${c}`).join('\n'),
                          'alternate_ctas'
                        )}
                        className="text-[10px] text-slate-400 hover:text-white uppercase font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === 'alternate_ctas' ? <Check size={12} /> : <Copy size={12} />}
                        COPY CTAs
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">
                      Tweak the final sentence of your content to maximize distinct psychological metrics: likes, comments debates, or shares.
                    </p>

                    <div className="flex flex-col gap-2">
                      {currentScript.engagementHooks.endCtas.map((c, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleCopyText(c, `cta_${idx}`)}
                          className="group p-3 rounded-lg border border-white/5 bg-slate-900/40 hover:bg-[#F2C94C]/5 hover:border-[#F2C94C]/30 transition-all text-xs flex justify-between gap-3 cursor-pointer items-center"
                        >
                          <span className="text-slate-200 font-light flex gap-2 select-text">
                            <span className="text-[#F2C94C] font-mono font-extrabold shrink-0">#{idx + 1}</span>
                            "{c}"
                          </span>
                          <span className="text-slate-500 group-hover:text-white shrink-0">
                            {copiedSection === `cta_${idx}` ? <Check size={13} className="text-[#F2C94C]" /> : <Copy size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* DASHBOARD SINGLE OUTLINE PRINT VIEW-ONLY AREA */}
              <div className="print-only hidden font-serif p-8 bg-white text-black text-sm leading-relaxed tracking-normal">
                <div className="border-b-2 border-dashed border-black pb-4 mb-6">
                  <h1 className="text-3xl font-bold uppercase">FIFA 2026 WORLD CUP SHORTS SCRIPT</h1>
                  <p className="text-xs uppercase font-mono mt-1">Topic: {currentScript.topic} | Style: {currentScript.style} | Tone: {currentScript.tone} | Language: {currentScript.language}</p>
                  <p className="text-xs font-mono">Calibrated duration target: {currentScript.duration} | Generated on: {currentScript.timestamp}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold uppercase underline mb-2">I. FULL VOICEOVER COOP AUDIO SCRIPT</h2>
                  <div className="p-4 bg-gray-50 border border-gray-300 italic text-base leading-relaxed text-black font-light leading-relaxed select-text whitespace-pre-wrap">
                    {currentScript.scriptText}
                  </div>
                </div>

                <div className="mb-6 page-break-before">
                  <h2 className="text-lg font-bold uppercase underline mb-2">II. VISUAL SCENE DIRECTION BREAKDOWN</h2>
                  <table className="w-full text-xs text-left border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 uppercase border-b border-gray-300 font-mono">
                        <th className="p-2 border border-gray-300 w-24">Timing</th>
                        <th className="p-2 border border-gray-300">Visual Suggestion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentScript.visualBreakdown.map((item, index) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="p-2 border border-gray-300 font-bold">{item.timeRange}</td>
                          <td className="p-2 border border-gray-300 italic">{item.suggestion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase underline mb-1">III. ALT HOOKS (BEGINNING)</h3>
                    <ul className="list-decimal list-inside text-xs space-y-1">
                      {currentScript.engagementHooks.openingHooks.map((h, i) => (
                        <li key={i}>"{h}"</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase underline mb-1">IV. ALT END CTAS</h3>
                    <ul className="list-decimal list-inside text-xs space-y-1">
                      {currentScript.engagementHooks.endCtas.map((c, i) => (
                        <li key={i}>"{c}"</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold uppercase underline mb-1">V. VIRAL PACKAGING</h2>
                  <p className="text-xs"><strong>Primary Video Title:</strong> {currentScript.viralPackage.title}</p>
                  <p className="text-xs"><strong>Thumbnail Text:</strong> {currentScript.thumbnail.text}</p>
                  <p className="text-xs mt-1"><strong>Hashtags:</strong> {currentScript.viralPackage.hashtags.join(' ')}</p>
                  <p className="text-xs"><strong>SEO Keywords:</strong> {currentScript.viralPackage.seoKeywords.join(', ')}</p>
                </div>
              </div>

            </div>
          )}

        </section>

      </main>

      {/* FOOTER AREA */}
      <footer className="no-print relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
        <div>
          <p>&copy; 2026 FIFA 2026 Shorts Generator Engine. DeepMind Antigravity framework built.</p>
        </div>
        <div className="flex gap-4">
          <span>System status: Online</span>
          <span>•</span>
          <span>Zone: UTC Global Deployment</span>
        </div>
      </footer>
      
    </div>
  );
}
