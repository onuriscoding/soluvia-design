"use client";

import { useRef, useEffect, useState } from "react";
import { useSprings, animated } from "@react-spring/web";

interface AnimationConfig {
  filter?: string;
  opacity?: number;
  transform?: string;
}

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationConfig;
  animationTo?: AnimationConfig[];
  onAnimationComplete?: () => void;
}

const BlurText = ({
  text,
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  onAnimationComplete,
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  const defaultFrom: AnimationConfig = {
    filter: "blur(10px)",
    opacity: 0,
    transform: `translate3d(0,${direction === "top" ? "-30px" : "30px"},0)`,
  };

  const defaultTo: AnimationConfig[] = [
    {
      filter: "blur(0px)",
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
  ];

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setInView(true);
          setHasAnimated(true);
          observer.unobserve(entry.target);

          // Reset animation count when animation starts
          animatedCount.current = 0;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? animationTo?.[animationTo.length - 1] || defaultTo[0]
        : animationFrom || defaultFrom,
      delay: inView ? i * delay : 0, // Only apply delay when in view
      config: {
        mass: 1,
        tension: 280,
        friction: 60,
      },
      onRest: () => {
        if (inView) {
          animatedCount.current += 1;
          if (
            animatedCount.current === elements.length &&
            onAnimationComplete
          ) {
            onAnimationComplete();
          }
        }
      },
    }))
  );

  return (
    <div className="w-full flex justify-center">
      <p
        ref={ref}
        className={`blur-text ${className} flex flex-wrap justify-center`}
      >
        {springs.map((props, index) => (
          <animated.span
            key={index}
            style={props}
            className="inline-block px-[0.2em]"
          >
            {elements[index] === " " ? "\u00A0" : elements[index]}
          </animated.span>
        ))}
      </p>
    </div>
  );
};

export default BlurText;
