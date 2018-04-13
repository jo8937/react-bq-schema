import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from 'reactstrap';

class DefaultPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactdd</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          <Button color="danger">Danger!</Button>
        </p>
      </div>
    );
  }
}

export default App;
