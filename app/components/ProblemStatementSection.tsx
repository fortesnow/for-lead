'use client'

import { motion } from 'framer-motion'
import Image from 'next/image';

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

  const imageVariants = (index: number) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9, rotate: index % 2 === 0 ? -3 : 3 },
    visible: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } }
  })

  const textVariants = (index: number) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? 60 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  })

  return (
    <section className="bg-gradient-to-b from-[var(--secondary-dark)] to-[var(--background)] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center py-16 md:py-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight magic-text-glow text-white">
            なぜ、あなたの副業は<br className="md:hidden" />「<span className="text-[var(--accent)]">頑張っているのに</span>」<br className="hidden md:block"/> 成果が出ないのか？
          </h2>
          <p className="font-sans text-lg text-gray-300 max-w-3xl mx-auto">
            「もっと稼ぎたい」「自由に働きたい」… その想いは本物なのに、なぜか結果に繋がらない。
            あなたも、こんな「<strong className="font-semibold">目に見えない壁</strong>」にぶつかっていませんか？
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-28">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className={`w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} group`}
                variants={imageVariants(index)}
              >
                {point.type === 'image' && (
                  <div className={`relative w-full rounded-lg overflow-hidden shadow-lg border border-[var(--border)] bg-black/20 
                                 ${point.imageSrc === '/images/lp-6.png' || point.imageSrc === '/images/lp-7.png' || point.imageSrc === '/images/lp-8.png' 
                                   ? 'md:aspect-video' 
                                   : 'md:aspect-[3/4]'}
                                 `}>
                    <Image
                      src={point.imageSrc!}
                      alt={point.altText!}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="transition-transform duration-500 group-hover:scale-105 object-contain"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                className={` ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} px-2 md:px-4`}
                variants={textVariants(index)}
              >
                <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-100 leading-relaxed md:leading-loose text-center md:text-left group-hover:text-white transition-colors duration-300">
                  {point.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center py-16 md:py-20"
        >
          <p className="font-sans text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            これらの「壁」の正体は、多くの場合<strong className="font-semibold text-[var(--accent-light)]">「あなたに合った正しい進め方を知らない」</strong>ことと<strong className="font-semibold text-[var(--accent-light)]">「一人で抱え込んでしまう」</strong>ことにあります。
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemStatementSection 