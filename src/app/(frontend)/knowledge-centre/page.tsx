'use client'
import React, { useState, useRef, useCallback } from 'react'
import Hero from './_components/hero'
import Image from 'next/image'
import Programmes from './components/programmes'
import PortalPopup from './components/portal-popup'
import styles from './index.module.css'

const Page = () => {
  const navButtonsContainer1Ref = useRef<HTMLDivElement>(null)
  const [isProgrammesOpen, setProgrammesOpen] = useState(false)

  const openProgrammes = useCallback(() => {
    setProgrammesOpen(true)
  }, [])

  const closeProgrammes = useCallback(() => {
    setProgrammesOpen(false)
  }, [])

  return (
    <>
      <Hero />
      <div className={styles.knowledgeCentreHome}>
        <div className={styles.haveAQuestionOrNeedHelpParent}>
          <div className={styles.haveAQuestion}>
            Have a question or need help? Find support here
          </div>
          <div className={styles.component23Parent}>
            <div className={styles.component23}>
              <div className={styles.letsIconsquestionLightParent}>
                <Image
                  className={styles.letsIconsquestionLight}
                  width={65}
                  height={65}
                  sizes="100vw"
                  alt=""
                  src="lets-icons:question-light.svg"
                />
                <div className={styles.faqConnectWithContainer}>
                  <p className={styles.faq}>
                    <b>
                      <span>FAQ</span>
                    </b>
                  </p>
                  <p className={styles.blankLine}>
                    <b>
                      <span>&nbsp;</span>
                    </b>
                  </p>
                  <p className={styles.connectWithExperts}>Connect with experts</p>
                </div>
              </div>
            </div>
            <div className={styles.component23}>
              <div className={styles.letsIconsquestionLightParent}>
                <Image
                  className={styles.letsIconsquestionLight}
                  width={65}
                  height={65}
                  sizes="100vw"
                  alt=""
                  src="lucide:search.svg"
                />
                <div className={styles.faqConnectWithContainer}>
                  <p className={styles.faq}>
                    <b>
                      <span>Enquiry</span>
                    </b>
                  </p>
                  <p className={styles.blankLine}>
                    <b>
                      <span>&nbsp;</span>
                    </b>
                  </p>
                  <p className={styles.connectWithExperts}>Ask us a question</p>
                </div>
              </div>
            </div>
            <div className={styles.component23}>
              <div className={styles.letsIconsquestionLightParent}>
                <Image
                  className={styles.iconoirwifiIssue}
                  width={64}
                  height={64}
                  sizes="100vw"
                  alt=""
                  src="iconoir:wifi-issue.svg"
                />
                <div className={styles.faqConnectWithContainer}>
                  <p className={styles.faq}>
                    <b>
                      <span>Report issue</span>
                    </b>
                  </p>
                  <p className={styles.blankLine}>
                    <b>
                      <span>&nbsp;</span>
                    </b>
                  </p>
                  <p className={styles.connectWithExperts}>Tell us more</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.supportQuestions}>{`Support & Questions`}</div>
          </div>
        </div>

        {/* <div className={styles.frameParent}>
          <div className={styles.aboutAspyeeParent}>
            <b className={styles.aboutAspyee}>About ASPYEE</b>
            <div className={styles.africasSkillsPortal}>
              Africa&apos;s Skills Portal for Youth Employment and Entrepreneurship - Empowering
              Africa&apos;s Youth through knowledge sharing and skills development.
            </div>
          </div>
          <div className={styles.resourcesParent}>
            <b className={styles.aboutAspyee}>Resources</b>
            <div className={styles.africasSkillsPortal}>
              <p className={styles.faq}>Knowledge Centre </p>
              <p className={styles.faq}>Africa Critical Skills Bank </p>
            </div>
          </div>
          <div className={styles.communityParent}>
            <b className={styles.aboutAspyee}>Community</b>
            <div className={styles.africasSkillsPortal}>
              <p className={styles.faq}>{`Connect & Collaborate `}</p>
              <p className={styles.faq}>{`News & Events`}</p>
            </div>
          </div>
          <div className={styles.contactUsParent}>
            <b className={styles.aboutAspyee}>Contact Us</b>
            <div className={styles.africasSkillsPortal}>
              <p className={styles.audaNepad}>AUDA-NEPAD</p>
              <p className={styles.faq}>Nqobile Zwane </p>
              <p className={styles.faq}>nqobilez@auda-nepad.org</p>
              <p className={styles.faq}>&nbsp;</p>
              <p className={styles.faq}>
                <span className={styles.skillsInitiativeFor}>Skills Initiative for Africa</span>
                <span> Honore Tshitenge</span>
              </p>
              <p className={styles.faq}>honore.tshitenge@giz.de</p>
              <p className={styles.faq}>&nbsp;</p>
              <p className={styles.faq}>aspyee@nepad.org</p>
            </div>
          </div>
          <div className={styles.socialsWrapper}>
            <b className={styles.aboutAspyee}>Socials</b>
          </div>
        </div>
        <div className={styles.audaNepadParent}>
          <div className={styles.knowledgeCentreHomeAudaNepad}>AUDA-NEPAD</div>
          <div className={styles.icbaselineFacebookParent}>
            <Image
              className={styles.icbaselineFacebookIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/images/icon/ic_baseline-facebook.svg"
            />
            <Image
              className={styles.icbaselineFacebookIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/images/icon/mdi_linkedin.svg"
            />
            <Image
              className={styles.primetwitterIcon}
              width={14}
              height={14}
              sizes="100vw"
              alt=""
              src="/images/icon/prime_twitter.svg"
            />
            <Image
              className={styles.icbaselineFacebookIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/images/icon/mdi_youtube.svg"
            />
          </div>
        </div>
        <div className={styles.africanUnionParent}>
          <div className={styles.knowledgeCentreHomeAudaNepad}>African Union</div>
          <div className={styles.icbaselineFacebookParent}>
            <Image
              className={styles.icbaselineFacebookIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/images/icon/ic_baseline-facebook.svg"
            />
            <Image
              className={styles.icbaselineFacebookIcon}
              width={24}
              height={24}
              sizes="100vw"
              alt=""
              src="/images/icon/mdi_linkedin.svg"
            />
            <Image
              className={styles.primetwitterIcon}
              width={14}
              height={14}
              sizes="100vw"
              alt=""
              src="/images/icon/prime_twitter.svg"
            />
          </div>
        </div>
        <div className={styles.visitWwwnepadorgContainer}>
          {`Visit: `}
          <a className={styles.wwwnepadorg} href="https://www.nepad.org/" target="_blank">
            <span className={styles.knowledgeCentreHomeWwwnepadorg}>www.nepad.org</span>
          </a>{' '}
          | https://au.int/
        </div>
        <div className={styles.africanUnionAllContainer}>
          <p className={styles.faq}>
            © 2025 African Union. All rights reserved. | Terms of Use | Privacy Policy
          </p>
          <p className={styles.faq}>
            {`© 2025 Designed and built with 💜  by  `}
            <a className={styles.conceptAfrika} href="https://conceptafrika.com/" target="_blank">
              <span className={styles.knowledgeCentreHomeWwwnepadorg}>Concept Afrika</span>
            </a>
          </p>
        </div> */}
        {/* <div className={styles.unsplashrlv5gjic5jiWrapper}>
          <div className={styles.unsplashrlv5gjic5ji} />
        </div> */}
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.summitWithAfricanYouthLeadParent}>
              <Image
                className={styles.summitWithAfricanYouthLeadIcon}
                width={1446}
                height={964}
                sizes="100vw"
                alt=""
                src="/images/summit-with-African-youth-leaders 1.png"
              />
              <div className={styles.rectangleGroup}>
                <div className={styles.frameChild} />
                <div className={styles.knowledgeCorners}>Knowledge corners</div>
              </div>
            </div>
            <div className={styles.theseAreSets}>
              These are sets of resources and learning materials we have curated to provide a
              tailored learning experience based on your role in your organisation or your life
              situation.
            </div>
            <div className={styles.knowledgeCornersPolicymakeParent}>
              <div className={styles.knowledgeCornersPolicymake}>
                <div className={styles.proiconssettings}>
                  <Image
                    className={styles.vectorIcon}
                    width={71.7}
                    height={75.1}
                    sizes="100vw"
                    alt=""
                    src="/images/icon/Vector.svg"
                  />
                  <Image
                    className={styles.proiconssettingsChild}
                    width={100.1}
                    height={100.1}
                    sizes="100vw"
                    alt=""
                    src="/images/Rectangle 57.png"
                  />
                </div>
                <div className={styles.forPolicyMakers}>For policy makers</div>
              </div>
              <div className={styles.knowledgeCornersImplemento}>
                <Image
                  className={styles.knowledgeCentreHomeProiconssettings}
                  width={100.1}
                  height={100.1}
                  sizes="100vw"
                  alt=""
                  src="public/images/icon/settings.svg"
                />
                <div className={styles.forPolicyMakers}>
                  <p className={styles.faq}>{`For educators & `}</p>
                  <p className={styles.faq}>implementers</p>
                </div>
              </div>
              <div className={styles.knowledgeCornersYouth}>
                <div className={styles.proiconssettings2}>
                  <Image
                    className={styles.knowledgeCentreHomeVectorIcon}
                    width={71.8}
                    height={75.1}
                    sizes="100vw"
                    alt=""
                    src="/images/icon/Vector.svg"
                  />
                  <Image
                    className={styles.proiconssettingsItem}
                    width={100.2}
                    height={100.2}
                    sizes="100vw"
                    alt=""
                    src="/images/Rectangle 57.png"
                  />
                </div>
                <div className={styles.forYouth}>For youth</div>
              </div>
              <div className={styles.knowledgeCornersResearcher}>
                <div className={styles.proiconssettings2}>
                  <Image
                    className={styles.knowledgeCentreHomeVectorIcon}
                    width={71.8}
                    height={75.1}
                    sizes="100vw"
                    alt=""
                    src="/images/icon/Vector.svg"
                  />
                  <Image
                    className={styles.proiconssettingsItem}
                    width={100.2}
                    height={100.2}
                    sizes="100vw"
                    alt=""
                    src="/images/Rectangle 57.png"
                  />
                </div>
                <div className={styles.forYouth}>For researchers</div>
              </div>
              <div className={styles.knowledgeCornersOther}>
                <div className={styles.proiconssettings2}>
                  <Image
                    className={styles.knowledgeCentreHomeVectorIcon}
                    width={71.8}
                    height={75.1}
                    sizes="100vw"
                    alt=""
                    src="/images/icon/Vector.svg"
                  />
                  <Image
                    className={styles.proiconssettingsItem}
                    width={100.2}
                    height={100.2}
                    sizes="100vw"
                    alt=""
                    src="/images/Rectangle 57.png"
                  />
                </div>
                <div className={styles.forYouth}>
                  <p className={styles.faq}>{`Employers & `}</p>
                  <p className={styles.faq}>The Private Sector</p>
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <div className={styles.learnMoreWrapper}>
                <div className={styles.learnMore}>Explore all resources</div>
              </div>
            </div>
          </div>
          <div className={styles.frameDiv}>
            <div className={styles.frameWrapper}>
              <div className={styles.rectangleContainer}>
                <div className={styles.frameChild} />
                <div className={styles.aLivingKnowledge}>A living knowledge base</div>
              </div>
            </div>
            <div className={styles.knowledgeCentreHomeFrameParent}>
              <div className={styles.hugeiconsbook04Parent}>
                <Image
                  className={styles.streamlineUltimatecommonFilIcon}
                  width={42}
                  height={42}
                  sizes="100vw"
                  alt=""
                  src="/images/icon/hugeicons_book-04.svg"
                />
                <div className={styles.parent}>
                  <b className={styles.b}>5,000+</b>
                  <b className={styles.knowledgeCentreHomeResources}>Resources</b>
                </div>
              </div>
              <div className={styles.hugeiconsbook04Parent}>
                <Image
                  className={styles.frameIcon}
                  width={44}
                  height={44}
                  sizes="100vw"
                  alt=""
                  src="/images/icon/hugeicons_book-04.svg"
                />
                <div className={styles.parent}>
                  <b className={styles.b}>54</b>
                  <b className={styles.knowledgeCentreHomeResources}>Countries</b>
                </div>
              </div>
              <div className={styles.hugeiconsbook04Parent}>
                <Image
                  className={styles.streamlineUltimatecommonFilIcon}
                  width={42}
                  height={42}
                  sizes="100vw"
                  alt=""
                  src="/images/icon/streamline-ultimate_common-file-give-hand-3.svg"
                />
                <div className={styles.parent}>
                  <b className={styles.b}>2,500+</b>
                  <b className={styles.knowledgeCentreHomeResources}>Contributors</b>
                </div>
              </div>
              <div className={styles.hugeiconsbook04Parent}>
                <Image
                  className={styles.streamlineUltimatecommonFilIcon}
                  width={42}
                  height={42}
                  sizes="100vw"
                  alt=""
                  src="/images/icon/hugeicons_download-04.svg"
                />
                <div className={styles.parent}>
                  <b className={styles.b}>50K+</b>
                  <b className={styles.knowledgeCentreHomeResources}>Downloads</b>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.scroll1}>
            <div className={styles.knowledgeCentreHomeRectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.curatedResources}>Curated Resources</div>
            </div>
            <div className={styles.exploreAfricasSkillsContainer}>
              <p className={styles.faq}>
                <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                  <b>Explore Africa’s skills transformation in one place.</b>
                </span>
              </p>
              <p className={styles.faq}>
                <span>
                  <span className={styles.from}>From</span>
                  <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                    {' '}
                    qualifications frameworks to workforce innovations, discover carefully curated
                    resources designed to help policymakers, educators, and practitioners move from
                    ideas to action.
                  </span>
                </span>
              </p>
            </div>
            <div className={styles.stayAheadOfContainer}>
              <ul className={styles.stayAheadOfTrendsLearnFr}>
                <li className={styles.stayAheadOf}>Stay ahead of trends.</li>
                <li className={styles.stayAheadOf}>Learn from African-owned approaches.</li>
                <li>Equip yourself with the tools to transform skills systems.</li>
              </ul>
            </div>
            <Image
              className={styles.scroll1Child}
              width={550}
              height={477}
              sizes="100vw"
              alt=""
              src="/images/Rectangle 66.png"
            />
            <Image
              className={styles.scroll1Item}
              width={531}
              height={482}
              sizes="100vw"
              alt=""
              src="/images/Rectangle 67.png"
            />
            <div className={styles.knowledgeCentreHomeButton}>
              <div className={styles.learnMoreWrapper}>
                <div className={styles.knowledgeCentreHomeLearnMore}>
                  Sign Up to Access Resources
                </div>
              </div>
            </div>
          </div>
          <div className={styles.unsplashrlv5gjic5jiParent}>
            <div className={styles.knowledgeCentreHomeUnsplashrlv5gjic5ji} />
            <div className={styles.rectangleParent2}>
              <div className={styles.frameChild} />
              <div className={styles.howToUse}>How to use this portal</div>
            </div>
            <div className={styles.yourGuideToContainer}>
              <p className={styles.faq}>
                <b className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                  Your guide to getting the most out of ASPYEE.
                </b>
              </p>
              <p className={styles.faq}>
                <span>
                  <span className={styles.from}>Watch</span>
                  <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                    {' '}
                    this short walkthrough to see how you can:
                  </span>
                </span>
              </p>
              <p className={styles.faq}>
                <span>
                  <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                    &nbsp;
                  </span>
                </span>
              </p>
              <ul className={styles.findTheLatestToolsCaseSt}>
                <li className={styles.stayAheadOf}>
                  <span>
                    <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                      Find the latest tools, case studies, and insights
                    </span>
                  </span>
                </li>
                <li className={styles.stayAheadOf}>
                  <span>
                    <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                      Explore initiatives shaping the future of work in Africa
                    </span>
                  </span>
                </li>
                <li>
                  <span>
                    <span className={styles.knowledgeCentreHomeExploreAfricasSkillsTransf}>
                      Connect with peers and partners across the continent
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.logosyoutubeIconWrapper}>
              <Image
                className={styles.logosyoutubeIcon}
                width={96}
                height={68}
                sizes="100vw"
                alt=""
                src="/images/icon/logos_youtube-icon.svg"
              />
            </div>
          </div>
          <div className={styles.knowledgeCentreHomeFrameWrapper}>
            <div className={styles.frameParent3}>
              <div className={styles.rectangleParent3}>
                <div className={styles.frameChild} />
                <div className={styles.topReads}>Top Reads</div>
              </div>
              <div className={styles.component4}>
                <Image
                  className={styles.maleEmployeeGettingUsedHisIcon}
                  width={453.6}
                  height={321}
                  sizes="100vw"
                  alt=""
                  src="/images/male-employee-getting-used-his-new-office-job-along-with-female-colleagues 1-1.png"
                />
                <div className={styles.forPolicyMakersWrapper}>
                  <div className={styles.knowledgeCentreHomeForPolicyMakers}>For Policy Makers</div>
                </div>
              </div>
              <div className={styles.component5}>
                <Image
                  className={styles.maleEmployeeGettingUsedHisIcon}
                  width={453.6}
                  height={321}
                  sizes="100vw"
                  alt=""
                  src="/images/male-employee-getting-used-his-new-office-job-along-with-female-colleagues 1-2.png"
                />
                <div className={styles.forEducatorsImplementorsWrapper}>
                  <div
                    className={styles.knowledgeCentreHomeForPolicyMakers}
                  >{`For Educators & Implementors`}</div>
                </div>
              </div>
              <div className={styles.component6}>
                <Image
                  className={styles.maleEmployeeGettingUsedHisIcon}
                  width={453.6}
                  height={321}
                  sizes="100vw"
                  alt=""
                  src="/images/male-employee-getting-used-his-new-office-job-along-with-female-colleagues 1-3.png"
                />
                <div className={styles.forPolicyMakersWrapper}>
                  <div className={styles.knowledgeCentreHomeForPolicyMakers}>For Researchers</div>
                </div>
              </div>
              <div className={styles.component7}>
                <Image
                  className={styles.maleEmployeeGettingUsedHisIcon}
                  width={453.6}
                  height={321}
                  sizes="100vw"
                  alt=""
                  src="/images/male-employee-getting-used-his-new-office-job-along-with-female-colleagues 1.png"
                />
                <div className={styles.forPolicyMakersWrapper}>
                  <div className={styles.knowledgeCentreHomeForPolicyMakers}>For Youth</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.unsplashrlv5gjic5jiGroup}>
            <div className={styles.unsplashrlv5gjic5ji2} />
            <div className={styles.frameChild3} />
            <div className={styles.contributeToAfricas}>Contribute to Africa’s Skills Agenda</div>
            <div className={styles.button2}>
              <div className={styles.learnMoreFrame}>
                <div className={styles.learnMore2}>Submit Your Contribution</div>
              </div>
            </div>
            <div className={styles.yourExperienceCanContainer}>
              <p className={styles.faq}>
                <span className={styles.knowledgeCentreHomeYourExperienceCanInspireCh}>
                  <span>Your experience can inspire change. </span>
                </span>
              </p>
              <p className={styles.aspyeeGrowsThroughTheKnowl}>
                <span>
                  <span
                    className={styles.knowledgeCentreHomeYourExperienceCanInspireCh}
                  >{`ASPYEE grows through the knowledge shared directly from the field. Whether it’s a project case study, a new tool, `}</span>
                  <span className={styles.orLessonsLearned}>
                    or lessons learned, your contribution helps others across the continent learn
                    what works.
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* {isProgrammesOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom left"
          left={-139}
          bottom={-1}
          relativeLayerRef={navButtonsContainer1Ref}
          onOutsideClick={closeProgrammes}
        >
          <Programmes onClose={closeProgrammes} />
        </PortalPopup>
      )} */}
    </>
  )
}

export default Page
