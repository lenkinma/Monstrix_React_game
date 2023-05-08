import React, {memo, useState} from 'react';
import styles from './arena.module.scss';
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import {GiBroadsword, GiHealthNormal} from "react-icons/gi";
import {TbDog} from "react-icons/tb";
import {BiRun} from "react-icons/bi";
import {setCoins} from "../../store/profileSlice";
import {setNotification} from "../common/notification/makeNotification";
import {changeEnemy, changeFightLog, changeMyMonster, endFight} from "../../store/arenaSilce";
import {levelUp} from "../../store/myMonstrixSlice";

function Arena(props) {
	const dispatch = useDispatch();
	const coins = useSelector(state => state.profile.coins);
	const myMonster = useSelector(state => state.arena.myMonster);
	const enemy = useSelector(state => state.arena.enemy);
	const fightLog = useSelector(state => state.arena.fightLog);

	const [healModalIsOpen, setHealModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [endFightModalIsOpen, setEndFightModalIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);

	const [attackButtonIsDisables, setAttackButtonIsDisables] = useState(false);
	const [myMonsterIsAttack, setMyMonsterIsAttack] = useState(false);
	const [EnemyIsAttack, setEnemyIsAttack] = useState(false);
	const [fightResult, setFightResult] = useState('');

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
		let tempLog = {};
		setAttackButtonIsDisables(true);
		setMyMonsterIsAttack(true);
		setTimeout(() => {
			setMyMonsterIsAttack(false);
			let damage = damageWithRandom(myMonster.damage);
			dispatch(changeEnemy({enemy: {...enemy, hp: (enemy.hp - damage < 0 ? 0 : enemy.hp - damage)}}))
			tempLog = {id: fightLog.length + 1, name: myMonster.name, event: `did ${damage} damage`};
			dispatch(changeFightLog({fightLog: [...fightLog, tempLog]}));
			setEnemyIsAttack(true);
			enemyMonsterAttacks(tempLog);
		}, 1000);
	}

	const enemyMonsterAttacks = (tempLog) => {
		setTimeout(() => {
			setAttackButtonIsDisables(false);
			setEnemyIsAttack(false);
			let damage = damageWithRandom(enemy.damage);
			dispatch(changeMyMonster({myMonster: {...myMonster, hp: (myMonster.hp - damage < 0 ? 0 : myMonster.hp - damage)}}));
			dispatch(changeFightLog({fightLog: [...fightLog, tempLog, {id: fightLog.length + 2, name: enemy.name, event: `did ${damage} damage`}]}));

			setFightResult('draw');
			setEndFightModalIsOpen(true);
		}, 1000);
	}


	const CardModal = makeModal(MonstrixCard,
		{green: {status: false}, red: {status: false}, close: true},
		'Monstrix Card', setCardIsOpen);

	const HealMonster = () => {
		return (
			<div>
				<div>To add 50 health to your monster?</div>
				<div>It will cost 120 coins.</div>
			</div>

		);
	}
	const HealModal = makeModal(HealMonster,
		{green: {status: true, text: 'Yes'}, red: {status: true, text: 'No'}, close: true},
		'To heal your monster?',
		setHealModalIsOpen, () => {
			if (coins - 120 < 0) {
				setNotification(dispatch, 'error', 'not enough coins');
			}
			else{
				dispatch(setCoins({coins: coins - 120}));
				dispatch(changeMyMonster({myMonster: {...myMonster, hp: myMonster.hp + 50}}));
				setHealModalIsOpen(false);
				setNotification(dispatch, 'success', 'health replenished');
			}
		});


	const EndOfFight = () => {
		return (
			<div>
				{fightResult === 'win' &&
					'you got 100 coins and 120xp!'
				}
				{fightResult === 'draw' &&
					'you got 50 coins and 60xp!'
				}
				{fightResult === 'lose' &&
					'you got nothing :-('
				}
			</div>
		);
	}
	const EndOfFightModal = makeModal(EndOfFight,
		{green: {status: true, text: 'Okay'}, red: {status: false}, close: false},
		(fightResult === 'draw' ? 'DRAW' : fightResult === 'win' ? 'YOU WIN' : fightResult === 'lose' && 'YOU LOSE'),
		setEndFightModalIsOpen, () => {
			dispatch(endFight({}));
			if (fightResult === 'win'){
				dispatch(setCoins({coins: coins + 100}));
				dispatch(levelUp({id: myMonster.id, xp: 120}));
			}
			if (fightResult === 'draw'){
				dispatch(setCoins({coins: coins + 50}));
				dispatch(levelUp({id: myMonster.id, xp: 60}));
			}
			if (fightResult === 'lose'){

			}

			setEndFightModalIsOpen(false);
		});

	return (
		<div>
			{endFightModalIsOpen && <EndOfFightModal/> }
			{cardIsOpen && <CardModal id={idOpenCard} isMyMonster={idOpenCard === myMonster.id}/> }
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