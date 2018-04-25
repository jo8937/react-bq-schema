	import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';
import { Provider } from 'react-redux'; 
import store from './ReduxStore'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
		, document.getElementById('root'));
registerServiceWorker();
