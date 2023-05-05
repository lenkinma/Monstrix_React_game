import './styles/App.scss';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import {Route, Routes} from "react-router-dom";
import Arena from "./components/arena/arena";
import MyMonstrix from "./components/myMonstrix/myMonstrix";
import MainPage from "./components/mainPage/mainPage";
import {useSelector} from "react-redux";
import Auth from "./components/auth/auth";
import React, {useEffect} from "react";
import Preloader from "./components/common/preloader";
import Notification from "./components/common/notification/makeNotification";

function App() {
	const isAuth = useSelector(state => state.profile.isAuth);
	const errorNotification = useSelector(state => state.profile.errorNotification);
	const successNotification = useSelector(state => state.profile.successNotification);
	// const isFetching = useSelector(state => state.profile.isFetching);

	if (!isAuth) return <Auth/>

	return (
		<div className="App">
			{errorNotification.status && <Notification variant={'error'} text={errorNotification.text} />}
			{successNotification.status && <Notification variant={'success'} text={successNotification.text} />}
			{/*{isFetching && <Preloader/>}*/}
			<Header/>
			<Sidebar/>
			<div className="main">
				<Routes>
					<Route path='/' element={<MainPage/>}/>
					{/*<Route path='/auth' element={<Auth/>}/>*/}
					<Route path='/arena' element={<Arena/>}/>
					<Route path='/my_monstrix' element={<MyMonstrix/>}/>
				</Routes>
			</div>

      {/*<Modal type={'default'} title={'You are Welcome!'} text={'hello world!'}/>*/}
		</div>
	);
}

export default App;
