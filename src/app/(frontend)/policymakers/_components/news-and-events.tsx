import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Share2, Bookmark, Play, Star } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1440px] px-6 md:px-8 container mx-auto px-6">
        {/* Header Section */}

        {/* News & Events Section */}
        <div className="border-l-8 border-brand-orange pl-6 mb-8">
          <h2 className="text-2xl font-bold text-brand mb-8">NEWS & EVENTS</h2>
        </div>

        {/* News Grid */}
        <div className="overflow-x-auto mb-8 scrollbar-hide">
          <div className="flex gap-6 w-max">
            {/* {newsItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden bg-white shadow-sm p-0 w-80 flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.type === 'Video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-3">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className=" text-cyan-600 bg-brand/25 rounded-full text-xs font-medium">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>
                      {item.type} | {item.language}
                    </span>
                    <span>{item.views}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <Badge className="bg-amber-400 hover:bg-brand-orange-60 text-white px-4 py-1 rounded-full">
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      Good Practice
                    </Badge>
                  </div>
                </div>
              </Card>
            ))} */}
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="flex justify-start">
          <Button className="bg-brand-orange hover:bg-brand-orange-60 text-white px-8 py-3 text-base rounded-full">
            View all News & Events
          </Button>
        </div> */}
      </div>
    </div>
  )
}
