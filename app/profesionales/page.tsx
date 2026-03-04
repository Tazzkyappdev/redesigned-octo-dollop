'use client'

import { useState, useEffect } from 'react'
import { Footer } from '../../src/components/layout'
import { Hero, Benefits, Process, Steps, EarlyAccess, FAQ, CTASection } from '../../src/components/sections'

export default function Profesionales() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(186, 219, 58, 0.15) 0%, rgba(186, 219, 58, 0.05) 20%, transparent 50%), linear-gradient(to bottom right, #000000, #1a1a1a, #000000)`
      }}
      suppressHydrationWarning
    >
      <main>
        <section id="inicio"><Hero /></section>
        <section id="nuestro-sistema"><Benefits /></section>
        <section id="tus-reglas"><Process /></section>
        <section id="herramientas"><Steps /></section>
        <section id="faq"><FAQ /></section>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
