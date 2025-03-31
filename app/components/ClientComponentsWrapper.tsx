'use client'

import dynamic from 'next/dynamic'

// クライアントコンポーネントを動的にインポート
const ClientComponents = dynamic(() => import('./ClientComponents'), { ssr: false })

export default function ClientComponentsWrapper() {
  return <ClientComponents />
} 