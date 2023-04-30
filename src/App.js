import './styles/App.scss';
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import {Route, Routes} from "react-router-dom";
import Fight from "./components/fight/fight";
import MyMonstrix from "./components/myMonstrix/myMonstrix";
import MainPage from "./components/mainPage/mainPage";
import {useSelector} from "react-redux";
import Auth from "./components/auth/auth";

function App() {
  const isAuth = useSelector(state => state.profile.isAuth);

  return (
    <div>
      {!isAuth
        ?
        <Auth />
        :
        <div className="App">
          <Header />
          <Sidebar />
          <div className="main">
            <Routes>
              <Route path='/' element={<MainPage />}/>
              <Route path='/fight' element={<Fight />}/>
              <Route path='/my_monstrix' element={<MyMonstrix />}/>
            </Routes>
          </div>
        </div>
        }
    </div>
  );
}

export default App;
