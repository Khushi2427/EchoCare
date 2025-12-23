import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  FileText,
  Film,
  Music,
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize,
  Download,
} from "lucide-react";

const ResourcePlayer = ({ resource }) => {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // ✅ FIXED

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const handlePlayPause = async () => {
    if (!mediaRef.current) return;

    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      await mediaRef.current.play();
    }
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
    mediaRef.current.volume = v;
  };

  const toggleMute = () => {
    mediaRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen();
  };

  /* ---------------- AUDIO ---------------- */
  if (resource.type === "audio") {
    return (
      <div className="bg-white border rounded-lg p-4 mt-4 shadow">
        <audio
          ref={mediaRef}
          src={resource.fileUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="flex items-center gap-4">
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1"
          />

          <span>{formatTime(currentTime)}</span>

          <button onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20"
          />

          <a href={resource.fileUrl} download>
            <Download />
          </a>
        </div>
      </div>
    );
  }

  /* ---------------- VIDEO ---------------- */
  if (resource.type === "video") {
    return (
      <div ref={containerRef} className="relative mt-4 bg-black rounded-lg">
        <video
          ref={mediaRef}
          src={resource.fileUrl}
          className="w-full rounded-lg"
          onClick={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        <div className="absolute bottom-2 left-2 right-2 flex gap-3 items-center text-white">
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1"
          />

          <button onClick={enterFullscreen}>
            <Maximize />
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- PDF ---------------- */
  if (resource.type === "pdf") {
    return (
      <div className="mt-4 p-4 border rounded-lg bg-purple-50 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <FileText />
          <span className="font-medium">PDF Resource</span>
        </div>

        <div className="flex gap-3">
          <a
            href={resource.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            View PDF
          </a>

          <a href={resource.fileUrl} download>
            <Download />
          </a>
        </div>
      </div>
    );
  }

  /* ---------------- ARTICLE ---------------- */
  if (resource.type === "article") {
    return (
      <div className="mt-4 p-4 bg-white border rounded-lg">
        <p className="text-gray-700">
          {isExpanded
            ? resource.content
            : resource.content.slice(0, 150) + "..."}
        </p>

        {resource.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-600 mt-2"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ResourcePlayer;
