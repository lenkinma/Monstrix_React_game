import React from 'react';
import styles from "../mainPage/mainPage.module.scss";
import {AiOutlineGithub} from "react-icons/ai";
import {FaTelegramPlane} from "react-icons/fa";
import {SlSocialVkontakte} from "react-icons/sl";
import {useSelector} from "react-redux";

function MainPage(props) {
	const lg = useSelector(state => state.profile.language);
	return (
		<>
			<div className={styles.title}>{lg === 'ru' ? 'Добро пожаловать в Monstrix!' : 'Welcome to the Monstrix game!'}</div>
			<div className={styles.content_wrapper}>
				<div className={styles.about_game}>
					{lg === 'ru' ?
						<div>
							Это моя игра про битву монстров на React js!
							<br/>Вы можете сражаться с монстрами, лечить монстров и покупать монстров!
							<br/>Цель игры собрать всех монстров!
							<br/>Удачи! =)
						</div>
						:
						<div>
							This is my React-game about monster battles!
							<br/>You can fight monsters, tame monsters, heal monsters, upgrade monsters and buy monsters!
							<br/>The goal of the game is to collect all the monsters!
							<br/>Good luck! =)
						</div>
					}
				</div>
				<div className={styles.contacts_block}>
					{lg === 'ru' ?
						<div>
							Автор: Ленкин Максим
							<br/>Мои контакты:
						</div>
						:
						<div>
							Author: Lenkin Maksim
							<br/>My contacts:
						</div>
					}
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