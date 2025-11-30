'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PhotoGalleryProps {
  setActiveSection: (section: string) => void
  isManualScrolling: React.MutableRefObject<boolean>
}

interface Photo {
  id: number
  src: string
  alt: string
  category: string
}

// Mock wedding photos
const mockPhotos: Photo[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop', alt: 'Wedding Photo 1', category: 'ceremony' },
  { id: 2, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop', alt: 'Wedding Photo 2', category: 'ceremony' },
  { id: 3, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop', alt: 'Wedding Photo 3', category: 'reception' },
  { id: 4, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop', alt: 'Wedding Photo 4', category: 'ceremony' },
  { id: 5, src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop', alt: 'Wedding Photo 5', category: 'reception' },
  { id: 6, src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=1200&fit=crop', alt: 'Wedding Photo 6', category: 'ceremony' },
  { id: 7, src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=800&fit=crop', alt: 'Wedding Photo 7', category: 'reception' },
  { id: 8, src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1200&fit=crop', alt: 'Wedding Photo 8', category: 'ceremony' },
  { id: 9, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop', alt: 'Wedding Photo 9', category: 'reception' },
  { id: 10, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=1200&fit=crop', alt: 'Wedding Photo 10', category: 'ceremony' },
  { id: 11, src: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=800&fit=crop', alt: 'Wedding Photo 11', category: 'reception' },
  { id: 12, src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1200&fit=crop', alt: 'Wedding Photo 12', category: 'ceremony' },
]

export default function PhotoGallery({ setActiveSection, isManualScrolling }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Chỉ update nếu không phải đang scroll thủ công
          if (entry.isIntersecting && !isManualScrolling.current) {
            setActiveSection('photos')
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('photos')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection, isManualScrolling])

  const filteredPhotos = filter === 'all' 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.category === filter)

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'ceremony', label: 'Lễ Cưới' },
    { id: 'reception', label: 'Tiệc Cưới' },
  ]

  return (
    <section id="photos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Ảnh Cưới
          </h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những khoảnh khắc đẹp nhất được lưu giữ mãi mãi
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-wedding-gold text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium">{photo.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
              >
                ×
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

