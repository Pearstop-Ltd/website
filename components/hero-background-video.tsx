type HeroBackgroundVideoProps = {
  src: string;
  poster?: string;
};

export function HeroBackgroundVideo({ src, poster }: HeroBackgroundVideoProps) {
  return (
    <div className="hero-bg-video" aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
