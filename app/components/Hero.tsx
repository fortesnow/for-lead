'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

// アニメーション Variants
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // 少し長めに
      ease: "easeInOut", // 標準的なイージング文字列に変更
    },
  },
};

function HeroContent() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      {/* 背景画像 */} 
      <ParallaxProvider>
        <Parallax speed={-10} className="absolute inset-0 z-0"> {/* パララックス速度を-10に維持 */}
          <Image
            src="/images/fv.png"
            alt="副業で人生を切り拓くイメージ"
            fill
            priority
            // className="object-cover scale-105"
            // object-position を指定 (デフォルトは center だが明示的に)。モバイルでは特に重要。
            // scale-105 を削除し、不要なクロッピングを減らす。
            className="object-cover object-center" 
          />
          {/* グラデーションオーバーレイ (テキストの可読性のため) */}
          {/* 少し調整: 下部を濃く、上部にも僅かに色を残す */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>
        </Parallax>
      </ParallaxProvider>

      {/* コンテンツ */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-4" // max-w を少し広げる
        initial="hidden"
        animate="visible"
      >
        {/* メインテキスト */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
          // tracking-tight で文字間隔を少し詰める
          // bg-gradient-to-b from-white to-gray-300 で白からグレーへのグラデーション
          // bg-clip-text text-transparent でテキストにグラデーションを適用
          style={{
            fontFamily: 'var(--font-noto-serif-jp), serif',
            textShadow: '2px 2px 10px rgba(0,0,0,0.8)' // シャドウを少し濃くしてコントラストを維持
          }}
          variants={textVariants}
        >
          副業で、<br className="sm:hidden" />人生を切り拓け
        </motion.h1>
        
        {/* サブテキスト (オプション) */}
        {/* 
        <motion.p
          className="font-sans text-lg sm:text-xl md:text-2xl text-gray-200 text-shadow-md"
          style={{
            textShadow: '1px 1px 5px rgba(0,0,0,0.6)'
          }}
          variants={subtitleVariants}
        >
          ― テンプレートと戦略で、未知なる可能性へ ―
        </motion.p>
        */}

        {/* CTAボタンなどは一旦削除。必要であれば後で追加 */}

      </motion.div>
    </section>
  )
}

export default function Hero() {
  return <HeroContent />;
} 