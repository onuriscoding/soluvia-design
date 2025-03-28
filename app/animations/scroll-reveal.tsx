import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "center center",
  wordAnimationEnd = "top center",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) {
        return " ";
      }
      return (
        <span
          className="word inline-block"
          key={index}
          style={{
            willChange: "opacity, filter, transform",
            display: "inline-block",
            opacity: 0,
            filter: `blur(${blurStrength}px)`,
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, blurStrength]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Container rotation animation
    const rotationTween = gsap.fromTo(
      el,
      {
        transformOrigin: "0% 50%",
        rotate: baseRotation,
      },
      {
        ease: "power2.out",
        rotate: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: 1,
        },
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>(".word");

    // Create a timeline for word animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top bottom-=10%",
        end: wordAnimationEnd,
        scrub: 1,
      },
    });

    // Add word animations to timeline
    wordElements.forEach((word, index) => {
      tl.fromTo(
        word,
        {
          opacity: baseOpacity,
          y: "50%",
          filter: `blur(${blurStrength}px)`,
        },
        {
          opacity: 1,
          y: "0%",
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        },
        index * 0.1
      );
    });

    return () => {
      rotationTween.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`relative ${containerClassName}`}>
      <p
        className={`leading-[1.5] tracking-tight font-medium ${textClassName}`}
      >
        {splitText}
      </p>
    </h2>
  );
};

export default ScrollReveal;
