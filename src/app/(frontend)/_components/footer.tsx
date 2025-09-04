import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-12">
      <div className="container max-w-[1440px] px-6 md:px-8 lg:px-2 mx-auto ">
        {/* Top section with logos */}
        <div className="flex flex-wrap items-center justify-between mb-8 pb-8 border-b ">
          <div className="flex items-center justify-center space-x-8 mb-4 lg:mb-0 flex-1 w-full py-12">
            <Image src="/images/sifa.png" alt="SIFA Logo" width={175} height={101} />
            <Image src="/images/humana.png" alt="HUMANA Logo" width={211} height={90} />
            <Image src="/images/giz.png" alt="GIZ Logo" width={465} height={188} />
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About ASPYEE */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">About ASPYEE</h3>
            <p className="text-sm text-gray-700">
              Africa&apos;s Skills Portal for Youth Employment and Entrepreneurship - Empowering
              Africa&apos;s Youth through knowledge sharing and skills development.
            </p>
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
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact Us</h3>
            <div className=" text-sm text-gray-700">
              <p className="font-medium">AUDA-NEPAD</p>
              <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                Nqobile Zwane
              </p>
              <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                nqobile@auda-nepad.org
              </p>

              <p className="font-medium">Skills Initiative for Africa</p>
              <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                Honore Tshitenge
              </p>
              <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                honore.tshitenge@giz.de
              </p>
              <p className="leading-4 mt-0 mb-0" style={{ margin: 0 }}>
                aspyee@nepad.org
              </p>
              <p className="font-medium flex text-xs">
                Visit: <Link href="https://www.nepad.org">www.nepad.org</Link>
                <span>|</span>
                <Link href="https://au.int">https://au.int</Link>
              </p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Socials</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">AUDA-NEPAD</p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/facebook.svg"
                      alt="Facebook"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/linkedin.svg"
                      alt="LinkedIn"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/twitter.svg"
                      alt="Twitter"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/youtube.svg"
                      alt="YouTube"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">African Union</p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/facebook.svg"
                      alt="Facebook"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/linkedin.svg"
                      alt="LinkedIn"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    <Image
                      src="/images/icon/twitter.svg"
                      alt="Twitter"
                      className="w-8 h-8"
                      width={20}
                      height={20}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-700">Visit: www.aspyee.org</p>
              <p className="text-sm text-gray-700">https://au.int/</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="mb-4 md:mb-0 text-center w-full">
              <p>
                © {currentYear} African Union. All rights reserved. |{' '}
                <Link href="#" className="hover:text-blue-600">
                  Terms of Use
                </Link>{' '}
                |{' '}
                <Link href="#" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </p>
              <p className="mt-1">
                © {currentYear} Designed and built with ❤️ by{' '}
                <Link href="#" className="hover:text-blue-600">
                  Designer Africa
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
