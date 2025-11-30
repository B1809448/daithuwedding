'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoGalleryProps {
  setActiveSection: (section: string) => void
  isManualScrolling: React.MutableRefObject<boolean>
}

interface Video {
  id: number
  title: string
  thumbnail: string
  videoUrl: string
  duration: string
  category: string
}

// Mock wedding videos
const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Lễ Cưới - Khoảnh Khắc Trọng Đại',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '5:23',
    category: 'ceremony',
  },
  {
    id: 2,
    title: 'Tiệc Cưới - Những Khoảnh Khắc Vui Vẻ',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '8:45',
    category: 'reception',
  },
  {
    id: 3,
    title: 'Hôn Lễ - Lời Hứa Trọn Đời',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '3:12',
    category: 'ceremony',
  },
  {
    id: 4,
    title: 'Nhảy Mở Màn - Tiệc Cưới',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '6:30',
    category: 'reception',
  },
  {
    id: 5,
    title: 'Cắt Bánh Cưới',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '2:15',
    category: 'reception',
  },
  {
    id: 6,
    title: 'Tổng Kết - Ngày Đặc Biệt',
    thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=450&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '10:00',
    category: 'highlights',
  },
]

export default function VideoGallery({ setActiveSection, isManualScrolling }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Chỉ update nếu không phải đang scroll thủ công
          if (entry.isIntersecting && !isManualScrolling.current) {
            setActiveSection('videos')
          }
        })
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('videos')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [setActiveSection, isManualScrolling])

  const filteredVideos = filter === 'all'
    ? mockVideos
    : mockVideos.filter(video => video.category === filter)

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'ceremony', label: 'Lễ Cưới' },
    { id: 'reception', label: 'Tiệc Cưới' },
    { id: 'highlights', label: 'Tổng Hợp' },
  ]

  return (
    <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-wedding-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Video Kỷ Niệm
          </h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những thước phim quý giá ghi lại từng khoảnh khắc đáng nhớ
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

        {/* Video Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-black">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 bg-wedding-gold/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg
                          className="w-10 h-10 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-800 group-hover:text-wedding-gold transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors"
              >
                ×
              </button>
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              >
                Trình duyệt của bạn không hỗ trợ video.
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-semibold">{selectedVideo.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

