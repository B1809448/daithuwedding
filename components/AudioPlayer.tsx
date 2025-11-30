'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowWelcome(false)
        })
        .catch(() => {
          setShowWelcome(false)
        })
    }
  }

  const skipMusic = () => {
    setShowWelcome(false)
  }

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

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              {/* Music toggle icon */}
              <motion.button
                onClick={togglePlay}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-wedding-rose to-wedding-gold rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="playing"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-1"
                    >
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-white rounded-full"
                          animate={{
                            height: [12, 24, 12],
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
                      className="w-10 h-10 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
              <p className="text-sm text-gray-500 mb-4">Nhấn vào trái tim để bật/tắt nhạc</p>

              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                Chào mừng đến với
              </h2>
              <h3 className="font-serif text-3xl font-bold text-wedding-gold mb-6">
                Phước Đại & Anh Thư
              </h3>

              <div className="space-y-3">
                <motion.button
                  onClick={startMusic}
                  className="w-full py-3 px-6 bg-wedding-gold text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🎶 Mở cửa tình yêu
                </motion.button>
                <button
                  onClick={skipMusic}
                  className="w-full py-3 px-6 text-gray-500 font-medium hover:text-gray-700 transition-colors"
                >
                  Tắt nhạc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút bật/tắt nhạc */}
      {!showWelcome && (
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
      )}
    </>
  )
}
