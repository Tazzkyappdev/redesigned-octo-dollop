'use client'

import React from 'react'
import { SplashScreen } from './ui'

export function ClientRoot({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = React.useState(true)

  React.useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {showSplash && <SplashScreen />}
      {children}
    </>
  )
}


