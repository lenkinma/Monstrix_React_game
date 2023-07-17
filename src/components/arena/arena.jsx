import React, {memo, useEffect, useState} from 'react';
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
import {addNewMonster, levelUp} from "../../store/myMonstrixSlice";

function Arena(props) {
	const dispatch = useDispatch();
	const coins = useSelector(state => state.profile.coins);
	const myMonster = useSelector(state => state.arena.myMonster);
	const enemy = useSelector(state => state.arena.enemy);
	const fightLog = useSelector(state => state.arena.fightLog);
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const lg = useSelector(state => state.profile.language);

	const [endFightModalIsOpen, setEndFightModalIsOpen] = useState(false);
	const [tameModalIsOpen, setTameModalIsOpen] = useState(false);
	const [leaveModalIsOpen, setLeaveModalIsOpen] = useState(false);
	const [healModalIsOpen, setHealModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
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
		setTameModalIsOpen(true);
	}

	const leave = () => {
		setLeaveModalIsOpen(true);
	}

	const myMonsterAttacks = () => {
		let tempLog = {};
		setAttackButtonIsDisables(true);
		setMyMonsterIsAttack(true);
		setTimeout(() => {
			setMyMonsterIsAttack(false);
			let damage = damageWithRandom(myMonster.damage);
			dispatch(changeEnemy({enemy: {...enemy, hp: (enemy.hp - damage < 0 ? 0 : enemy.hp - damage)}}))
			tempLog = {id: fightLog.length + 1, name: myMonster.name, event: (lg === 'ru' ? `нанёс ${damage} урона` : `did ${damage} damage`)};
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
			dispatch(changeFightLog({fightLog: [...fightLog, tempLog, {id: fightLog.length + 2, name: enemy.name, event: (lg === 'ru' ? `нанёс ${damage} урона` : `did ${damage} damage`)}]}));

			// setFightResult('draw');
			// setEndFightModalIsOpen(true);
		}, 1000);
	}

	useEffect(() => {
		// console.log(`${myMonster.hp} - my hp`);
		// console.log(`${enemy.hp} - enemy hp`);
		if (!attackButtonIsDisables){
			if (myMonster.hp === 0 && enemy.hp === 0){
				setFightResult('draw');
				setEndFightModalIsOpen(true);
			}
			else{
				if (myMonster.hp === 0){
					setFightResult('lose');
					setEndFightModalIsOpen(true);
				}
				else{
					if (enemy.hp === 0){
						setFightResult('win');
						setEndFightModalIsOpen(true);
					}
				}
			}
		}
	}, [attackButtonIsDisables]);



	const CardModal = makeModal(MonstrixCard,
		{green: {status: false}, red: {status: false}, close: true},
		(lg === 'ru' ? 'Карта монстра' : 'Monstrix card'), setCardIsOpen);

	const HealMonster = () => {
		return (
			<div>
				{lg === 'ru'
					?
					<div>
						Добавить 50 здоровья вашему монстру?
						<br/>Это будет стоить 100 монет.
					</div>
					:
					<div>
						To add 50 health to your monster?
						<br/>It will cost 100 coins.
					</div>
				}
			</div>
		);
	}
	const HealModal = makeModal(HealMonster,
		{green: {status: true, text: (lg === 'ru' ? 'Да' : 'Yes')}, red: {status: true, text: (lg === 'ru' ? 'Нет' : 'No')}, close: true},
		(lg === 'ru' ? 'Вылечить вашего монстра?' : 'To heal your monster?'),
		setHealModalIsOpen, () => {
			if (coins - 100 < 0) {
				setNotification(dispatch, 'error', (lg === 'ru' ? 'не хватает монет' : 'not enough coins'));
			}
			else{
				dispatch(setCoins({coins: coins - 100}));
				dispatch(changeMyMonster({myMonster: {...myMonster, hp: myMonster.hp + 50}}));
				setHealModalIsOpen(false);
				setNotification(dispatch, 'success', (lg === 'ru' ? 'здоровье восполнено' : 'health replenished'));
			}
		});

	const Tame = ({cost}) => {
		return (
			<div>
				{lg === 'ru'
					?
					<div>
						Вы хотите попробовать приручить вражеского монстра?
						<br/>Это будет стоить {Math.ceil(cost/2)} монет
						<br/>Шанс приручения этого монстра 35%
					</div>
					:
					<div>
						Do you want to try to tame this enemy monster?
						<br/>It will cost you {Math.ceil(cost/2)} coins
						<br/>The chance of taming this monster is 35%
					</div>
				}
			</div>
		);
	}
	const TameModal = makeModal(Tame,
		{green: {status: true, text: (lg === 'ru' ? 'Да' : 'Yes')}, red: {status: true, text: (lg === 'ru' ? 'Нет' : 'No')}, close: true},
		(lg === 'ru' ? 'Попытаться приручить?' : 'Try to tame it?'),
		setTameModalIsOpen, () => {
			if (myMonstrix.find(elem => elem.id === enemy.id)){
				setNotification(dispatch, 'error', (lg === 'ru' ? 'этот монстер уже есть в вашей коллекции!' : 'this monster is already in your collection!'));
			}
			else{
				if (coins < Math.ceil(enemy.cost/2)){
					setNotification(dispatch, 'error', (lg === 'ru' ? 'не хватает монет' : 'not enough coins'));
				}
				else{
					dispatch(setCoins({coins: coins - Math.ceil(enemy.cost/2)}));
					let chance = randomIntFromInterval(1, 100);
					if (chance > 35){
						setNotification(dispatch, 'error', (lg === 'ru' ? 'удача вам не улыбнулась :-(' : 'you are out of luck :-('));
						setTameModalIsOpen(false);
					}
					else{
						dispatch(endFight({}));
						dispatch(addNewMonster({id: enemy.id}));
						setTameModalIsOpen(false);
						setNotification(dispatch, 'success', (lg === 'ru' ? 'Вы приручили этого монстра!' : 'you has tamed this monster!'));
					}
				}
			}
		});

	const Leave = () => {
		return (
			<div>
				{lg === 'ru'
					?
					<div>
						Вы действительно хотите покинуть битву?
						<br/>Это будет означать, что вы лузер!
					</div>
					:
					<div>
						Do you really want to leave the fight?
						<br/>It would mean that you are a loser!
					</div>
				}
			</div>
		);
	}
	const LeaveModal = makeModal(Leave,
		{green: {status: true, text: (lg === 'ru' ? 'Да' : 'Yes')}, red: {status: true, text: (lg === 'ru' ? 'Нет' : 'No')}, close: true},
		(lg === 'ru' ? 'Покинуть битву?' : 'Leave the fight?'),
		setLeaveModalIsOpen, () => {
			dispatch(endFight({leave: true}));
			setNotification(dispatch, 'success', (lg === 'ru' ? 'вы лузер! ха-ха-ха!' : 'you\'re a loser! ha-ha-ha!'));
		});

	const EndOfFight = () => {
		return (
			<div>
				{fightResult === 'win' &&
					(lg === 'ru' ? `Вы получили ${Math.ceil(enemy.cost / 5)} монет и ${enemy.lvl * 50} опыта!` : `You got ${Math.ceil(enemy.cost / 5)} coins and ${enemy.lvl * 50} xp!`)
				}
				{fightResult === 'draw' &&
					(lg === 'ru' ? `Вы получили ${Math.ceil(enemy.cost / 10)} монет и ${enemy.lvl * 25} опыта!` : `You got ${Math.ceil(enemy.cost / 10)} coins and ${enemy.lvl * 25} xp!`)
				}
				{fightResult === 'lose' &&
					(lg === 'ru' ? 'Вы ничего не получили :-(' : 'You got nothing :-(')
				}
			</div>
		);
	}
	const EndOfFightModal = makeModal(EndOfFight,
		{green: {status: true, text: (lg === 'ru' ? 'ОК' : 'OK')}, red: {status: false}, close: false},
		(fightResult === 'draw' ? (lg === 'ru' ? 'НИЧЬЯ' : 'DRAW') : fightResult === 'win' ? (lg === 'ru' ? 'ПОБЕДА' : 'YOU WIN') : fightResult === 'lose' && (lg === 'ru' ? 'ПОРАЖЕНИЕ' : 'YOU LOSE')),
		setEndFightModalIsOpen, () => {
			if (fightResult === 'win'){
				dispatch(endFight({}));
				dispatch(setCoins({coins: coins + Math.ceil(enemy.cost / 5)}));
				dispatch(levelUp({id: myMonster.id, xp: enemy.lvl * 50}));
			}
			if (fightResult === 'draw'){
				dispatch(endFight({}));
				dispatch(setCoins({coins: coins + Math.ceil(enemy.cost / 10)}));
				dispatch(levelUp({id: myMonster.id, xp: enemy.lvl * 25}));
			}
			if (fightResult === 'lose'){
				dispatch(endFight({lose: true}));
			}

			setEndFightModalIsOpen(false);
		});

	return (
		<div>
			{endFightModalIsOpen && <EndOfFightModal/> }
			{cardIsOpen && <CardModal id={idOpenCard} isMyMonster={idOpenCard === myMonster.id}/> }
			{healModalIsOpen && <HealModal/> }
			{tameModalIsOpen && <TameModal cost={enemy.cost}/> }
			{leaveModalIsOpen && <LeaveModal/> }

			<div className={styles.title}>{lg === 'ru' ? 'Арена' : 'Arena'}</div>
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
						><GiBroadsword/>{lg === 'ru' ? 'Атака' : 'Attack'}</button>
						<div className={styles.stuff_buttons_block}>
							<button
								className={!attackButtonIsDisables ? styles.button_heal : styles.disabled_button}
								onClick={healMyMonster}
								disabled={attackButtonIsDisables}
							><GiHealthNormal/>{lg === 'ru' ? 'Лечить' : 'Heal'}</button>
							<button
								className={!attackButtonIsDisables ? styles.button_tame : styles.disabled_button}
								onClick={tryToTame}
								disabled={attackButtonIsDisables}
							><TbDog/>{lg === 'ru' ? 'Приручить' : 'Try to tame'}</button>
							<button
								className={!attackButtonIsDisables ? styles.button_leave : styles.disabled_button}
								onClick={leave}
								disabled={attackButtonIsDisables}
							><BiRun/>{lg === 'ru' ? 'Сдаться' : 'Leave'}</button>
						</div>
					</div>
				</div>


				<div className={styles.fight_log_block}>
					<div className={styles.log_title}>{lg === 'ru' ? 'Лог битвы' : 'Fight log'}</div>
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