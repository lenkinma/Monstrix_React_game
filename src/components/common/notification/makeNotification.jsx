import styles from './makeNotification.module.scss';
import cn from 'classnames';
import {setErrorNotification, setSuccessNotification} from "../../../store/profileSlice";


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
	return (
		<div>
			{variant === 'error' &&
				<div className={cn(styles.error, styles.notification_wrapper)}>
					Error: {text}
				</div>
			}
			{variant === 'success' &&
				<div className={cn(styles.success, styles.notification_wrapper)}>
					Successfully: {text}
				</div>
			}
		</div>

	);
}

export default Notification;