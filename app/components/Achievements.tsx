'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiTrophyCup, GiMagicSwirl, GiMountainClimbing, GiBinoculars } from 'react-icons/gi'

const achievements = [
  {
    icon: <GiTrophyCup className="text-[var(--accent)] text-4xl" />,
    title: '成功者輩出数',
    value: '1,200+',
    suffix: '人',
    description: '私たちのプログラムを通じて、副業で成果を出した方の数です。あなたも続こう！'
  },
  {
    icon: <GiMagicSwirl className="text-[var(--magic)] text-4xl" />,
    title: 'サポート満足度',
    value: '98.2',
    suffix: '%',
    description: '参加者アンケートでの満足度。丁寧なサポートであなたの成功を後押しします。'
  },
  {
    icon: <GiMountainClimbing className="text-[var(--accent)] text-4xl" />,
    title: '目標達成スピード',
    value: '3',
    suffix: 'ヶ月以内',
    description: '多くの方が３ヶ月以内に最初の収益目標（月5万円など）を達成しています。'
  },
  {
    icon: <GiBinoculars className="text-[var(--magic)] text-4xl" />,
    title: '対応ジャンル数',
    value: '20+',
    suffix: '分野',
    description: 'ブログ、SNS運用、デザイン、プログラミングなど、多様な副業に対応可能です。'
  }
]

export default function Achievements() {
  const [ref, isInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2 
  })
  
  // 数字のカウントアップアニメーション用の参照
  const countRefs = useRef<(HTMLSpanElement | null)[]>([])
  
  useEffect(() => {
    if (isInView) {
      countRefs.current.forEach((ref, index) => {
        if (!ref) return
        
        const achievement = achievements[index]
        const value = parseFloat(achievement.value.replace(/,/g, ''))
        const duration = 2000 // 2秒かけてアニメーション
        const frameDuration = 1000 / 60 // 60FPS
        const totalFrames = Math.round(duration / frameDuration)
        
        let frame = 0
        let currentValue = 0
        
        const animate = () => {
          frame++
          const progress = frame / totalFrames
          // イージング関数（cubicOut）
          const t = 1 - progress
          const easedProgress = 1 - t * t * t
          
          currentValue = value * easedProgress
          
          if (Number.isInteger(value)) {
            ref.textContent = Math.floor(currentValue).toLocaleString()
          } else {
            ref.textContent = currentValue.toFixed(1)
          }
          
          if (frame < totalFrames) {
            requestAnimationFrame(animate)
          }
        }
        
        requestAnimationFrame(animate)
      })
    }
  }, [isInView])

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--secondary)]" style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.2)' }}>
      {/* 背景の星空効果 */}
      <div className="fantasy-stars" style={{ opacity: 0.2 }}></div>
      
      {/* 魔法の装飾ライン */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--primary)] via-[var(--magic)] to-[var(--primary)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--primary)] via-[var(--magic)] to-[var(--primary)]"></div>
      
      {/* 魔法陣装飾 */}
      <div 
        className="absolute right-0 top-0 h-full w-[200px]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='100' cy='100' r='80' stroke='%237e57c2' stroke-width='1' fill='none'/%3E%3Ccircle cx='100' cy='100' r='60' stroke='%23ffd54f' stroke-width='1' stroke-dasharray='5,3' fill='none'/%3E%3Cpath d='M50,100 L150,100 M100,50 L100,150' stroke='%237e57c2' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y',
          opacity: 0.1
        }}
      ></div>
      
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="font-serif text-4xl font-bold inline-block magic-glow text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            確かな<span className="text-[var(--accent)]">実績</span>と<span className="text-[var(--primary)]">信頼</span>のサポート
          </motion.h2>
          <motion.p
            className="font-sans mt-4 text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong className="font-semibold">絵空事ではありません。</strong> 私たちのプログラムとサポートによって、
            <strong className="font-semibold">着実に成果を出している方々</strong>がいます。次はあなたの番です。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg border border-[var(--border)] text-center hover:transform hover:scale-105 transition-all duration-300 magic-aura"
              style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.4)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--dark-accent)] mb-4 mx-auto">
                {achievement.icon}
              </div>
              
              <h3 className="font-sans text-lg font-medium mb-2 text-[var(--accent)]">{achievement.title}</h3>
              
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span 
                  ref={(el) => { countRefs.current[index] = el }}
                  className="font-serif text-3xl font-bold text-white"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  0
                </span>
                <span className="font-serif text-2xl font-bold text-white">{achievement.suffix}</span>
              </div>
              
              <p className="font-sans text-sm text-gray-300">{achievement.description}</p>
              
              {/* 装飾ライン */}
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full"></div>
            </motion.div>
          ))}
        </div>
        
        {/* 魔法の装飾要素 */}
        <div 
          className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--magic)] animate-pulse"
          style={{ opacity: 0.1 }}
        ></div>
        <div 
          className="absolute top-20 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--magic)] animate-pulse" 
          style={{ opacity: 0.1, animationDelay: '1s' }}
        ></div>
      </div>
    </section>
  )
} 