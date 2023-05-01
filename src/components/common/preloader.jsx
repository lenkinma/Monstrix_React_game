import React from 'react';
import preloader from '../../assets/images/preloader.svg';
import styles from './preloader.module.scss';

function Preloader(props) {
	return (
		<div className={styles.preloader_background}>
			<img className={styles.default_preloader} src={preloader} alt='preloader'/>
		</div>
	);
}

export default Preloader;