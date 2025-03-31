'use client'

import { useEffect } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { motion } from 'framer-motion'

// 静的インポート
import Hero from './components/Hero'
import Items from './components/Items'
import Challenges from './components/Challenges'
import Achievements from './components/Achievements'
import FinalCta from './components/FinalCta'
import ProblemStatementSection from './components/ProblemStatementSection'

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

// 個別無料サポートセクションコンポーネント
const FreeSupportSection = () => {
  return (
    <section id="free-support" className="py-24 bg-gradient-to-b from-[var(--background)] to-[var(--secondary-dark)] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath fill=\'%237e57c2\' fill-opacity=\'0.1\' d=\'M0 40 L40 0 H20 L0 20 Z M40 40 V20 L20 40 Z\'/%3E%3C/svg%3E")' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左側: 画像 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <Image
              src="/images/lp3.png"
              alt="個別無料徹底サポート"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl border-4 border-[var(--accent)] magic-glow-image"
              priority
            />
          </motion.div>

          {/* 右側: テキストとCTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight magic-text-glow">
              <span className="text-[var(--accent)]">独り</span>で悩むのは、<br />もう<span className="text-[var(--accent)]">終わり</span>にしませんか？
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              副業への道は、予期せぬ課題や孤独との戦いです。「何から始めれば？」「この方向で合ってる？」「もっと効率的な方法は？」…そんなあなたの<span className="font-semibold text-[var(--accent-light)]">具体的な悩み</span>に、経験豊富な専門家が<span className="font-semibold text-[var(--accent-light)]">マンツーマン</span>で寄り添い、成功への最短ルートを照らします。
            </p>
            <ul className="space-y-3 mb-10 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                あなたの現状に合わせた<span className="font-medium text-white mx-1">具体的なアクションプラン</span>を策定
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                つまずきやすいポイントを<span className="font-medium text-white mx-1">事前に回避</span>する戦略を提供
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                モチベーション維持の秘訣と<span className="font-medium text-white mx-1">継続的なサポート</span>をお約束
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126, 87, 194, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full lg:w-auto bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl hover:from-[var(--accent-dark)] hover:to-[var(--accent)]"
            >
              今すぐ個別無料サポートに申し込む
            </motion.button>
            <p className="text-sm text-gray-400 mt-4">※無理な勧誘は一切ありません。安心してお申し込みください。</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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
      <ProblemStatementSection />
      <FreeSupportSection />
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
