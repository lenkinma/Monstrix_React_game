import React, {useState} from 'react';
import styles from './auth.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {createGame, fetchingAsync, setLanguage} from "../../store/profileSlice";
import Preloader from "../common/preloader";
import Notification, {setNotification} from "../common/notification/makeNotification";
import ruIcon from '../../assets/images/language_ru_icon.jpg';
import enIcon from '../../assets/images/language_en_icon.jpg';

function Auth(props) {
	const errorNotification = useSelector(state => state.profile.errorNotification);
	const lg = useSelector(state => state.profile.language);
	const [name, setName] = useState('');
	const isFetching = useSelector(state => state.profile.isFetching);
	const dispatch = useDispatch();

	const onSubmit = () => {
		if (name.trim().length) {
			dispatch(fetchingAsync({timeout: 500, func: () => createGame({name})}));
		}
		else{
			setNotification(dispatch, 'error', 'Enter your name');
		}
	}


	// if (isFetching) return <div><Preloader/></div>;

	return (
		<div>
			{errorNotification.status && <Notification variant={'error'} text={errorNotification.text} />}
			{isFetching && <div><Preloader/></div>}

			<div className={styles.auth_container}>

				<div className={styles.welcome_title}>{lg === 'ru' ? 'Добро пожаловать!' : 'Welcome to the game!'}</div>
				<div>
					<div className={styles.input_text}>{lg === 'ru' ? 'Введите ваше имя:' : 'Please, enter your name:'}</div>
					<input
						className={styles.input_name}
						placeholder={lg === 'ru' ? 'ваше имя...' : 'your name...'}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className={styles.input_language}>{lg === 'ru' ? 'Выберите язык:' : 'Select your language:'}</div>
					<div className={styles.flag_wrapper}>
						<div className={styles.flag_block} onClick={() => dispatch(setLanguage({language: 'ru'}))}>
							<img src={ruIcon} alt={'ru_icon'}/>
						</div>
						<div className={styles.flag_block} onClick={() => dispatch(setLanguage({language: 'en'}))}>
							<img src={enIcon} alt={'en_icon'}/>
						</div>
					</div>
				</div>

				<button
					className={styles.button_create_game}
					onClick={onSubmit}
				>{lg === 'ru' ? 'Создать игру' : 'Create game'}
				</button>
			</div>
		</div>

	);
}

export default Auth;