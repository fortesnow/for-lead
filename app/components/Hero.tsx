'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
// import { Parallax, ParallaxProvider } from 'react-scroll-parallax' // Parallax を削除

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
    // h-screen だとモバイルで縦長すぎる場合があるので min-h-screen に戻すことも検討
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      {/* 背景画像 (Parallax なし) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fv.png"
          alt="副業で人生を切り拓くイメージ"
          fill
          priority
          // className="object-contain object-center sm:object-cover" 
          // object-contain で画像が表示されなくなっているためobject-coverに戻す
          className="object-cover object-[center_top]" // 上部を優先的に表示
          sizes="100vw" // 全画面幅で表示
        />
        {/* グラデーションオーバーレイ */}
        {/* 背景黒塗りを削除して、オーバーレイのみに */}
        {/* <div className="absolute inset-0 bg-black sm:bg-transparent"></div> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div> {/* グラデーション調整 */} 
      </div>

      {/* コンテンツ */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-4"
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