"use client";

import { useRef, useState } from "react";

type HeroVideo = {
  src: string;
  poster?: string;
  /** This clip has a generator watermark baked into its bottom-right
   * corner - scale it up and anchor the crop to the top-left so the
   * watermark corner falls outside the hero. */
  watermarkCrop?: boolean;
};

type HeroBackgroundVideoProps =
  | { src: string; poster?: string; videos?: never }
  | { videos: readonly HeroVideo[]; src?: never; poster?: never };

/** Renders one or more looping background videos filling the hero edge to
 * edge (object-fit: cover, absolutely positioned, hero has overflow
 * hidden). With `videos`, clips alternate: each plays once, then hands off
 * to the next on `ended`. */
export function HeroBackgroundVideo(props: HeroBackgroundVideoProps) {
  const videos: readonly HeroVideo[] = "videos" in props && props.videos ? props.videos : [{ src: props.src!, poster: props.poster }];
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleEnded = (index: number) => {
    if (index !== active || videos.length < 2) return;
    const next = (index + 1) % videos.length;
    setActive(next);
    const nextEl = videoRefs.current[next];
    if (nextEl) {
      nextEl.currentTime = 0;
      nextEl.play().catch(() => {});
    }
  };

  return (
    <div className="hero-bg-video" aria-hidden="true">
      {videos.map((video, index) => (
        <video
          key={video.src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          autoPlay={index === 0}
          muted
          loop={videos.length < 2}
          playsInline
          preload="auto"
          poster={video.poster}
          disablePictureInPicture
          className={`hero-bg-video-el ${index === active ? "is-active" : ""} ${video.watermarkCrop ? "hero-bg-video-crop" : ""}`}
          onEnded={() => handleEnded(index)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
