import Image from 'next/image'
import React from 'react'

interface TargetGroupHeroProps {
  title: string
  description: string
  backgroundImage?: string
  backgroundAlt?: string
  bgColor?: string
}

const TargetGroupHero: React.FC<TargetGroupHeroProps> = ({
  title,
  description,
  backgroundImage = 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO2vwcZQrzOM7sxtk6jHilDYeuQU9LayhdfS3w',
  backgroundAlt = 'Background',
  bgColor = 'bg-black',
}) => {
  return (
    <div className={`min-h-[564px] relative overflow-hidden ${bgColor}`}>
      {/* Mobile Layout - Image on top */}
      <div className="lg:hidden">
        <div className="relative h-[300px]">
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            layout="fill"
            objectFit="contain"
            className="rounded-lg scale-x-[-1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        </div>
        <div className="px-6 md:px-10 py-8">
          <div className="container mx-auto max-w-[1520px]">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{title}</h1>
            <p className="text-lg md:text-xl leading-relaxed text-white max-w-[721px]">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Text left, Image right extending to edge */}
      <div className="hidden lg:flex min-h-[564px] relative">
        {/* Left Side - Text Content with container constraint */}
        <div className="flex-1 min-w-[1000px] flex items-center relative z-10 bg-transparent">
          <div className="container mx-auto max-w-[1520px] pl-6 md:pl-10 lg:pl-16">
            <div className="pr-8">
              <h1 className="text-5xl font-extrabold max-w-[1000px] leading-4 text-white mb-6">
                {title}
              </h1>
              <p className="text-[28px] leading-8 text-white max-w-[721px]">{description}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Image positioned absolutely to right edge */}
        <div className="absolute inset-y-0 right-0 w-1/2 lg:w-2/5 xl:w-1/2">
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            layout="fill"
            objectFit="cover"
            objectPosition="right center"
            className="scale-x-[-1]"
          />
        </div>
      </div>
    </div>
  )
}

export default TargetGroupHero
