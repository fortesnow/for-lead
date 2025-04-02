'use client'

import { motion } from 'framer-motion'
import { useParallax, ParallaxProvider } from 'react-scroll-parallax'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
// ファンタジーアイコンをインポート - 必要なアイコンのみをインポート
import { GiCrystalBall, GiMagicPortal, GiSpellBook, GiFireGem, GiMagicLamp } from 'react-icons/gi'

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
    <section ref={sectionRef} className="relative py-12 md:py-24 bg-[var(--background)] overflow-hidden">
      {/* ファンタジーアイコンの追加装飾 */}
      <div className="absolute w-full h-full pointer-events-none z-20">
        <motion.div 
          className="absolute top-10 left-[15%] text-[var(--magic)] opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <GiCrystalBall size={28} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-[12%] text-[var(--accent)] opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <GiMagicPortal size={32} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-[8%] text-[var(--primary)] opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <GiSpellBook size={30} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-[20%] text-[var(--accent-light)] opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
        >
          <GiFireGem size={26} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-[40%] text-[var(--magic)] opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <GiMagicLamp size={34} />
        </motion.div>
      </div>

      {/* 背景パターン */}
      <div 
        ref={parallaxBg.ref} 
        className="absolute inset-0 p5-bg-pattern" 
        style={{ opacity: 0.1 }}
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
                  className="font-serif text-4xl font-bold mb-6 text-white"
                >
                  なぜ多くの人が<span className="text-[var(--accent)]">副業でつまずく</span>のか
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
              <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-300 font-sans">
                多くの人が副業で挫折する最大の理由—それは<strong className="font-semibold">「誰に届けるか」</strong>が曖昧なまま始めてしまうこと。
              </p>
              <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-300 font-sans">
                自分のスキルだけに焦点を当て、<strong className="font-semibold">相手のニーズ</strong>を見落としがち。これは宝の地図を持たずに冒険に出るようなもの。
              </p>
              <p className="leading-relaxed mb-4">
                成功する副業とは、あなたの才能と情熱が<span className="text-[var(--accent)]">お客様の切実な悩み</span>と出会うときに生まれる、<br/>
                小さくても確かな「価値の交換」なのです。
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* 画像セクション */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-8 md:mt-16 mb-8 md:mb-12 flex justify-center relative z-10"
        >
          <Image
            src="/images/lp-10.png"
            alt="売れる副業の設計図"
            width={600}
            height={400}
            className="rounded-lg shadow-lg border border-[var(--border)] object-contain bg-[rgba(0,0,0,0.5)]"
          />
        </motion.div>

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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center border-t border-[var(--border)] pt-6 md:pt-12 relative z-10"
        >
          <h3 className="font-serif text-xl md:text-3xl font-bold mb-4 md:mb-6 inline-block text-white">
            <span className="text-[var(--accent)]">売れる副業</span>の設計図を手に入れませんか？
          </h3>
          <p className="font-sans text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            LINE登録で<strong className="font-semibold">「あなたに刺さる！コンセプト設計シート」</strong>を<strong className="font-semibold">無料プレゼント</strong>！
            <strong className="font-semibold">個別相談</strong>で、あなたの副業の方向性を明確にします。
          </p>
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.open('https://line.me/R/ti/p/@youraccount', '_blank')
            }}
            className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold rounded-full inline-block shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126, 87, 194, 0.7)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center font-sans">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              LINE登録して設計図を受け取る
            </span>
          </motion.a>
          <p className="mt-4 text-sm text-gray-400">※ 登録は無料です。いつでも解除できます。</p>
        </motion.div>
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