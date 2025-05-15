import React, { useRef, useMemo } from "react";
// import { gsap } from "gsap";
// import { Observer } from "gsap/Observer"; // Temporarily remove Observer
import "./InfiniteScroll.css";

// gsap.registerPlugin(Observer); // Temporarily remove Observer

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  // ----- Layout / Style Props -----
  width?: string; // Width of the outer wrapper
  maxHeight?: string; // Max-height of the outer wrapper
  itemSpacing?: string; // e.g., "1rem", "16px"
  // ----- Items Prop -----
  items?: InfiniteScrollItem[]; // Array of items with { content: ... }
  itemMinHeight?: number; // Fixed height for each item
  // ----- Tilt Props -----
  isTilted?: boolean; // Whether the container is in "skewed" perspective
  tiltDirection?: "left" | "right"; // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay?: boolean; // Whether it should automatically scroll
  autoplaySpeed?: number; // Speed (pixels/frame approx.)
  autoplayDirection?: "down" | "up"; // "down" or "up"
  pauseOnHover?: boolean; // Pause autoplay on hover
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items = [],
  itemMinHeight = 300,
  itemSpacing = "1rem",
  // ... other props are not used in this static version
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // No containerRef needed if not using GSAP/useEffect for layout
  // const containerRef = useRef<HTMLDivElement>(null); 
  // No itemsRef needed

  // Create the duplicated array for seamless looping
  const seamlessItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    return [...items, ...items, ...items];
  }, [items]);

  // Calculate layout values directly for inline styles
  const numOriginalItems = items.length;
  const numSeamlessItems = seamlessItems.length;
  const itemHeight = Math.max(1, itemMinHeight);
  let itemMarginTopPx = 0;
  const spacingValue = parseFloat(itemSpacing);
  if (!isNaN(spacingValue)) {
    const spacingUnit = itemSpacing.replace(/[0-9.-]/g, '');
    if (spacingUnit === 'rem' || spacingUnit === 'em') {
        // Need to run this calculation client-side. Assume default 16px for simplicity if window is undefined.
        const fontSize = typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) : 16;
        itemMarginTopPx = spacingValue * fontSize;
    } else if (spacingUnit === 'px') {
        itemMarginTopPx = spacingValue;
    }
  }
  const totalItemHeight = itemHeight + itemMarginTopPx;
  const totalContainerHeight = totalItemHeight * numSeamlessItems;

  console.log(`[DEBUG - No GSAP] itemHeight: ${itemHeight}, totalItemHeight: ${totalItemHeight}, totalContainerHeight: ${totalContainerHeight}`);

  // REMOVED useEffect hook

  return (
    <div 
      className="infinite-scroll-wrapper" 
      ref={wrapperRef} 
      style={{
        overflow: 'auto', 
        // Rely on CSS for height:100% and position:relative
      }}
    > 
      {/* Set container height directly via inline style */}
      <div
        className="infinite-scroll-container" 
        // ref={containerRef} // No longer needed here
        style={{ 
            height: `${totalContainerHeight}px`, 
            position: 'relative' // Ensure positioning context
        }}
      >
        {/* Render the SEAMLESS items with inline positioning */}
        {seamlessItems.map((item, i) => {
            // Initial Positioning - Center the middle set
            const initialY = (i - numOriginalItems) * totalItemHeight;
            console.log(`[DEBUG - No GSAP] Setting seamless item ${i} to initial top: ${initialY}px`);
          
            return (
              <div 
                className="infinite-scroll-item" 
                key={`seamless-item-${i}`}
                style={{
                    position: 'absolute',
                    left: '0px',
                    top: `${initialY}px`, // Use top for direct positioning
                    width: '100%',
                    height: `${itemHeight}px`,
                    // marginTop is implicitly handled by top calculation
                    opacity: 1, // Ensure visible
                    display: 'block' // Ensure visible
                }}
              >
                {item.content}
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default InfiniteScroll;
