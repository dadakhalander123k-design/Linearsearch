import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Check,
  Tv,
  List
} from 'lucide-react';
import { VIDEO_LESSONS } from '../../data/videoData';
import { VideoLesson, UserProgressState, SectionId } from '../../types';
import { sound } from '../../audio/soundEngine';

interface VideoSectionProps {
  progress: UserProgressState;
  onCompleteVideo: (videoId: number) => void;
  onNavigate: (section: SectionId) => void;
}

export function VideoSection({
  progress,
  onCompleteVideo,
  onNavigate,
}: VideoSectionProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<number>(1);
  const video = VIDEO_LESSONS.find(v => v.id === selectedVideoId) || VIDEO_LESSONS[0];
  const isVideoCompleted = progress.completedVideos.includes(video.id);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Determine active chapter based on current time
  const activeChapterIndex = video.chapters.reduce((acc, chap, idx) => {
    return currentTime >= chap.time ? idx : acc;
  }, 0);
  const activeChapter = video.chapters[activeChapterIndex] || video.chapters[0];

  // Play / Pause toggle
  const togglePlay = () => {
    sound.playClick();
    setIsPlaying(prev => !prev);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(Math.min(video.durationSeconds, Math.max(0, time)));
  };

  const handleSkip = (seconds: number) => {
    sound.playClick();
    handleSeek(currentTime + seconds);
  };

  // Timer loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25 * playbackSpeed;
          if (next >= video.durationSeconds) {
            setIsPlaying(false);
            // Completed!
            onCompleteVideo(video.id);
            return video.durationSeconds;
          }
          // Watch >= 90% rule
          if (next / video.durationSeconds >= 0.90) {
            onCompleteVideo(video.id);
          }
          return next;
        });
      }, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, video, onCompleteVideo]);

  // Reset playback on video change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [selectedVideoId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'j') {
        e.preventDefault();
        handleSkip(-10);
      } else if (e.key === 'l') {
        e.preventDefault();
        handleSkip(10);
      } else if (e.key === 'f') {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTime]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (currentTime / video.durationSeconds) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 text-[#4F46F5] dark:text-[#A58FFF] border border-[#4F46F5]/20 dark:border-[#6C4CFF]/30">
              Interactive Video Classroom
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {progress.completedVideos.length}/2 Lessons Completed
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#11182D] dark:text-[#F5F7FF] mt-1">
            {video.title}
          </h2>
        </div>

        {isVideoCompleted && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Watched & Completed</span>
          </div>
        )}
      </div>

      {/* Video Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {VIDEO_LESSONS.map((v) => {
          const isDone = progress.completedVideos.includes(v.id);
          const isCurrent = v.id === selectedVideoId;
          return (
            <button
              key={v.id}
              onClick={() => {
                sound.playClick();
                setSelectedVideoId(v.id);
              }}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                isCurrent
                  ? 'bg-[#4F46F5] dark:bg-[#6C4CFF] text-white border-[#4F46F5] dark:border-[#6C4CFF] shadow-md'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-[#0B1025] border-[#E1E7F0] dark:border-[#25204B] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#111633]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isCurrent ? 'bg-white/20' : 'bg-slate-100 dark:bg-[#111633]'}`}>
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold truncate">{v.title}</h4>
                  <span className={`text-xs ${isCurrent ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    Duration: {v.durationLabel}
                  </span>
                </div>
              </div>
              {isDone && <Check className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />}
            </button>
          );
        })}
      </div>

      {/* Interactive Video Player Stage */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
        }`}
      >
        {/* Animated Presentation Screen */}
        <div className="relative aspect-video w-full flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
          {/* Top Stage Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs">
                Lesson {video.id}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-300">
                {activeChapter.title}
              </span>
            </div>
            <span className="font-mono text-xs text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
              {formatTime(currentTime)} / {formatTime(video.durationSeconds)}
            </span>
          </div>

          {/* Center Visualized Array Lecture Engine */}
          <div className="my-auto py-4 space-y-6 flex flex-col items-center justify-center">
            {activeChapter.visualState && (
              <div className="space-y-4 text-center max-w-xl">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs font-mono text-slate-400">Target:</span>
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-extrabold text-sm rounded-lg">
                    {activeChapter.visualState.target}
                  </span>
                </div>

                {/* Animated visual array */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {activeChapter.visualState.array.map((num, idx) => {
                    const isCur = idx === activeChapter.visualState?.currentIndex;
                    const isFound = isCur && activeChapter.visualState?.status === 'found';
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center font-mono font-extrabold text-base sm:text-lg border-2 transition-all ${
                            isFound
                              ? 'bg-emerald-600/40 border-emerald-400 text-emerald-300 scale-110 shadow-lg shadow-emerald-950'
                              : isCur
                              ? 'bg-indigo-600/40 border-amber-400 text-amber-300 scale-105 ring-2 ring-amber-400'
                              : 'bg-slate-900 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="text-[9px] text-slate-400 font-sans">idx {idx}</span>
                          <span>{num}</span>
                        </div>
                        {isCur && <span className="text-amber-400 font-bold text-xs">▲</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Active message */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-mono text-slate-200 shadow-sm">
                  {activeChapter.visualState.message}
                </div>
              </div>
            )}
          </div>

          {/* Chapter Description Bubble */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xs text-xs text-slate-300 text-center">
            {activeChapter.description}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="p-4 bg-slate-900/95 border-t border-slate-800 space-y-3">
          {/* Progress scrubber */}
          <div className="relative group cursor-pointer">
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={video.durationSeconds}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
              aria-label="Video scrubber timeline"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Left controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-sm"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => handleSkip(-10)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Rewind 10 seconds (J)"
                aria-label="Rewind 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSkip(10)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Forward 10 seconds (L)"
                aria-label="Forward 10s"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-slate-400 ml-2">
                {formatTime(currentTime)} / {formatTime(video.durationSeconds)}
              </span>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Playback speed selector */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl">
                {[0.5, 1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      sound.playClick();
                      setPlaybackSpeed(spd);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                      playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Fullscreen toggle */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsFullscreen(!isFullscreen);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Toggle Fullscreen (F)"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters & Topics Covered List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chapters */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#11182D] dark:text-[#F5F7FF] flex items-center gap-2">
            <List className="w-4 h-4 text-[#4F46F5] dark:text-[#A58FFF]" />
            Lesson Chapters ({video.chapters.length})
          </h3>
          <div className="space-y-2">
            {video.chapters.map((chap, idx) => {
               const isChapActive = idx === activeChapterIndex;
               return (
                 <button
                   key={idx}
                   onClick={() => {
                     sound.playClick();
                     handleSeek(chap.time);
                   }}
                   className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                     isChapActive
                       ? 'bg-[#EEF2FF] dark:bg-[#6C4CFF]/20 border-[#4F46F5]/40 dark:border-[#6C4CFF]/50 text-[#4F46F5] dark:text-[#A58FFF] font-semibold'
                       : 'bg-[#F8FAFC] dark:bg-[#111633] border-[#E1E7F0] dark:border-[#25204B] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#191F44]'
                   }`}
                 >
                   <div className="flex items-center gap-3">
                     <span className="font-mono text-xs font-bold text-[#4F46F5] dark:text-[#A58FFF]">
                       {formatTime(chap.time)}
                     </span>
                     <span className="text-xs truncate">{chap.title}</span>
                   </div>
                   {isChapActive && <span className="text-[10px] uppercase font-bold text-[#4F46F5] dark:text-[#A58FFF]">Now Playing</span>}
                 </button>
               );
             })}
          </div>
        </div>

        {/* Topics Covered */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1025] border border-[#E1E7F0] dark:border-[#25204B] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#11182D] dark:text-[#F5F7FF] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#4F46F5] dark:text-[#A58FFF]" />
            Topics Covered in This Lesson
          </h3>
          <div className="space-y-2">
            {video.topicsCovered.map((topic, tIdx) => (
              <div
                key={tIdx}
                className="p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#111633] border border-[#E1E7F0] dark:border-[#25204B] text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
