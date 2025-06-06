"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, Wifi, WifiOff } from "lucide-react";

interface BookingIframeProps {
  className?: string;
  iframeClassName?: string;
  url?: string;
  height?: string | number;
}

export function BookingIframe({
  className = "",
  iframeClassName = "",
  url = "https://cal.com/soluviaco/15min",
  height = 700,
}: BookingIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Detect slow connection
  useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const slowTypes = ["slow-2g", "2g", "3g"];
        setIsSlowConnection(
          slowTypes.includes(connection.effectiveType) ||
            connection.downlink < 1
        );
      }
    }
  }, []);

  // Set timeout for slow loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowFallback(true);
      }
    }, 8000); // Show fallback after 8 seconds

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full bg-charcoal/50 rounded-2xl border border-ivory/10 backdrop-blur-sm"
    >
      <div className="space-y-6 text-center max-w-sm mx-auto p-8">
        <div className="flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-rose/30 border-t-rose rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-ivory">
            {isSlowConnection
              ? "Optimizing for your connection..."
              : "Loading booking calendar..."}
          </h3>
          <p className="text-sm text-ivory/60">
            {isSlowConnection
              ? "We're preparing a lighter version for you"
              : "This may take a moment on slower connections"}
          </p>
        </div>
        {isSlowConnection && (
          <div className="flex items-center justify-center text-amber-400 text-sm">
            <WifiOff className="w-4 h-4 mr-2" />
            Slow connection detected
          </div>
        )}
      </div>
    </motion.div>
  );

  const FallbackContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full bg-charcoal/50 rounded-2xl border border-ivory/10 backdrop-blur-sm p-8"
    >
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-rose/20 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8 text-rose" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-ivory">
            Book Your Discovery Call
          </h3>
          <p className="text-ivory/70">
            Having trouble loading the calendar? You can book directly through
            our external link.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-rose text-white rounded-lg font-medium hover:bg-rose/90 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Open Booking Calendar
          </a>
          <button
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
              setShowFallback(false);
            }}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-ivory/20 text-ivory rounded-lg font-medium hover:bg-ivory/5 transition-colors"
          >
            Try Loading Again
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (hasError || showFallback) {
    return (
      <div
        className={`w-full ${className}`}
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        <FallbackContent />
      </div>
    );
  }

  return (
    <div
      className={`bg-transparent rounded-2xl overflow-hidden w-full relative ${className}`}
    >
      {isLoading && (
        <div
          className="absolute inset-0 z-20"
          style={{
            height: typeof height === "number" ? `${height}px` : height,
          }}
        >
          <LoadingSkeleton />
        </div>
      )}
      <iframe
        src={url}
        className={`w-full h-full border-0 bg-transparent pointer-events-auto ${iframeClassName} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
          position: "relative",
        }}
        loading="lazy"
        title="Book a call with Soluvia"
        allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen; display-capture"
        referrerPolicy="no-referrer"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
}
