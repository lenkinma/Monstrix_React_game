import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<HashRouter>
		<Provider store={store}>
			<App/>
		</Provider>
	</HashRouter>
);

reportWebVitals();
