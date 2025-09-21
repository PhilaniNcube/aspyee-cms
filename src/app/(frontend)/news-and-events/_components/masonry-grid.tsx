import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { YouTubeEmbed } from '@next/third-parties/google'
import React from 'react'

const MasonryGrid = () => {
  return (
    <div className="py-10">
      <div className="max-w-[1520px] px-6 md:px-12 mx-auto">
        <div className="columns-1 md:columns-2 gap-4 lg:columns-3 lg:gap-4 space-y-4">
          <div className="relative">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOF8VUwKYX4geOSAr6jMxmEUGQqFa3ZdfyoLVl"
              alt="Masonry 1"
              width={500}
              height={600}
              className="w-full h-auto rounded-lg mb-4 aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg">
              <div className="flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-lg font-bold">Digital Skills for Jobs Webinar Series</h3>
                <small className="text-xs">Date: Monthly | Location: Online</small>
                <p className="text-xs mt-0" style={{ marginTop: '3px' }}>
                  A recurring webinar series exploring digital literacy, coding bootcamps, and the
                  role of AI in Africa’s future workforce.
                </p>
                <Link
                  href="https://centre.aspyee.org/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-green-700 transition-colors duration-200 bg-green-600 text-white w-fit">
                    Register Now
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOi7Lc57K4T5ksIwEfBYjS6qHWrcFtOlxL1mhJ"
              alt="Masonry 2"
              width={500}
              height={600}
              className="w-full h-24 rounded-t-lg object-cover"
            />
            <div className="text-sm  bg-[#F5F5F5] p-4 text-gray-700">
              <h4 className="font-bold text-lg">Entrepreneurship Starter Pack </h4>
              <p className="" style={{ marginTop: '3px' }}>
                Templates and guides for writing business plans, pitching to investors, and managing
                small enterprises.
              </p>
              <div className="w-full flex justify-end ">
                <Link href="https://centre.aspyee.org/register">
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-brand-orange text-white w-fit">
                    Read more
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg aspect-video overflow-hidden">
            <YouTubeEmbed videoid="ulZTAPc6Vr0" params="controls=0&start=30" playlabel="Play" />
          </div>
          <div className="w-full h-auto rounded-lg  overflow-hidden grid grid-cols-2 gap-3">
            <div className="relative">
              <Image
                src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO40s0pmM5Rfv8Uh7BlPJITrwZx0jeDQCWAkso"
                alt="Masonry 3"
                width={500}
                height={600}
                className="w-full h-full rounded-lg object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg">
                <div className="flex flex-col justify-between items-center h-full p-3 text-white">
                  <h3 className="text-md text-center">Policymakers corner</h3>
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-white text-black w-fit">
                    Read More
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative h-full">
              <Image
                src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOL63QqT1yfE8sWmyqn61lUQSjHgVRhpBL3bGe"
                alt="Masonry 3"
                fill
                className="w-full h-full object-cover rounded-lg grayscale"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg">
                <div className="flex flex-col justify-between items-center h-full p-3 text-white">
                  <h3 className="text-md text-center">Youth corner</h3>
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-white text-black w-fit">
                    Read More
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg aspect-video overflow-hidden">
            <YouTubeEmbed videoid="9RyYQwJOrfY" params="controls=0&start=30" playlabel="Play" />
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOi7Lc57K4T5ksIwEfBYjS6qHWrcFtOlxL1mhJ"
              alt="Masonry 2"
              width={500}
              height={600}
              className="w-full h-24 rounded-t-lg object-cover"
            />
            <div className="text-sm  bg-[#F5F5F5] p-4 text-gray-700">
              <p className="text-center" style={{ marginTop: '3px' }}>
                <strong className="pr-1">Guidebook:</strong>
                Templates and guides for writing business plans, pitching to investors, and managing
                small enterprises.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOkUt80I65ywHdfVMZF3ETzW8NaiOUr7Sl2ncj"
              alt="Masonry 1"
              width={500}
              height={600}
              className="w-full h-auto rounded-lg mb-4 aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg">
              <div className="flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-lg font-bold">Youth Policy Dialogues</h3>
                <small className="text-xs">Quarterly | Hybrid (In-person + Online)</small>
                <p className="text-xs mt-0" style={{ marginTop: '3px' }}>
                  A series of high-level policy roundtables bringing together youth representatives,
                  government and private sector leaders.
                </p>
                <Link
                  href="https://centre.aspyee.org/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand transition-colors duration-200 bg-brand/90 text-white w-fit">
                    Register Now
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOoMXLLt0r6Jgl0qAyzZvwDEbQ3WopUuCPcOkY"
              alt="Masonry 2"
              width={500}
              height={600}
              className="w-full h-24 rounded-t-lg object-cover"
            />
            <div className="text-sm  bg-[#F5F5F5] p-4 text-gray-700">
              <h4 className="font-bold text-lg">New Framework to Boost Digital Skills </h4>
              <p className="" style={{ marginTop: '3px' }}>
                A new continental framework designed to strengthen digital skills development for
                Africa&apos;s youth
              </p>
              <div className="w-full flex justify-end ">
                <Link href="https://centre.aspyee.org/register">
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-brand-orange text-white w-fit">
                    Read more
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg  overflow-hidden grid grid-cols-2 gap-3">
            <div className="relative">
              <Image
                src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOYBsbHILnb5X2gkufzL18iAFVtvQNhcjEyPBd"
                alt="Masonry 3"
                width={500}
                height={600}
                className="w-full h-full rounded-lg object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg">
                <div className="flex flex-col justify-between items-center h-full p-3 text-white">
                  <h3 className="text-md text-center">Educators corner</h3>
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-white text-black w-fit">
                    Read More
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative h-full">
              <Image
                src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOFPPogkYX4geOSAr6jMxmEUGQqFa3ZdfyoLVl"
                alt="Masonry 3"
                fill
                className="w-full h-full object-cover rounded-lg grayscale"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg">
                <div className="flex flex-col justify-between items-center h-full p-3 text-white">
                  <h3 className="text-md text-center">Employers corner</h3>
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-white text-black w-fit">
                    Read More
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOkUt80I65ywHdfVMZF3ETzW8NaiOUr7Sl2ncj"
              alt="Masonry 1"
              width={500}
              height={600}
              className="w-full h-auto rounded-lg mb-4 aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg">
              <div className="flex flex-col justify-end h-full p-6 text-white">
                <h3 className="text-lg font-bold">Youth Policy Dialogues</h3>
                <small className="text-xs">Quarterly | Hybrid (In-person + Online)</small>
                <p className="text-xs mt-0" style={{ marginTop: '3px' }}>
                  A series of high-level policy roundtables bringing together youth representatives,
                  government and private sector leaders.
                </p>
                <Link
                  href="https://centre.aspyee.org/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand transition-colors duration-200 bg-brand/90 text-white w-fit">
                    Register Now
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geO0jg2vSFqH8xXpIv0a4lrt5WmkyDe2VfcFwbj"
              alt="Masonry 2"
              width={500}
              height={600}
              className="w-full h-24 rounded-t-lg object-cover"
            />
            <div className="text-sm  bg-[#F5F5F5] p-4 text-gray-700">
              <h4 className="font-bold text-lg">Knowledge Centre</h4>
              <p className="" style={{ marginTop: '3px' }}>
                These are sets of resources and learning materials we have curated to provide a
                tailored learning experience based on your role in your organisation or your life
                situation.
              </p>
              <div className="w-full flex justify-end ">
                <Link href="https://centre.aspyee.org">
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-brand-orange text-white w-fit">
                    Read more
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg aspect-video overflow-hidden">
            <YouTubeEmbed videoid="Fxo4CvmMi40" params="controls=0&start=30" playlabel="Play" />
          </div>

          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://4kav3digtb.ufs.sh/f/FBDFb9YX4geOoMXLLt0r6Jgl0qAyzZvwDEbQ3WopUuCPcOkY"
              alt="Masonry 2"
              width={500}
              height={600}
              className="w-full h-24 rounded-t-lg object-cover"
            />
            <div className="text-sm  bg-[#F5F5F5] p-4 text-gray-700">
              <h4 className="font-bold text-lg">New Framework to Boost Digital Skills </h4>
              <p className="" style={{ marginTop: '3px' }}>
                A new continental framework designed to strengthen digital skills development for
                Africa&apos;s youth
              </p>
              <div className="w-full flex justify-end ">
                <Link href="https://centre.aspyee.org/register">
                  <Badge className="mt-2 rounded-full uppercase px-4 hover:bg-brand-orange-60 transition-colors duration-200 bg-brand-orange text-white w-fit">
                    Read more
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
          {/* Example items */}
        </div>
      </div>
    </div>
  )
}

export default MasonryGrid
