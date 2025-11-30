'use client'

import { useState, useRef } from 'react'
import Hero from '@/components/Hero'
import PhotoGallery from '@/components/PhotoGallery'
import VideoGallery from '@/components/VideoGallery'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [useBackground, setUseBackground] = useState(false) // true = background, false = slide
  const isManualScrolling = useRef(false)

  return (
    <main className="min-h-screen">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isManualScrolling={isManualScrolling}
        useBackground={useBackground}
        setUseBackground={setUseBackground}
      />
      <Hero 
        setActiveSection={setActiveSection} 
        isManualScrolling={isManualScrolling}
        useBackground={useBackground}
      />
      <PhotoGallery setActiveSection={setActiveSection} isManualScrolling={isManualScrolling} />
      <VideoGallery setActiveSection={setActiveSection} isManualScrolling={isManualScrolling} />
      <Footer />
    </main>
  )
}

