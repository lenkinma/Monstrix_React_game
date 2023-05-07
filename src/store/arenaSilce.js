import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";
import {useSelector} from "react-redux";


const arenaSlice = createSlice({
	name: 'arena',
	initialState: {
		stage: 1,
		stageLevel: 0, //max 3
		enemy: null,
		myMonster: null,
		isFight: false,
		fightLog: [],
	},
	reducers: {
		startFight(state, action){
			state.myMonster = action.payload.myMonster;
			const monstersStage = allMonstrix.filter(elem => (elem.lvl === state.stage && elem.id !== action.payload.myMonster.id));
			state.enemy = monstersStage[Math.floor(Math.random() * (monstersStage.length))];
			state.isFight = true;
		},
		changeEnemy(state, action){
			state.enemy = action.payload.enemy;
		},
		changeMyMonster(state, action){
			state.myMonster = action.payload.myMonster;
		},
		changeFightLog(state, action){
			state.fightLog = action.payload.fightLog;
		},
		endFight(state, action){
			state.isFight = false;
			state.enemy = null;
			state.myMonster = null;
			state.stageLevel += 1;
			if (state.stageLevel === 5) {
				state.stage += 1;
				state.stageLevel = 0;
			}
		},
	},
});

export const {startFight, changeEnemy, changeMyMonster, changeFightLog, endFight} = arenaSlice.actions;

export default arenaSlice.reducer;