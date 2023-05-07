import React, {memo, useEffect, useState} from 'react';
import styles from './arena.module.scss';
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import {GiBroadsword, GiHealthNormal} from "react-icons/gi";
import {TbDog} from "react-icons/tb";
import {BiRun} from "react-icons/bi";
import {setCoins, setErrorNotification} from "../../store/profileSlice";
import {setNotification} from "../common/notification/makeNotification";
import ArenaMenu from "./arenaMenu";

function Arena(props) {
	const dispatch = useDispatch();
	const coins = useSelector(state => state.profile.coins);
	const isFight = useSelector(state => state.arena.isFight);
	const [healModalIsOpen, setHealModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);
	const [myMonster, setMyMonster] = useState(useSelector(state => ({...state.myMonstrix.myMonstrix[0]})));
	const [enemy, setEnemy] = useState(useSelector(state => ({...state.arena.enemy})));
	const [fightLog, setFightLog] = useState([
		// {id: 1, name: 'enemy1', event: 'bla bla bla'},
		// {id: 2, name: 'you2', event: 'attack 15 damage'},
		// {id: 3, name: 'enemy3', event: 'block'},
	]);
	const [attackButtonIsDisables, setAttackButtonIsDisables] = useState(false);
	const [myMonsterIsAttack, setMyMonsterIsAttack] = useState(false);
	const [EnemyIsAttack, setEnemyIsAttack] = useState(false);

	const randomIntFromInterval = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const damageWithRandom = (damage) => {
		let rand = randomIntFromInterval(damage * -1, damage);
		return damage + Math.ceil(rand * 0.5);
	}

	const healMyMonster = () => {
		setHealModalIsOpen(true);
	}

	const tryToTame = () => {
		console.log('try to tame');
	}

	const leave = () => {
		console.log('leave');
	}

	const myMonsterAttacks = () => {
		setAttackButtonIsDisables(true);
		setMyMonsterIsAttack(true);
		setTimeout(() => {
			setMyMonsterIsAttack(false);
			let damage = damageWithRandom(myMonster.damage);
			// console.log(damage);
			setEnemy({...enemy, hp: enemy.hp - damage});
			setFightLog([...fightLog, {id: fightLog.length + 1, name: myMonster.name, event: `did ${damage} damage`}]);
			setEnemyIsAttack(true);
			// enemyMonsterAttacks();
		}, 1000);
	}

	const enemyMonsterAttacks = () => {
		setTimeout(() => {
			setAttackButtonIsDisables(false);
			setEnemyIsAttack(false);
			let damage = damageWithRandom(enemy.damage);
			// console.log(damage);
			setMyMonster({...myMonster, hp: myMonster.hp - damage});
			setFightLog([...fightLog, {id: fightLog.length + 1, name: enemy.name, event: `did ${damage} damage`}
			]);
		}, 1000);
	}

	useEffect(() => {
		if (EnemyIsAttack === true) enemyMonsterAttacks();
	}, [myMonsterIsAttack]);


	const CardModal = makeModal(MonstrixCard, {green: false, red: false, close: true}, 'Monstrix Card', setCardIsOpen);

	const HealMonster = () => {
		return (
			<div>
				<div>To add 50 health to your monster?</div>
				<div>It will cost 120 coins.</div>
			</div>

		);
	}
	const HealModal = makeModal(HealMonster,
		{green: true, red: true, close: true},
		'To heal your monster?',
		setHealModalIsOpen, () => {
			if (coins - 120 < 0) {
				setNotification(dispatch, 'error', 'not enough coins');
			}
			else{
				dispatch(setCoins({coins: coins - 120}));
				setMyMonster({...myMonster, hp: myMonster.hp + 50});
				setHealModalIsOpen(false);
				setNotification(dispatch, 'success', 'health replenished');
			}
		});


	if (isFight === false) return <ArenaMenu/>

	return (
		<div>
			{cardIsOpen && <CardModal id={idOpenCard} /> }
			{healModalIsOpen && <HealModal/> }

			<div className={styles.title}>Arena</div>
			<div className={styles.main_container}>
				<div className={styles.fight_block}>
					<div className={styles.cards_block}>

						<div className={styles.my_card_block}>
							<div className={cn(styles.my_card, (myMonsterIsAttack && styles.my_monster_is_attack))}
							     onClick={() => { setCardIsOpen(true); setIdOpenCard(myMonster.id); }}
							>
								<img className={styles.monster_image} src={myMonster.image} alt={'monster_img'}/>
								{myMonster.name}
								<div>{myMonster.hp}</div>
							</div>
						</div>

						<div className={styles.enemy_card_block}>
							<div className={cn(styles.enemy_card, (EnemyIsAttack && styles.enemy_is_attack))}
							     onClick={() => { setCardIsOpen(true); setIdOpenCard(enemy.id); }}
							>
								<img className={styles.monster_image} src={enemy.image} alt={'monster_img'}/>
								{enemy.name}
								<div>{enemy.hp}</div>
							</div>
						</div>

					</div>
					<div className={styles.button_block}>
						<button
							className={!attackButtonIsDisables ? styles.button_attack : styles.disabled_button}
							onClick={myMonsterAttacks}
							disabled={attackButtonIsDisables}
						><GiBroadsword/>Attack</button>
						<div className={styles.stuff_buttons_block}>
							<button
								className={!attackButtonIsDisables ? styles.button_heal : styles.disabled_button}
								onClick={healMyMonster}
								disabled={attackButtonIsDisables}
							><GiHealthNormal/>Heal</button>
							<button
								className={!attackButtonIsDisables ? styles.button_tame : styles.disabled_button}
								onClick={tryToTame}
								disabled={attackButtonIsDisables}
							><TbDog/>Try to tame</button>
							<button
								className={!attackButtonIsDisables ? styles.button_leave : styles.disabled_button}
								onClick={leave}
								disabled={attackButtonIsDisables}
							><BiRun/>Leave</button>
						</div>
					</div>
				</div>


				<div className={styles.fight_log_block}>
					<div className={styles.log_title}>Fight log</div>
					<div className={styles.log}>
						{fightLog.map(elem =>
							<div className={styles.log_elem} key={elem.id}>{elem.id}) {elem.name}: {elem.event}</div>)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Arena);