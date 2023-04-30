import React, {useState} from 'react';
import styles from './auth.module.scss';
import {useDispatch} from "react-redux";
import {createGame} from "../../store/profileSlice";

function Auth(props) {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	const onSubmit = () => {
		if (name.trim().length) dispatch(createGame({name}));
	}

	return (
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
			>Create game</button>
		</div>
	);
}

export default Auth;