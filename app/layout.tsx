import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientComponentsWrapper from './components/ClientComponentsWrapper'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: '副業RPG - あなたのスキルで冒険しよう',
  description: '副業でスキルを磨き、経験を積み、報酬を得る。あなたの冒険が始まる。',
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
