'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(true)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransformed) return

      e.preventDefault()

      const delta = e.deltaY
      const newProgress = Math.max(0, Math.min(100, scrollProgress + delta * 0.1))

      setScrollProgress(newProgress)

      if (newProgress >= 100) {
        setIsTransformed(true)
        setScrollLocked(false)
        document.body.style.overflow = 'auto'
      }
    }

    if (scrollLocked) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [scrollProgress, isTransformed, scrollLocked])

  const getTransformStyle = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (isTransformed) {
      return {
        width: isMobile ? '95%' : '90%',
        height: isMobile ? '120px' : '200px',
        borderRadius: '16px',
        position: 'fixed' as const,
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50
      }
    }

    const progress = scrollProgress / 100
    const width = 100 - (isMobile ? 5 : 10) * progress
    const height = 100 - (isMobile ? 80 : 70) * progress
    const borderRadius = 16 * progress

    return {
      width: `${width}%`,
      height: `${height}vh`,
      borderRadius: `${borderRadius}px`,
      position: isTransformed ? 'fixed' as const : 'relative' as const,
      top: isTransformed ? '10px' : 'auto',
      left: isTransformed ? '50%' : 'auto',
      transform: isTransformed ? 'translateX(-50%)' : 'none'
    }
  }

  return (
    <>
      <div
        className="hero-container bg-white shadow-sm border border-gray-100 flex items-center justify-center mx-auto"
        style={getTransformStyle()}
      >
        <div className="text-center px-6 md:px-12 py-6 md:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
            Premium Cards Collection
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover exclusive collectible cards from automotive legends and Marvel universe
          </p>
          {!isTransformed && (
            <div className="mt-8 md:mt-12 text-sm md:text-base text-gray-500 animate-pulse">
              Scroll to explore the catalog
            </div>
          )}
        </div>
      </div>

      {isTransformed && <div style={{ height: '240px' }} />}
    </>
  )
}
