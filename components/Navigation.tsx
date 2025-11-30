'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isManualScrolling: React.MutableRefObject<boolean>
  useBackground: boolean
  setUseBackground: (value: boolean) => void
}

export default function Navigation({ activeSection, setActiveSection, isManualScrolling, useBackground, setUseBackground }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'photos', label: 'Ảnh Cưới' },
    { id: 'videos', label: 'Video' },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Set flag để tắt IntersectionObserver
      isManualScrolling.current = true
      setActiveSection(sectionId)
      element.scrollIntoView({ behavior: 'smooth' })
      
      // Reset flag sau khi scroll xong
      // Detect khi scroll kết thúc bằng cách check scroll position
      let scrollEndTimer: NodeJS.Timeout
      const checkScrollEnd = () => {
        clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(() => {
          isManualScrolling.current = false
        }, 100)
      }
      
      // Listen scroll events để detect khi scroll kết thúc
      window.addEventListener('scroll', checkScrollEnd, { passive: true })
      setTimeout(() => {
        window.removeEventListener('scroll', checkScrollEnd)
        isManualScrolling.current = false
      }, 1500) // Fallback timeout
    }
  }
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="font-serif text-2xl font-bold text-wedding-gold"
            whileHover={{ scale: 1.05 }}
          >
            Phước Đại & Anh Thư
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-wedding-gold'
                    : 'text-gray-700 hover:text-wedding-gold'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-wedding-gold"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Toggle button for background/slide */}
            <button
              onClick={() => setUseBackground(!useBackground)}
              className="ml-4 px-4 py-2 rounded-full bg-wedding-gold/20 hover:bg-wedding-gold/30 transition-colors flex items-center space-x-2"
              title={useBackground ? 'Chuyển sang slide ảnh' : 'Chuyển sang background'}
            >
              <svg
                className="w-5 h-5 text-wedding-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {useBackground ? (
                  // Icon for background mode
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </>
                ) : (
                  // Icon for slide mode
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </>
                )}
              </svg>
              <span className="text-sm font-medium text-wedding-gold hidden lg:inline">
                {useBackground ? 'Background' : 'Slide'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

