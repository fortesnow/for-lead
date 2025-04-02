'use client'

import { motion } from 'framer-motion'
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react'
// ファンタジーアイコンをインポート
import { GiMagicSwirl, GiSpellBook, GiFireRing, GiMagicGate, GiCrystalBall } from 'react-icons/gi'

// 各単語をspanで囲むための関数 -> 単語ごとのアニメーションは冗長なため、一旦コメントアウト
/*
const WordWrapper = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(/(\s+)/).map((word, index) => (
        <motion.span
          key={index}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </>
  )
};
*/

const ProblemStatementSection = () => {
  const painPoints = [
    {
      type: 'image',
      imageSrc: '/images/lp4.png',
      altText: '何から始めればいいか分からない',
      text: '「副業始めたいけど、何から手を付ければ…？」最初の一歩が重くて踏み出せない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-5.png',
      altText: '作業時間と成果が見合わない',
      text: '「毎日頑張ってるのに、全然稼げない…」費やした時間と労力が報われない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-6.png',
      altText: '自分のやり方に自信が持てない',
      text: '「このやり方で本当に合ってるのかな…？」成果が出ないと、全てが間違いに思えてくる…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-8.png',
      altText: '情報収集だけで疲弊してしまう',
      text: '「どの情報が正しいの？」SNSやブログ…情報が多すぎて、結局何も始められない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-7.png',
      altText: '孤独な作業でモチベーションが低下',
      text: '「一人で黙々と作業…もう限界かも…」相談相手もいなくて、やる気が続かない…'
    },
  ]

  // 画像のアニメーション: 左右からのスライドイン + フェードイン
  const imageVariants = (index: number) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" } // 標準的なイージングに変更
    }
  });

  // テキストエリアのアニメーション: 下からのスライドイン + フェードイン
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 } // 標準的なイージングに変更
    },
  };

  // セクションタイトル用アニメーション
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // --- Challenges.tsxから移植するパーティクルアニメーション関連のコード --- START
  const [particlesEnabled, setParticlesEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Array<{
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number
  }>>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return
    const canvas = canvasRef.current
    const colors = ['#7e57c2', '#ffd54f', '#42a5f5', '#b39ddb'] // 色はお好みで調整
    const newParticles = Array(80).fill(0).map(() => ({ // パーティクル数を調整 (例: 80)
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      size: Math.random() * 2.5 + 0.5, // サイズを微調整
      speedX: (Math.random() - 0.5) * 0.3, // 速度を微調整
      speedY: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.1 // 透明度を微調整
    }))
    setParticles(newParticles)
  }, [particlesEnabled])

  useEffect(() => {
    if (!canvasRef.current || !particlesEnabled || particles.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    let animationId: number;
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        const newX = particle.x + particle.speedX
        const newY = particle.y + particle.speedY
        particle.x = newX < 0 ? canvas.width : newX > canvas.width ? 0 : newX
        particle.y = newY < 0 ? canvas.height : newY > canvas.height ? 0 : newY
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [particlesEnabled, particles])

  useEffect(() => {
    const timer = setTimeout(() => {
      setParticlesEnabled(true)
    }, 300) // 少し早めに開始 (例: 300ms)
    return () => clearTimeout(timer)
  }, [])
  // --- パーティクルアニメーション関連のコード --- END

  return (
    <section className="bg-[var(--background)] text-white overflow-hidden relative py-12 md:py-20">
      {/* ファンタジーアイコンの装飾 */}
      <div className="absolute w-full h-full pointer-events-none z-10">
        {/* 左側のアイコン */}
        <motion.div 
          className="absolute top-20 left-[5%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GiMagicSwirl size={36} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 left-[8%] text-[var(--primary)] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GiSpellBook size={28} />
        </motion.div>
        
        {/* 右側のアイコン */}
        <motion.div 
          className="absolute top-40 right-[6%] text-[var(--magic)] opacity-60"
          initial={{ opacity: 0, y: -20, rotate: -10 }}
          whileInView={{ opacity: 0.6, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GiFireRing size={32} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 right-[7%] text-[var(--accent-light)] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GiMagicGate size={30} />
        </motion.div>
        
        {/* 中央下部のアイコン */}
        <motion.div 
          className="absolute bottom-20 left-[48%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <GiCrystalBall size={40} />
        </motion.div>
      </div>

      {/* アニメーション付き背景パターン -> コメントアウトまたは削除 */}
      {/* <div className="absolute inset-0 animated-bg-pattern z-0"></div> */}
      {/* <div className="absolute inset-0 bg-radial-pattern opacity-10 z-0"></div> */}

      {/* パーティクルキャンバスを追加 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      ></canvas>

      {/* コンテンツコンテナ (z-indexで背景の上に) */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center pb-12 md:pb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight magic-text-glow text-white">
            なぜ、あなたの副業は<br className="md:hidden" />「<span className="text-[var(--accent)]">頑張っているのに</span>」<br className="hidden md:block"/> 成果が出ないのか？
          </h2>
          <p className="font-sans text-lg text-gray-300 max-w-3xl mx-auto">
            「もっと稼ぎたい」「自由に働きたい」… その想いは本物なのに、なぜか結果に繋がらない。
            あなたも、こんな「<strong className="font-semibold">目に見えない壁</strong>」にぶつかっていませんか？
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-20 lg:space-y-28">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center"
              // 各ペアの親要素にアニメーションを設定する代わりに、子要素に直接設定
            >
              <motion.div
                className={`w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} group`}
                variants={imageVariants(index)} // 画像用アニメーション適用
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                {point.type === 'image' && (
                  <div className={`relative w-full h-[250px] sm:h-[300px] md:h-[320px] lg:h-[380px] rounded-lg overflow-hidden shadow-lg border border-[var(--border)] bg-black/20`}>
                    <Image
                      src={point.imageSrc!}
                      alt={point.altText!}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="transition-transform duration-500 group-hover:scale-105 object-contain p-2"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
              </motion.div>

              {/* テキストエリア */}
              <motion.div
                className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} px-2 md:px-4`}
                variants={textVariants} // テキスト用アニメーション適用
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // 画像とほぼ同時に発動
              >
                <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-100 leading-relaxed md:leading-loose text-center md:text-left group-hover:text-white transition-colors duration-300">
                  {/* <WordWrapper text={point.text} /> */}
                  {point.text} {/* テキストを直接表示 */} 
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} // フェードイン + スライドイン
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // 少し遅れて開始
          className="text-center py-12 md:py-20"
        >
          <p className="font-sans text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            これらの「壁」の正体は、多くの場合<strong className="font-semibold text-[var(--accent-light)]">「あなたに合った正しい進め方を知らない」</strong>ことと<strong className="font-semibold text-[var(--accent-light)]">「一人で抱え込んでしまう」</strong>ことにあります。
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatementSection; 