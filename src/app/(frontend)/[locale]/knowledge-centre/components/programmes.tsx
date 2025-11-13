import type { NextPage } from 'next';
import { useCallback } from 'react';
import styles from './programmes.module.css';

export type ProgrammesType = {
  	className?: string;
}



const Programmes:NextPage<ProgrammesType> = ({ className="" }) => {
  	
  	const onProgrammesHomeTextClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={[styles.programmes, className].join(' ')}>
      			<div className={styles.programmesHome} onClick={onProgrammesHomeTextClick}>Programmes Home</div>
      			<div className={styles.ctvetStrategy}>CTVET Strategy</div>
      			<div className={styles.programmesHome} onClick={onProgrammesHomeTextClick}>Energize Africa</div>
      			<div className={styles.ctvetStrategy}>Energize Africa Fellowship</div>
      			<div className={styles.ctvetStrategy}>WorldSkills Africa</div>
      			<div className={styles.iStemEducationProgram}>I-STEM Education Program for ‘Circular’ Practice</div>
      			<div className={styles.iStemEducationProgram}>Artificial Intelligence (AI) for Development</div>
      			<div className={styles.iStemEducationProgram}>African Continental Qualifications Framework (ACQF)</div>
      			<div className={styles.iStemEducationProgram}>African Occupational Standards Development Framework (AOSF)</div>
      			<div className={styles.iStemEducationProgram}>Skills Initiative for Africa – Finance Component (SIFA FC)</div>
      			<div className={styles.iStemEducationProgram}>Skills Initiative for Africa – Technical Cooperation (SIFA TC)</div>
      			<div className={styles.iStemEducationProgram}>Africa Critical Skills Bank (ACSB)</div>
    		</div>);
};

export default Programmes;
