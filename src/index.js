import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'; 
import { IntlProvider } from 'react-intl-redux'
//import { IntlProvider } from 'react-intl'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import store from './actions/store'

import MarkupSample from './apps/MarkupSample'
import About from './apps/About'
import SourceGenerateTest from './apps/SourceGenerateTest'
import App from './apps/App'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<Router>
				<Switch>
					<Route path="/sample" component={MarkupSample} />
					<Route path="/about" component={About} />
					<Route path="/srcgen" component={SourceGenerateTest} />
					<Route component={App} />
				</Switch>
			</Router>
		</IntlProvider>
	</Provider>
		, document.getElementById('root'));
registerServiceWorker();
