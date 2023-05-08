import styles from './monstrixCard.module.scss';
import {TbCircleLetterM, TbSword} from "react-icons/tb";
import {BsHeartHalf} from "react-icons/bs";
import {GiCheckedShield} from "react-icons/gi";
import React from "react";
import {allMonstrix} from "../../../data/monstrixData";
import {useSelector} from "react-redux";


const MonstrixCard = ({id, isMyMonster = false, newLevel = false}) => {
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	let card;
	if (isMyMonster) card = myMonstrix.find(elem => elem.id === id);
	else card = allMonstrix.find(elem => elem.id === id);


	return (
		<div className={styles.full_card}>
			<div className={styles.image_n_features}>
				<img className={styles.card_image} src={card.image} alt={'image card'}/>
				<div className={styles.features}>
					<div><TbCircleLetterM/> {card.name}</div>
					<div className={styles.lvl_container}>
						<div>lvl: {newLevel && `${card.lvl - 1} > `}<span className={newLevel && styles.new_lvl}>{card.lvl}</span></div>
						{isMyMonster && <div className={styles.xp}>xp: {card.xp}/{card.lvl*100}</div>}
					</div>
					<div><BsHeartHalf/> {newLevel && `${Math.ceil(card.hp/1.3)} > `}<span className={newLevel && styles.new_lvl}>{card.hp}</span></div>
					<div><TbSword/> {newLevel && `${Math.ceil(card.damage/1.3)} > `}<span className={newLevel && styles.new_lvl}>{card.damage}</span></div>
					<div><GiCheckedShield/> {newLevel && `${Math.ceil(card.protect/1.3)} > `}<span className={newLevel && styles.new_lvl}>{card.protect}</span></div>
				</div>
			</div>
			<div className={styles.description}>{card.description}</div>
		</div>
	)
}

export default MonstrixCard;