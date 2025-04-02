'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
// 不要になったアイコンインポートを削除
// import { GiDragonBreath, GiCrystalGrowth, GiFireGem, GiMagicPortal } from 'react-icons/gi'

// アニメーション Variants (元の状態に戻す。easeを文字列に)
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, 
      ease: "easeInOut", // 標準的なイージング文字列に変更
    },
  },
};

function HeroContent() {
  return (
    // h-screen だとモバイルで縦長すぎる場合があるので min-h-screen に戻すことも検討
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-white">
      {/* 背景画像 (Parallax なし) とオーバーレイ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fv.png"
          alt="副業で人生を切り拓くイメージ"
          fill
          priority
          className="object-cover object-[center_top]"
          sizes="100vw"
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>

      {/* 削除: ファンタジーアイコンの装飾 - 絶対配置 */}

      {/* コンテンツ (元のテキストに戻す) */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-4"
        initial="hidden"
        animate="visible"
      >
        {/* メインテキスト */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight tracking-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
          style={{
            fontFamily: 'var(--font-noto-serif-jp), serif',
            textShadow: '2px 2px 10px rgba(0,0,0,0.8)'
          }}
          variants={textVariants}
        >
          副業で、<br className="sm:hidden" />人生を切り拓け
        </motion.h1>

        {/* CTAボタンは一旦削除（元々なかったため） */}

      </motion.div>
    </section>
  );
}

export default function Hero() {
  // 元々ParallaxProviderがあったが削除されたので、シンプルなエクスポートに戻す
  return <HeroContent />;
} 