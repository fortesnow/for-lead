'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax' // パララックスを背景に使用

// アニメーション Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // 子要素の遅延を少し増やす
      ease: "easeInOut", // 全体的にスムーズに
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // 開始Y位置を少し下に
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // アニメーション時間を少し長く
      ease: "easeInOut", // 標準的なイージングに変更
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 }, // Y軸も少し追加
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180, // 少し柔らかく
      damping: 18,
      delay: 0.75, // 他の要素より少し遅れて表示 (itemVariants * 3 + stagger)
    },
  },
  hover: { // ホバー時のスケールアップのみに
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 15 
    }
  },
  tap: { // タップ時のスケールダウン
    scale: 0.98
  }
};

function HeroContent() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* 背景画像とオーバーレイ */}
      <ParallaxProvider>
        <Parallax speed={-10} className="absolute inset-0 z-0"> {/* 速度を少し緩やかに */}
          <Image
            src="/images/overview.png"
            alt="副業RPGの背景イメージ"
            fill
            priority
            className="object-cover filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div> {/* グラデーションを少し薄く */}
          {/* <div className="absolute inset-0 hero-bg-shine"></div> */} {/* 激しい光アニメーションは一旦コメントアウト */}
        </Parallax>
      </ParallaxProvider>

      {/* コンテンツ */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // viewport={{ once: true }} // アニメーションを1回のみにする場合は追加
      >
        {/* タイトル */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl font-bold mb-6 text-shadow-lg"
          variants={itemVariants}
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          副業<span className="text-[var(--primary)]">RPG</span>
        </motion.h1>

        {/* サブタイトル */}
        <motion.p
          className="font-sans text-xl md:text-2xl text-gray-200 mb-8 text-shadow-md"
          variants={itemVariants}
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
        >
          ゼロから<strong className="font-semibold text-[var(--primary)]">月5万円</strong>を目指す、<strong className="font-semibold text-[var(--primary)]">実践型</strong>副業プログラム
        </motion.p>

        {/* 説明文 */}
        <motion.p
          className="font-sans text-lg md:text-xl mt-2 mb-10 text-gray-300 text-shadow-sm"
          variants={itemVariants}
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
        >
          <strong className="font-semibold">3つの収益化戦略</strong>で、あなたの才能を今すぐ形にしよう。
        </motion.p>

        {/* CTAボタン */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.open('https://line.me/R/ti/p/@youraccount', '_blank');
          }}
          className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[var(--accent)] to-[#ffc107] text-[#331a00] font-bold rounded-full shadow-xl text-xl transform transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]"
          variants={buttonVariants}
          initial="hidden" // initialを追加
          animate="visible" // animateを追加
          whileHover="hover" // ホバー時のアニメーションを指定
          whileTap="tap" // タップ時のアニメーションを指定
        >
          <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          LINEで冒険の地図を受け取る
        </motion.a>
        <motion.p
          className="mt-5 text-sm text-gray-400"
          variants={itemVariants} // 他のテキストと同じアニメーションを適用
        >
          ※ 登録は簡単30秒！無料特典を今すぐGET！
        </motion.p>
      </motion.div>
    </section>
  )
}

// メインコンポーネント (変更なし)
export default function Hero() {
  return <HeroContent />;
} 