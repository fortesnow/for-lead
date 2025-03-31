'use client'

import { useEffect } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// 静的インポート
import Hero from './components/Hero'
import Items from './components/Items'
import Challenges from './components/Challenges'
import Achievements from './components/Achievements'
import FinalCta from './components/FinalCta'

// 動的インポート
const WhatIsPersona = dynamic(() => import('./components/WhatIsPersona'), { ssr: false })

// 安全なGSAP初期化
const initGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    return true
  }
  return false
}

export default function Home() {
  // コンポーネントマウント時に一度だけGSAPを初期化
  useEffect(() => {
    initGSAP()
    
    if (typeof window !== 'undefined') {
      // ページの読み込み時にグリッチエフェクトを発生
      setTimeout(() => {
        document.body.classList.add('glitch-active')
        setTimeout(() => {
          document.body.classList.remove('glitch-active')
        }, 500)
      }, 500)
      
      // グローバルエフェクト: スクロール時のグリッチ
      const handleScroll = () => {
        if (Math.random() > 0.99) {
          document.body.classList.add('glitch-active')
          setTimeout(() => {
            document.body.classList.remove('glitch-active')
          }, 300)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  
  return (
    <main className="min-h-screen">
      <div className="glitch-overlay"></div>
      <Hero />
      <Suspense fallback={<div className="h-96 bg-black"></div>}>
        <WhatIsPersona />
      </Suspense>
      <Items />
      <Challenges />
      <Achievements />
      <FinalCta />
    </main>
  )
}
