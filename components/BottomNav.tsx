'use client'

import { motion } from 'framer-motion'

interface BottomNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isManualScrolling: React.MutableRefObject<boolean>
}

export default function BottomNav({ activeSection, setActiveSection, isManualScrolling }: BottomNavProps) {
  const navItems = [
    { 
      id: 'home', 
      label: 'Trang Chủ',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      id: 'photos', 
      label: 'Ảnh Cưới',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    { 
      id: 'videos', 
      label: 'Video',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
      )
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      isManualScrolling.current = true
      setActiveSection(sectionId)
      element.scrollIntoView({ behavior: 'smooth' })
      
      let scrollEndTimer: NodeJS.Timeout
      const checkScrollEnd = () => {
        clearTimeout(scrollEndTimer)
        scrollEndTimer = setTimeout(() => {
          isManualScrolling.current = false
        }, 100)
      }
      
      window.addEventListener('scroll', checkScrollEnd, { passive: true })
      setTimeout(() => {
        window.removeEventListener('scroll', checkScrollEnd)
        isManualScrolling.current = false
      }, 1500)
    }
  }

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg safe-area-bottom"
    >
      <div className="flex justify-around items-center h-16 px-2 pt-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors relative ${
              activeSection === item.id
                ? 'text-wedding-gold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className={`relative transition-transform ${activeSection === item.id ? 'scale-110' : ''}`}>
              {activeSection === item.id && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -inset-2 bg-wedding-gold/15 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{item.icon}</span>
            </span>
            <span className={`text-xs mt-2 font-medium ${
              activeSection === item.id ? 'text-wedding-gold' : ''
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  )
}

