'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
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
import { Input } from '@/components/ui/input'
import { Menu, ChevronDown, ChevronRight, SearchIcon, X } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { usePathname } from 'next/navigation'

// Navigation routes configuration (kept client-side for interactivity only)
const navigationRoutes = [
  { label: 'Home', href: 'https://dev01.afstaging.co.za/', hasDropdown: false },
  {
    label: 'Programmes',
    href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/programmes/`,
    hasDropdown: true,
    subRoutes: [
      { label: 'Programmes Home', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#` },
      { label: 'CTVET Strategy', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#` },
      { label: 'Energize Africa', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#` },
      { label: 'Energize Africa Fellowship', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#` },
      { label: 'WorldSkills Africa', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#` },
      {
        label: "I-STEM Education Program for 'Circular' Practice",
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'Artificial Intelligence (AI) for Development',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'African Continental Qualifications Framework (ACQF)',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'African Occupational Standards Development Framework (AOSF)',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'Skills Initiative for Africa – Finance Component (SIFA FC)',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'Skills Initiative for Africa – Technical Cooperation (SIFA TC)',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
      {
        label: 'Africa Critical Skills Bank (ACSB)',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/#`,
      },
    ],
  },
  {
    label: 'The Knowledge Centre',
    href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/knowledge-centre/`,
    hasDropdown: true,
    subRoutes: [
      {
        label: 'The Knowledge Centre Home',
        href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/knowledge-centre/`,
      },
      { label: 'Policymakers Corner', href: '/policymakers' },
      { label: 'Researchers Corner', href: '/researchers' },
      { label: 'Youth Corner', href: '/youth' },
      { label: 'Educators & Implementers Corner', href: '/educators' },
      { label: 'Private Sector / Employers Corner', href: '/private-sector' },
    ],
  },
  { label: 'About', href: `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/about/`, hasDropdown: false },

  // {
  //   label: 'Africa Critical Skills Bank',
  //   href: 'https://dev01.afstaging.co.za/about/',
  //   hasDropdown: false,
  //   isSpecial: true,
  // },
]

export default function HeaderClient({ auth }: { auth: React.ReactNode }) {
  const [programmesOpen, setProgrammesOpen] = useState(false)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // gt the pathname of the current page
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Navigate to search URL with query parameter
    const searchUrl = `${process.env.NEXT_PUBLIC_MAIN_DOMAIN}?s=${encodeURIComponent(searchQuery)}`
    window.location.href = searchUrl

    // Close the search form after submission
    setSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header
      className={cn(
        'pt-2 pb-3',
        scrolled ? 'bg-white shadow-md ' : 'bg-transparent border-b-2 border-white',
        'fixed top-0 z-50 left-0 right-0 transition-all duration-300',
      )}
    >
      {/* Auth links top bar (server-rendered content passed via props) */}
      <div
        className={cn(
          'container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 flex space-x-3 items-center justify-end text-[14px]',
          scrolled ? 'text-brand' : 'text-white',
        )}
      >
        <Link href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/news-and-events/`}>
          <span
            className={cn(
              'uppercase font-semibold text-[14.39px] hover:text-brand-orange',
              scrolled ? 'text-black' : 'text-white',
              pathname === '/news-and-events' ? 'text-brand' : '',
            )}
          >
            News & Events
          </span>
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/connect-and-collaborate/`}>
          <span
            className={cn(
              'uppercase font-semibold text-[14.39px] hover:text-brand-orange',
              scrolled ? 'text-black' : 'text-white',
              pathname === '/news-and-events' ? 'text-brand' : '',
            )}
          >
            Connect and Collaborate
          </span>
        </Link>
        <Link href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/faq/`}>
          <span
            className={cn(
              'uppercase font-semibold text-[14px] hover:text-brand-orange',
              scrolled ? 'text-black' : 'text-white',
              pathname === '/faq' ? 'text-brand' : '',
            )}
          >
            FAQ
          </span>
        </Link>
        <Link href="#">
          <Button
            className={cn(
              'rounded-full uppercase bg-brand border-2 border-brand hover:bg-teal-800 py-1 tracking-widest px-8 font-extrabold text-[14px] text-white',
              scrolled ? '' : '',
            )}
          >
            AFRICA CRITICAL SKILLS BANK
          </Button>
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto max-w-[1520px] px-6 md:px-10 lg:px-16 flex justify-between items-center">
        <Link href="https://dev01.afstaging.co.za/">
          <Image
            src={scrolled ? '/images/logo.png' : '/images/logo-white.png'}
            className="w-[190px] md:w-[250px] lg:w-[300px] object-cover"
            alt="Logo"
            width={1037}
            height={240}
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center pt-0 text-[14px]" style={{ marginTop: '-4px' }}>
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
                          'font-medium rounded-xs bg-transparent border-none hover:underline underline-offset-2 hover:bg-transparent data-[state=open]:bg-transparent',
                          scrolled
                            ? 'text-black data-[state=open]:text-brand-orange'
                            : 'text-white data-[state=open]:text-brand-orange',
                        )}
                        style={{ fontSize: '14.39px' }}
                      >
                        <Link href={route.href} passHref>
                          {' '}
                          <span
                            className={cn(
                              'uppercase font-semibold',
                              scrolled ? 'text-black' : 'text-white',
                            )}
                          >
                            {route.label}
                          </span>
                        </Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn(
                          'p-0 border-0 outline-0 border-none',
                          route.label === 'Programmes' ? 'left-[-300%]' : '',
                        )}
                      >
                        <div
                          className={cn(
                            'p-4 rounded-md border-0 border-none outline-none bg-brand-orange',
                            route.label === 'Programmes' ? 'w-[650px]' : 'w-[300px]',
                          )}
                        >
                          {route.label === 'Programmes' ? (
                            <div className="grid grid-cols-3 gap-4 w-full">
                              {route.subRoutes?.map((subRoute, subIndex) => (
                                <Link key={subIndex} href={subRoute.href} passHref>
                                  <NavigationMenuLink
                                    asChild
                                    className="block px-0 py-1 rounded-none text-xs text-white hover:bg-brand-orange-60 transition-colors"
                                  >
                                    <span className="text-white font-medium uppercase hover:text-white border-b-2 border-brand-orange hover:border-amber-300">
                                      {subRoute.label}
                                    </span>
                                  </NavigationMenuLink>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-1">
                              {route.subRoutes?.map((subRoute, subIndex) => (
                                <li key={subIndex}>
                                  <Link href={subRoute.href} passHref>
                                    <NavigationMenuLink
                                      asChild
                                      className="block px-0 py-1 text-sm rounded-none text-white hover:bg-brand-orange-60 transition-colors"
                                    >
                                      <span className="text-white font-medium hover:text-white border-b-2 border-brand-orange hover:border-amber-300">
                                        {subRoute.label}
                                      </span>
                                    </NavigationMenuLink>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={route.href} passHref>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          'inline-flex h-9 w-max items-center bg-transparent justify-center rounded-xs px-2 py-2 font-medium transition-colors hover:bg-transparent hover:text-brand-orange focus:bg-brand-orange-60 hover:underline underline-offset-2 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          scrolled ? '' : 'text-white',
                        )}
                        style={{ fontSize: '14.39px' }}
                      >
                        <span
                          className={cn(
                            'uppercase hover:text-brand-orange text-[14.39px] font-semibold',
                            scrolled ? 'text-black' : 'text-white',
                          )}
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

          <SearchIcon
            className={cn(
              'h-4 w-4 ml-3 cursor-pointer hover:text-brand-orange transition-colors',
              scrolled ? 'text-black' : 'text-white',
            )}
            onClick={() => setSearchOpen(true)}
          />
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
                {/* Search Button in Mobile Menu */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 py-3"
                  onClick={() => {
                    setSearchOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <SearchIcon className="h-4 w-4" />
                  Search
                </Button>

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

      {/* Slide-in Search Input */}
      <div
        className={cn(
          'fixed top-0 right-0 h-20 z-[100] transition-all duration-300 ease-in-out flex items-center',
          searchOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ paddingTop: scrolled ? '0' : '48px' }} // Account for the auth bar height
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-80 h-10 rounded-full border-2 focus:border-brand focus:ring-2 focus:ring-brand/20 pr-20 shadow-lg',
              scrolled
                ? 'bg-white border-gray-200'
                : 'bg-white/95 backdrop-blur-sm border-white/30',
            )}
            onBlur={() => {
              if (!searchQuery.trim()) {
                setSearchOpen(false)
              }
            }}
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="absolute right-2 h-8 w-8 p-0 hover:bg-transparent"
            onClick={() => {
              setSearchOpen(false)
              setSearchQuery('')
            }}
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </form>
      </div>
    </header>
  )
}
