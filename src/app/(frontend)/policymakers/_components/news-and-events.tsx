import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Bookmark, Play, Star } from 'lucide-react'
import Image from 'next/image'

export default function NewsEvents() {
  const newsItems = [
    {
      id: 1,
      image: 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOCWACmTjj5LdxWmT7rvE2bnZNA69cODKaozRI',
      category: 'Policymakers',
      date: '23 Aug 2025',
      title: 'African Youth Employment and Skills Development',
      type: 'Document',
      language: 'Language',
      views: '254',
    },
    {
      id: 2,
      image: 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOCWACmTjj5LdxWmT7rvE2bnZNA69cODKaozRI',
      category: 'Educators & Implementers',
      date: '23 Aug 2025',
      title: 'African Youth Employment and Skills Development',
      type: 'Document',
      language: 'Language',
      views: '254',
    },
    {
      id: 3,
      image: 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOCWACmTjj5LdxWmT7rvE2bnZNA69cODKaozRI',
      category: 'Youth',
      date: '25 Aug 2025',
      title: 'African Youth Employment and Skills Development',
      type: 'Video',
      language: 'Language',
      views: '254',
    },
    {
      id: 4,
      image: 'https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOCWACmTjj5LdxWmT7rvE2bnZNA69cODKaozRI',
      category: 'Educators & Implementers',
      date: '25 Aug 2025',
      title: 'African Youth Employment and Skills Development',
      type: 'Document',
      language: 'Language',
      views: '254',
    },
  ]

  return (
    <div className=" bg-gray-50 py-12">
      <div className="max-w-[1440px] px-6 md:px-10 lg:px-16 container mx-auto flex items-center justify-center relative">
        <Image
          src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOoDag490r6Jgl0qAyzZvwDEbQ3WopUuCPcOkY"
          alt="Logo"
          width={1287}
          height={933}
          className="mb-8 w-full  object-cover rounded-lg shadow-lg max-h-[60vh] object-left-center"
        />
        <div className="absolute inset-0 flex justify-start items-end px-10 py-7 bg-from-black/0 via-black/20 to-black/60 bg-gradient-to-t rounded-lg">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            EVENTS FOR YOU
          </h2>
        </div>
      </div>
    </div>
  )
}
