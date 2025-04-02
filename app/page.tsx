'use client'

import { useEffect, useState } from 'react'
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
import FinalCta from './components/FinalCta'
import ProblemStatementSection from './components/ProblemStatementSection'
import FloatingCta from './components/FloatingCta'
import TemplateSection from './components/TemplateSection'

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
    <section id="free-support" className="py-24 bg-[var(--background)] text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath fill=\'%237e57c2\' fill-opacity=\'0.1\' d=\'M0 40 L40 0 H20 L0 20 Z M40 40 V20 L20 40 Z\'/%3E%3C/svg%3E")',
          opacity: 0.1
        }}
      ></div>
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight magic-text-glow text-white">
              <span className="text-[var(--accent)]">一人</span>で悩む時間は<br />もう<span className="text-[var(--accent)]">終わりにしませんか</span>？
            </h2>
            <p className="font-sans text-lg text-gray-300 mb-8 leading-relaxed">
              副業の道は孤独です。「これで合ってる？」「もっと良い方法は？」…そんな<strong className="font-semibold text-[var(--accent-light)]">尽きない疑問や不安</strong>に、<strong className="font-semibold text-[var(--accent-light)]">経験豊富なプロ</strong>が<strong className="font-semibold text-[var(--accent-light)]">マンツーマン</strong>で向き合い、<strong className="font-semibold text-[var(--accent-light)]">具体的な解決策</strong>と<strong className="font-semibold text-[var(--accent-light)]">成功への道筋</strong>を示します。
            </p>
            <ul className="font-sans space-y-4 mb-10 text-gray-300">
              <li className="flex flex-wrap items-start">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="flex-1">あなただけの<strong className="font-semibold text-white mx-1">収益化プラン</strong>を一緒に設計</span>
              </li>
              <li className="flex flex-wrap items-start">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="flex-1"><strong className="font-semibold text-white mx-1">よくある失敗パターン</strong>を回避するノウハウを提供</span>
              </li>
              <li className="flex flex-wrap items-start">
                <svg className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="flex-1"><strong className="font-semibold text-white mx-1">モチベーションを維持</strong>し、<strong className="font-semibold text-white mx-1">継続</strong>するための秘訣を伝授</span>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126, 87, 194, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="font-sans w-full lg:w-auto bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg text-xl hover:from-[var(--accent-dark)] hover:to-[var(--accent)]"
              onClick={() => window.open('https://line.me/R/ti/p/@youraccount', '_blank')}
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
  // グリッチエフェクトのトリガーフラグ
  const [shouldGlitch, setShouldGlitch] = useState(false)
  
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
        // Math.randomはクライアントサイドでのみ実行
        if (Math.random() > 0.99) {
          setShouldGlitch(true)
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  
  // shouldGlitchフラグが変更されたときに実際にエフェクトを適用
  useEffect(() => {
    if (shouldGlitch && typeof window !== 'undefined') {
      document.body.classList.add('glitch-active')
      setTimeout(() => {
        document.body.classList.remove('glitch-active')
        setShouldGlitch(false)
      }, 300)
    }
  }, [shouldGlitch])
  
  return (
    <main className="min-h-screen">
      <div className="glitch-overlay"></div>
      <Hero />
      <ProblemStatementSection />
      <FreeSupportSection />
      <TemplateSection />
      <Suspense fallback={<div className="h-96 bg-black"></div>}>
        <WhatIsPersona />
      </Suspense>
      <Items />
      <Challenges />
      <FinalCta />
      <FloatingCta />
    </main>
  )
}
