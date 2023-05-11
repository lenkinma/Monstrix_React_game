import React, { useState } from 'react';
import styles from './tooltip.module.scss';

function Tooltip({ content, children }) {
	const [isVisible, setIsVisible] = useState(false);

	const handleMouseEnter = () => {
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		setIsVisible(false);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ position: 'relative' }}
		>
			{children}
			{isVisible && (
				<div className={styles.tooltip}>{content}</div>
			)}
		</div>
	);
}

export default Tooltip;