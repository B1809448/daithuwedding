'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Thử autoplay ngay khi component mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Thử phát nhạc ngay
    const tryAutoPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // Nếu bị chặn, đợi user tương tác
        const handleInteraction = async () => {
          try {
            await audio.play()
            setIsPlaying(true)
          } catch {
            // Vẫn bị chặn
          }
          document.removeEventListener('click', handleInteraction)
          document.removeEventListener('touchstart', handleInteraction)
          document.removeEventListener('scroll', handleInteraction)
          document.removeEventListener('keydown', handleInteraction)
        }

        document.addEventListener('click', handleInteraction)
        document.addEventListener('touchstart', handleInteraction)
        document.addEventListener('scroll', handleInteraction)
        document.addEventListener('keydown', handleInteraction)
      }
    }

    tryAutoPlay()
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      {/* Nút bật/tắt nhạc */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={togglePlay}
        className="fixed top-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors md:top-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center justify-center gap-0.5"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-wedding-gold rounded-full"
                  animate={{
                    height: [8, 16, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.svg
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-6 h-6 text-wedding-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
