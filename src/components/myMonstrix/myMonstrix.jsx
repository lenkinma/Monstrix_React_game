import React, {memo, useEffect, useState} from 'react';
import styles from './myMonstrix.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";
import {fetchingAsync} from "../../store/profileSlice";


function MyMonstrix(props) {
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	// const dispatch = useDispatch();
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);

	const CardModal = makeModal(MonstrixCard,
		{green: {status: false,}, red: {status: false,}, close: true},
		'Monstrix Card', setCardIsOpen);

	// useEffect(() => {
	// 	dispatch(fetchingAsync({timeout: 500}));
	// }, []);

	return (
		<div>
			{cardIsOpen && <CardModal id={idOpenCard} /> }

			<div className={styles.title}>My monstrix</div>
			<div className={styles.monstrix_container}>
				{myMonstrix.map(item =>
					<div
						onClick={() => { setCardIsOpen(true); setIdOpenCard(item.id); }}
						key={item.id}
						className={styles.monstrix_card}>
							<img className={styles.card_image} src={item.image} alt={'monstrx image'}/>
							<div>{item.name}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(MyMonstrix);