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
              className="font-serif text-4xl md:text-6xl font-bold mb-3 p5-shadow magic-aura text-white"
            >
              副業<span className="text-[var(--primary)]">RPG</span>
            </h1>
            <div className="w-24 h-1 bg-[var(--primary)] mb-6"></div>
            <motion.p 
              className="font-sans text-lg md:text-xl text-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 10 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              ゼロから<strong className="font-semibold text-[var(--primary)]">月5万円</strong>を目指す、<strong className="font-semibold text-[var(--primary)]">実践型</strong>副業プログラム
            </motion.p>
            <motion.p 
              className="font-sans text-base md:text-lg mt-2 text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 10 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <strong className="font-semibold">3つの収益化戦略</strong>で、あなたの才能を今すぐ形にしよう
            </motion.p>
          </motion.div>

          {/* キーワード */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: showTitle ? 1 : 0, x: showTitle ? 0 : -30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <ul className="space-y-2 font-sans">
              <li className="flex items-center p5-list-item text-gray-200">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span><strong className="font-semibold">再現性の高い</strong>スキルで副収入を実現</span>
              </li>
              <li className="flex items-center p5-list-item text-gray-200">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span><strong className="font-semibold">スキマ時間</strong>を有効活用して収入アップ</span>
              </li>
              <li className="flex items-center p5-list-item text-gray-200">
                <span className="inline-block w-3 h-3 bg-[var(--accent)] mr-3 rounded-full"></span>
                <span>あなたの<strong className="font-semibold">得意なこと</strong>が収入源に変わる</span>
              </li>
            </ul>
          </motion.div>

          {/* CTAボタン */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: showTitle ? 1 : 0, scale: showTitle ? 1 : 0.9 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="animate-on-scroll flex flex-col md:flex-row gap-4"
            data-animation="fadeIn"
          >
            <motion.a 
              href="#" 
              className="p5-button magic-aura relative overflow-hidden group"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://line.me/R/ti/p/@youraccount', '_blank')
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--magic)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="p5-button-content relative z-10 flex items-center font-sans">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                LINEで魔法の冒険に出発する
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--accent)]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a 
              href="#free-support" 
              className="p5-button-secondary relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="p5-button-content relative z-10 font-sans">
                <span>無料サポートを詳しく見る</span>
                <span className="ml-2">↓</span>
              </span>
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showTitle ? 0.8 : 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-4 text-gray-400 text-sm"
          >
            ※ 登録は30秒で完了します。特別なコンテンツが今すぐ手に入ります。
          </motion.p>
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