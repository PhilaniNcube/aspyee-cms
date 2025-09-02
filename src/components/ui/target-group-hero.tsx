import Image from 'next/image'
import React from 'react'

interface TargetGroupHeroProps {
  title: string
  description: string
  backgroundImage?: string
  backgroundAlt?: string
}

const TargetGroupHero: React.FC<TargetGroupHeroProps> = ({
  title,
  description,
  backgroundImage = 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w',
  backgroundAlt = 'Background',
}) => {
  return (
    <div className="min-h-[564px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={backgroundAlt}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 pointer-events-none"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
      <div className="relative z-10 h-[564px] flex justify-center items-center p-4">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8 lg:px-2 ">
          <h1 className="text-5xl font-extrabold text-white">{title}</h1>
          <p className="mt-2 text-[28px] leading-8 text-white max-w-[721px]">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TargetGroupHero
