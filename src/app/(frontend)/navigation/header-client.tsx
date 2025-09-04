'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, ChevronDown, ChevronRight, SearchIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// Navigation routes configuration (kept client-side for interactivity only)
const navigationRoutes = [
  { label: 'Home', href: 'https://dev01.afstaging.co.za/', hasDropdown: false },
  {
    label: 'Programmes',
    href: '/#',
    hasDropdown: true,
    subRoutes: [
      { label: 'Programmes Home', href: '#' },
      { label: 'CTVET Strategy', href: '#' },
      { label: 'Energize Africa', href: '#' },
      { label: 'Energize Africa Fellowship', href: '#' },
      { label: 'WorldSkills Africa', href: '#' },
      { label: "I-STEM Education Program for 'Circular' Practice", href: '#' },
      { label: 'Artificial Intelligence (AI) for Development', href: '#' },
      { label: 'African Continental Qualifications Framework (ACQF)', href: '#' },
      { label: 'African Occupational Standards Development Framework (AOSF)', href: '#' },
      { label: 'Skills Initiative for Africa – Finance Component (SIFA FC)', href: '#' },
      { label: 'Skills Initiative for Africa – Technical Cooperation (SIFA TC)', href: '#' },
      { label: 'Africa Critical Skills Bank (ACSB)', href: '#' },
    ],
  },
  {
    label: 'The Knowledge Centre',
    href: '/knowledge-centre',
    hasDropdown: true,
    subRoutes: [
      { label: 'The Knowledge Centre Home', href: '/knowledge-centre' },
      { label: 'Policymakers Corner', href: '/policymakers' },
      { label: 'Researchers Corner', href: '/researchers' },
      { label: 'Youth Corner', href: '/youth' },
      { label: 'Educators & Implementers Corner', href: '/educators' },
      { label: 'Private Sector / Employers Corner', href: '/private-sector' },
    ],
  },
  { label: 'News & Events', href: '#', hasDropdown: false },
  {
    label: 'Connect & Collaborate',
    href: 'https://dev01.afstaging.co.za/connect-and-collaborate/',
    hasDropdown: false,
  },
  {
    label: 'Africa Critical Skills Bank',
    href: 'https://dev01.afstaging.co.za/about/',
    hasDropdown: false,
    isSpecial: true,
  },
]

export default function HeaderClient({ auth }: { auth: React.ReactNode }) {
  const [programmesOpen, setProgrammesOpen] = useState(false)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-2',
        'fixed top-0 z-50 left-0 right-0 transition-all duration-300',
      )}
    >
      {/* Auth links top bar (server-rendered content passed via props) */}
      <div
        className={cn(
          'container mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex justify-end text-[14px]',
          scrolled ? 'text-brand' : 'text-white',
        )}
      >
        <div className="flex items-center gap-1">{auth}</div>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 flex justify-between items-center">
        <Link href="https://dev01.afstaging.co.za/">
          <Image
            src={scrolled ? '/images/logo.png' : '/images/logo-white.png'}
            className="w-[190px] object-cover"
            alt="Logo"
            width={1037}
            height={240}
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center ">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="space-x-1">
              {navigationRoutes.map((route, index) => (
                <NavigationMenuItem
                  key={index}
                  className={route.hasDropdown ? 'border-0 outline-0 border-none' : ''}
                >
                  {route.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          'font-medium rounded-xs bg-transparent border-none',
                          scrolled
                            ? 'text-black data-[state=open]:text-white'
                            : 'text-white data-[state=open]:text-white',
                        )}
                        style={{ fontSize: '13px' }}
                      >
                        <span className={cn('uppercase', scrolled ? 'text-black' : 'text-white')}>
                          {route.label}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-0 border-0 outline-0 border-none">
                        <div className="p-4 w-80 rounded-md border-0 border-none outline-none bg-brand-orange-60">
                          <ul className="space-y-1">
                            {route.subRoutes?.map((subRoute, subIndex) => (
                              <li key={subIndex}>
                                <Link href={subRoute.href} passHref>
                                  <NavigationMenuLink
                                    asChild
                                    className="block px-3 py-1 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
                                  >
                                    <span className="text-white">{subRoute.label}</span>
                                  </NavigationMenuLink>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={route.href} passHref>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          route.isSpecial
                            ? 'bg-brand hover:bg-brand/80 rounded-full px-6'
                            : 'inline-flex h-9 w-max items-center bg-transparent justify-center rounded-xs px-2 py-2 font-medium transition-colors hover:bg-brand-orange-60 hover:text-white focus:bg-brand-orange-60 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          scrolled ? '' : 'text-white',
                        )}
                        style={{ fontSize: '13px' }}
                      >
                        <span
                          className={
                            route.isSpecial
                              ? 'uppercase text-white text-xs'
                              : cn(
                                  'uppercase hover:text-white',
                                  scrolled ? 'text-black' : 'text-white',
                                )
                          }
                        >
                          {route.label}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <SearchIcon className={cn('h-6 w-6 ml-3', scrolled ? 'text-black' : 'text-white')} />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationRoutes.map((route, index) => (
                  <div key={index}>
                    {route.hasDropdown ? (
                      <Collapsible
                        open={route.label === 'Programmes' ? programmesOpen : knowledgeOpen}
                        onOpenChange={
                          route.label === 'Programmes' ? setProgrammesOpen : setKnowledgeOpen
                        }
                      >
                        <CollapsibleTrigger
                          className={cn(
                            'flex items-center justify-between w-full text-lg font-medium py-2 hover:opacity-80 transition-colors',
                            scrolled ? 'text-black' : 'text-white',
                          )}
                        >
                          {route.label}
                          {(route.label === 'Programmes' ? programmesOpen : knowledgeOpen) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent
                          className="rounded-md mt-2"
                          style={{ backgroundColor: 'oklch(0.7 0.2 45)' }}
                        >
                          <div className="pl-4 py-2 space-y-2">
                            {route.subRoutes?.map((subRoute, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subRoute.href}
                                className="block py-2 text-white hover:text-white/80 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subRoute.label}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={route.href}
                        className={cn(
                          'text-lg font-medium py-2 hover:opacity-80 transition-colors',
                          scrolled ? 'text-black' : 'text-white',
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="uppercase">{route.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
