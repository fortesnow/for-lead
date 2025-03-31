'use client'

import React from 'react'
import { useParallax } from 'react-scroll-parallax'

export default function ZigzagLines() {
  const line1 = useParallax<HTMLDivElement>({ speed: -10 })
  const line2 = useParallax<HTMLDivElement>({ speed: 5 })
  const line3 = useParallax<HTMLDivElement>({ speed: -15 })

  return (
    <div className="zigzag-container">
      <div ref={line1.ref} className="zigzag-line zigzag-line-1"></div>
      <div ref={line2.ref} className="zigzag-line zigzag-line-2"></div>
      <div ref={line3.ref} className="zigzag-line zigzag-line-3"></div>
    </div>
  )
} 