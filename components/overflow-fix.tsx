"use client"

import { useEffect } from 'react'
import { setupOverflowFix } from '@/app/overflow-fix'

export default function OverflowFix() {
  useEffect(() => {
    // Apply the CSS-only fix
    const cleanup = setupOverflowFix()
    
    return cleanup
  }, [])
  
  return null
} 