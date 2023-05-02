import React, {useState} from 'react';
import styles from './arena.module.scss';
import {useSelector} from "react-redux";

function Arena(props) {
	const myMonster = useSelector(state => state.myMonstrix.myMonstrix[0]);
	const enemy = useSelector(state => state.arena.enemy);
	const [fightLog, setFightLog] = useState([
		{id: 1, name: 'enemy1', event: 'block afsa sa sfa sfa sfa fs as'},
		{id: 2, name: 'you2', event: 'attack sfa  fasf aaf af f sfs '},
		{id: 3, name: 'enemy3', event: 'block'},

	]);

	return (
		<div>
			<div className={styles.title}>Arena</div>
			<div className={styles.main_container}>
				<div className={styles.fight_block}>
					<div className={styles.cards_block}>
						<div className={styles.my_card_block}>
							<div className={styles.my_card}>
								<img className={styles.monster_image} src={myMonster.image} alt={'monster_img'}/>
								{myMonster.name}
								<div>{myMonster.hp}</div>
							</div>

						</div>
						<div className={styles.enemy_card_block}>
							<div className={styles.enemy_card}>
								<img className={styles.monster_image} src={enemy.image} alt={'monster_img'}/>
								{enemy.name}
								<div>{enemy.hp}</div>
							</div>
						</div>
					</div>
					<div className={styles.button_block}>
						button
					</div>
				</div>


				<div className={styles.fight_log_block}>
					<div className={styles.log_title}>Fight log</div>
					<div className={styles.log}>
						{fightLog.map(elem =>
							<div className={styles.log_elem} key={elem.id}>{elem.name}: {elem.event}</div>)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Arena;