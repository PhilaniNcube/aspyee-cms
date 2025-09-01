import React from 'react'

const ResourceHero = ({ image, title }: { image: string; title: string }) => {
  return (
    <div
      className="w-full h-64 flex items-center justify-center mb-8 shadow relative overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold text-center px-4">
        {title}
      </h1>
    </div>
  )
}

export default ResourceHero
