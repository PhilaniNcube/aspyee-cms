import type { NextPage } from 'next'
import { useCallback } from 'react'
import Image from 'next/image'
import styles from '../hero-top.module.css'

const KnowledgeCentre: NextPage = () => {
  const onButtonBlueNavContainerClick = useCallback(() => {
    // Add your code here
  }, [])

  return (
    <div className={styles.knowledgeCentre}>
      <div className={styles.hero}>
        <div className={styles.wrapperAdobestock3110722661}>
          <Image
            className={styles.adobestock3110722661Icon}
            width={1440}
            height={564}
            sizes="100vw"
            alt=""
            src="/images/adobe-stock-3110722661.png"
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.theKnowledgeCentreWrapper}>
            <div className={styles.theKnowledgeCentre}>The Knowledge Centre</div>
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
