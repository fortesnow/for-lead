'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function ScrollController() {
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      // GSAPとScrollTriggerを登録
      gsap.registerPlugin(ScrollTrigger)
      
      // スクロールによる要素の表示
      const revealElements = document.querySelectorAll('.reveal-on-scroll')
      revealElements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => el.classList.add('active'),
          once: true
        })
      })

      // グリッチエフェクト
      const glitchElements = document.querySelectorAll('.p5-glitch-trigger')
      glitchElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('glitch-active')
          setTimeout(() => {
            document.body.classList.remove('glitch-active')
          }, 300)
        })
      })

      // スクロールによるパララックス効果
      const parallaxElements = document.querySelectorAll('.parallax')
      parallaxElements.forEach((el) => {
        const speed = el.getAttribute('data-speed') || '0.5'
        
        gsap.to(el, {
          y: `${100 * parseFloat(speed)}`,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
      
      // スクロールトリガーアニメーション
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach((el) => {
        const animation = el.getAttribute('data-animation') || 'fadeIn'
        const delay = parseFloat(el.getAttribute('data-delay') || '0')
        const duration = parseFloat(el.getAttribute('data-duration') || '0.8')
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
        
        switch (animation) {
          case 'fadeIn':
            tl.from(el, { opacity: 0, duration: duration, delay: delay })
            break
          case 'slideFromLeft':
            tl.from(el, { x: -50, opacity: 0, duration: duration, delay: delay })
            break
          case 'slideFromRight':
            tl.from(el, { x: 50, opacity: 0, duration: duration, delay: delay })
            break
          case 'slideFromBottom':
            tl.from(el, { y: 50, opacity: 0, duration: duration, delay: delay })
            break
          case 'scale':
            tl.from(el, { scale: 0.8, opacity: 0, duration: duration, delay: delay })
            break
          default:
            tl.from(el, { opacity: 0, duration: duration, delay: delay })
        }
      })
      
      // セクション間の遷移アニメーション
      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        if (index > 0) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
              gsap.to(section, { 
                backgroundColor: 'rgba(10, 10, 10, 1)',
                duration: 0.5
              })
            },
            onLeaveBack: () => {
              gsap.to(section, { 
                backgroundColor: 'rgba(10, 10, 10, 0.9)',
                duration: 0.5
              })
            }
          })
        }
      })
      
      // セクション間のジグザグコネクター追加
      const addZigzagConnectors = () => {
        const sections = document.querySelectorAll('section')
        sections.forEach((section, index) => {
          if (index < sections.length - 1) {
            // セクション間に既存のコネクターがなければ追加
            const nextElement = section.nextElementSibling
            if (nextElement && !nextElement.classList.contains('zigzag-connector')) {
              const connector = document.createElement('div')
              connector.className = 'zigzag-connector'
              section.after(connector)
              
              // ジグザグラインのアニメーション
              gsap.fromTo(connector, 
                { scaleX: 0 },
                { 
                  scaleX: 1, 
                  duration: 0.8, 
                  scrollTrigger: {
                    trigger: connector,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                  }
                }
              )
            }
          }
        })
      }
      
      // コネクター追加の実行
      addZigzagConnectors()
      
      return () => {
        // スクロールトリガーを全て削除
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])
  
  return null
} 