import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Heart, HeartIcon, LucideQuote, Quote, QuoteIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Dr Amina Diallo',
    country: 'Cameroon',
    flag: '/images/cameroon.png',
    programme: 'Programme Here For Example If A Bit Long',
    testimonial: `Growing Up In Namibia’s Remote Rola Community, I Experienced Firsthand The Challenges Of Limited Access To Technology. Determined To Change This, I Turned To TVET To Gain The Skills Needed To Address These Gaps.`,
    likes: 112,
    image: '/images/amina.jpg',
  },
  {
    name: 'Marcus Schleifer',
    country: 'Nigeria',
    flag: '/images/nigeria.png',
    programme: 'Programme Here For Example If A Bit Long',
    testimonial: `Lorem Ipsum Dolor Sit Amet Consectetur. Tortor Elementum Integer In Lectus. Et At Cras Dignissim Aliquam Luctus Sed Tempus Mi. Integer Nulla Porttitor Turpis Ac Enim. Nam Montes Non Dignissim Libero Maecenas. Cras Sit Nulla Nulla Pellentesque Scelerisque Ornare Eget. Lacus Id Dui Varius Ac Commodo. Sagittis Sed Enim Accumsan Neque. Auctor Cursus Integer Cras Amet Adipiscing Volutpat. Viverra Porta Malesuada Aliquet Odio Sociis. Amet Malesuada Vitae Eget Ipsum. Enim Orci Iaculis Egestas Est In Mauris Placerat.`,
    likes: 112,
    image: '/images/amina.jpg',
  },
  {
    name: 'Dulce Alfina',
    country: 'Cameroon',
    flag: '/images/cameroon.png',
    programme: 'Programme Here For Example If A Bit Long',
    testimonial: `Growing Up In Namibia’s Remote Rola Community, I Experienced Firsthand The Challenges Of Limited Access To Technology. Determined To Change This, I Turned To TVET To Gain The Skills Needed To Address These Gaps.`,
    likes: 112,
    image: '/images/amina.jpg',
  },
  {
    name: 'Jane Smith',
    country: 'Cameroon',
    flag: '/images/cameroon.png',
    programme: 'Programme Here For Example If A Bit Long',
    testimonial: `Growing Up In Namibia’s Remote Rola Community, I Experienced Firsthand The Challenges Of Limited Access To Technology. Determined To Change This, I Turned To TVET To Gain The Skills Needed To Address These Gaps.`,
    likes: 112,
    image: '/images/amina.jpg',
  },
]

const Testimonials = () => {
  return (
    <div className="">
      <div className="container max-w-[1440px] px-6 md:px-10 lg:px-16 mx-auto py-8">
        <div className="flex items-center">
          <div className="w-[8px] bg-brand-orange h-[24px] lg:h-[30px] mr-3" />
          <h2 className="text-brand font-extrabold text-2xl md:text-3xl uppercase">Testimonials</h2>
        </div>
        <Carousel
          className="max-w-[1440px] px-6 md:px-10 lg:px-16 container mx-auto mt-6"
          opts={{ loop: true, align: 'start' }}
        >
          <CarouselContent className="py-4">
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx} className="flex  basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-6 flex flex-col mx-auto">
                  <div className="flex space-x-4">
                    <div className="relative mb-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                      />
                      <img
                        src={t.flag}
                        alt={t.country}
                        className="w-8 h-8 rounded-full absolute -top-2 -left-2 border-2 border-white"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-lg font-semibold mb-0.5 leading-3 ">{t.name}</h3>
                      <p className="text-orange-600 text-[14px] leading-5 italic font-semibold  mb-2">
                        {t.programme}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <QuoteIcon className="absolute -top-4 -left-4 text-brand-orange fill-brand-orange" />
                    <blockquote className="italic text-gray-70 text-sm mb-4">
                      {t.testimonial}
                    </blockquote>
                  </div>

                  <div className=" border-t border-gray-200 mt-4 pt-4"></div>

                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="material-icons">
                      <HeartIcon />
                    </span>
                    <span>Like</span>
                    <span className="font-bold ml-2">{t.likes} People liked this</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Button className="rounded-full text-lg px-6 py-5 mt-6 text-white hover:bg-brand-orange-60 bg-brand-orange">
          View All News & Events
        </Button>
      </div>
    </div>
  )
}

export default Testimonials
