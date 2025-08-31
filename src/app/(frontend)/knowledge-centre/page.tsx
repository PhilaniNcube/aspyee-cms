'use client'
import React from 'react'
import Hero from './hero'
import HeroTop from '../knowledge-centre/hero-top'

const KnowledgeHomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <HeroTop />
      </div>
      <Hero />
    </div>
  )
}

export default KnowledgeHomePage
