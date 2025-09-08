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
    <div className=" bg-gray-50 py-12 shadow-xl">
      <div className="max-w-[1520px] px-6 md:px-10 lg:px-16 container mx-auto ">
        <h2 className="text-3xl md:text-4xl font-bold text-brand border-l-8 border-brand-orange pl-4 mb-8 py-0">
          Events For You
        </h2>
        <Image
          src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOoDag490r6Jgl0qAyzZvwDEbQ3WopUuCPcOkY"
          alt="Logo"
          width={1287}
          height={933}
          className="mb-8 w-full  object-cover rounded-lg shadow-lg max-h-[60vh] object-left-center"
        />
      </div>
    </div>
  )
}
