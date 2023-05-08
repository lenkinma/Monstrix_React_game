import React from 'react';
import styles from './modal.module.scss';
import {AiOutlineClose} from "react-icons/ai";

export const makeModal = (Component, mode = {
	green: {status: false, text: 'okay'},
	red: {status: false, text: 'cancel'},
	close: true,
}, title = 'Default title', setModalIsOpen, onGreenButton, onRedButton = () => setModalIsOpen(false)) => {
	const ModalBase = (props) => {
		const closeModal = () => {
			if (mode.close === true) setModalIsOpen(false);
		};

		return (
			<div className={styles.background} onClick={closeModal}>
				<div className={styles.container} onClick={(e) => e.stopPropagation()}>
					<div className={styles.title_n_close}>
						<div className={styles.title}>{title}</div>
						{mode.close &&
							<div className={styles.close} onClick={closeModal}><AiOutlineClose/></div>
						}
					</div>
					<div className={styles.text_wrapper}>
						<Component {...props}/>
					</div>
					<div className={styles.buttons_block}>
						{mode.green.status &&
							<button className={styles.button} onClick={() => onGreenButton(true)}>{mode.green.text}</button>
						}
						{mode.red.status &&
							<button className={styles.cancel_button} onClick={() => onRedButton(true)}>{mode.red.text}</button>
						}
					</div>
				</div>
			</div>
		)
	}
	return ModalBase;
}