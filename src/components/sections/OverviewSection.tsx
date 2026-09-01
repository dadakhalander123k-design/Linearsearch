import { 
  Search, 
  Target, 
  Sigma, 
  Puzzle, 
  Lightbulb, 
  Key, 
  ListFilter, 
  Check, 
  Flag, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Code, 
  Star, 
  Zap, 
  Folder, 
  Globe2, 
  ArrowRight
} from 'lucide-react';
import { OVERVIEW_DATA } from '../../data/overviewData';
import { SectionId } from '../../types';
import { sound } from '../../audio/soundEngine';

interface OverviewSectionProps {
  onNavigate: (section: SectionId) => void;
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const { hero, mainIdea, roadmap, whyItMatters, readyToStart } = OVERVIEW_DATA;

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION CARD: LINEAR SEARCH FUNDAMENTALS
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] p-6 sm:p-8 md:p-10 shadow-sm transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Title Area */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46F5] dark:text-[#6C4CFF]">
              {hero.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#11182D] dark:text-[#F5F7FF] leading-[1.15]">
              {hero.titleLine1}
              <br />
              {hero.titleLine2}
            </h1>

            <p className="text-[#506080] dark:text-[#AAB6D1] text-xs sm:text-sm leading-relaxed max-w-md pt-1">
              {hero.description}
            </p>
          </div>

          {/* Right Array Visualization Area */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm sm:max-w-md space-y-2">
              
              {/* Search Icon & Curved Dashed Pointer pointing to element 9 (index 3) */}
              <div className="relative h-14 sm:h-16 w-full flex items-center justify-end pr-14 sm:pr-20">
                {/* Search Magnifying Glass badge */}
                <div className="w-10 h-10 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shadow-xs z-10">
                  <Search className="w-5 h-5" />
                </div>

                {/* SVG Curved Dashed Path pointing down to index 3 */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none text-[#4F46F5] dark:text-[#6C4CFF]"
                  viewBox="0 0 320 60"
                  fill="none"
                >
                  <path 
                    d="M 235 22 H 182 Q 182 35 182 48" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeDasharray="4 3" 
                  />
                  {/* Arrowhead */}
                  <path 
                    d="M 178 44 L 182 50 L 186 44" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>

              {/* 6 Array Cells */}
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {hero.array.map((item) => (
                  <div key={item.index} className="flex flex-col items-center">
                    <div
                      className={`w-full aspect-square rounded-xl flex items-center justify-center font-bold text-base sm:text-lg transition-all ${
                        item.isTarget
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                          : 'bg-[#F1F4F9] dark:bg-[#0D132C] border border-[#E1E7F0] dark:border-[#25204B] text-[#11182D] dark:text-[#F5F7FF]'
                      }`}
                    >
                      {item.value}
                    </div>
                    <span 
                      className={`text-xs font-bold mt-2 ${
                        item.isTarget
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-[#8290A8] dark:text-[#7885A5]'
                      }`}
                    >
                      {item.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Highlight Cards inside the Hero card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#E1E7F0] dark:border-[#25204B]">
          {/* Card 1: Core Idea */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm">
                {hero.features[0].title}
              </h3>
              <p className="text-xs text-[#506080] dark:text-[#AAB6D1] leading-relaxed mt-0.5">
                {hero.features[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: Key Formula */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs font-bold text-xl">
              <Sigma className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm">
                {hero.features[1].title}
              </h3>
              <p className="text-xs text-[#506080] dark:text-[#AAB6D1] leading-relaxed mt-0.5">
                {hero.features[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Main Challenge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs">
              <Puzzle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm">
                {hero.features[2].title}
              </h3>
              <p className="text-xs text-[#506080] dark:text-[#AAB6D1] leading-relaxed mt-0.5">
                {hero.features[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: 1. THE MAIN IDEA
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] p-6 sm:p-8 shadow-sm transition-colors space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#11182D] dark:text-[#F5F7FF] tracking-tight">
            {mainIdea.title}
          </h2>
        </div>

        {/* Section Content: Left Explainer + Right Step Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Explainer */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-[#4F46F5] dark:text-[#6C4CFF]">
              {mainIdea.question}
            </h3>
            <p className="text-xs sm:text-sm text-[#506080] dark:text-[#AAB6D1] leading-relaxed">
              {mainIdea.description}
            </p>
          </div>

          {/* Right Steps Flow Container */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 items-start relative">
              
              {/* Step 1: Start */}
              <div className="flex flex-col items-center text-center space-y-1.5 relative">
                <div className="w-12 h-12 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shadow-xs">
                  <Key className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#11182D] dark:text-[#F5F7FF]">
                  {mainIdea.steps[0].title}
                </h4>
                <p className="text-[11px] text-[#506080] dark:text-[#AAB6D1] leading-snug">
                  {mainIdea.steps[0].description}
                </p>
              </div>

              {/* Step 2: Compare */}
              <div className="flex flex-col items-center text-center space-y-1.5 relative">
                <div className="w-12 h-12 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shadow-xs">
                  <ListFilter className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#11182D] dark:text-[#F5F7FF]">
                  {mainIdea.steps[1].title}
                </h4>
                <p className="text-[11px] text-[#506080] dark:text-[#AAB6D1] leading-snug">
                  {mainIdea.steps[1].description}
                </p>
              </div>

              {/* Step 3: Match? */}
              <div className="flex flex-col items-center text-center space-y-1.5 relative">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#11182D] dark:text-[#F5F7FF]">
                  {mainIdea.steps[2].title}
                </h4>
                <p className="text-[11px] text-[#506080] dark:text-[#AAB6D1] leading-snug">
                  {mainIdea.steps[2].description}
                </p>
              </div>

              {/* Step 4: Result */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shadow-xs">
                  <Flag className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#11182D] dark:text-[#F5F7FF]">
                  {mainIdea.steps[3].title}
                </h4>
                <p className="text-[11px] text-[#506080] dark:text-[#AAB6D1] leading-snug">
                  {mainIdea.steps[3].description}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: 2. CONCEPT ROADMAP
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] p-6 sm:p-8 shadow-sm transition-colors space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#11182D] dark:text-[#F5F7FF] tracking-tight">
            {roadmap.title}
          </h2>
        </div>

        {/* 5 Milestone Roadmap: Desktop Horizontal vs Mobile Vertical Connected */}
        {/* DESKTOP / TABLET ROADMAP (sm and above) */}
        <div className="hidden sm:block relative pt-2 pb-2">
          {/* Connector Line behind badges */}
          <div className="absolute top-[22px] left-[10%] right-[10%] border-t-2 border-dashed border-[#DCE3EF] dark:border-[#38306E] z-0 pointer-events-none" />

          <div className="grid grid-cols-5 gap-3 relative z-10">
            {roadmap.steps.map((step, idx) => (
              <div 
                key={step.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate('learn');
                }}
                className="flex flex-col items-center text-center space-y-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {step.number}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F1F4F9] dark:bg-[#0D132C] text-[#4F46F5] dark:text-[#6C4CFF] flex items-center justify-center group-hover:bg-[#EEF0FF] dark:group-hover:bg-[rgba(108,76,255,0.25)] transition-colors">
                  {idx === 0 && <Search className="w-5 h-5" />}
                  {idx === 1 && <ListFilter className="w-5 h-5" />}
                  {idx === 2 && <Clock className="w-5 h-5" />}
                  {idx === 3 && <TrendingUp className="w-5 h-5" />}
                  {idx === 4 && <Code className="w-5 h-5" />}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#11182D] dark:text-[#F5F7FF] leading-tight px-1 group-hover:text-[#4F46F5] dark:group-hover:text-[#6C4CFF] transition-colors">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERTICAL CONNECTED ROADMAP (sm:hidden - REFERENCE IMAGE 2) */}
        <div className="sm:hidden flex flex-col items-center justify-center py-2">
          {roadmap.steps.map((step, sIdx) => {
            const isLast = sIdx === roadmap.steps.length - 1;
            return (
              <div key={step.id} className="flex flex-col items-center w-full max-w-xs">
                {/* Clickable Step Unit */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    onNavigate('learn');
                  }}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-hidden"
                >
                  {/* 1. Number Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] font-mono font-bold text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {step.number}
                  </div>

                  {/* 2. Thin Vertical Connector (Number to Icon) */}
                  <div className="w-0.5 h-3 bg-[#DCE3EF] dark:bg-[#38306E] my-0.5" />

                  {/* 3. Concept Icon Container */}
                  <div className="w-12 h-12 rounded-full bg-[#F1F4F9] dark:bg-[#0D132C] border border-[#E1E7F0] dark:border-[#25204B] text-[#4F46F5] dark:text-[#6C4CFF] flex items-center justify-center shadow-xs group-hover:bg-[#EEF0FF] dark:group-hover:bg-[rgba(108,76,255,0.25)] transition-colors">
                    {step.iconType === 'search' && <Search className="w-5 h-5" />}
                    {step.iconType === 'algorithm' && <ListFilter className="w-5 h-5" />}
                    {step.iconType === 'time' && <Clock className="w-5 h-5" />}
                    {step.iconType === 'cases' && <TrendingUp className="w-5 h-5" />}
                    {step.iconType === 'code' && <Code className="w-5 h-5" />}
                  </div>

                  {/* 4. Concept Title */}
                  <span className="text-xs font-bold text-[#11182D] dark:text-[#F5F7FF] leading-snug px-2 mt-2 max-w-[200px] text-center group-hover:text-[#4F46F5] dark:group-hover:text-[#6C4CFF] transition-colors">
                    {step.title}
                  </span>
                </button>

                {/* 5. Thin Vertical Connector to Next Step */}
                {!isLast && (
                  <div className="w-0.5 h-7 bg-[#DCE3EF] dark:bg-[#38306E] my-1.5" />
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: 3. WHY THIS TOPIC MATTERS
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] p-6 sm:p-8 shadow-sm transition-colors space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] dark:bg-[rgba(108,76,255,0.18)] border border-[#DCE3EF] dark:border-[#38306E] text-[#4F46F5] dark:text-[#F5F7FF] flex items-center justify-center shrink-0 shadow-xs">
            <Star className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#11182D] dark:text-[#F5F7FF] tracking-tight">
            {whyItMatters.title}
          </h2>
        </div>

        {/* 3 Color-Tinted Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 1: Simple & Easy */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex flex-col justify-start space-y-3">
            <div className="w-11 h-11 rounded-full bg-[#4F46F5] dark:bg-[#6C4CFF] text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm sm:text-base">
                {whyItMatters.cards[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#506080] dark:text-[#AAB6D1] mt-1 leading-relaxed">
                {whyItMatters.cards[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: No Extra Space */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex flex-col justify-start space-y-3">
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm sm:text-base">
                {whyItMatters.cards[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#506080] dark:text-[#AAB6D1] mt-1 leading-relaxed">
                {whyItMatters.cards[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Real-World Use */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F4F9]/70 dark:bg-[#0D132C]/70 border border-[#E1E7F0] dark:border-[#25204B] flex flex-col justify-start space-y-3">
            <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#11182D] dark:text-[#F5F7FF] text-sm sm:text-base">
                {whyItMatters.cards[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#506080] dark:text-[#AAB6D1] mt-1 leading-relaxed">
                {whyItMatters.cards[2].description}
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: 4. READY TO START?
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0B1025] rounded-3xl border border-[#E1E7F0] dark:border-[#25204B] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors overflow-hidden">
        
        {/* Left Side: 3D Rocket Visual & Text */}
        <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
          {/* 3D Cute Cartoon Rocket Illustration */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 filter drop-shadow-md"
              viewBox="0 0 160 145"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D White Fuselage Gradient */}
                <linearGradient id="fuselage3D" x1="-15" y1="-30" x2="15" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>

                {/* Fuselage Right/Bottom Curvature Shadow */}
                <linearGradient id="fuselageShadow" x1="0" y1="0" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0" />
                  <stop offset="100%" stopColor="#64748B" stopOpacity="0.45" />
                </linearGradient>

                {/* Purple Nosecone Gradient */}
                <linearGradient id="noseconeGrad" x1="-10" y1="-42" x2="12" y2="-20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="45%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </linearGradient>

                {/* Left Fin Purple Gradient */}
                <linearGradient id="leftFinGrad" x1="-28" y1="0" x2="-10" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="55%" stopColor="#5B21B6" />
                  <stop offset="100%" stopColor="#3B0764" />
                </linearGradient>

                {/* Right Fin Purple Gradient */}
                <linearGradient id="rightFinGrad" x1="10" y1="0" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="60%" stopColor="#4C1D95" />
                  <stop offset="100%" stopColor="#2E1065" />
                </linearGradient>

                {/* Dorsal Spine Purple */}
                <linearGradient id="spineGrad" x1="-2" y1="8" x2="2" y2="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="60%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </linearGradient>

                {/* Window Outer Ring */}
                <linearGradient id="windowOuter" x1="-10" y1="-14" x2="10" y2="6" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F5F3FF" />
                  <stop offset="50%" stopColor="#DDD6FE" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>

                {/* Window Inner Glass */}
                <radialGradient id="windowGlassGrad" cx="-2" cy="-6" r="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </radialGradient>

                {/* Outer Flame Gradient */}
                <linearGradient id="flameOuter" x1="0" y1="30" x2="0" y2="58" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="40%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>

                {/* Inner Flame */}
                <linearGradient id="flameInner" x1="0" y1="30" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>

                {/* Exhaust Light Trail */}
                <linearGradient id="launchGlow" x1="75" y1="80" x2="35" y2="125" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FDBA74" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFEDD5" stopOpacity="0" />
                </linearGradient>

                {/* Cloud Shading Gradients */}
                <radialGradient id="cloudGrad1" cx="30" cy="115" r="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.85" />
                </radialGradient>
                <radialGradient id="cloudGrad2" cx="54" cy="120" r="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.8" />
                </radialGradient>
                <radialGradient id="cloudGrad3" cx="76" cy="118" r="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.8" />
                </radialGradient>
              </defs>

              {/* ─── LAYER 1: Launch Light Glow into Cloud Base ─── */}
              <path
                d="M 68 76 L 24 116 L 50 140 L 86 96 Z"
                fill="url(#launchGlow)"
              />

              {/* ─── LAYER 2: Fluffy 3D Cloud Cluster (Lower-Left Base) ─── */}
              <circle cx="24" cy="122" r="16" fill="url(#cloudGrad1)" />
              <circle cx="44" cy="124" r="17" fill="url(#cloudGrad2)" />
              <circle cx="66" cy="125" r="16" fill="url(#cloudGrad3)" />
              <circle cx="86" cy="122" r="13" fill="url(#cloudGrad3)" />
              <circle cx="34" cy="110" r="13" fill="#FFFFFF" />
              <circle cx="54" cy="112" r="14" fill="#FFFFFF" />
              <circle cx="72" cy="110" r="12" fill="#FFFFFF" />

              {/* ─── LAYER 3: Dominant Rocket (Angled 45° to Upper-Right) ─── */}
              <g transform="translate(96, 54) rotate(45)">
                {/* 1. Flame Jet */}
                <path
                  d="M -7 30 Q -10 46 0 58 Q 10 46 7 30 Z"
                  fill="url(#flameOuter)"
                />
                <path
                  d="M -4 30 Q -5 42 0 49 Q 5 42 4 30 Z"
                  fill="url(#flameInner)"
                />

                {/* 2. Left Curved Purple Wing */}
                <path
                  d="M -13 0 C -26 0 -30 14 -25 24 C -20 26 -14 20 -11 14 Z"
                  fill="url(#leftFinGrad)"
                />
                <path
                  d="M -13 1 C -23 1 -27 10 -24 19 C -21 13 -17 7 -12 3 Z"
                  fill="#A78BFA"
                  fillOpacity="0.65"
                />

                {/* 3. Right Curved Purple Wing */}
                <path
                  d="M 13 0 C 26 0 30 14 25 24 C 20 26 14 20 11 14 Z"
                  fill="url(#rightFinGrad)"
                />

                {/* 4. Red Engine Base Collar */}
                <rect x="-10" y="24" width="20" height="7" rx="3.5" fill="#EF4444" />
                <rect x="-8.5" y="25" width="17" height="3" rx="1.5" fill="#F87171" />

                {/* 5. Smooth White Aerodynamic Fuselage Body */}
                <path
                  d="M 0 -42 C -14 -28 -17 -4 -13 25 C -7 27 7 27 13 25 C 17 -4 14 -28 0 -42 Z"
                  fill="url(#fuselage3D)"
                />

                {/* Fuselage 3D Right Side Shade */}
                <path
                  d="M 0 -42 C 14 -28 17 -4 13 25 C 7 27 0 26 0 26 C 5 5 7 -18 0 -42 Z"
                  fill="url(#fuselageShadow)"
                />

                {/* 6. Purple Nosecone */}
                <path
                  d="M 0 -42 C -6 -35 -11 -28 -12 -23 C -4 -20 4 -20 12 -23 C 11 -28 6 -35 0 -42 Z"
                  fill="url(#noseconeGrad)"
                />
                {/* Nosecone Specular Highlight */}
                <path
                  d="M 0 -41 C -4 -36 -7 -30 -8 -27 C -4 -25 0 -25 3 -27 C 2 -30 0 -36 0 -41 Z"
                  fill="#DDD6FE"
                  fillOpacity="0.45"
                />

                {/* 7. Center Dorsal Purple Spine/Fin (Below Window) */}
                <path
                  d="M -2 7 C -2 4.5 2 4.5 2 7 L 2.5 24 C 2.5 25.5 -2.5 25.5 -2.5 24 Z"
                  fill="url(#spineGrad)"
                />
                <ellipse cx="0" cy="7" rx="2" ry="1.5" fill="#A78BFA" />

                {/* 8. Circular 3D Porthole Window */}
                {/* Outer Lavender Bezel Ring */}
                <circle cx="0" cy="-6" r="10.5" fill="url(#windowOuter)" />
                {/* Inner Deep Saturated Purple Glass */}
                <circle cx="0" cy="-6" r="7.5" fill="url(#windowGlassGrad)" />
                {/* Glossy White Specular Glare Dot */}
                <circle cx="-2.5" cy="-8.5" r="2.2" fill="#FFFFFF" />
                <circle cx="2.5" cy="-3.5" r="1" fill="#FFFFFF" fillOpacity="0.6" />
              </g>

              {/* ─── LAYER 4: Soft Lower Smoke Puffs (Only below the flame) ─── */}
              <circle cx="16" cy="130" r="12" fill="url(#cloudGrad1)" />
              <circle cx="34" cy="134" r="13" fill="#FFFFFF" />
              <circle cx="56" cy="135" r="13" fill="#FFFFFF" />
              <circle cx="78" cy="132" r="11" fill="url(#cloudGrad3)" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#11182D] dark:text-[#F5F7FF] tracking-tight">
              {readyToStart.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#506080] dark:text-[#AAB6D1] max-w-md leading-relaxed">
              {readyToStart.description}
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <button
          onClick={() => {
            sound.playNavigate();
            onNavigate('learn');
          }}
          className="px-7 py-3.5 rounded-xl bg-[#4F46F5] dark:bg-[#6C4CFF] hover:bg-[#4338CA] dark:hover:bg-[#5B3FE6] active:scale-95 text-white font-extrabold text-sm shadow-md shadow-[#4F46F5]/25 flex items-center gap-2 transition shrink-0 focus:outline-hidden focus:ring-2 focus:ring-[#4F46F5]/40"
        >
          <span>{readyToStart.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </section>

    </div>
  );
}
