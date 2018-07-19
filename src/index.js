import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'; 
import { IntlProvider } from 'react-intl-redux'
//import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import store from './actions/store'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';

const Loading = ({txt = "wait for a minute to loading view.."}) => <div><img src="//image-glb.qpyou.cn/markup/img/hiveconsole/loading_b.gif" height="20"/>{txt}...</div>;

const App = Loadable({
	loader: () => import('./apps/App'),
	loading: Loading,
});
const About = Loadable({
	loader: () => import('./apps/About'),
	loading: Loading,
});

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<Router>
				<Switch>
					<Route path="/about" component={About} />
					<Route component={App} />
				</Switch>
			</Router>
		</IntlProvider>
	</Provider>
		, document.getElementById('root'));
registerServiceWorker();
