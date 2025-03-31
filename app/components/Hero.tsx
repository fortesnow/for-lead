'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useParallax, ParallaxProvider } from 'react-scroll-parallax'
import ZigzagLines from './ZigzagLines'

// パララックス効果を使用するコンポーネント
function HeroContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [starCount, setStarCount] = useState<Array<{size: number, x: number, y: number, animationDelay: number}>>([])
  
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  // パララックス効果
  const parallaxBg = useParallax<HTMLDivElement>({
    speed: -15,
  })
  
  const parallaxTitle = useParallax<HTMLDivElement>({
    speed: -5,
  })
  
  const parallaxStars = useParallax<HTMLDivElement>({
    speed: -20,
  })
  
  // 星のランダム生成は useEffect 内で行う (クライアント側でのみ実行)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    setStarCount(Array.from({ length: 20 }, () => ({
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animationDelay: Math.random() * 5
    })))
  }, [])
  
  // ローディングアニメーション
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowTitle(true), 500)
          setIsLoaded(true)
          return 100
        }
        return prev + 5
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [])
  
  // タイトルのきらめきエフェクト
  useEffect(() => {
    if (!showTitle || !titleRef.current || typeof window === 'undefined') return
    
    const title = titleRef.current
    let glitchInterval: ReturnType<typeof setInterval>
    
    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        title.classList.add('magic-glow')
        setTimeout(() => {
          title.classList.remove('magic-glow')
        }, 300)
      }, 4000)
    }
    
    startGlitch()
    return () => clearInterval(glitchInterval)
  }, [showTitle])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p5-bg-pattern overflow-hidden">
      {/* バックグラウンドのスタイリッシュな要素 */}
      <div ref={parallaxBg.ref} className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-[15%] left-0 h-[15px] w-full bg-[var(--primary)] transform -skew-y-3"
          style={{ opacity: 0.3 }}
        ></div>
        <div 
          className="absolute top-[40%] right-0 h-[20px] w-[80%] bg-[var(--primary)] transform skew-y-3"
          style={{ opacity: 0.2 }}
        ></div>
        <div 
          className="absolute bottom-[20%] left-0 h-[10px] w-[60%] bg-[var(--accent)] transform -skew-y-1"
          style={{ opacity: 0.1 }}
        ></div>
        
        {/* ファンタジー星空の背景 */}
        <div className="fantasy-stars"></div>
        
        {/* グリッドライン */}
        <div className="absolute top-0 left-0 w-full h-full grid-overlay"></div>
        
        {/* パーティクル */}
        <div className="absolute top-0 left-0 w-full h-full particles-overlay"></div>
      </div>
      
      {/* 魔法の星エフェクト - クライアントサイドでのみ表示 */}
      <div ref={parallaxStars.ref} className="absolute w-full h-full pointer-events-none">
        {typeof window !== 'undefined' && starCount.map((star, index) => (
          <div 
            key={index}
            className="absolute bg-[var(--accent)] rounded-full animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0.6,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 213, 79, 0.7)`,
              animationDelay: `${star.animationDelay}s`
            }}
          ></div>
        ))}
      </div>

      <div className="p5-container relative z-10">
        <div className="flex flex-col items-center md:items-start">
          {/* NOW LOADING... テキスト */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full text-center md:text-left"
          >
            <div className="loader-container">
              <p className="text-sm text-[var(--accent)]">
                {isLoaded ? '魔法の準備完了' : '魔法を呼び起こしています...'}
                <span className="loading-percent"> {loadingProgress}%</span>
              </p>
              <div className="loading-bar">
                <div 
                  className="loading-progress" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* メインロゴ/タイトル */}
          <motion.div
            ref={parallaxTitle.ref}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: showTitle ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12 text-center md:text-left"
          >
            <h1 
              ref={titleRef} 
              className="text-4xl md:text-6xl font-bold mb-3 p5-shadow magic-aura"
            >
              副業<span className="text-[var(--primary)]">RPG</span>
            </h1>
            <div className="w-24 h-1 bg-[var(--primary)] mb-6"></div>
            <motion.p 
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 10 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              ゼロから始まる<span className="text-[var(--primary)]">副業の冒険</span>
            </motion.p>
            <motion.p 
              className="text-base md:text-lg mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 10 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              3つの魔法アイテムで今すぐ冒険を始めよう
            </motion.p>
          </motion.div>

          {/* キーワード */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: showTitle ? 1 : 0, x: showTitle ? 0 : -30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <ul className="space-y-2">
              <li className="flex items-center p5-list-item">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span>副収入という魔法を習得</span>
              </li>
              <li className="flex items-center p5-list-item">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span>時間という宝物を有効活用</span>
              </li>
              <li className="flex items-center p5-list-item">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span>あなたの才能で冒険へ</span>
              </li>
            </ul>
          </motion.div>

          {/* CTAボタン */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: showTitle ? 1 : 0, scale: showTitle ? 1 : 0.9 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="animate-on-scroll"
            data-animation="fadeIn"
          >
            <a 
              href="#" 
              className="p5-button magic-aura"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://line.me/R/ti/p/@youraccount', '_blank')
              }}
            >
              <span className="p5-button-content">魔法の冒険に出発する</span>
            </a>
          </motion.div>
        </div>

        {/* デコレーション要素 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute right-4 bottom-4 md:right-12 md:bottom-12 w-24 h-24 rounded-full blur-xl"
          style={{ background: 'radial-gradient(circle, var(--magic) 0%, var(--primary) 70%, transparent 100%)' }}
        />
        
        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <div className="scroll-text">SCROLL</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// メインコンポーネント - ParallaxProviderでラップ
export default function Hero() {
  return (
    <ParallaxProvider>
      <ZigzagLines />
      <HeroContent />
    </ParallaxProvider>
  )
} 