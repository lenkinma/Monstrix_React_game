import styles from './monstrixCard.module.scss';
import {TbCircleLetterM, TbSword} from "react-icons/tb";
import {BsHeartHalf} from "react-icons/bs";
import {GiCheckedShield} from "react-icons/gi";
import React from "react";
import {useSelector} from "react-redux";


const MonstrixCard = (props) => {
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);

	const card = myMonstrix.find(elem => elem.id === props.id);
	return (
		<div className={styles.full_card}>
			<div className={styles.image_n_features}>
				<img className={styles.card_image} src={card.image} alt={'image card'}/>
				<div className={styles.features}>
					<div><TbCircleLetterM/> {card.name}</div>
					<div><BsHeartHalf/> {card.hp}</div>
					<div><TbSword/> {card.damage}</div>
					<div><GiCheckedShield/> {card.protect}</div>
				</div>
			</div>
			<div className={styles.description}>{card.description}</div>
		</div>
	)
}

export default MonstrixCard;