import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientComponentsWrapper from './components/ClientComponentsWrapper'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter'
})

const title = 'もう迷わない！1日5分で始める副業収益化テンプレート｜【LINE登録者限定】'
const description = '副業で成果が出ない悩み、解決します。LINE登録者限定で、1日5分の実践で収益化を目指せる具体的なテンプレート集をプレゼント。あなたの副業を加速させる「武器」を手に入れよう！'
const siteUrl = 'https://your-domain.com' // TODO: あなたのサイトのURLに変更してください
const ogImageUrl = `${siteUrl}/overview.png` // OGP画像のパス（必要に応じて変更）

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: title, // サイト名にもタイトルを設定
    images: [
      {
        url: ogImageUrl,
        width: 1200, // OGP画像の幅 (推奨: 1200px)
        height: 630, // OGP画像の高さ (推奨: 630px)
        alt: title, // 代替テキスト
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', // 大きな画像付きのサマリーカード
    title: title,
    description: description,
    images: [ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable}`}>
        {children}
        <ClientComponentsWrapper />
      </body>
    </html>
  )
}
