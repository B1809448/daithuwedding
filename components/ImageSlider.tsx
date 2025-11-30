'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageSliderProps {
  images: string[]
  autoPlayInterval?: number // milliseconds, default 5000
  showIndicators?: boolean // default true
  className?: string
}

export default function ImageSlider({
  images,
  autoPlayInterval = 5000,
  showIndicators = true,
  className = '',
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto slide change
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [images.length, autoPlayInterval])

  if (images.length === 0) {
    return null
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? 'bg-wedding-gold w-8'
                  : 'bg-white/50 hover:bg-white/75 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

