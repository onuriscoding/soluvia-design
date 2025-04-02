"use client";

import React, { useEffect, useRef } from 'react';

export default function FullPageWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventOverflow = () => {
      // Force HTML and body to be contained
      document.documentElement.style.width = '100%';
      document.documentElement.style.overflowX = 'clip';
      document.body.style.width = '100%';
      document.body.style.overflowX = 'clip';
      
      // Touch events handling for mobile
      document.body.style.touchAction = 'pan-y';
      
      // When using 'clip' instead of 'hidden', it's more aggressive at preventing overflow
    };
    
    preventOverflow();
    window.addEventListener('resize', preventOverflow);
    window.addEventListener('orientationchange', preventOverflow);
    
    return () => {
      window.removeEventListener('resize', preventOverflow);
      window.removeEventListener('orientationchange', preventOverflow);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'clip',
        position: 'relative',
        margin: 0,
        padding: 0
      }}
    >
      {children}
    </div>
  );
} 