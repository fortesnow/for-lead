'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const items = [
  {
    title: '魔法の才能発掘',
    description: '自身の隠された才能を発見し、それを魔法のような技術へと進化させましょう。あなたの中に眠る力を見出すサポートをします。',
    icon: '/images/item1.svg',
  },
  {
    title: '冒険への第一歩',
    description: '新たな冒険を始めるための基礎知識とスキルを習得できます。未知の領域へ足を踏み入れる勇気を持ちましょう。',
    icon: '/images/item2.svg',
  },
  {
    title: '魔力向上プログラム',
    description: '才能を磨き、あなたの魔力（スキル）を高めるための特別なトレーニングを提供します。実践的な経験を積むことができます。',
    icon: '/images/item3.svg',
  },
  {
    title: '一流の冒険者育成',
    description: '専門的な冒険者としての道を進むためのノウハウを学び、真の実力を身につけましょう。成功への道標となります。',
    icon: '/images/item4.svg',
  },
]

export default function Items() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // 星の装飾用参照
  const starsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
    
    // 星のきらめきエフェクト
    if (starsRef.current && typeof window !== 'undefined') {
      const stars = starsRef.current.querySelectorAll('.fantasy-star')
      stars.forEach((star) => {
        const delay = Math.random() * 3
        const duration = 1.5 + Math.random() * 1.5
        
        star.animate(
          [
            { opacity: 0.2, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1.1)' },
            { opacity: 0.2, transform: 'scale(0.8)' },
          ],
          {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'ease-in-out',
          }
        )
      })
    }
  }, [controls, inView])

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--secondary)] bg-opacity-30">
      {/* ファンタジー要素の装飾 */}
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px), radial-gradient(var(--magic) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }}
      ></div>
      
      {/* 魔法の円 - 背景装飾 */}
      <div className="absolute left-0 top-0 h-full w-[300px] opacity-10" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='100' stroke='%237e57c2' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='150' r='140' stroke='%2342a5f5' stroke-width='1' stroke-dasharray='10,5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y'
        }}
      ></div>
      
      {/* 星の装飾 */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {Array(20).fill(0).map((_, i) => (
          <div 
            key={i}
            className="fantasy-star absolute text-[var(--accent)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 16}px`,
              opacity: 0.2,
              transform: 'rotate(45deg)'
            }}
          >
            ✦
          </div>
        ))}
      </div>
      
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--magic)] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold relative inline-block p5-title magic-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            冒険の<span className="text-[var(--accent)]">魔法</span>道具
          </motion.h2>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            副業冒険に旅立つ際に必要な魔法のアイテムをご用意しています。
            これらのアイテムを使いこなすことで、あなたの冒険は大きく変わるでしょう。
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="border border-[var(--border)] bg-[var(--secondary)] rounded-lg p-6 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(126,87,194,0.3)] transition-all duration-300 fantasy-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="rounded-full w-16 h-16 bg-[var(--dark-accent)] flex items-center justify-center mb-6 mx-auto magic-aura">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="text-[var(--magic)]"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center relative">
                {item.title}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full"></span>
              </h3>
              <p className="text-gray-300 text-center mb-4">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 