'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // マウス位置の追跡
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
    }

    // リンクやボタンのホバー状態の追跡
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true))
        el.addEventListener('mouseleave', () => setLinkHovered(false))
      })
    }

    // 初回表示時に一瞬カーソルが表示されないようにする
    setTimeout(() => {
      setVisible(true)
      addEventListeners()
      handleLinkHoverEvents()
    }, 1000)

    // クリーンアップ
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // マウス位置の更新
  const onMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  // マウスがウィンドウに入った時
  const onMouseEnter = () => {
    setVisible(true)
  }

  // マウスがウィンドウから出た時
  const onMouseLeave = () => {
    setVisible(false)
  }

  // マウスボタンが押された時
  const onMouseDown = () => {
    setClicked(true)
  }

  // マウスボタンが離された時
  const onMouseUp = () => {
    setClicked(false)
  }

  // カスタムカーソルは細かい入力制御が必要なデバイスでのみ表示
  const shouldShowCustomCursor = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  }

  if (!shouldShowCustomCursor()) {
    return null
  }

  return (
    <>
      <div
        className={`custom-cursor-outer ${clicked ? 'clicked' : ''} ${
          linkHovered ? 'link-hovered' : ''
        } ${visible ? '' : 'hidden'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className={`custom-cursor-inner ${clicked ? 'clicked' : ''} ${
          linkHovered ? 'link-hovered' : ''
        } ${visible ? '' : 'hidden'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  )
} 