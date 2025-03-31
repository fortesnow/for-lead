'use client'

import { motion } from 'framer-motion'
import { useParallax, ParallaxProvider } from 'react-scroll-parallax'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// 内部コンポーネント - useParallaxを使用
function WhatIsPersonaContent() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  // 星の位置を保存するための状態（SSRとCSRで一致させる）
  const [stars] = useState<Array<{position: string, size: string, rotation: number}>>([
    { position: "top-10 left-10", size: "text-2xl", rotation: 12 },
    { position: "bottom-20 left-1/4", size: "text-3xl", rotation: -6 },
    { position: "top-1/3 right-20", size: "text-4xl", rotation: 12 },
    { position: "bottom-10 right-10", size: "text-xl", rotation: -12 }
  ])
  
  const parallaxBg = useParallax<HTMLDivElement>({
    speed: -5,
  })

  const parallaxStars = useParallax<HTMLDivElement>({
    speed: -8,
    rotateZ: [0, 15],
  })
  
  // GSAP アニメーション
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || typeof window === 'undefined') return
    
    const section = sectionRef.current
    const title = titleRef.current
    
    // タイトルのアニメーション
    gsap.fromTo(title, 
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      { 
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
        duration: 1.2, 
        delay: 0.2,
        ease: 'power3.inOut'
      }
    )
    
    // ランダムな星のきらめき
    const stars = section.querySelectorAll('.star')
    stars.forEach((star, index) => {
      gsap.to(star, {
        opacity: 0.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      })
    })
    
    // タイトル下の線のアニメーション
    const line = section.querySelector('.title-line')
    if (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' }
      )
    }
    
    // 魔法のエフェクト
    const magicElements = section.querySelectorAll('.magic-element')
    magicElements.forEach((el, index) => {
      gsap.to(el, {
        boxShadow: '0 0 15px 5px rgba(126, 87, 194, 0.6)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3
      })
    })
    
    return () => {
      // クリーンアップ
      gsap.killTweensOf(title)
      gsap.killTweensOf(stars)
      gsap.killTweensOf(magicElements)
      if (line) gsap.killTweensOf(line)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 bg-[var(--background)] overflow-hidden">
      {/* 背景パターン */}
      <div 
        ref={parallaxBg.ref} 
        className="absolute inset-0 p5-bg-pattern" 
        style={{ opacity: 0.2 }}
      ></div>
      
      {/* 装飾用星アイコン - 固定位置で表示 */}
      <div ref={parallaxStars.ref} className="absolute w-full h-full pointer-events-none">
        {stars.map((star, index) => (
          <div 
            key={index}
            className={`star absolute ${star.position} text-[var(--accent)] ${star.size}`}
            style={{ transform: `rotate(${star.rotation}deg)` }}
          >
            ★
          </div>
        ))}
      </div>

      {/* 装飾ライン */}
      <div 
        className="absolute top-0 left-0 h-[10px] w-full bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--magic)] transform -skew-y-3" 
        style={{ opacity: 0.3 }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 h-[10px] w-full bg-gradient-to-r from-[var(--magic)] via-[var(--primary)] to-[var(--accent)] transform skew-y-3" 
        style={{ opacity: 0.3 }}
      ></div>
      
      {/* 魔法の装飾要素 */}
      <div className="fantasy-stars" style={{ opacity: 0.3 }}></div>
      
      {/* 背景の魔法陣 */}
      <div 
        className="absolute right-0 top-10 w-[180px] h-full bg-repeat-y bg-right" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='60' cy='60' r='50' stroke='%237e57c2' stroke-width='2' fill='none'/%3E%3Ccircle cx='60' cy='60' r='40' stroke='%237e57c2' stroke-width='1' stroke-dasharray='6,3' fill='none'/%3E%3Cpath d='M60,10 L60,110 M10,60 L110,60 M26,26 L94,94 M26,94 L94,26' stroke='%237e57c2' stroke-width='1' opacity='0.7'/%3E%3C/svg%3E")`,
          opacity: 0.1
        }}
      ></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* 左側: タイトル（4カラム分） */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-4 animate-on-scroll relative"
            data-animation="slideFromLeft"
          >
            <div className="relative p-4">
              <div className="absolute inset-0 bg-[var(--secondary)] border border-[var(--border)] rounded-lg transform -skew-x-3"></div>
              <div className="relative">
                <h2 
                  ref={titleRef}
                  className="text-4xl md:text-6xl font-bold mb-4 p5-shadow magic-aura inline-block transform -skew-x-2"
                >
                  <span className="text-white">副業</span>
                  <span className="text-[var(--accent)]">冒険</span>
                  <span className="text-white">とは？</span>
                </h2>
                <div className="title-line w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] mt-4 transform -skew-x-6 origin-left rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* 右側: 説明テキスト（8カラム分） */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-8 animate-on-scroll p5-card magic-aura"
            data-animation="fadeIn"
          >
            <div className="p5-card-content">
              <p className="mb-4 leading-relaxed">
                現実世界での仕事と並行して、あなたの才能や<br/>
                魔法のようなスキルを活かしながら、未知の<br/>
                可能性へと旅立つ新しい冒険のスタイル。<br/>
                この冒険は、あなたの世界を大きく広げるでしょう。
              </p>
              <p className="mb-4 leading-relaxed">
                『副業能力』に目覚めた冒険者たちが出会い、<br/>
                幾多の困難に立ち向かい、成長していく物語の主人公に。
              </p>
              <p className="leading-relaxed">
                『副業冒険』とは、あなたの中に眠る『才能』が『現実の魔法』となって<br/>
                姿を現したもので、新たな未来を切り開く『もうひとつの可能性』です。
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* 魔法の装飾要素 */}
        <div className="absolute left-10 top-10 w-8 h-8 rounded-full magic-element" 
          style={{ 
            background: 'radial-gradient(circle, var(--accent) 0%, var(--primary) 100%)', 
            opacity: 0.4  // 数値として正しく渡される
          }}
        ></div>
        <div className="absolute right-20 bottom-10 w-10 h-10 rounded-full magic-element" 
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, var(--magic) 100%)', 
            opacity: 0.3  // 数値として正しく渡される
          }}
        ></div>
      </div>
    </section>
  )
}

// メインのエクスポートコンポーネント
export default function WhatIsPersona() {
  return (
    <ParallaxProvider>
      <WhatIsPersonaContent />
    </ParallaxProvider>
  )
} 