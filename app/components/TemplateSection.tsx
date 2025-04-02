'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GiSpellBook, GiMagicAxe, GiMagicPalm, GiCrystalShine, GiChest } from 'react-icons/gi'

export default function TemplateSection() {
  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* ファンタジーアイコンの装飾 */}
      <div className="absolute w-full h-full pointer-events-none z-10">
        <motion.div 
          className="absolute top-20 left-[10%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GiSpellBook size={32} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 left-[8%] text-[var(--primary)] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GiMagicAxe size={28} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-[6%] text-[var(--magic)] opacity-60"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GiMagicPalm size={36} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 right-[12%] text-[var(--accent-light)] opacity-60"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <GiCrystalShine size={30} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-[40%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <GiChest size={34} />
        </motion.div>
      </div>
      
      {/* 背景装飾 */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, var(--primary) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--accent) 0%, transparent 50%)',
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* 左側: テキスト */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
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
            className="flex justify-center items-center order-1 md:order-2"
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