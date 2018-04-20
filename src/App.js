import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle, CardHeader,Container, Row, Col, Collapse, Alert } from 'reactstrap';
import Checkbox from './Checkbox';
//import Editable from 'react-x-editable';
import EditableCustom from './EditableCustom';
import Panel from './Panel';
import PanelInfo from './PanelInfo';
import { CircleLoader, RingLoader } from 'react-spinners';
import ReactLoading from 'react-loading';
import fetch from 'cross-fetch';
import { createStore, applyMiddleware } from 'redux'
import {  loadingBarMiddleware , LoadingBar, loadingBarReducer, showLoading, hideLoading } from 'react-redux-loading-bar'
import { combineReducers, dispatch } from 'redux'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
			schema: null,
			loading: true
		};
	}

	componentDidMount(){
		Promise.race([
			() => {
				const res = this.props.store.dispatch({
					type: "SCHEMA_REQUEST",
					payload: fetch('/app/k/define/schema/view/cate.json')
				})

				res.then(res => {
								if (res.status >= 400) {
									throw new Error("Bad response from server");
								}
								return res.json();
					}).then(schema => {
						this.props.store.dispatch({
							type: "SCHEMA_SUCCESS",
							schema
						});
						this.setState({
							loading: false
						});
					})
				.catch(err => {
					this.props.store.dispatch({
							type: "SCHEMA_FAILURE",
							err
						});
				})
			}
			,
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('ajax timeout')), 3000)
			)
		])
		.catch(err => {
			 alert(err.message);
		});
  }
	
  render() {
    return (
			<div className="App">
				<header>
					<LoadingBar />
				</header>
				<section>
					sss
				</section>
	
        {/* <PanelInfo data={this.state.data}/>
        <PanelInfo data={this.state.data}/> */}
      </div>
    );
  }
}

export default App;
