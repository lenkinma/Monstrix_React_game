import React from 'react';
import styles from './sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Sidebar(props) {
	const lg = useSelector(state => state.profile.language);

	return (
		<div className={styles.sidebar}>
			<NavLink to={'/arena'}>{lg === 'ru' ? 'Арена' : 'Arena'}</NavLink>
			<NavLink to={'/my_monstrix'}>{lg === 'ru' ? 'Мои Монстры' : 'My Monstrix'}</NavLink>
			<NavLink to={'/shop'}>{lg === 'ru' ? 'Магазин' : 'Shop'}</NavLink>
			<NavLink to={'/about'}>{lg === 'ru' ? 'Об игре' : 'About'}</NavLink>
		</div>
	);
}

export default Sidebar;