import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  textClassName?: string;
  className?: string;
  renderText?: (text: string) => React.ReactNode;
}

export function RotatingText({
  texts,
  interval = 3000,
  textClassName = "",
  className = "",
  renderText,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, texts.length]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={textClassName}
        >
          {renderText ? renderText(texts[currentIndex]) : texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
