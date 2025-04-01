'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
// import Image from 'next/image' // Imageコンポーネントは不要になる

const items = [
  {
    title: '高単価スキル習得プラン',
    description: '未経験からでも市場価値の高いスキルを習得し、高単価な案件を獲得するためのロードマップ。'
  },
  {
    title: '自動収益化システム構築',
    description: 'あなたが寝ている間にも収入を生み出す、ブログやSNSを活用した仕組み作りのノウハウ。'
  },
  {
    title: '継続サポートコミュニティ',
    description: '挫折しない！仲間と情報交換しながらモチベーションを維持し、継続的に成果を出す環境。'
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
  // 星の位置とスタイルの状態を保持
  const [stars, setStars] = useState<Array<{top: string, left: string, fontSize: string}>>([])
  
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
    
    // サーバー/クライアント間の違いを避けるため、クライアント側のみで実行
    if (typeof window === 'undefined') return
    
    // 星の位置とスタイルをクライアントサイドでのみ生成
    setStars(Array(20).fill(0).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${8 + Math.random() * 16}px`,
    })))
    
    // 星のきらめきエフェクト
    if (starsRef.current && typeof window !== 'undefined') {
      const starElements = starsRef.current.querySelectorAll('.fantasy-star')
      starElements.forEach((star) => {
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
    <section className="py-24 relative overflow-hidden bg-[var(--secondary)]" style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.3)' }}>
      {/* ファンタジー要素の装飾 */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px), radial-gradient(var(--magic) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
          opacity: 0.05
        }}
      ></div>
      
      {/* 魔法の円 - 背景装飾 */}
      <div 
        className="absolute left-0 top-0 h-full w-[300px]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='100' stroke='%237e57c2' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='150' r='140' stroke='%2342a5f5' stroke-width='1' stroke-dasharray='10,5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-y',
          opacity: 0.1
        }}
      ></div>
      
      {/* 星の装飾 - クライアントサイドでのみ表示 */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div 
            key={i}
            className="fantasy-star absolute text-[var(--accent)]"
            style={{
              top: star.top,
              left: star.left,
              fontSize: star.fontSize,
              opacity: 0.2,
              transform: 'rotate(45deg)'
            }}
          >
            ✦
          </div>
        ))}
      </div>
      
      <div 
        className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--magic)] to-transparent"
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="font-serif text-4xl font-bold relative inline-block p5-title magic-glow text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            あなたの副業を<span className="text-[var(--accent)]">加速</span>させる！<br className="md:hidden"/>３つの<span className="text-[var(--primary)]">収益化戦略</span>
          </motion.h2>
          <motion.p
            className="font-sans mt-4 text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            机上の空論ではありません。私たちが提供するのは、あなたの<strong className="font-semibold">収入をブースト</strong>し、
            <strong className="font-semibold">理想の働き方</strong>を実現するための具体的な「<strong className="font-semibold">武器</strong>」です。
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
              className="border border-[var(--border)] rounded-lg p-6 transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(126,87,194,0.4)] transition-all duration-300 fantasy-card flex flex-col"
              style={{ backgroundColor: 'var(--secondary)' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <div className="rounded-full w-16 h-16 bg-gray-600 flex items-center justify-center mb-6 mx-auto magic-aura flex-shrink-0">
                {/* Imageコンポーネントを削除し、代わりに背景色をつける */}
                {/* <span className="text-gray-400 text-2xl">?</span> */}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 text-center relative text-white">
                {item.title}
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full"></span>
              </h3>
              <p className="font-sans text-gray-300 text-center mb-4 flex-grow">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="font-serif text-2xl font-bold mb-6 text-white">
            この<span className="text-[var(--accent)]">3つの戦略</span>、<br className="md:hidden"/><strong className="font-semibold">無料</strong>で<strong className="font-semibold">さらに詳しく</strong>知りたくありませんか？
          </h3>
          <p className="font-sans max-w-2xl mx-auto text-lg mb-8 text-gray-300">
            副業成功の鍵は、<strong className="font-semibold">正しい戦略と継続できる環境</strong>です。
            LINE登録で、これら3つの戦略の詳細解説と、<strong className="font-semibold">すぐに使えるテンプレート</strong>をプレゼント！
          </p>
          
          <div className="inline-block relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--magic)] rounded-lg blur-md"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://line.me/R/ti/p/@youraccount', '_blank')
              }}
              className="relative bg-[var(--secondary)] text-white font-bold py-4 px-10 rounded-lg inline-block border border-[var(--border)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center font-sans">
                <svg className="w-5 h-5 mr-2 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-[var(--accent)] font-semibold">LINE登録して</span><span className="ml-2">詳細ガイドと特典を受け取る</span>
              </span>
            </motion.a>
          </div>
          
          <p className="mt-4 text-sm text-gray-400">
            ※ 登録は無料です。特別なノウハウを今すぐゲット！
          </p>
        </motion.div>
      </div>
    </section>
  )
} 