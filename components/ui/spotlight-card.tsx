"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  variant?: "default" | "rose" | "sapphire" | "beige";
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ 
    className = "", 
    children, 
    spotlightColor = "rgba(255, 255, 255, 0.25)",
    variant = "default",
    buttonText,
    buttonHref,
    onButtonClick,
    ...props 
  }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);

    // Map variant to color
    const getSpotlightColor = () => {
      switch (variant) {
        case "rose":
          return "rgba(183, 110, 121, 0.25)";
        case "sapphire":
          return "rgba(61, 90, 128, 0.25)";
        case "beige":
          return "rgba(224, 213, 192, 0.25)";
        default:
          return spotlightColor;
      }
    };

    // Get border class based on variant
    const getBorderClass = () => {
      switch (variant) {
        case "rose":
          return "border-rose/30";
        case "sapphire":
          return "border-sapphire/30";
        case "beige":
          return "border-beige/30";
        default:
          return "border-neutral-800";
      }
    };

    // Get button style based on variant
    const getButtonClass = () => {
      switch (variant) {
        case "rose":
          return "border-rose hover:bg-rose/10";
        case "sapphire":
          return "border-sapphire hover:bg-sapphire/10";
        case "beige":
          return "border-beige hover:bg-beige/10";
        default:
          return "border-ivory/30 hover:bg-ivory/10";
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current || isFocused) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(0.6);
    };

    const handleBlur = () => {
      setIsFocused(false);
      setOpacity(0);
    };

    const handleMouseEnter = () => {
      setOpacity(0.6);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    // Render button if buttonText is provided
    const renderButton = () => {
      if (!buttonText) return null;

      const buttonElement = (
        <button 
          onClick={onButtonClick}
          className={`mt-4 inline-flex items-center justify-center h-12 px-8 font-medium transition-colors border-2 text-ivory ${getButtonClass()} rounded-full whitespace-nowrap`}
        >
          {buttonText}
        </button>
      );

      if (buttonHref) {
        return (
          <a href={buttonHref} className="inline-block">
            {buttonElement}
          </a>
        );
      }

      return buttonElement;
    };

    return (
      <div
        ref={ref || divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          `relative rounded-xl border ${getBorderClass()} bg-charcoal/90 backdrop-blur-sm overflow-hidden p-6 transition-all duration-300`,
          className
        )}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${getSpotlightColor()}, transparent 80%)`,
          }}
        />
        {children}
        {renderButton()}
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";

export { SpotlightCard }; 