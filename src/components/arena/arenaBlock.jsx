import React from 'react';
import ArenaMenu from "./arenaMenu";
import {useSelector} from "react-redux";
import Arena from "./arena";

function ArenaBlock(props) {
	const isFight = useSelector(state => state.arena.isFight);

	if (isFight === false) return <ArenaMenu/>

	return <Arena/>
}

export default ArenaBlock;