import React, {useState} from 'react';
import styles from "./arenaMenu.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import cn from "classnames";
import {setNotification} from "../common/notification/makeNotification";
import {startFight} from "../../store/arenaSilce";
import {levelUp} from "../../store/myMonstrixSlice";

function ArenaMenu(props) {
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const monstrixGotANewLvl = useSelector(state => state.myMonstrix.monstrixGotANewLvl);
	const stage = useSelector(state => state.arena.stage);
	const childrenStages = Array.from({ length: 7 }, (_, i) => i + 1);

	const dispatch = useDispatch();
	const [arenaModalIsOpen, setArenaModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(false);
	const [idselectedCard, setidSelectedCard] = useState(0);
	const [selectedStage, setSelectedStage] = useState(stage);


	const chooseMonster = () => {
		setidSelectedCard(idOpenCard);
		setCardIsOpen(false);
	}
	const generateAnOpponent = () => {
		if (idselectedCard === 0) setNotification(dispatch, 'error', 'Please, choose your monster');
		else{
			const myMonster = myMonstrix.find(elem => elem.id === idselectedCard);
			dispatch(startFight({myMonster, selectedStage}))
		}
	}

	const CardModal = makeModal(MonstrixCard,
		{green: {status: true, text: 'Select'}, red: {status: false}, close: true},
		'Monstrix Card', setCardIsOpen, chooseMonster);

	const CardNewLevelModal = makeModal(MonstrixCard,
		{green: {status: false,}, red: {status: false}, close: true},
		'You got a new Level!!!', () => dispatch(levelUp({id: 0, xp: 0})));

	const StartFightMenu = () => {
		return (
			<div>
				{cardIsOpen && <CardModal id={idOpenCard} /> }

				<div>Choose your monster:</div>
				<div className={styles.monstrix_container}>
					{myMonstrix.map(item =>
						<div
							onClick={() => { setCardIsOpen(true); setIdOpenCard(item.id); }}
							key={item.id}
							className={cn(styles.monstrix_card, (idselectedCard && idselectedCard === item.id)  && styles.selected_card)}>
							<img className={styles.card_image} src={item.image} alt={'monstrx image'}/>
							<div>{item.name}</div>
						</div>
					)}
				</div>
				<div>Select a stage:</div>
				<div className={styles.stages_block}>
					{childrenStages.map(elem =>
						<div className={selectedStage === elem ? styles.selected_stage : stage < elem ? styles.disabled_stage : styles.stage}
						     onClick={() => (stage >= elem && setSelectedStage(elem))}>{elem}</div>
					)}
				</div>
					<div>Generate an opponent:</div>
					<button className={styles.button} onClick={() => generateAnOpponent()}>Generate</button>
			</div>
		)
	}

	const ArenaMenuModal = makeModal(StartFightMenu,
		{green: {status: false}, red: {status: false}, close: true},
		'Start fight', setArenaModalIsOpen);
	return (
			<div className={styles.wrapper}>
				{monstrixGotANewLvl && <CardNewLevelModal id={monstrixGotANewLvl} isMyMonster={true} newLevel={true}/>}
				{arenaModalIsOpen && <ArenaMenuModal/>}

				<div className={styles.title}>Arena</div>
				<div className={styles.main_container}>
					<button className={styles.button} onClick={() => setArenaModalIsOpen(true)}>Start fight</button>
				</div>
			</div>
	);
}

export default ArenaMenu;