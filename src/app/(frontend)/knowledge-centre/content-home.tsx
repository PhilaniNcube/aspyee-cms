import Image from 'next/image'

export default function ContentHome() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1440px] container mx-auto pt-16">
        <div className="max-w-4xl items-stretch flex ">
          {/* Orange accent bar */}
          <div className="w-[10px] h-10  bg-brand-orange mr-4"></div>

          <div>
            <h2 className="text-[20px] md:text-[24px] leading-7 my-0 lg:text-[56px] text-[#595959] font-medium ">
              Knowledge corners
            </h2>
            {/* Subtitle */}
            <p
              className="text-xl font-medium md:text-2xl text-brand mt-0"
              style={{ marginTop: '10px' }}
            >
              These are sets of resources and learning materials we have curated to provide a
              tailored learning experience based on your role in your organisation or your life
              situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
