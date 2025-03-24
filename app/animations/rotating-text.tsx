import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  initialText?: string;
}

export function RotatingText({
  texts,
  interval = 3000,
  className = "",
  textClassName = "",
  initialText,
}: RotatingTextProps) {
  const [currentText, setCurrentText] = useState(initialText || texts[0]);
  const [currentIndex, setCurrentIndex] = useState(
    initialText ? texts.indexOf(initialText) : 0
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % texts.length;
        setCurrentText(texts[nextIndex]);
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [texts, interval]);

  return (
    <div className={`inline-block min-w-[180px] ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentText}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
        >
          <span className={textClassName}>{currentText}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
