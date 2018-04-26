	import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';
import { Provider } from 'react-redux'; 
import { IntlProvider } from 'react-intl-redux'
import store from './ReduxStore'

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<App />
		</IntlProvider>
	</Provider>
		, document.getElementById('root'));
registerServiceWorker();
