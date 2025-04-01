'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaScroll, FaDragon, FaGem, FaMountain } from 'react-icons/fa'
import { MdAutoAwesome } from 'react-icons/md'
import { GiCrystalBall, GiSpellBook, GiFireShrine } from 'react-icons/gi'

const challenges = [
  {
    id: 1,
    icon: <GiCrystalBall className="text-[var(--accent)] text-3xl" />,
    title: '才能の発掘クエスト',
    description:
      '自分の中に眠る才能を見つけるための困難な旅。本当の自分自身と向き合い、隠れた宝を発見する冒険です。',
    solution: '質問術という魔法を使うのが効果的です。的確な質問を自分に投げかけることで、無意識に埋もれた才能を呼び起こせるでしょう。'
  },
  {
    id: 2,
    icon: <FaScroll className="text-[var(--accent)] text-3xl" />,
    title: '古の知識の獲得',
    description:
      '知識という力を手に入れるための試練。迷宮のような情報の海から真に価値あるものを見極める挑戦です。',
    solution: '知識の源泉を見極める賢者の目を持ちましょう。真の知識は古い書物や賢者たちの教えの中に隠されています。'
  },
  {
    id: 3,
    icon: <FaDragon className="text-[var(--accent)] text-3xl" />,
    title: '恐怖の克服',
    description:
      '心の奥底に潜む恐れという龍に立ち向かう戦い。失敗や拒絶への恐れを乗り越えてこそ、真の冒険者となれます。',
    solution: '勇気の魔法の呪文を唱えましょう。小さな一歩から始め、徐々に恐れに立ち向かうことで、心の龍を手なづけることができます。'
  },
  {
    id: 4,
    icon: <GiSpellBook className="text-[var(--accent)] text-3xl" />,
    title: '魔法のスキル習得',
    description:
      '新たなスキルを身につける修行の道。未知の領域に足を踏み入れ、新しい力を手に入れる旅です。',
    solution: '継続の魔法が最も強力です。毎日少しずつでも練習を続けることで、やがて驚くべき魔法を使いこなせるようになるでしょう。'
  },
  {
    id: 5,
    icon: <GiFireShrine className="text-[var(--accent)] text-3xl" />,
    title: '熱情の炎を灯す',
    description:
      'モチベーションの炎を絶やさず燃やし続ける修行。長い冒険の道のりでは、情熱という燃料が必要不可欠です。',
    solution: '目的の神殿を心の中に建てましょう。なぜこの冒険をしているのか、その大切な理由を見失わないことが炎を絶やさない秘訣です。'
  }
]

export default function Challenges() {
  const [activeTab, setActiveTab] = useState(challenges[0].id)
  const [isHovering, setIsHovering] = useState(false)
  const [particlesEnabled, setParticlesEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // パーティクル状態を保持
  const [particles, setParticles] = useState<Array<{
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number
  }>>([])
  
  // パーティクル初期化（クライアントサイドでのみ実行）
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const colors = ['#7e57c2', '#ffd54f', '#42a5f5', '#b39ddb']
    
    // ここでランダム値を生成
    const newParticles = Array(50).fill(0).map(() => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1
    }))
    
    setParticles(newParticles)
  }, [particlesEnabled])
  
  // パーティクルアニメーション
  useEffect(() => {
    if (!canvasRef.current || !particlesEnabled || particles.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // アニメーション関数
    const animate = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // 各パーティクルの位置を更新（状態は更新せず、描画のみで位置を変更）
        const newX = particle.x + particle.speedX
        const newY = particle.y + particle.speedY
        
        // 画面外に出たパーティクルを反対側から入れ直す
        particle.x = newX < 0 ? canvas.width : newX > canvas.width ? 0 : newX
        particle.y = newY < 0 ? canvas.height : newY > canvas.height ? 0 : newY
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    let animationId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [particlesEnabled, particles])
  
  useEffect(() => {
    // コンポーネントがマウントされてから少し遅れてパーティクルを有効化
    const timer = setTimeout(() => {
      setParticlesEnabled(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--background)]">
      {/* 背景魔法陣 */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundSize: '300px 300px',
          backgroundPosition: 'center',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='120' stroke='%237e57c2' stroke-width='1' fill='none'/%3E%3Cpolygon points='150,30 180,110 270,110 195,160 220,250 150,200 80,250 105,160 30,110 120,110' stroke='%23ffd54f' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          opacity: 0.1
        }}
      ></div>
      
      {/* パーティクルキャンバス */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold relative inline-block magic-glow text-white">
            なぜ多くの人が<br className="md:hidden"/><span className="text-[var(--accent)]">副業でつまずく</span>のか？
          </h2>
          <p className="font-sans text-lg max-w-2xl mx-auto mt-4 text-gray-300">
            やる気だけでは乗り越えられない、<strong className="font-semibold">副業特有の壁</strong>が存在します。
            よくある落とし穴と、その<strong className="font-semibold">賢い回避策</strong>を学びましょう。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* タブメニュー（モバイルでは上、PCでは左側） -> モバイルでは下に */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div
              className="bg-[var(--secondary)] border border-[var(--border)] p-4 rounded-lg magic-aura"
              style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.5)' }}
            >
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  className={`p-3 mb-2 rounded-md cursor-pointer flex items-center transition-all duration-300 ${
                    activeTab === challenge.id
                      ? 'border-l-4 border-[var(--accent)] hover:bg-[var(--primary)]'
                      : 'hover:bg-[var(--secondary)]'
                  }`}
                  style={
                    activeTab === challenge.id
                      ? { backgroundColor: 'rgba(var(--primary-rgb), 0.3)' }
                      : { backgroundColor: 'transparent' }
                  }
                  onClick={() => setActiveTab(challenge.id)}
                  whileHover={{ x: 5 }}
                >
                  <div className="mr-3" style={{ opacity: 0.9 }}>{challenge.icon}</div>
                  <span className={`font-sans ${activeTab === challenge.id ? 'text-[var(--accent)] font-semibold' : 'text-white'}`}>
                    {challenge.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* コンテンツ表示エリア（モバイルでは下、PCでは右側） -> モバイルでは上に */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {challenges.map(
                (challenge) =>
                  activeTab === challenge.id && (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[var(--secondary)] border border-[var(--border)] p-6 rounded-lg relative"
                      style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.5)' }}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {/* 装飾 */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[var(--primary)] to-transparent"></div>
                      
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-3 bg-[var(--dark-accent)] rounded-full">
                          {challenge.icon}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[var(--accent)]">{challenge.title}</h3>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <FaMountain className="inline mr-2 text-[var(--magic)]" /> 
                          困難の内容
                        </h4>
                        <p className="mb-4 text-gray-300 font-sans">
                          {challenge.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <MdAutoAwesome className="inline mr-2 text-[var(--accent)]" /> 
                          解決の魔法
                        </h4>
                        <p className="mb-4 text-gray-300 font-sans">
                          <strong className="text-[var(--accent)]">解決のヒント:</strong> {challenge.solution} <span className="text-sm">(詳細はLINEで解説！)</span>
                        </p>
                      </div>
                      
                      {/* キラキラエフェクト（ホバー時） */}
                      {isHovering && (
                        <motion.div
                          className="absolute -top-2 -right-2 text-[var(--accent)]"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaGem className="text-2xl" />
                        </motion.div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 max-w-4xl mx-auto bg-gradient-to-br from-[rgba(var(--secondary-rgb),0.7)] to-[rgba(var(--primary-rgb),0.3)] p-8 rounded-lg border border-[var(--border)]"
        >
          <h3 className="font-serif text-2xl font-bold mb-4 text-white">
            これらの「壁」を<strong className="text-[var(--accent)]">最短ルート</strong>で乗り越えたくありませんか？
          </h3>
          <p className="font-sans text-lg mb-6 text-gray-300">
            <strong className="font-semibold">経験者の知恵</strong>を借りれば、無駄な時間と労力を大幅に削減できます。
            LINE登録で、あなたが今直面している課題に<strong className="font-semibold">ピンポイントで効く解決策</strong>と<strong className="font-semibold">個別アドバイス</strong>を提供します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.open('https://line.me/R/ti/p/@youraccount', '_blank')
              }}
              className="bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(126, 87, 194, 0.7)" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              LINE登録して解決策を受け取る
            </motion.a>
            <motion.a
              href="#free-support"
              className="bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] font-bold py-3 px-8 rounded-full"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(126, 87, 194, 0.1)",
                boxShadow: "0 0 15px rgba(126, 87, 194, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              無料サポートについて詳しく見る
            </motion.a>
          </div>
        </motion.div>
        
        {/* 装飾的な魔法の輝き */}
        <div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-t from-[var(--magic)]" 
          style={{ opacity: 0.05 }}
        ></div>
      </div>
    </section>
  )
} 