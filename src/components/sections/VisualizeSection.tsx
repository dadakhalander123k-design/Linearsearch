import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Rewind,
  Volume2, 
  VolumeX, 
  Volume1,
  Maximize2, 
  Minimize2, 
  Video as VideoIcon,
  FileVideo,
  Search,
  CheckCircle2
} from 'lucide-react';
import { UserProgressState } from '../../types';
import { sound } from '../../audio/soundEngine';

interface VisualizeSectionProps {
  progress?: UserProgressState;
  onCompleteVideo?: (videoId: number) => void;
}

interface LessonData {
  id: number;
  lessonNumber: string;
  title: string;
  heading: string;
  description: string;
  filename: string;
  durationSeconds: number;
  chips: string[];
  stages: {
    startTime: number;
    endTime: number;
    title: string;
    description: string;
    array: number[];
    target: number;
    currentIndex: number;
    comparisons: number;
    status: 'idle' | 'check' | 'compare' | 'found' | 'not_found' | 'summary';
    message: string;
  }[];
}

const LESSONS: LessonData[] = [
  {
    id: 1,
    lessonNumber: 'LESSON 01',
    title: 'INTRODUCTION TO LINEAR SEARCH',
    heading: 'INTRODUCTION TO LINEAR SEARCH',
    description: 'Learn the basic idea of linear search, how it checks elements sequentially, and how a target value is found in an array.',
    filename: 'introduction.mp4',
    durationSeconds: 30,
    chips: [
      'Linear Search Basics',
      'Sequential Searching',
      'Target & Array',
      'Index-by-Index Search'
    ],
    stages: [
      {
        startTime: 0,
        endTime: 6,
        title: 'Array & Target Setup',
        description: 'Searching means finding a specific target item from an ordered or unordered collection.',
        array: [12, 7, 25, 4, 18],
        target: 25,
        currentIndex: -1,
        comparisons: 0,
        status: 'idle',
        message: 'Goal: Find target value 25 in the 5-element array.'
      },
      {
        startTime: 6,
        endTime: 12,
        title: 'Step 1: Check Index 0',
        description: 'Linear Search starts at the very first element (Index 0) and inspects its value.',
        array: [12, 7, 25, 4, 18],
        target: 25,
        currentIndex: 0,
        comparisons: 1,
        status: 'compare',
        message: 'Checking Index 0: Value 12 ≠ Target 25 ❌ (Move to next element)'
      },
      {
        startTime: 12,
        endTime: 18,
        title: 'Step 2: Check Index 1',
        description: 'Move forward by one position to Index 1 and compare value 7 with target 25.',
        array: [12, 7, 25, 4, 18],
        target: 25,
        currentIndex: 1,
        comparisons: 2,
        status: 'compare',
        message: 'Checking Index 1: Value 7 ≠ Target 25 ❌ (Move to next element)'
      },
      {
        startTime: 18,
        endTime: 25,
        title: 'Step 3: Check Index 2 — Match Found!',
        description: 'At Index 2, the value is 25. The current element equals the target!',
        array: [12, 7, 25, 4, 18],
        target: 25,
        currentIndex: 2,
        comparisons: 3,
        status: 'found',
        message: 'Checking Index 2: Value 25 == Target 25 ✅ MATCH FOUND! Return Index 2.'
      },
      {
        startTime: 25,
        endTime: 30,
        title: 'Search Completed',
        description: 'Linear search stops immediately once the target is located without examining the rest of the array.',
        array: [12, 7, 25, 4, 18],
        target: 25,
        currentIndex: 2,
        comparisons: 3,
        status: 'summary',
        message: 'Success: 3 comparisons made. Target 25 successfully located at Index 2!'
      }
    ]
  },
  {
    id: 2,
    lessonNumber: 'LESSON 02',
    title: 'HOW LINEAR SEARCH WORKS',
    heading: 'HOW LINEAR SEARCH WORKS',
    description: 'Understand how linear search compares the target with each element from the beginning of the array until the target is found or the array ends.',
    filename: 'how-linear-search-works.mp4',
    durationSeconds: 30,
    chips: [
      'Search Process',
      'Step-by-Step Traversal',
      'Comparisons',
      'Found or Not Found'
    ],
    stages: [
      {
        startTime: 0,
        endTime: 5,
        title: 'Initialize Pointer at Index 0',
        description: 'Linear search begins by initializing the index pointer at the start of the list (i = 0).',
        array: [10, 25, 37, 42, 56, 73],
        target: 42,
        currentIndex: 0,
        comparisons: 1,
        status: 'compare',
        message: 'Index 0: 10 vs 42 → 10 ≠ 42 ❌ (Comparison 1)'
      },
      {
        startTime: 5,
        endTime: 11,
        title: 'Sequential Traversal: Index 1',
        description: 'Pointer advances to index 1 (i = 1). We compare array[1] with our target 42.',
        array: [10, 25, 37, 42, 56, 73],
        target: 42,
        currentIndex: 1,
        comparisons: 2,
        status: 'compare',
        message: 'Index 1: 25 vs 42 → 25 ≠ 42 ❌ (Comparison 2)'
      },
      {
        startTime: 11,
        endTime: 17,
        title: 'Sequential Traversal: Index 2',
        description: 'Pointer advances to index 2 (i = 2). We compare array[2] with our target 42.',
        array: [10, 25, 37, 42, 56, 73],
        target: 42,
        currentIndex: 2,
        comparisons: 3,
        status: 'compare',
        message: 'Index 2: 37 vs 42 → 37 ≠ 42 ❌ (Comparison 3)'
      },
      {
        startTime: 17,
        endTime: 24,
        title: 'Sequential Traversal: Index 3 — Target Found',
        description: 'Pointer advances to index 3 (i = 3). 42 matches target 42! Loop terminates.',
        array: [10, 25, 37, 42, 56, 73],
        target: 42,
        currentIndex: 3,
        comparisons: 4,
        status: 'found',
        message: 'Index 3: 42 == 42 ✅ FOUND! Target 42 is at Index 3.'
      },
      {
        startTime: 24,
        endTime: 30,
        title: 'Termination Condition & Complexity',
        description: 'If element is not found after traversing all n items, return -1 (Not Found). Linear search takes O(n) worst-case time.',
        array: [10, 25, 37, 42, 56, 73],
        target: 42,
        currentIndex: 3,
        comparisons: 4,
        status: 'summary',
        message: 'Terminated with success: 4 comparisons made out of 6 elements. Algorithm completed.'
      }
    ]
  }
];

export function VisualizeSection({ progress, onCompleteVideo }: VisualizeSectionProps = {}) {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(80);
  const [previousVolume, setPreviousVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControlsInFullscreen, setShowControlsInFullscreen] = useState<boolean>(true);
  const [feedbackToast, setFeedbackToast] = useState<{ text: string; id: number } | null>(null);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerSectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const isHoveringControlsRef = useRef<boolean>(false);
  const toastTimeoutRef = useRef<number | null>(null);

  const activeLesson = LESSONS.find(l => l.id === selectedLessonId) || LESSONS[0];

  // Find active stage based on current time
  const currentStage = activeLesson.stages.find(
    s => currentTime >= s.startTime && currentTime < s.endTime
  ) || activeLesson.stages[activeLesson.stages.length - 1];

  const showToast = useCallback((text: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setFeedbackToast({ text, id: Date.now() });
    toastTimeoutRef.current = window.setTimeout(() => {
      setFeedbackToast(null);
    }, 850);
  }, []);

  // Select lesson handler
  const handleSelectLesson = (lessonId: number, autoPlay: boolean = true) => {
    sound.playClick();
    if (selectedLessonId !== lessonId) {
      setSelectedLessonId(lessonId);
      setCurrentTime(0);
    }
    if (autoPlay) {
      setIsPlaying(true);
    }
    // Smooth scroll to player view
    if (playerSectionRef.current) {
      playerSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Playback timer tick
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 100;
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const increment = (intervalMs / 1000) * playbackSpeed;
          const next = prev + increment;
          if (next >= activeLesson.durationSeconds * 0.9 && onCompleteVideo) {
            onCompleteVideo(activeLesson.id);
          }
          if (next >= activeLesson.durationSeconds) {
            setIsPlaying(false);
            if (onCompleteVideo) {
              onCompleteVideo(activeLesson.id);
            }
            return activeLesson.durationSeconds;
          }
          return next;
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, activeLesson.durationSeconds, activeLesson.id, onCompleteVideo]);

  // Fullscreen event listener (native or escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isNativeFs);
      if (isNativeFs) {
        setShowControlsInFullscreen(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset inactivity timer for fullscreen auto-hide
  const resetInactivityTimer = useCallback(() => {
    setShowControlsInFullscreen(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (isFullscreen && !isHoveringControlsRef.current) {
      inactivityTimerRef.current = window.setTimeout(() => {
        if (!isHoveringControlsRef.current) {
          setShowControlsInFullscreen(false);
        }
      }, 2500);
    }
  }, [isFullscreen]);

  // Handle mouse move across player container in fullscreen
  const handleMouseMove = () => {
    if (isFullscreen) {
      resetInactivityTimer();
    }
  };

  const handleMouseEnterControls = () => {
    isHoveringControlsRef.current = true;
    setShowControlsInFullscreen(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  };

  const handleMouseLeaveControls = () => {
    isHoveringControlsRef.current = false;
    if (isFullscreen) {
      resetInactivityTimer();
    }
  };

  const togglePlay = useCallback(() => {
    sound.playClick();
    setCurrentTime(prev => {
      if (prev >= activeLesson.durationSeconds) {
        setIsPlaying(true);
        showToast('▶ PLAYING');
        return 0;
      }
      setIsPlaying(p => {
        const next = !p;
        showToast(next ? '▶ PLAYING' : '❚❚ PAUSED');
        return next;
      });
      return prev;
    });
    if (isFullscreen) resetInactivityTimer();
  }, [activeLesson.durationSeconds, isFullscreen, resetInactivityTimer, showToast]);

  const handleRestart = useCallback(() => {
    sound.playClick();
    setCurrentTime(0);
    showToast('↺ RESTARTED');
    if (isFullscreen) resetInactivityTimer();
  }, [isFullscreen, resetInactivityTimer, showToast]);

  const handleSeek = (time: number) => {
    const clamped = Math.max(0, Math.min(activeLesson.durationSeconds, time));
    setCurrentTime(clamped);
    if (isFullscreen) resetInactivityTimer();
  };

  const handleRewind10 = useCallback(() => {
    sound.playClick();
    setCurrentTime(prev => {
      const next = Math.max(0, prev - 10);
      showToast('↶ 10s');
      return next;
    });
    if (isFullscreen) resetInactivityTimer();
  }, [isFullscreen, resetInactivityTimer, showToast]);

  const handleForward10 = useCallback(() => {
    sound.playClick();
    setCurrentTime(prev => {
      const next = Math.min(activeLesson.durationSeconds, prev + 10);
      showToast('10s ↷');
      return next;
    });
    if (isFullscreen) resetInactivityTimer();
  }, [activeLesson.durationSeconds, isFullscreen, resetInactivityTimer, showToast]);

  const toggleMute = () => {
    sound.playClick();
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume > 0 ? previousVolume : 80);
      showToast(`🔊 ${previousVolume > 0 ? previousVolume : 80}%`);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolume(0);
      showToast('🔇 MUTED');
    }
    if (isFullscreen) resetInactivityTimer();
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }
    if (isFullscreen) resetInactivityTimer();
  };

  const toggleFullscreen = useCallback(() => {
    sound.playClick();
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.()
        .then(() => {
          setIsFullscreen(true);
          showToast('⛶ FULLSCREEN');
          resetInactivityTimer();
        })
        .catch(() => {
          setIsFullscreen(prev => !prev);
        });
    } else {
      document.exitFullscreen?.()
        .then(() => {
          setIsFullscreen(false);
          showToast('EXIT FULLSCREEN');
        })
        .catch(() => {
          setIsFullscreen(false);
        });
    }
  }, [resetInactivityTimer, showToast]);

  // Keyboard controls (J, K, L, F, Space, Home, Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'k' || e.key === 'K' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'j' || e.key === 'J' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleRewind10();
      } else if (e.key === 'l' || e.key === 'L' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleForward10();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === '0' || e.key === 'Home') {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, handleRewind10, handleForward10, toggleFullscreen, handleRestart]);

  const formatTime = (seconds: number) => {
    const totalSecs = Math.floor(seconds);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const progressPercent = Math.min(100, Math.max(0, (currentTime / activeLesson.durationSeconds) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. VISUALIZE PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Visualize Linear Search
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Watch interactive video lessons explaining the foundations and step-by-step execution of Linear Search.
        </p>
      </div>

      {/* 2. TWO VIDEO LESSON CARDS (Side-by-Side on Desktop, Stacked on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LESSONS.map((lesson) => {
          const isSelected = selectedLessonId === lesson.id;
          return (
            <div
              key={lesson.id}
              className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0F172A] border transition-all flex flex-col justify-between shadow-xs ${
                isSelected
                  ? 'border-[#4F46E5] dark:border-[#6366F1] ring-2 ring-[#4F46E5]/20 dark:ring-[#6366F1]/30 shadow-xs'
                  : 'border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] hover:border-[#CBD5E1] dark:hover:border-[rgba(129,140,248,0.35)]'
              }`}
            >
              <div className="space-y-4">
                {/* Top Row: Lesson Label, Completion Badge & Top-Right Video Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-[#4F46E5] dark:text-[#818CF8] uppercase">
                      {lesson.lessonNumber}
                    </span>
                    {progress?.completedVideos.includes(lesson.id) && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                  <div className="p-2 rounded-xl bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] text-[#4F46E5] dark:text-[#818CF8] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]">
                    <VideoIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-snug">
                  {lesson.heading}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed min-h-[48px]">
                  {lesson.description}
                </p>

                {/* Topic Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {lesson.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#F1F5F9] dark:bg-[#16203B] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Large Bottom Action Area: CLICK TO WATCH */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handleSelectLesson(lesson.id, true)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 border transition active:scale-98 cursor-pointer ${
                    isSelected && isPlaying
                      ? 'bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white border-transparent shadow-xs'
                      : 'bg-[#EEF2FF] hover:bg-[#E0E7FF] dark:bg-[rgba(99,102,241,0.18)] dark:hover:bg-[rgba(99,102,241,0.28)] text-[#4F46E5] dark:text-[#818CF8] border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)]'
                  }`}
                >
                  <Play className={`w-4 h-4 ${isSelected && isPlaying ? 'fill-white' : 'fill-[#4F46E5] dark:fill-[#818CF8]'}`} />
                  <span>{isSelected && isPlaying ? 'NOW PLAYING' : 'CLICK TO WATCH'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. VIDEO PLAYING VIEW */}
      <div ref={playerSectionRef} className="space-y-4 pt-2">
        {/* Video Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs">
          <div className="flex items-center gap-3">
            {/* Small Rounded Video Icon Container */}
            <div className="p-2.5 rounded-xl bg-[#EEF2FF] dark:bg-[rgba(99,102,241,0.18)] text-[#4F46E5] dark:text-[#818CF8] border border-[rgba(79,70,229,0.2)] dark:border-[rgba(99,102,241,0.3)] shrink-0">
              <VideoIcon className="w-5 h-5" />
            </div>

            {/* Current Lesson & Now Playing Title */}
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8] block">
                CURRENT LESSON
              </span>
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-tight mt-0.5">
                NOW PLAYING: {activeLesson.title}
              </h2>
            </div>
          </div>

          {/* Right Side Filename Status Badge */}
          <div className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] dark:text-[#94A3B8] font-mono text-xs font-semibold flex items-center gap-1.5">
            <FileVideo className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
            <span>[{activeLesson.filename}]</span>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          className={`relative overflow-hidden transition-all duration-300 ${
            isFullscreen 
              ? 'fixed inset-0 z-50 bg-[#090D1A] text-white flex flex-col justify-between h-screen w-screen p-0 m-0' 
              : 'rounded-2xl bg-[#090D1A] text-white border border-[rgba(99,102,241,0.2)] shadow-xl'
          }`}
        >
          {/* Animated Lecture Video Stage (16:9 Aspect Ratio) */}
          <div className={`relative w-full flex flex-col justify-between bg-gradient-to-b from-[#0B1025] via-[#080D20] to-[#080D20] select-none ${
            isFullscreen ? 'flex-1 h-full p-6 sm:p-12' : 'aspect-video p-4 sm:p-8 md:p-10'
          }`}>
            {/* Top Stage Overlay Header */}
            <div className="flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#4F46F5] text-white font-mono font-bold text-xs">
                  {activeLesson.lessonNumber}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-300 truncate max-w-[200px] sm:max-w-md">
                  {currentStage.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border ${
                  currentStage.status === 'found'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 animate-pulse'
                    : currentStage.status === 'compare'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                    : 'bg-[#111633] text-indigo-300 border-[#25204B]'
                }`}>
                  {currentStage.status === 'found' ? 'MATCH FOUND ✅' : currentStage.status === 'compare' ? 'COMPARING 🔍' : 'SCANNING'}
                </span>
              </div>
            </div>

            {/* Subtle Center Toast Feedback on Keyboard/Action */}
            {feedbackToast && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
                <div className="px-5 py-2.5 rounded-2xl bg-black/85 border border-white/20 text-white font-mono text-sm font-extrabold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2">
                  <span>{feedbackToast.text}</span>
                </div>
              </div>
            )}

            {/* Center Dynamic Visualized Linear Search Engine */}
            <div className="my-auto py-2 sm:py-6 flex flex-col items-center justify-center space-y-4 sm:space-y-6">
              {/* Target Indicator */}
              <div className="flex items-center gap-2 sm:gap-3 bg-[#111633] px-4 py-1.5 rounded-2xl border border-[#25204B] shadow-sm">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-mono text-slate-400">Target Value:</span>
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-mono font-extrabold text-sm rounded-lg shadow-xs">
                  {currentStage.target}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">|</span>
                <span className="text-xs font-mono text-indigo-300 hidden sm:inline">
                  Comparisons: {currentStage.comparisons}
                </span>
              </div>

              {/* Array Boxes with Index Numbers */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-full px-2">
                {currentStage.array.map((value, idx) => {
                  const isCurrent = idx === currentStage.currentIndex;
                  const isFound = isCurrent && currentStage.status === 'found';
                  const isCheckedPast = currentStage.currentIndex > idx;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-11 h-13 sm:w-16 sm:h-20 md:w-20 md:h-22 rounded-2xl flex flex-col items-center justify-center font-mono font-extrabold transition-all duration-300 border-2 ${
                          isFound
                            ? 'bg-emerald-600/40 border-emerald-400 text-emerald-300 scale-110 shadow-lg shadow-emerald-950 ring-4 ring-emerald-500/30'
                            : isCurrent
                            ? 'bg-[#4F46F5]/50 border-amber-400 text-amber-300 scale-105 shadow-md shadow-indigo-950 ring-2 ring-amber-400'
                            : isCheckedPast
                            ? 'bg-[#111633]/80 border-slate-700/80 text-slate-400 opacity-60'
                            : 'bg-[#111633] border-[#25204B] text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-sans">
                          i = {idx}
                        </span>
                        <span className="text-base sm:text-xl md:text-2xl">
                          {value}
                        </span>
                      </div>

                      {/* Pointer Indicator */}
                      <div className="h-5 flex items-center justify-center">
                        {isCurrent && (
                          <div className="flex flex-col items-center animate-bounce">
                            <span className="text-amber-400 text-xs font-bold leading-none">▲</span>
                            <span className="text-[9px] font-mono text-amber-300 leading-none">ptr</span>
                          </div>
                        )}
                        {!isCurrent && isCheckedPast && (
                          <span className="text-slate-600 text-xs font-mono">✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic State Message Box */}
              <div className="w-full max-w-xl p-3 sm:p-3.5 rounded-xl bg-[#111633]/90 border border-[#25204B] text-center shadow-lg backdrop-blur-xs">
                <p className="text-xs sm:text-sm font-mono text-slate-200 leading-snug">
                  {currentStage.message}
                </p>
              </div>
            </div>

            {/* Bottom Stage Explanation Bubble */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-xs text-xs sm:text-sm text-slate-300 text-center">
              {currentStage.description}
            </div>
          </div>

          {/* 4. FULLSCREEN VIDEO PLAYER GLASS FOOTER (LIGHT & DARK THEME GLASS OVERLAY) */}
          {isFullscreen && (
            <div
              onMouseEnter={handleMouseEnterControls}
              onMouseLeave={handleMouseLeaveControls}
              className={`absolute bottom-0 inset-x-0 p-3 sm:p-5 md:p-6 transition-all duration-300 z-40 ${
                showControlsInFullscreen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6 pointer-events-none'
              }`}
            >
              {/* Wide, compact horizontal translucent gray glass control container */}
              <div className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-slate-900/75 dark:bg-[#080D20]/80 backdrop-blur-md border border-white/15 dark:border-[#25204B] p-3 sm:p-4 md:px-6 md:py-4 shadow-2xl text-white space-y-2.5 transition-all">
                {/* Top: Progress Bar Track & Draggable Circular Thumb */}
                <div className="space-y-1">
                  <div className="relative group cursor-pointer flex items-center py-1">
                    <div className="h-1.5 w-full bg-white/20 dark:bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4F46F5] dark:bg-[#6C4CFF] rounded-full relative transition-all duration-75"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    {/* Draggable Circular Progress Handle */}
                    <div
                      className="absolute w-3.5 h-3.5 bg-[#4F46F5] dark:bg-[#6C4CFF] border-2 border-white rounded-full shadow-md transform -translate-x-1/2 pointer-events-none transition-all duration-75 group-hover:scale-125"
                      style={{ left: `${progressPercent}%` }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={activeLesson.durationSeconds}
                      step={0.1}
                      value={currentTime}
                      onChange={(e) => handleSeek(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Video scrubber timeline"
                    />
                  </div>

                  {/* Time Labels (Current Time on Left, Duration on Right) */}
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-medium text-slate-300 dark:text-slate-400 px-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(activeLesson.durationSeconds)}</span>
                  </div>
                </div>

                {/* Bottom Control Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 pt-0.5">
                  {/* LEFT CONTROL GROUP: [Replay] [▶ PLAY / Ⅱ PAUSE] [Forward] */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Replay Button */}
                    <button
                      type="button"
                      onClick={handleRewind10}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center"
                      title="Replay / Rewind 10s (J / Left Arrow)"
                      aria-label="Replay 10 seconds"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* MAIN PLAY / PAUSE BUTTON */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#4F46F5] hover:bg-[#4335E0] dark:bg-[#6C4CFF] dark:hover:bg-[#5E3DE8] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition active:scale-95 cursor-pointer min-w-[96px] justify-center"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>PAUSE</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>PLAY</span>
                        </>
                      )}
                    </button>

                    {/* Forward Button */}
                    <button
                      type="button"
                      onClick={handleForward10}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center"
                      title="Forward 10s (L / Right Arrow)"
                      aria-label="Forward 10 seconds"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* RIGHT CONTROL GROUP: [Speed Selector] [Speaker + Volume Slider] [Exit Fullscreen] */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Playback Speed Selector (0.5x, 1x, 1.5x, 2x) */}
                    <div className="flex items-center gap-1 bg-black/30 border border-white/10 p-1 rounded-xl">
                      {[0.5, 1, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setPlaybackSpeed(spd);
                            showToast(`SPEED: ${spd}x`);
                            resetInactivityTimer();
                          }}
                          className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-[#4F46F5] dark:bg-[#6C4CFF] text-white shadow-xs'
                              : 'text-slate-300 hover:text-white'
                          }`}
                          aria-label={`Playback speed ${spd}x`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Volume Control: Speaker Icon + Horizontal Volume Slider */}
                    <div className="flex items-center gap-1.5 bg-black/30 border border-white/10 px-2.5 py-1.5 rounded-xl">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-slate-300 hover:text-white transition cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                        aria-label="Toggle Mute"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-red-400" />
                        ) : volume < 50 ? (
                          <Volume1 className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                        className="w-14 sm:w-18 h-1 bg-white/25 rounded-lg cursor-pointer accent-[#4F46F5]"
                        aria-label="Volume"
                      />
                    </div>

                    {/* Exit Fullscreen Button */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition cursor-pointer flex items-center justify-center shadow-xs"
                      title="Exit Fullscreen (F / Esc)"
                      aria-label="Toggle fullscreen"
                    >
                      <Minimize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. NORMAL / NON-FULLSCREEN VIDEO PLAYER CONTROL BAR */}
        {!isFullscreen && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] shadow-xs space-y-3.5 transition-all">
            {/* Top Progress Bar Track */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#64748B] dark:text-[#94A3B8] px-0.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(activeLesson.durationSeconds)}</span>
              </div>

              <div className="relative group cursor-pointer flex items-center py-1">
                <div className="h-1.5 sm:h-2 w-full bg-[#E2E8F0] dark:bg-[#16203B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F46E5] dark:bg-[#6366F1] rounded-full relative transition-all duration-75"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {/* Draggable Progress Thumb */}
                <div
                  className="absolute w-3.5 h-3.5 bg-[#4F46E5] dark:bg-[#6366F1] border-2 border-white dark:border-[#0F172A] rounded-full shadow-md transform -translate-x-1/2 pointer-events-none transition-all duration-75 group-hover:scale-125"
                  style={{ left: `${progressPercent}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={activeLesson.durationSeconds}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Video scrubber timeline"
                />
              </div>
            </div>

            {/* Bottom Control Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* LEFT SIDE: Rewind (10s), Play/Pause, Forward (10s) */}
              <div className="flex items-center gap-2">
                {/* Rewind 10s */}
                <button
                  type="button"
                  onClick={handleRewind10}
                  className="p-2.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#1E2B4D] transition active:scale-95 shadow-xs cursor-pointer flex items-center justify-center"
                  title="Rewind 10s (J / Left Arrow)"
                  aria-label="Rewind 10 seconds"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                {/* MAIN PLAY / PAUSE BUTTON */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                {/* Forward 10s */}
                <button
                  type="button"
                  onClick={handleForward10}
                  className="p-2.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#1E2B4D] transition active:scale-95 shadow-xs cursor-pointer flex items-center justify-center"
                  title="Forward 10s (L / Right Arrow)"
                  aria-label="Forward 10 seconds"
                >
                  <FastForward className="w-4 h-4" />
                </button>
              </div>

              {/* RIGHT SIDE: Playback Speed, Volume, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Playback Speed Selector [0.5x] [1x] [1.5x] [2x] */}
                <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#16203B] p-1 rounded-xl border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)]">
                  {[0.5, 1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setPlaybackSpeed(spd);
                        showToast(`SPEED: ${spd}x`);
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-xs'
                          : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                      }`}
                      aria-label={`Playback speed ${spd}x`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Volume Control */}
                <div className="hidden sm:flex items-center gap-1.5 bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] px-2.5 py-1.5 rounded-xl">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                    aria-label="Toggle Mute"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-red-500" />
                    ) : volume < 50 ? (
                      <Volume1 className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                    className="w-18 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-[#4F46E5]"
                    aria-label="Volume"
                  />
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-[#F1F5F9] dark:bg-[#16203B] border border-[#E2E8F0] dark:border-[rgba(99,102,241,0.2)] text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#1E2B4D] transition active:scale-95 shadow-xs cursor-pointer"
                  title="Toggle Fullscreen (F)"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
