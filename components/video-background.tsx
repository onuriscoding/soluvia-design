"use client";

export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-charcoal/80 to-charcoal/75"></div>

      {/* Additional ambient effects */}
      <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-rose/10 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-sapphire/10 blur-3xl"></div>
    </div>
  );
}
