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
    </div>
  )
}

export default ResourceHero
