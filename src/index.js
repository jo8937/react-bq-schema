import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import "bootstrap/scss/bootstrap.scss"
import './styles/scss/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
