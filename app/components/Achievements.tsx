'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiTrophyCup, GiMagicSwirl, GiMountainClimbing, GiBinoculars } from 'react-icons/gi'

const achievements = [
  {
    icon: <GiTrophyCup className="text-[var(--accent)] text-4xl" />,
    title: '魔法のスキル習得',
    value: '1,200+',
    suffix: '人',
    description: '魔法のスキルを身につけ、副業冒険で成功した冒険者たち'
  },
  {
    icon: <GiMagicSwirl className="text-[var(--magic)] text-4xl" />,
    title: '宝物の発見',
    value: '5.3',
    suffix: '億円+',
    description: '冒険者たちが獲得した副業からの報酬総額'
  },
  {
    icon: <GiMountainClimbing className="text-[var(--accent)] text-4xl" />,
    title: '冒険の達成率',
    value: '92',
    suffix: '%',
    description: '目標を達成した冒険者の割合（業界平均の3倍）'
  },
  {
    icon: <GiBinoculars className="text-[var(--magic)] text-4xl" />,
    title: '新領域の探索',
    value: '20+',
    suffix: '分野',
    description: '冒険者たちが踏み入れた様々なジャンルとカテゴリー'
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
            className="text-4xl font-bold inline-block magic-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            冒険の<span className="text-[var(--accent)]">成果</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            多くの冒険者たちが成功の魔法を手に入れています。
            あなたも仲間になり、この素晴らしい冒険の世界に足を踏み入れましょう。
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
              
              <h3 className="text-lg font-medium mb-2 text-[var(--accent)]">{achievement.title}</h3>
              
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span 
                  ref={(el) => { countRefs.current[index] = el }}
                  className="text-3xl font-bold text-white"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  0
                </span>
                <span className="text-2xl font-bold text-white">{achievement.suffix}</span>
              </div>
              
              <p className="text-sm text-gray-300">{achievement.description}</p>
              
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