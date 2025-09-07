import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Facebook,
  Linkedin,
  Twitter,
  UserCircle,
  UserCircle2Icon,
  UserPlus,
  Youtube,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white pt-12">
      <div className="">
        {/* Top section with logos */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-8 px-6 md:px-10 lg:px-16 mx-auto max-w-[1440px] ">
          <div className="flex items-center justify-between lg:space-x-16 mb-4 lg:mb-0 flex-1 w-full py-12">
            <Link href="https://skillsafrica.org/">
              <Image src="/images/sifa.png" alt="SIFA Logo" width={500} height={261} />
            </Link>
            <Link href="https://humana.org/">
              <Image src="/images/humana.png" alt="HUMANA Logo" width={500} height={261} />
            </Link>
            <Link href="https://giz.de/">
              <Image src="/images/giz.png" alt="GIZ Logo" width={500} height={261} />
            </Link>
          </div>
        </div>
        <div className="bg-[#f2f2f2] w-full text-[14px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-8 px-6 md:px-10 lg:px-16 mx-auto max-w-[1440px] ">
            {/* About ASPYEE */}
            <div className="">
              <h3 className="font-bold text-gray-900 mb-4">About ASPYEE</h3>
              <Link
                href={`${process.env.NEXT_PUBLIC_MAIN_DOMAIN}/faq/ `}
                className="hover:text-blue-600"
              >
                FAQ
              </Link>
              <div className="flex flex-col space-y-2 mt-4">
                <Link href="/sign-in">
                  <Button className="rounded-full bg-[#99b54c] hover:bg-brand-orange text-white font-semibold min-w-[120px]">
                    <UserCircle2Icon className="w-4 h-4 mr-1 " />
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-full bg-brand hover:bg-brand-orange text-white font-semibold min-w-[120px]">
                    <UserPlus className="w-4 h-4 mr-1 " />
                    Register
                  </Button>
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link href="/knowledge-centre" className="hover:text-blue-600">
                    Knowledge Centre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    Africa Critical Skills Bank
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <Link
                    href="https://dev01.afstaging.co.za/connect-and-collaborate/"
                    className="hover:text-blue-600"
                  >
                    Connecting Collaborators
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-600">
                    News & Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-[14px]">
              <h3 className="font-bold text-gray-900 mb-4 ">Contact Us</h3>
              <div className=" text-gray-700">
                <p className="font-bold" style={{ margin: 0 }}>
                  AUDA-NEPAD
                </p>
                <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                  Nqobile Zwane
                </p>
                <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                  nqobile@auda-nepad.org
                </p>

                <p className="font-bold" style={{ marginBottom: 0, marginTop: '12px' }}>
                  Skills Initiative for Africa
                </p>
                <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                  Honore Tshitenge
                </p>
                <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                  honore.tshitenge@giz.de
                </p>
                <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                  aspyee@nepad.org
                </p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Socials</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold" style={{ margin: 0 }}>
                    AUDA-NEPAD
                  </p>
                  <div className="flex space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/facebook.svg"
                        alt="Facebook"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/linkedin.svg"
                        alt="LinkedIn"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/twitter.svg"
                        alt="Twitter"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/youtube.svg"
                        alt="YouTube"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="font-bold" style={{ marginBottom: 0, marginTop: '12px' }}>
                    African Union
                  </p>
                  <div className="flex space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/facebook.svg"
                        alt="Facebook"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/linkedin.svg"
                        alt="LinkedIn"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-blue-600">
                      <Image
                        src="/images/icon/twitter.svg"
                        alt="Twitter"
                        className="w-6 h-6"
                        width={20}
                        height={20}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main footer content */}

        {/* Bottom section */}
        <div className="py-3 bg-[#d9d9d9]">
          <div className="flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-600">
            <div className="mb-4 md:mb-0 text-center w-full">
              <p style={{ margin: 0 }}>
                © {currentYear} African Union. All rights reserved. |{' '}
                <Link href="#" className="hover:text-blue-600">
                  Terms of Use
                </Link>{' '}
                |{' '}
                <Link href="#" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </p>
              <p className="mt-1" style={{ margin: 0 }}>
                © {currentYear} Designed and built with ❤️ by{' '}
                <Link href="http://www.conceptafrika.com" className="hover:text-blue-600">
                  Concept Afrika
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
