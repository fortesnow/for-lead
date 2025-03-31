'use client'

import { motion } from 'framer-motion'
import Image from 'next/image';

const ProblemStatementSection = () => {
  const painPoints = [
    {
      type: 'image',
      imageSrc: '/images/lp4.png',
      altText: '旅のはじまりに道標はない',
      text: '何から手をつければいいか、具体的な一歩が踏み出せない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-5.png',
      altText: '机に向かい悩む冒険者',
      text: '時間だけが過ぎていき、なかなか成果に繋がらない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-6.png',
      altText: '選んだ道が正解かどうかわからない',
      text: '「これで本当に合っているのか？」常に不安がつきまとう…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-8.png',
      altText: '大量の本を背負う冒険者',
      text: '情報が多すぎて、自分に必要なものを選びきれない…'
    },
    {
      type: 'image',
      imageSrc: '/images/lp-7.png',
      altText: '杖を頼りに進む冒険者',
      text: '一人で頑張ることに限界を感じ、モチベーションが続かない…'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight magic-text-glow">
            なぜ、あなたの副業は<br className="md:hidden" />「<span className="text-[var(--accent)]">あと一歩</span>」で止まってしまうのか？
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            意欲はあるのに、なぜか前に進めない。多くの挑戦者が同じ壁にぶつかっています。
            あなたも、こんな「見えない鎖」に縛られていませんか？
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className={`w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} group`}
                variants={imageVariants(index)}
              >
                {point.type === 'image' && (
                  <div className={`relative ${point.imageSrc === '/images/lp-6.png' || point.imageSrc === '/images/lp-7.png' || point.imageSrc === '/images/lp-8.png' ? 'aspect-video' : 'aspect-[3/4]'} rounded-lg overflow-hidden shadow-lg border border-[var(--border)] bg-black/20`}>
                    <Image
                      src={point.imageSrc!}
                      alt={point.altText!}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="transition-transform duration-500 hover:scale-105 object-contain"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                className={` ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} md:px-4`}
                variants={textVariants(index)}
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-100 leading-relaxed md:leading-loose text-center md:text-left group-hover:text-white transition-colors duration-300">
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
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            これらの悩みの根源は、多くの場合<span className="font-semibold text-[var(--accent-light)]">「正しい戦略の欠如」</span>と<span className="font-semibold text-[var(--accent-light)]">「自己流の限界」</span>にあります。
          </p>
          <a
            href="#free-support"
            className="inline-block text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors duration-300 font-medium group"
          >
            その壁を壊す方法を見てみる{' '}
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemStatementSection 