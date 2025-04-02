"use client";

import { useEffect } from 'react';
import { setupOverflowFix } from '@/app/overflow-fix';
import { initSafariFix } from '@/app/safari-fix';
import { initOperaFix } from '@/app/opera-fix';

export default function BrowserFixes() {
  useEffect(() => {
    // Apply general overflow fix
    const overflowCleanup = setupOverflowFix();
    
    // Apply Safari-specific fix
    const safariCleanup = initSafariFix();
    
    // Apply Opera-specific fix
    const operaCleanup = initOperaFix();
    
    return () => {
      overflowCleanup();
      if (safariCleanup) safariCleanup();
      if (operaCleanup) operaCleanup();
    };
  }, []);
  
  return null;
} 