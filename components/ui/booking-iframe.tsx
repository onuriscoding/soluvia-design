"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      className={`bg-transparent rounded-2xl overflow-hidden w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <iframe
        src={url}
        className={`w-full h-full border-0 bg-transparent pointer-events-auto ${iframeClassName}`}
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
      />
    </motion.div>
  );
}
