import {createSlice} from "@reduxjs/toolkit";
import {allMonstrix} from "../data/monstrixData";
import myMonstrix from "../components/myMonstrix/myMonstrix";


const myMonstrixSlice = createSlice({
	name: 'myMonstrix',
	initialState: {
		myMonstrix: [
			allMonstrix.find(elem => elem.name === 'Torracat'),
			allMonstrix.find(elem => elem.name === 'Haunter'),
			allMonstrix.find(elem => elem.name === 'Jirachi'),
		],
		monstrixGotANewLvl: null,
	},
	reducers: {
		levelUp(state, action){
			if (action.payload.id !== 0){
				let myMonster = state.myMonstrix.find(elem => elem.id === action.payload.id);
				myMonster.xp += action.payload.xp;
				if (myMonster.xp >= myMonster.lvl*100){
					myMonster.xp = myMonster.xp % (myMonster.lvl * 100);
					myMonster.hp = Math.ceil(myMonster.hp * 1.3);
					myMonster.damage = Math.ceil(myMonster.damage * 1.3);
					myMonster.protect = Math.ceil(myMonster.protect * 1.3);
						myMonster.lvl += 1;
					state.monstrixGotANewLvl = myMonster.id;
				}
			}
			else state.monstrixGotANewLvl = null;
		},
		addNewMonster(state, action){
			let newMonster = allMonstrix.find(elem => elem.id === action.payload.id);
			state.myMonstrix.push(newMonster);
		}
	},
});

export const {levelUp, addNewMonster} = myMonstrixSlice.actions;

export default myMonstrixSlice.reducer;