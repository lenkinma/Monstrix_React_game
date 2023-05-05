import React, {useState} from 'react';
import styles from './auth.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {createGame, fetchingAsync} from "../../store/profileSlice";
import Preloader from "../common/preloader";
import Notification, {setNotification} from "../common/notification/makeNotification";

function Auth(props) {
	const errorNotification = useSelector(state => state.profile.errorNotification);
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

				<div className={styles.welcome_title}>welcome to the game!</div>
				<div>
					<div className={styles.input_text}>Please, enter your name:</div>
					<input
						className={styles.input_name}
						placeholder={'your name...'}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<button
					className={styles.button_create_game}
					onClick={onSubmit}
				>Create game
				</button>
			</div>
		</div>

	);
}

export default Auth;