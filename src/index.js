import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Provider } from 'react-redux'; 
import { IntlProvider } from 'react-intl-redux'
//import { IntlProvider } from 'react-intl'
import store from './ReduxStore'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MarkupSample from './routers/MarkupSample'
import About from './routers/About'
import SourceGenerateTest from './routers/SourceGenerateTest'

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider>
			<Router>
				<Switch>
					<Route path="/sample" component={MarkupSample} />
					<Route path="/about" component={About} />
					<Route path="/srcgen" component={SourceGenerateTest} />
					<Route path="/index.html/abcd" component={SourceGenerateTest} />
					<Route component={App} />
				</Switch>
			</Router>
		</IntlProvider>
	</Provider>
		, document.getElementById('root'));
registerServiceWorker();
