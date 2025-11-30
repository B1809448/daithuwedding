'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import ImageSlider from '@/components/ImageSlider'

interface HeroProps {
  setActiveSection: (section: string) => void
  isManualScrolling: React.MutableRefObject<boolean>
  useBackground: boolean
}

export default function Hero({ setActiveSection, isManualScrolling, useBackground }: HeroProps) {
  useEffect(() => {
    // Set initial active section
    setActiveSection('home')

    // Observe when Hero section is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Chỉ update nếu không phải đang scroll thủ công
          if (entry.isIntersecting && !isManualScrolling.current) {
            setActiveSection('home')
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('home')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection, isManualScrolling])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  // Wedding photos for slide (local images from public/slides)
  // Đặt file ảnh của bạn vào thư mục: public/slides
  // Ví dụ: public/slides/slide-1.jpg, slide-2.jpg, ...
  const slideImages = [
    'https://res.cloudinary.com/dol42c3fc/image/upload/v1764479216/slide-2_ttu4hr.jpg',
    'https://res.cloudinary.com/dol42c3fc/image/upload/v1764478919/slide-1_lirzz0.jpg',
    'https://res.cloudinary.com/dol42c3fc/image/upload/v1764479207/slide-3_eam4wl.jpg',
    'https://res.cloudinary.com/dol42c3fc/image/upload/v1764479200/slide-4_rfkdyy.jpg',
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {useBackground ? (
          // Background mode
          <motion.div
            key="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-rose/30 via-wedding-cream to-wedding-blush/30" />
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-wedding-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-wedding-rose/20 rounded-full blur-3xl" />
          </motion.div>
        ) : (
          // Slide mode
          <motion.div
            key="slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <ImageSlider
              images={slideImages}
              autoPlayInterval={5000}
              showIndicators={true}
              className="h-full"
            />
            {/* Overlay để text dễ đọc hơn */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className={`font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 ${
            useBackground ? 'text-gray-800' : 'text-white'
          }`}>
            Phước Đại & Anh Thư
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6" />
          <p className={`text-xl sm:text-2xl md:text-3xl font-light ${
            useBackground ? 'text-gray-700' : 'text-white'
          }`}>
            Lưu giữ những kỷ niệm đẹp nhất
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12"
        >
          <p className={`text-lg sm:text-xl font-serif italic ${
            useBackground ? 'text-gray-600' : 'text-white/90'
          }`}>
            "Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng"
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.button
            onClick={() => {
              const photosSection = document.getElementById('photos')
              photosSection?.scrollIntoView({ behavior: 'smooth' })
              setActiveSection('photos')
            }}
            className="px-8 py-4 bg-wedding-gold text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Khám Phá Kỷ Niệm
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-wedding-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-wedding-gold rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

