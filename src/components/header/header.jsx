import React from 'react';
import styles from './header.module.scss';
import {useSelector} from "react-redux";
import {AiOutlineUser} from "react-icons/ai";
import {ImCoinDollar} from "react-icons/im";

function Header(props) {
	const name = useSelector(state => state.profile.name);
	const coins = useSelector(state => state.profile.coins);
	return (
		<div className={styles.header}>
			<div className={styles.user}><AiOutlineUser /> {name}</div>
			<div>MONSTRIX</div>
			<div className={styles.coins}>
				<div className={styles.coins_count}>{coins}</div>
				<ImCoinDollar />
			</div>
		</div>
	);
}

export default Header;