import styles from './makeNotification.module.scss';
import cn from 'classnames';
import {setErrorNotification, setSuccessNotification} from "../../../store/profileSlice";
import {useSelector} from "react-redux";


export const setNotification = (dispatch, type, text) => {
	if (type === 'error'){
		dispatch(setErrorNotification({status: true, text: text}));
		setTimeout(() => dispatch(setErrorNotification({status: false, text: ''})), 3000);
	}
	if (type === 'success'){
		dispatch(setSuccessNotification({status: true, text: text}));
		setTimeout(() => dispatch(setSuccessNotification({status: false, text: ''})), 3000);
	}
}

const Notification = ({variant, text}) => {
	const lg = useSelector(state => state.profile.language);
	return (
		<div>
			{variant === 'error' &&
				<div className={cn(styles.error, styles.notification_wrapper)}>
					{lg === 'ru' ? 'Ошибка:' : 'Error:'} {text}
				</div>
			}
			{variant === 'success' &&
				<div className={cn(styles.success, styles.notification_wrapper)}>
					{lg === 'ru' ? 'Успешно:' : 'Successfully:'} {text}
				</div>
			}
		</div>

	);
}

export default Notification;