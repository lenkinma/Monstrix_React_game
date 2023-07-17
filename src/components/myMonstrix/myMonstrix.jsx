import React, {memo, useState} from 'react';
import styles from './myMonstrix.module.scss';
import {useSelector} from "react-redux";
import {makeModal} from "../common/modal/modal";
import MonstrixCard from "../monstrix/monstrixCard/monstrixCard";


function MyMonstrix(props) {
	const lg = useSelector(state => state.profile.language);
	const myMonstrix = useSelector(state => state.myMonstrix.myMonstrix);
	const [cardIsOpen, setCardIsOpen] = useState(false);
	const [idOpenCard, setIdOpenCard] = useState(null);

	const CardModal = makeModal(MonstrixCard,
		{green: {status: false,}, red: {status: false,}, close: true},
		(lg === 'ru' ? 'Карта монстра' : 'Monstrix Card'), setCardIsOpen);

	return (
		<div>
			{cardIsOpen && <CardModal id={idOpenCard} isMyMonster={true}/> }

			<div className={styles.title}>{lg === 'ru' ? 'Мои монстры' : 'My monstrix'}</div>
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