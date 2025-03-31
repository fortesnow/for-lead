'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaScroll, FaDragon, FaGem, FaMountain } from 'react-icons/fa'
import { MdAutoAwesome } from 'react-icons/md'
import { GiCrystalBall, GiSpellBook, GiFireShrine, GiDungeonGate, GiHourglass } from 'react-icons/gi'

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
  
  // パーティクルアニメーション
  useEffect(() => {
    if (!canvasRef.current || !particlesEnabled) return
    
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
    
    // パーティクルの設定
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []
    
    const colors = ['#7e57c2', '#ffd54f', '#42a5f5', '#b39ddb']
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1
      })
    }
    
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
        
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // 画面外に出たパーティクルを反対側から入れ直す
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    let animationId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [particlesEnabled])
  
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
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundSize: '300px 300px',
          backgroundPosition: 'center',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='150' cy='150' r='120' stroke='%237e57c2' stroke-width='1' fill='none'/%3E%3Cpolygon points='150,30 180,110 270,110 195,160 220,250 150,200 80,250 105,160 30,110 120,110' stroke='%23ffd54f' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
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
          <h2 className="text-4xl font-bold relative inline-block magic-glow">
            冒険者たちの<span className="text-[var(--accent)]">挑戦</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mt-4 text-gray-300">
            副業冒険の道には様々な試練が立ちはだかります。
            それらの困難を乗り越えるための知恵をここで共有します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* タブメニュー（モバイルでは上、PCでは左側） */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--secondary)] bg-opacity-50 border border-[var(--border)] p-4 rounded-lg magic-aura">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  className={`p-3 mb-2 rounded-md cursor-pointer flex items-center transition-all duration-300 ${
                    activeTab === challenge.id
                      ? 'bg-[var(--primary)] bg-opacity-30 border-l-4 border-[var(--accent)]'
                      : 'hover:bg-[var(--secondary)] hover:bg-opacity-70'
                  }`}
                  onClick={() => setActiveTab(challenge.id)}
                  whileHover={{ x: 5 }}
                >
                  <div className="mr-3 opacity-90">{challenge.icon}</div>
                  <span className={activeTab === challenge.id ? 'text-[var(--accent)]' : 'text-white'}>
                    {challenge.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* コンテンツ表示エリア（モバイルでは下、PCでは右側） */}
          <div className="lg:col-span-8">
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
                      className="bg-[var(--secondary)] bg-opacity-50 border border-[var(--border)] p-6 rounded-lg relative"
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
                        <h3 className="text-2xl font-bold text-[var(--accent)]">{challenge.title}</h3>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <FaMountain className="inline mr-2 text-[var(--magic)]" /> 
                          困難の内容
                        </h4>
                        <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-[var(--border)]">
                          {challenge.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <MdAutoAwesome className="inline mr-2 text-[var(--accent)]" /> 
                          解決の魔法
                        </h4>
                        <p className="text-gray-300 leading-relaxed pl-4 border-l-2 border-[var(--border)]">
                          {challenge.solution}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            こんな<span className="text-[var(--accent)]">お悩み</span>、
            <br className="md:hidden" />
            ありませんか？
          </h2>
          <p className="text-gray-400">あなたの冒険を妨げる障壁たち...</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="p-6 bg-[var(--secondary)] bg-opacity-40 border border-[var(--border)] rounded-lg hover:shadow-[0_0_30px_rgba(126,87,194,0.2)] transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {challenge.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 装飾的な魔法の輝き */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-t from-[var(--magic)] opacity-5"></div>
      </div>
    </section>
  )
} 