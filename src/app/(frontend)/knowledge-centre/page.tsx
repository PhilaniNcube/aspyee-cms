'use client'
import React, { useState, useRef, useCallback } from 'react'
import Hero from './_components/hero'
import Image from 'next/image'
import Programmes from './components/programmes'
import PortalPopup from './components/portal-popup'
import styles from './index.module.css'
import ContentHome from './content-home'
import HoverCards from './hover-cards'
import KnowledgeBase from './_components/knowledge-base'
import CuratedResources from './_components/curated-resources'
import HowToPortal from './_components/how-to-portal'

const Page = () => {
  const navButtonsContainer1Ref = useRef<HTMLDivElement>(null)
  const [isProgrammesOpen, setProgrammesOpen] = useState(false)

  const openProgrammes = useCallback(() => {
    setProgrammesOpen(true)
  }, [])

  const closeProgrammes = useCallback(() => {
    setProgrammesOpen(false)
  }, [])

  return (
    <>
      <Hero />
      <ContentHome />
      <HoverCards />
      <KnowledgeBase />
      <CuratedResources />
      <HowToPortal />
    </>
  )
}

export default Page
