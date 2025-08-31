'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
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

const FontendHeader = () => {
  const [programmesOpen, setProgrammesOpen] = useState(false)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="bg-transparent fixed py-4 top-0 z-50 left-0 right-0 shadow-lg">
      <div className="container mx-auto max-w-[1440px] items-center flex justify-end">
        <Link href="/sign-in" className="text-sm font-medium text-brand hover:text-brand/80">
          <span className="text-brand">Sign In</span>
        </Link>
        <span className="mx-2 text-brand">|</span>
        <Link href="/register" className="text-sm font-medium text-brand hover:text-brand/80">
          <span className="text-brand">Register</span>
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="container mx-auto max-w-[1440px] flex justify-between items-center">
        <Link href="/">
          <Image
            src={scrolled ? LOGO_COLOR : LOGO_WHITE}
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
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/" passHref>
                  <NavigationMenuLink
                    className={cn(
                      `inline-flex h-9 rounded-xs w-max items-center justify-center px-2 py-2 font-medium transition-colors focus:bg-brand-orange-60 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${scrolled ? 'text-black hover:text-black' : 'text-white hover:text-white'}`,
                    )}
                    style={{ fontSize: '13px' }}
                  >
                    <span className="hover:text-white">HOME</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Programmes with dropdown */}
              <NavigationMenuItem className="">
                <NavigationMenuTrigger
                  className="font-medium rounded-xs bg-transparent"
                  style={{ fontSize: '13px' }}
                >
                  <span className="uppercase ">Programmes</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="p-4 w-64 rounded-md shadow-lg bg-brand-orange-60">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/programmes" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Programmes Home</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/programmes/ctvet" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">CTEVET</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/programmes/energize-africa" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Energize Africa</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/programmes/energize-africa-fellowship" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Energize Africa Fellowship</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* The Knowledge Centre with dropdown */}
              <NavigationMenuItem className="p-0 rounded-xs">
                <NavigationMenuTrigger
                  className="font-medium rounded-xs bg-transparent"
                  style={{ fontSize: '13px' }}
                >
                  <span className="uppercase">The Knowledge Centre</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="p-4 w-64 rounded-md shadow-lg bg-brand-orange-60">
                    <ul className="space-y-2">
                      <li>
                        <Link href="/knowledge-centre" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">The Knowledge Centre Home</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/knowledge-centre/policymakers-corner" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Policymakers Corner</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/knowledge-centre/researchers-corner" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Researchers Corner</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/knowledge-centre/youth-corner" passHref>
                          <NavigationMenuLink className="block px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors">
                            <span className="text-white">Youth Corner</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* News & Events */}
              <NavigationMenuItem>
                <Link href="/news-events" passHref>
                  <NavigationMenuLink
                    className={cn(
                      'group inline-flex h-9 w-max items-center justify-center rounded-xs bg-transparent px-2 py-2 font-medium transition-colors hover:bg-brand-orange-60 hover:text-white focus:bg-brand-orange-60 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    )}
                    style={{ fontSize: '13px' }}
                  >
                    <span className="uppercase hover:text-white">News & Events</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Connect & Collaborate */}
              <NavigationMenuItem>
                <Link href="/connect-collaborate" passHref>
                  <NavigationMenuLink
                    className={cn(
                      'group inline-flex h-9 items-center justify-center rounded-xs bg-transparent px-2 py-2 font-medium transition-colors hover:bg-brand-orange-60 hover:text-white focus:bg-brand-orange-60 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                    )}
                    style={{ fontSize: '13px' }}
                  >
                    <span className="uppercase hover:text-white">Connect & Collaborate</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" passHref>
                  <NavigationMenuLink
                    className={cn('bg-brand hover:bg-brand/80 rounded-full')}
                    style={{ fontSize: '13px' }}
                  >
                    <span className="uppercase text-white">
                      <span className="text-xs">AFRICA CRITICAL SKILLS BANK</span>
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
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
                {/* Home */}
                <Link
                  href="/"
                  className="text-lg font-medium py-2 hover:text-brand transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Programmes */}
                <Collapsible open={programmesOpen} onOpenChange={setProgrammesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium py-2 hover:text-brand transition-colors">
                    Programmes
                    {programmesOpen ? (
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
                      <Link
                        href="/programmes"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Programmes Home
                      </Link>
                      <Link
                        href="/programmes/ctvet"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        CTVET
                      </Link>
                      <Link
                        href="/programmes/energize-africa"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Energize Africa
                      </Link>
                      <Link
                        href="/programmes/energize-africa-fellowship"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Energize Africa Fellowship
                      </Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* The Knowledge Centre */}
                <Collapsible open={knowledgeOpen} onOpenChange={setKnowledgeOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium py-2 hover:text-brand transition-colors">
                    The Knowledge Centre
                    {knowledgeOpen ? (
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
                      <Link
                        href="/knowledge-centre"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        The Knowledge Centre Home
                      </Link>
                      <Link
                        href="/knowledge-centre/policymakers-corner"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Policymakers Corner
                      </Link>
                      <Link
                        href="/knowledge-centre/researchers-corner"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Researchers Corner
                      </Link>
                      <Link
                        href="/knowledge-centre/youth-corner"
                        className="block py-2 text-white hover:text-white/80 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Youth Corner
                      </Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* News & Events */}
                <Link
                  href="/news-events"
                  className="text-lg font-medium py-2 hover:text-brand transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="uppercase">News & Events</span>
                </Link>

                {/* Connect & Collaborate */}
                <Link
                  href="/connect-collaborate"
                  className="text-lg font-medium py-2 hover:text-brand transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="uppercase">Connect & Collaborate</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default FontendHeader
