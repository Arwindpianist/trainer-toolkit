'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Plus, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import { useTrainerToolkitStore, TimerPreset } from '@/lib/store';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetMinutes, setNewPresetMinutes] = useState('');
  const [showAddPreset, setShowAddPreset] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { timerPresets, addTimerPreset, deleteTimerPreset } = useTrainerToolkitStore();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (duration: number) => {
    setTimeLeft(duration);
    setIsRunning(true);
    setShowCustomInput(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const toggleFullscreen = () => {
    const timerDisplay = document.getElementById('timer-display');
    if (!document.fullscreenElement) {
      timerDisplay?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCustomStart = () => {
    const minutes = parseInt(customMinutes) || 0;
    const seconds = parseInt(customSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    if (totalSeconds > 0) {
      startTimer(totalSeconds);
      setCustomMinutes('');
      setCustomSeconds('');
    }
  };

  const handleAddPreset = () => {
    const minutes = parseInt(newPresetMinutes);
    if (newPresetName.trim() && minutes > 0) {
      addTimerPreset({
        name: newPresetName,
        duration: minutes * 60
      });
      setNewPresetName('');
      setNewPresetMinutes('');
      setShowAddPreset(false);
    }
  };

  const getProgressPercentage = () => {
    if (timeLeft === 0) return 0;
    // We need to track the initial time to calculate progress
    // For now, we'll use a simple calculation
    return 100;
  };

  const getTimeColor = () => {
    if (timeLeft === 0) return 'text-muted-foreground';
    if (timeLeft <= 30) return 'text-destructive';
    if (timeLeft <= 60) return 'text-orange-500';
    return 'text-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        title="Countdown Timer" 
        subtitle="Set custom timers with fullscreen display for presentations"
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Timer Display */}
          <div id="timer-display" className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <div className="text-center">
                <div className="mb-8">
                  <div className={`text-6xl sm:text-7xl lg:text-8xl font-bold ${getTimeColor()} transition-colors leading-none`}>
                    {formatTime(timeLeft)}
                  </div>
                  {timeLeft > 0 && (
                    <div className="mt-6">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-teal-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                {!isRunning ? (
                  <button
                    onClick={() => isRunning ? pauseTimer() : startTimer(timeLeft || 300)}
                    disabled={timeLeft === 0}
                    className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-xl hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-teal-500/25"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-xl hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-500/25"
                  >
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={resetTimer}
                  className="flex items-center px-4 sm:px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors border border-border"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-xl hover:from-teal-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-teal-500/25"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-5 w-5 mr-2" />
                  ) : (
                    <Maximize2 className="h-5 w-5 mr-2" />
                  )}
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </button>
              </div>
            </div>
          </div>

          {/* Presets and Custom Timer */}
          <div className="space-y-6">
            {/* Quick Presets */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Quick Presets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timerPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => startTimer(preset.duration)}
                    className="px-4 py-3 bg-muted hover:bg-muted/80 rounded-xl text-left transition-colors border border-border/50"
                  >
                    <div className="font-medium text-card-foreground">{preset.name}</div>
                    <div className="text-sm text-muted-foreground">{formatTime(preset.duration)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Timer */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">Custom Timer</h2>
              
              {!showCustomInput ? (
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="w-full px-4 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                >
                  + Set Custom Time
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Minutes
                      </label>
                      <input
                        type="number"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Seconds
                      </label>
                      <input
                        type="number"
                        value={customSeconds}
                        onChange={(e) => setCustomSeconds(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="59"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleCustomStart}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all duration-200"
                    >
                      Start Timer
                    </button>
                    <button
                      onClick={() => setShowCustomInput(false)}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add Custom Preset */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">Custom Presets</h2>
                <button
                  onClick={() => setShowAddPreset(!showAddPreset)}
                  className="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Preset
                </button>
              </div>

              {showAddPreset && (
                <div className="space-y-4 mb-4 p-4 bg-muted/50 rounded-xl border border-border/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Preset Name
                      </label>
                      <input
                        type="text"
                        value={newPresetName}
                        onChange={(e) => setNewPresetName(e.target.value)}
                        placeholder="e.g., Coffee Break"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Minutes
                      </label>
                      <input
                        type="number"
                        value={newPresetMinutes}
                        onChange={(e) => setNewPresetMinutes(e.target.value)}
                        placeholder="5"
                        min="1"
                        className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddPreset}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all duration-200"
                    >
                      Add Preset
                    </button>
                    <button
                      onClick={() => setShowAddPreset(false)}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors border border-border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {timerPresets.slice(4).map((preset) => (
                  <div key={preset.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
                    <div>
                      <div className="font-medium text-card-foreground">{preset.name}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(preset.duration)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startTimer(preset.duration)}
                        className="px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-400 text-white text-sm rounded-lg hover:from-teal-500 hover:to-blue-500 transition-all duration-200"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => deleteTimerPreset(preset.id)}
                        className="px-3 py-1 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/90 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden audio element for alarm */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" />
      </audio>
    </div>
  );
} 