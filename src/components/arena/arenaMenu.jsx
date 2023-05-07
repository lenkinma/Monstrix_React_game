import React, {useState} from 'react';
import styles from "./arenaMenu.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import cn from "classnames";
import {setNotification} from "../common/notification/makeNotification";

function ArenaMenu(props) {
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const dispatch = useDispatch();
	const [arenaModalIsOpen, setArenaModalIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(false);
	const [idselectedCard, setidSelectedCard] = useState(0);


	const chooseMonster = () => {
		setidSelectedCard(idOpenCard);
		setCardIsOpen(false);
	}
	const generateAnOpponent = () => {
		if (idselectedCard === 0) setNotification(dispatch, 'error', 'Please, choose your monster');
		else{

		}
	}

	const CardModal = makeModal(MonstrixCard, {green: true, red: false, close: true}, 'Monstrix Card', setCardIsOpen, chooseMonster);

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
				<div>Generate an opponent:</div>
				<button className={styles.button} onClick={() => generateAnOpponent()}>Generate</button>
			</div>
		)
	}

	const ArenaMenuModal = makeModal(StartFightMenu, {green: false, red: false, close: true}, 'Start fight', setArenaModalIsOpen);

	return (
			<div className={styles.wrapper}>

				{arenaModalIsOpen && <ArenaMenuModal/>}

				<div className={styles.title}>Arena</div>
				<div className={styles.main_container}>
					<button className={styles.button} onClick={() => setArenaModalIsOpen(true)}>Start fight</button>
				</div>
			</div>
	);
}

export default ArenaMenu;