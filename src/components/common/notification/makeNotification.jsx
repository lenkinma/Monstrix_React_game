import styles from './makeNotification.module.scss';
import cn from 'classnames';

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