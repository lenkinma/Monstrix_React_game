import React, {useState} from 'react';
import styles from './arena.module.scss';
import {useSelector} from "react-redux";
import cn from "classnames";

function Arena(props) {
	const myMonster = useSelector(state => state.myMonstrix.myMonstrix[0]);
	const [enemy, setEnemy] = useState(useSelector(state => ({...state.arena.enemy})));
	const [fightLog, setFightLog] = useState([
		{id: 1, name: 'enemy1', event: 'block afsa sa sfa sfa sfa fs as'},
		{id: 2, name: 'you2', event: 'attack 15 damage'},
		{id: 3, name: 'enemy3', event: 'block'},

	]);
	const [attackButtonIsDisables, setAttackButtonIsDisables] = useState(false);
	const [myMonsterIsAttack, setMyMonsterIsAttack] = useState(false);

	const onAttackButton = () => {
		setAttackButtonIsDisables(true);
		setMyMonsterIsAttack(true);
		setTimeout(() => {
			setAttackButtonIsDisables(false);
			setMyMonsterIsAttack(false);
			setEnemy({...enemy, hp: enemy.hp - myMonster.damage});
		}, 1000);
	}



	return (
		<div>
			<div className={styles.title}>Arena</div>
			<div className={styles.main_container}>
				<div className={styles.fight_block}>
					<div className={styles.cards_block}>
						<div className={styles.my_card_block}>
							<div className={cn(styles.my_card, (myMonsterIsAttack && styles.my_monster_is_attack))}>
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
						<button
							className={!attackButtonIsDisables ? styles.button_attack : styles.disabled_button}
							onClick={onAttackButton}
							disabled={attackButtonIsDisables}
						>Attack</button>
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