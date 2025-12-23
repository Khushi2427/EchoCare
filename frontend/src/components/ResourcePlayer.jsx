import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  FileText,
  Maximize,
  Download,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Headphones,
  Film
} from "lucide-react";
// Separated imports - each from its own file
import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const ResourcePlayer = ({ resource }) => {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (s) => {
    if (isNaN(s)) return "0:00";
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = async () => {
    if (!mediaRef.current) return;
    isPlaying ? mediaRef.current.pause() : await mediaRef.current.play();
  };

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return;
    setCurrentTime(mediaRef.current.currentTime);
    setDuration(mediaRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    const t = Number(e.target.value);
    mediaRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (mediaRef.current) mediaRef.current.volume = v;
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    mediaRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const enterFullscreen = () => {
    if (containerRef.current?.requestFullscreen) containerRef.current.requestFullscreen();
  };

  /* ---------------- SHARED CLASSES ---------------- */
  const controlBtnClass = "p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700";
  const sliderClass = "accent-purple-600 h-1.5 rounded-lg cursor-pointer";

  /* ---------------- AUDIO ---------------- */
  if (resource.type === "audio") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3 group">
        <audio
          ref={mediaRef}
          src={resource.fileUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Headphones className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-900">Audio Session</p>
              <p className="text-xs text-slate-500">{formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePlayPause} className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-full shadow-md transition-transform active:scale-95">
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>

            <div className="flex-1 flex flex-col justify-center">
               <input
                type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek}
                className={cn("w-full", sliderClass)}
              />
            </div>

            <div className="hidden sm:flex items-center gap-2 group/volume">
              <button onClick={toggleMute} className="text-slate-500 hover:text-purple-600">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}
                className="w-16 h-1 accent-purple-600"
              />
            </div>

            <a href={resource.fileUrl} download className="text-slate-400 hover:text-slate-700 transition-colors">
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- VIDEO ---------------- */
  if (resource.type === "video") {
    return (
      <div ref={containerRef} className="group relative mt-4 bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200">
        <video
          ref={mediaRef}
          src={resource.fileUrl}
          className="w-full h-full object-contain cursor-pointer"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <input
            type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek}
            className="w-full h-1 mb-4 accent-purple-400 cursor-pointer"
          />
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button onClick={handlePlayPause} className="hover:text-purple-400">
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="hover:text-purple-400">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
            <button onClick={enterFullscreen} className="hover:text-purple-400">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- PDF ---------------- */
  if (resource.type === "pdf") {
    return (
      <div className="mt-4 p-4 border border-purple-100 rounded-xl bg-purple-50/50 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
        <div className="flex gap-3 items-center">
          <div className="bg-white p-2.5 rounded-lg shadow-sm">
            <FileText className="text-purple-600" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">Digital Guide</span>
            <span className="text-xs text-slate-500 uppercase font-medium tracking-wider">PDF Document</span>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <a
            href={resource.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            <ExternalLink size={16} /> Open Reader
          </a>
          <a href={resource.fileUrl} download className="p-2 border border-purple-200 rounded-lg hover:bg-white text-purple-600 transition-colors">
            <Download size={20} />
          </a>
        </div>
      </div>
    );
  }

  /* ---------------- ARTICLE ---------------- */
  if (resource.type === "article") {
    return (
      <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl relative">
        <div className={cn(
          "text-slate-700 leading-relaxed transition-all",
          !isExpanded && "max-h-24 overflow-hidden"
        )}>
          {resource.content}
        </div>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-xl" />
        )}

        {resource.content?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 font-bold mt-3 text-sm"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>Read Full Article <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ResourcePlayer;