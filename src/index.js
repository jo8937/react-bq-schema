import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import { TextIcon } from 'react-open-iconic-svg';
import './styles/static/common.css';
import './styles/static/css/font-awesome.min.css';
import './styles/scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
