import React, { Component } from 'react';
import {  combineReducers, createStore, applyMiddleware, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LoadingBar from 'react-redux-loading-bar'
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Collapse } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { updateIntl } from 'react-intl-redux'
import Select from 'react-select';

import { locales } from '../locales'
import PanelSchemaInfo from '../containers/PanelSchemaInfo';
import PanelDataPreview from '../containers/PanelDataPreview';
import PanelSourceGenerator from '../containers/PanelSourceGenerator';
import PanelEtlSimulation from '../containers/PanelEtlSimulation';
import AlertWindow from '../containers/AlertWindow';

import CustomUtils from '../utils/custom-utils'

import PanelFieldInfo from '../compo/PanelFieldInfo';
import PanelFieldAdd from '../compo/PanelFieldAdd';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			locale : null
		};
		this.toggleModal = this.toggleModal.bind(this);

	}

	toggleModal() {
		this.setState({
		  modal: !this.state.modal
		});
	  }

	componentDidMount(){
		this.setState(
			{
				locale: this.props.locale
			}
		)
		this.props.dispatch({ type: "REQUEST_SCHEMA" });
	}

	changeLocale = (lang) => {
		this.props.dispatch(updateIntl({
			locale: lang,
			messages: locales[lang]
			}
		));
	}
	render() {
	return (
		<div>
			<header>
				<LoadingBar style={{ zIndex : 1,  backgroundColor: '#2a84d8', height: '7px', position:'fixed', top:0 }}/>
			</header>
			<section>
			<Container fluid>
				<Row>
					<Col className="d-flex justify-content-between">
						<h1 className="p-2">Schema</h1>					
						<span className="p-3 h-80">
						<button className="btn btn-white h-100">Info</button>
						</span>
					</Col>
				</Row>
			</Container>
			</section>
			<section>
				<PanelSchemaInfo title={<FormattedMessage id="schema_info" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelFieldInfoConnected title={<FormattedMessage id="field_info" defaultMessage="Info"/>} />
				<PanelFieldAddConnected title={<FormattedMessage id="field_add" defaultMessage="Info"/>}  />
				<PanelDataPreview title={<FormattedMessage id="data_preview" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelSourceGenerator title={<FormattedMessage id="source_genaration" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelEtlSimulation title={<FormattedMessage id="etl_simulation" defaultMessage="Info"/>} intl={this.props.intl}/>
			</section>
			<section>
				<div className="m-auto text-center">
					<Button onClick={() => this.changeLocale('en')}>영어</Button>        
					<Button onClick={() => this.changeLocale('ko')}>한글</Button>    
					<AlertWindow />
				</div>
			</section>
		</div>
	);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
	return {
    vo: state.schemaVo
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const FieldInfo_DispatchToProps = dispatch => {
	return {
	  dispatch: dispatch,
	  onFieldEdit: (...args) => {
		dispatch({
            type: "REQUEST_FIELD_EDIT",
            payload: {
                category: args[0], //category,
                col: args[1], //col,
                name: args[2], //k,
                value: args[3], //v
			}
		  });
	  },
	  onFieldActivate: (payload) => {
			dispatch({
				type: "REQUEST_FIELD_EDIT",
				payload
			});
	  },
	  
	}  
}

const PanelFieldInfoConnected = injectIntl(connect(mapStateToProps, FieldInfo_DispatchToProps)(PanelFieldInfo), { intlPropName:'intl' });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FieldAdd_D2P = dispatch => {
	return {
		onFieldAdd: payload => {
			dispatch({ type: "REQUEST_FIELD_ADD", payload});
		}
	}
	
}

const PanelFieldAddConnected = injectIntl(connect(mapStateToProps, FieldAdd_D2P)(PanelFieldAdd), { intlPropName:'intl' });


export default injectIntl(connect(
	mapStateToProps
)(App), { intlPropName:'intl' } );



//export default App