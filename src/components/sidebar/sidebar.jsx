import React from 'react';
import styles from './sidebar.module.scss';
import {NavLink} from "react-router-dom";

function Sidebar(props) {
	return (
		<div className={styles.sidebar}>
			<NavLink to={'/fight'}>Fight</NavLink>
			<NavLink to={'/my_monstrix'}>My Monstrix</NavLink>
		</div>
	);
}

export default Sidebar;