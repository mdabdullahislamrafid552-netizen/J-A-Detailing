import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  opacity?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, poster, opacity = "opacity-40" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (src.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          startLevel: -1,
          capLevelToPlayerSize: true,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => {});
        });
      }
    } else {
      video.src = src;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${opacity}`}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
    </div>
  );
};
