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
import { Menu, ChevronDown, ChevronRight } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const LOGO_WHITE = '/images/logo-white.png'
const LOGO_COLOR = '/images/logo.png'

// Navigation routes configuration
const navigationRoutes = [
  {
    label: 'Home',
    href: '/',
    hasDropdown: false,
  },
  {
    label: 'Programmes',
    href: '/programmes',
    hasDropdown: true,
    subRoutes: [
      {
        label: 'Programmes Home',
        href: '/programmes',
      },
      {
        label: 'CTVET',
        href: '/programmes/ctvet',
      },
      {
        label: 'Energize Africa',
        href: '/programmes/energize-africa',
      },
      {
        label: 'Energize Africa Fellowship',
        href: '/programmes/energize-africa-fellowship',
      },
    ],
  },
  {
    label: 'The Knowledge Centre',
    href: '/knowledge-centre',
    hasDropdown: true,
    subRoutes: [
      {
        label: 'The Knowledge Centre Home',
        href: '/knowledge-centre',
      },
      {
        label: 'Policymakers Corner',
        href: '/policymakers',
      },
      {
        label: 'Researchers Corner',
        href: '/researchers-corner',
      },
      {
        label: 'Youth Corner',
        href: '/youth-corner',
      },
    ],
  },
  {
    label: 'News & Events',
    href: '/news-events',
    hasDropdown: false,
  },
  {
    label: 'Connect & Collaborate',
    href: '/connect-collaborate',
    hasDropdown: false,
  },
  {
    label: 'Africa Critical Skills Bank',
    href: '/about',
    hasDropdown: false,
    isSpecial: true, // This can be used to apply special styling
  },
]

const FontendHeader = () => {
  const [programmesOpen, setProgrammesOpen] = useState(false)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 300)
    }

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
      <div className="container mx-auto max-w-[1440px] items-center flex justify-end">
        <Link href="/sign-in" className={cn(scrolled ? 'text-brand' : 'text-white')}>
          <span className={cn(scrolled ? 'text-brand' : 'text-white')}>Sign In</span>
        </Link>
        <span className={cn(scrolled ? 'text-brand' : 'text-white')}>|</span>
        <Link
          href="/register"
          className={cn(' font-medium hover:opacity-80', scrolled ? 'text-brand' : 'text-white')}
        >
          <span className={cn(scrolled ? 'text-brand' : 'text-white')}>Register</span>
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto max-w-[1440px] flex justify-between items-center">
        <Link href="/">
          <Image
            src={scrolled ? '/images/logo.png' : '/images/logo-white.png'}
            className="w-[250px] object-cover"
            alt="Logo"
            width={1037}
            height={240}
          />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:block ">
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
                          scrolled ? 'text-black' : 'text-white',
                        )}
                        style={{ fontSize: '13px' }}
                      >
                        <span className={cn('uppercase', scrolled ? 'text-black' : 'text-white')}>
                          {route.label}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-0 border-0 outline-0 border-none">
                        <div className="p-4 w-64 rounded-md border-0 border-none outline-none bg-brand-orange-60">
                          <ul className="space-y-2">
                            {route.subRoutes?.map((subRoute, subIndex) => (
                              <li key={subIndex}>
                                <Link href={subRoute.href} passHref>
                                  <NavigationMenuLink
                                    asChild
                                    className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
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
                            ? 'bg-brand hover:bg-brand/80 rounded-full'
                            : 'inline-flex h-9 w-max items-center bg-transparent justify-center rounded-xs px-2 py-2 font-medium transition-colors hover:bg-brand-orange-60 hover:text-white focus:bg-brand-orange-60 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                          scrolled ? 'text-black' : 'text-white',
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

export default FontendHeader
