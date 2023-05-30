import React from 'react';
import styles from "../mainPage/mainPage.module.scss";
import {AiOutlineGithub} from "react-icons/ai";
import {FaTelegramPlane} from "react-icons/fa";
import {SlSocialVkontakte} from "react-icons/sl";

function MainPage(props) {
	return (
		<>
			<div className={styles.title}>Welcome to the Monstrix game!</div>
			<div className={styles.content_wrapper}>
				<div className={styles.about_game}>
					<div>This is my React-game about monster battles!</div>
					<div>You can fight monsters, tame monsters, heal monsters, upgrade monsters, and buy monsters!</div>
					<div>The goal of the game is to collect all the monsters!</div>
					<div>Good luck!</div>
				</div>
				<div className={styles.contacts_block}>
					<div>Author: Lenkin Maksim</div>
					<div>My contacts: </div>
					<div className={styles.social_network}>
						<a href='https://github.com/lenkinma'><AiOutlineGithub /></a>
						<a href='https://t.me/lenkinmax'><FaTelegramPlane /></a>
						<a href='https://vk.com/lenkinma'><SlSocialVkontakte /></a>
					</div>

				</div>
			</div>

		</>
	);
}

export default MainPage;