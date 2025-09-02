import type { NextPage } from 'next'
import { useCallback } from 'react'
import Image from 'next/image'
import styles from '../hero-top.module.css'

const KnowledgeCentre: NextPage = () => {
  const onButtonBlueNavContainerClick = useCallback(() => {
    // Add your code heresrc="/images/adobe-stock-3110722661.png"
  }, [])

  return (
    <div className={styles.knowledgeCentre}>
      <div className="min-h-[564px] relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/adobe-stock-3110722661.png"
          alt="Policymakers Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 pointer-events-none"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 pointer-events-none"></div>
        <div className="relative z-10 h-[564px] flex justify-center items-center p-4">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-8 lg:px-2 ">
            <h1 className="text-5xl font-extrabold text-white">Policy Makers</h1>
            <p className="mt-2 text-[28px] leading-8 text-white max-w-[721px]">
              A collection of reports, case studies, frameworks and articles designed to support
              policymakers in shaping skills and employment.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.component2Parent}>
        <div className={styles.component2}>
          <Image
            className={styles.component2Child}
            width={29.7}
            height={18.6}
            sizes="100vw"
            alt=""
            src="/images/polygon-2.svg"
          />
        </div>
        <Image
          className={styles.groupChild}
          width={431.3}
          height={0.7}
          sizes="100vw"
          alt=""
          src="/images/icon/Vector.svg"
        />
        <Image
          className={styles.groupItem}
          width={431.3}
          height={0.7}
          sizes="100vw"
          alt=""
          src="/images/icon/Vector-1.svg"
        />
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.summitWithAfricanYouthLeadParent}>
          <Image
            className={styles.summitWithAfricanYouthLeadIcon}
            width={1446}
            height={964}
            sizes="100vw"
            alt=""
            src="/images/summit-with-African-youth-leaders-1.png"
          />
          <div className={styles.rectangleParent}>
            <div className={styles.frameItem} />
            <div className={styles.knowledgeCorners}>Knowledge corners</div>
          </div>
        </div>
        <div className={styles.theseAreSets}>
          These are sets of resources and learning materials we have curated to provide a tailored
          learning experience based on your role in your organisation or your life situation.
        </div>
        <div className={styles.knowledgeCornersImplemento}>
          <Image
            className={styles.proiconssettings}
            width={91.5}
            height={91.5}
            sizes="100vw"
            alt=""
            src="/images/icon/settings.png"
          />
          <div className={styles.forEducatorsContainer}>
            <p className={styles.forEducators}>{`For educators & `}</p>
            <p className={styles.forEducators}>implementers</p>
          </div>
        </div>
        <div className={styles.knowledgeCornersPolicymake}>
          <div className={styles.knowledgeCentreProiconssettings}>
            <Image
              className={styles.vectorIcon}
              width={65.6}
              height={68.6}
              sizes="100vw"
              alt=""
              src="/images/icon/Vector.svg"
            />
            <Image
              className={styles.proiconssettingsChild}
              width={91.5}
              height={91.5}
              sizes="100vw"
              alt=""
              src="/images/rectangle-57.png"
            />
          </div>
          <div className={styles.forEducatorsContainer}>For policy makers</div>
        </div>
        <div className={styles.knowledgeCornersResearcher}>
          <div className={styles.knowledgeCentreProiconssettings}>
            <Image
              className={styles.knowledgeCentreVectorIcon}
              width={65.6}
              height={68.7}
              sizes="100vw"
              alt=""
              src="/images/icon/Vector.svg"
            />
            <Image
              className={styles.proiconssettingsItem}
              width={91.5}
              height={91.5}
              sizes="100vw"
              alt=""
              src="/images/rectangle-57.png"
            />
          </div>
          <div className={styles.forResearchers}>For researchers</div>
        </div>
        <div className={styles.knowledgeCornersYouth}>
          <div className={styles.knowledgeCentreProiconssettings}>
            <Image
              className={styles.knowledgeCentreVectorIcon}
              width={65.6}
              height={68.7}
              sizes="100vw"
              alt=""
              src="/images/icon/Vector.svg"
            />
            <Image
              className={styles.proiconssettingsItem}
              width={91.5}
              height={91.5}
              sizes="100vw"
              alt=""
              src="/images/rectangle-57.png"
            />
          </div>
          <div className={styles.forResearchers}>For youth</div>
        </div>
        <div className={styles.knowledgeCornersOther}>
          <div className={styles.knowledgeCentreProiconssettings}>
            <Image
              className={styles.knowledgeCentreVectorIcon}
              width={65.6}
              height={68.7}
              sizes="100vw"
              alt=""
              src="/images/icon/Vector.svg"
            />
            <Image
              className={styles.proiconssettingsItem}
              width={91.5}
              height={91.5}
              sizes="100vw"
              alt=""
              src="/images/rectangle-57.png"
            />
          </div>
          <div className={styles.forResearchers}>
            <p className={styles.forEducators}>{`Employers & `}</p>
            <p className={styles.forEducators}>The Private Sector</p>
          </div>
        </div>
        <div className={styles.button}>
          <div className={styles.learnMoreWrapper}>
            <div className={styles.learnMore}>Explore all resources</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeCentre
