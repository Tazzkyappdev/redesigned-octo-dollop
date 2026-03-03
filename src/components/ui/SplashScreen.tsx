'use client'

import React from 'react'

export const SplashScreen: React.FC = () => {
  const [progress, setProgress] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 8 + 4, 100)
        return next
      })
    }, 120)

    const hideTimeout = setInterval(() => {
      if (!mounted) return
      if (progress >= 100) {
        setIsVisible(false)
      }
    }, 150)

    return () => {
      mounted = false
      clearInterval(interval)
      clearInterval(hideTimeout)
    }
  }, [progress])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="w-full max-w-xs px-6 text-center">
        <img
          src="/Logo Principal Horizontal (3).png"
          alt="Tazzky"
          className="mx-auto mb-6 h-12 w-auto"
        />
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#BADB3A] transition-[width] duration-150 ease-out"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">Cargando... {Math.round(progress)}%</div>
      </div>
    </div>
  )
}


