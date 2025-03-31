'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import CustomCursor from './CustomCursor'
import ScrollController from './ScrollController'

export default function ClientComponents() {
  return (
    <ParallaxProvider>
      <CustomCursor />
      <ScrollController />
    </ParallaxProvider>
  )
} 