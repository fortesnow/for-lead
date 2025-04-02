'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { GiSpellBook, GiSwordsPower, GiMagicGate, GiDragonHead, GiMagicShield, GiTowerBridge, GiScrollQuill } from 'react-icons/gi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import Image from 'next/image'

export default function FinalCta() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // パーティクルエフェクト
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // キャンバスサイズの設定
    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // パーティクルの作成
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      life: number
      maxLife: number
    }[] = []
    
    // 色の配列
    const colors = [
      'rgba(126, 87, 194, 0.6)',
      'rgba(255, 213, 79, 0.6)',
      'rgba(66, 165, 245, 0.6)',
      'rgba(179, 157, 219, 0.6)'
    ]
    
    // パーティクル生成関数
    const createParticle = () => {
      const x = Math.random() * canvas.width
      const y = canvas.height + 10
      const radius = Math.random() * 2 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const speedX = (Math.random() - 0.5) * 0.3
      const speedY = -Math.random() * 0.8 - 0.2
      const maxLife = 150 + Math.random() * 100
      
      particles.push({
        x,
        y,
        radius,
        color,
        speedX,
        speedY,
        life: 0,
        maxLife
      })
    }
    
    // パーティクルのアニメーション
    const animate = () => {
      if (!ctx) return
      
      // 背景をクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // 新しいパーティクルを作成
      if (Math.random() < 0.3) {
        createParticle()
      }
      
      // パーティクルを描画・更新
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        
        // 透明度の計算
        let alpha = 1
        if (p.life < 20) {
          alpha = p.life / 20
        } else if (p.life > p.maxLife - 20) {
          alpha = (p.maxLife - p.life) / 20
        }
        
        // パーティクルの描画
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        
        // パーティクルの位置を更新
        p.x += p.speedX
        p.y += p.speedY
        
        // ライフタイムの更新
        p.life++
        
        // ライフタイムが尽きたパーティクルを削除
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
        }
      }
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <section className="py-20 relative overflow-hidden bg-[var(--background)]">
      {/* 追加のファンタジーアイコン装飾 */}
      <div className="absolute w-full h-full pointer-events-none z-10">
        {/* 左側のアイコン */}
        <motion.div 
          className="absolute top-24 left-[7%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <GiDragonHead size={40} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 left-[12%] text-[var(--primary)] opacity-60"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.6, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GiMagicShield size={34} />
        </motion.div>
        
        {/* 右側のアイコン */}
        <motion.div 
          className="absolute top-1/4 right-[8%] text-[var(--magic)] opacity-60"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GiMagicGate size={38} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-[10%] text-[var(--accent-light)] opacity-60"
          initial={{ opacity: 0, rotate: 10 }}
          whileInView={{ opacity: 0.6, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GiTowerBridge size={36} />
        </motion.div>
        
        {/* 中央のアイコン */}
        <motion.div 
          className="absolute bottom-40 left-[30%] text-[var(--accent)] opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <GiScrollQuill size={32} />
        </motion.div>
      </div>
      
      {/* 背景キャンバス（パーティクルアニメーション用） */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>
      
      {/* 魔法陣の装飾 */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ opacity: 0.05 }}>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='500' height='500' viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='250' cy='250' r='200' stroke='%237e57c2' stroke-width='2' fill='none'/%3E%3Ccircle cx='250' cy='250' r='150' stroke='%23ffd54f' stroke-width='1' fill='none'/%3E%3Cpath d='M250,50 L250,450 M50,250 L450,250 M85,85 L415,415 M85,415 L415,85' stroke='%237e57c2' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight magic-glow text-center text-white">
              さあ、<span className="text-[var(--accent)]">あなた</span>も<br/>「<span className="text-[var(--magic)]">稼げる副業</span>」への<br className="md:hidden"/>扉を開こう！
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* 左側: 副業冒険ガイドブック */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative max-w-md transform hover:scale-105 transition-transform duration-500">
                  {/* ガイドブック画像 */}
                  <Image
                    src="/images/lp1.png"
                    alt="ゼロイチ副業スタートマニュアル"
                    width={500}
                    height={700}
                    className="rounded-lg shadow-[0_0_30px_rgba(126,87,194,0.4)]"
                  />
                  
                  {/* 浮遊エフェクト */}
                  <div 
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--magic)] animate-pulse"
                    style={{ opacity: 0.4 }}
                  ></div>
                  <div 
                    className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] animate-pulse"
                    style={{ opacity: 0.4, animationDelay: '1s' }}
                  ></div>
                </div>
              </motion.div>
              
              {/* 右側: 冒険のメリットとCTA */}
              <div>
                <div className="grid grid-cols-1 gap-6 mb-10">
                  <div className="p-4 border border-[var(--border)] rounded-lg" style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.4)' }}>
                    <div className="flex justify-center mb-3">
                      <GiSpellBook className="text-[var(--accent)] text-3xl" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold mb-2 text-center text-white">再現性の高いノウハウ</h3>
                    <p className="font-sans text-sm text-gray-300 text-center">未経験からでも<strong className="font-semibold">着実に成果を出せる</strong>、具体的な手順とテンプレートを提供。</p>
                  </div>
                  
                  <div className="p-4 border border-[var(--border)] rounded-lg" style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.4)' }}>
                    <div className="flex justify-center mb-3">
                      <FaMapMarkedAlt className="text-[var(--magic)] text-3xl" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold mb-2 text-center text-white">迷わないロードマップ</h3>
                    <p className="font-sans text-sm text-gray-300 text-center">あなた専用の計画で、<strong className="font-semibold">最短距離で目標達成</strong>へ。もう回り道はさせません。</p>
                  </div>
                  
                  <div className="p-4 border border-[var(--border)] rounded-lg" style={{ backgroundColor: 'rgba(var(--secondary-rgb), 0.4)' }}>
                    <div className="flex justify-center mb-3">
                      <GiSwordsPower className="text-[var(--accent)] text-3xl" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold mb-2 text-center text-white">安心のサポート体制</h3>
                    <p className="font-sans text-sm text-gray-300 text-center"><strong className="font-semibold">いつでも相談できる環境</strong>で、モチベーション高く継続できます。</p>
                  </div>
                </div>
                
                <div className="text-center mt-10">
                  <motion.a
                    href="#"
                    className="inline-block cursor-pointer group mt-[-10px] mb-[-10px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Image
                      src="/images/lp-cta.png"
                      alt="LINEに登録して冒険の扉を開こう"
                      width={400}
                      height={100}
                      style={{ height: 'auto' }}
                      className="transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_20px_rgba(255,213,79,0.6)]"
                      priority
                    />
                  </motion.a>

                  <p className="font-sans text-sm text-gray-400 mt-4">
                    ▲ 画像をタップして、<strong>無料</strong>で<strong>副業成功の第一歩</strong>を踏み出そう！ ▲
                  </p>
                </div>
              </div>
            </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
} 