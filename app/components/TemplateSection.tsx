'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function TemplateSection() {
  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* 背景装飾 */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, var(--primary) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--accent) 0%, transparent 50%)',
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左側: テキスト */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white">
              <span className="text-[var(--accent)]">【LINE登録者限定】</span><br/>
              もう迷わない！<br/>
              <span className="text-[var(--primary)]">1日5分</span>で収益化テンプレート集
            </h2>
            <p className="font-sans text-lg mb-8 text-gray-300 leading-relaxed">
              「何を発信すればいいか分からない…」「コンテンツ作成に時間がかかりすぎる…」<br/>
              そんな悩みを<strong className="font-semibold">即解決</strong>する、<strong className="font-semibold">コピペOK</strong>の実践テンプレート集（ブログ記事、SNS投稿など多数）を<strong className="font-semibold text-[var(--accent-light)]">期間限定</strong>で<strong className="font-semibold text-[var(--accent-light)]">無料プレゼント</strong>！
            </p>
            <p className="font-sans text-lg mb-8 text-gray-300 leading-relaxed">
              これを使えば、<strong className="font-semibold">毎日たった5分</strong>の作業で質の高いコンテンツを継続的に発信し、<strong className="font-semibold">収益化への道を一気に加速</strong>できます。
            </p>
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://line.me/R/ti/p/@youraccount', '_blank')
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold rounded-full shadow-lg text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 221, 128, 0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              LINEで今すぐテンプレート集を受け取る
            </motion.a>
             <p className="mt-4 text-sm text-gray-400">※ 特典は予告なく終了する場合があります。</p>
          </motion.div>

          {/* 右側: 画像 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="flex justify-center items-center"
          >
            <Image 
              src="/images/lp-9.png" 
              alt="1日5分で収益化！テンプレート集"
              width={500} 
              height={500}
              className="rounded-lg shadow-2xl border-4 border-[var(--accent)] object-contain magic-glow-image"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 