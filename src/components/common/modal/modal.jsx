import React from 'react';
import styles from './modal.module.scss';


function Modal({type, title, text}) {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.text_wrapper}>{text}</div>
				<div className={styles.buttons_block}>
					<button className={styles.button}>Yes</button>
					<button className={styles.cancel_button}>No</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;