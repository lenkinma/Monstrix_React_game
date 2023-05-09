import React, {memo, useState} from 'react';
import styles from './shop.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import {allMonstrix} from "../../data/monstrixData";
import {setNotification} from "../common/notification/makeNotification";
import {addNewMonster} from "../../store/myMonstrixSlice";
import {setCoins} from "../../store/profileSlice";
import {ImCoinDollar} from "react-icons/im";


function Shop(props) {
	const dispatch = useDispatch();
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const coins = useSelector(state => state.profile.coins);

	const [myCardIsOpen, setMyCardIsOpen] = useState(false);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);

	const MyMonsterCardModal = makeModal(MonstrixCard,
		{green: {status: false,}, red: {status: false,}, close: true},
		'Monstrix Card', setMyCardIsOpen);

	const CardModal = makeModal(MonstrixCard,
		{green: {status: true, text: `Buy for ${allMonstrix.find(elem => elem.id === idOpenCard)?.cost} coins`},
			red: {status: false,}, close: true},
		'Monstrix Card',
		setCardIsOpen, () => {
			let thisMonster = allMonstrix.find(elem => elem.id === idOpenCard);
			if (coins < thisMonster.cost){
				setNotification(dispatch, 'error', 'not enough coins');
				setCardIsOpen(false);
			}
			else{
				dispatch(setCoins({coins: coins - thisMonster.cost}));
				setNotification(dispatch, 'success', 'You bought this monster!');
				setCardIsOpen(false);
				dispatch(addNewMonster({id: thisMonster.id}));
			}
		});

	return (
		<div className={styles.wrapper}>
			{myCardIsOpen && <MyMonsterCardModal id={idOpenCard} isMyMonster={true}/>}
			{cardIsOpen && <CardModal id={idOpenCard} isMyMonster={false}/>}

			<div className={styles.title}>Shop</div>
			<div className={styles.monstrix_container}>
				{allMonstrix.map(item => {
					let isMyMonster = myMonstrix.find(elem => elem.id === item.id);
					return (
						<div
							className={isMyMonster ? styles.my_monstrix_card : styles.monstrix_card}
							onClick={() => {
								if (isMyMonster){
									setMyCardIsOpen(true);
									setIdOpenCard(item.id);
								}
								else{
									setCardIsOpen(true);
									setIdOpenCard(item.id);
								}
							}}
							key={item.id}>
							<img className={styles.card_image} src={item.image} alt={'monstrx image'}/>
							<div>{item.name}</div>
							{!isMyMonster &&
								<div className={styles.price_wrapper}>
									<div className={styles.price}><ImCoinDollar/>{item.cost}</div>
								</div>}
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default memo(Shop);