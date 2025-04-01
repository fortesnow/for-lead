'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)
  
  // スクロール位置に基づいて表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // ヘッダーから少し下にスクロールしたら表示
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  if (!isVisible) return null
  
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 text-center md:hidden px-4">
      <motion.a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.open('https://line.me/R/ti/p/@youraccount', '_blank')
        }}
        className="inline-block w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold py-4 rounded-full shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126, 87, 194, 0.7)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          今すぐLINE登録する
        </span>
      </motion.a>
    </div>
  )
} 