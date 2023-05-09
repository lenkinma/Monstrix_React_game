import React from 'react';
import styles from './sidebar.module.scss';
import {NavLink} from "react-router-dom";
import {fetchingAsync} from "../../store/profileSlice";
import {useDispatch} from "react-redux";

function Sidebar(props) {
	const dispatch = useDispatch();

	return (
		<div className={styles.sidebar}>
			<NavLink to={'/arena'}>Arena</NavLink>
			<NavLink to={'/my_monstrix'}>My Monstrix</NavLink>
			<NavLink to={'/shop'}>Shop</NavLink>
		</div>
	);
}

export default Sidebar;