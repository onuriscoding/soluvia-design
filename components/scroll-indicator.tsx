"use client"

import { useEffect, useState, useRef } from "react"

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Update scroll percentage without scrolling the page
  const updateIndicatorPosition = (percentage: number) => {
    setScrollPercentage(Math.max(0, Math.min(100, percentage)))
  }

  // Actually scroll the page to match the indicator position
  const scrollPageToMatch = (percentage: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScrollPosition = (percentage / 100) * scrollHeight
    window.scrollTo({
      top: targetScrollPosition,
      behavior: isDragging ? 'auto' : 'smooth'
    })
  }

  // Calculate scroll percentage based on window scroll position
  const updateFromScroll = () => {
    if (!isDragging) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const percentage = (scrollTop / scrollHeight) * 100
      setScrollPercentage(percentage)
    }
    
    // Show the indicator
    setIsVisible(true)
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Hide the indicator after some time if not dragging
    if (!isDragging) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 1500)
    }
  }

  // Handle click on the track to jump to that position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect()
      const clickPosition = e.clientY - trackRect.top
      const percentage = (clickPosition / trackRect.height) * 100
      
      // Update indicator immediately
      updateIndicatorPosition(percentage)
      
      // Then scroll page
      scrollPageToMatch(percentage)
    }
  }

  // Start dragging the indicator
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    
    // Calculate initial position
    if (trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect()
      const mouseY = e.clientY
      const percentage = ((mouseY - trackRect.top) / trackRect.height) * 100
      updateIndicatorPosition(percentage)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle dragging the indicator
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect()
      const mouseY = e.clientY
      
      // Calculate percentage based on mouse position relative to track
      let percentage = ((mouseY - trackRect.top) / trackRect.height) * 100
      percentage = Math.max(0, Math.min(100, percentage))
      
      // Update indicator position immediately
      updateIndicatorPosition(percentage)
      
      // Scroll the page to match
      scrollPageToMatch(percentage)
    }
  }

  // Stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    
    // Hide after some time
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 1500)
  }

  useEffect(() => {
    // Initial calculation
    updateFromScroll()
    
    // Add scroll event listener
    window.addEventListener('scroll', updateFromScroll)
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    right: '12px',
    width: '5px',
    height: '200px',
    transform: 'translateY(-50%)',
    zIndex: 9999,
    cursor: isDragging ? 'grabbing' : 'pointer'
  }
  
  const trackStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(40, 40, 40, 0.1)',
    borderRadius: '5px',
    backdropFilter: 'blur(3px)'
  }
  
  const indicatorStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${scrollPercentage}%`,
    transform: 'translateY(-50%)',
    left: '-3px',
    width: '11px',
    height: '11px',
    background: '#333',
    borderRadius: '50%',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    opacity: isVisible || isDragging ? 1 : 0,
    transition: isDragging ? 'none' : 'opacity 0.3s ease',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 2
  }

  return (
    <div 
      style={containerStyle} 
      ref={trackRef}
      onClick={handleTrackClick}
    >
      <div style={trackStyle}></div>
      <div 
        style={indicatorStyle}
        ref={indicatorRef}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  )
}

