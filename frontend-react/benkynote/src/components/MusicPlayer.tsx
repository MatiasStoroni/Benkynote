import React, { useState, useRef, useEffect } from 'react';
import Howler from 'react-howler';
import WaveSurfer from 'wavesurfer.js';
import type { WaveSurferEvents } from 'wavesurfer.js'; // Asegura la importación de los tipos de eventos

interface MusicPlayerProps {
  src: string;
  artist: string;
  title: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, artist, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const waveFormRef = useRef<HTMLDivElement | null>(null);

  // Initialize WaveSurfer
  useEffect(() => {
    if (waveFormRef.current && !waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: '#ddd',
        progressColor: '#4f46e5',
        cursorColor: '#4f46e5',
        barWidth: 2,
        height: 80,
      });

      waveSurferRef.current.load(src);

      // Listen for seeking
      waveSurferRef.current.on('seek' as keyof WaveSurferEvents, (progress: number) => {
        const duration = waveSurferRef.current?.getDuration();
        if (duration !== undefined) {
          const seekTime = duration * progress;
          setProgress(seekTime);
        }
      });
    }

    // Cleanup WaveSurfer on component unmount
    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [src]);

  // Sync WaveSurfer with Howler for play/pause
  useEffect(() => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.play();
      } else {
        waveSurferRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle audio play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    waveSurferRef.current?.setVolume(parseFloat(e.target.value)); // Sync WaveSurfer volume
  };

  // Handle track end
  const handleTrackEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-400 mb-2">{artist}</p>

      {/* WaveSurfer waveform container */}
      <div ref={waveFormRef} className="w-full mb-4"></div>

      {/* Howler audio player */}
      <Howler
        src={src}
        playing={isPlaying}
        volume={volume}
        onEnd={handleTrackEnd}
      />

      {/* Player controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
            onClick={handlePlayPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
            onClick={() => setIsPlaying(false)}
          >
            Stop
          </button>
        </div>

        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <label htmlFor="volume" className="text-sm">Volume</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
