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
import Scroll from 'react-scroll';
import { ToastContainer } from 'react-toastify';
//import {ToastController, ToastContainer, dismiss, update, error, message, warning, success, info } from 'react-toastify-redux';

import { locales } from '../locales'
import PanelSchemaInfo from '../containers/PanelSchemaInfo';
import PanelDataPreview from '../containers/PanelDataPreview';
import PanelSourceGenerator from '../containers/PanelSourceGenerator';
import PanelEtlSimulation from '../containers/PanelEtlSimulation';
import AlertWindow from '../containers/AlertWindow';

import CustomUtils from '../utils/custom-utils'

import PanelFieldInfo from '../compo/PanelFieldInfo';
import PanelFieldAdd from '../compo/PanelFieldAdd';
import VirtualizedSelect from 'react-virtualized-select';

import * as actions from '../actions/action';
import 'react-toastify/dist/ReactToastify.css';
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import API from '../actions/API';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			locale : null
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.loadList = this.loadList.bind(this);
		this.moveSchema = this.moveSchema.bind(this);
	}

	moveSchema(newValue){
		this.props.dispatch(actions.requestSchema(newValue));
	}

	loadList(event){
		this.props.dispatch(actions.requestSchemaList());
		if(event){
			event.preventDefault();
		}
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
		this.props.dispatch(actions.requestSchema());
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
			<ToastContainer
			//position="top-right"
			position="top-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnVisibilityChange
			draggable
			pauseOnHover
			/>
			
			<header>
				<LoadingBar style={{ zIndex : 1,  backgroundColor: '#2a84d8', height: '7px', position:'fixed', top:0 }} updateTime={100} maxProgress={95} progressIncrease={5}/>
			</header>
			
			<section>
			<Container fluid>
				<Row>
					<Col className="d-flex justify-content-between">
						{
							this.props.vo && this.props.vo.schema && this.props.vo.schema.category
							&&
							this.props.schemaList.dataList && this.props.schemaList.dataList.length > 0 
							? 
						(
							<div className="pt-3">
							<VirtualizedSelect ref="citySelect"
								options={this.props.schemaList.dataList}
								simpleValue
								clearable={false}
								name="select-category"
								value={this.props.vo.schema.category}
								onChange={this.moveSchema}
								searchable
								labelKey="category"
								valueKey="category"
								style={{width:280}}
								menuStyle={{fontSize:20}}
							/>
							</div>
						)
						:
						(
							<div>
							<h1 className="p-2">
							{/* <a className="btn btn-white h-100 mr-3" onClick={this.loadList}>
							<FormattedMessage id="schema_define.back.btn"/>
							</a> */}
							<a href="#" onClick={this.loadList}>
							{
								(this.props.vo && this.props.vo.schema && this.props.vo.schema.category)
								||
								"Schema..."	
							}
							</a>
							</h1>
							</div>
						)
						}
						<span className="p-3 h-80">
						<a className="btn btn-white h-100" href="https://github.com/jo8937" target="_blank">
						<FormattedMessage id="guide"/>
						</a>
						</span>
					</Col>
				</Row>
			</Container>
			</section>
			<section>
				<PanelSchemaInfo title={<FormattedMessage id="schema_info" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelFieldInfoConnected title={<FormattedMessage id="field_info" defaultMessage="Info"/>} />
				<PanelFieldAddConnected title={<FormattedMessage id="field_add" defaultMessage="Info"/>}  />
				<PanelSourceGenerator title={<FormattedMessage id="source_genaration" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelDataPreview title={<FormattedMessage id="data_preview" defaultMessage="Info"/>} intl={this.props.intl}/>
				<PanelEtlSimulation title={<FormattedMessage id="etl_simulation" defaultMessage="Info"/>} intl={this.props.intl}/>
			</section>
			<section className="mt-5 mb-5 d-flex justify-content-between">
				<div><AlertWindow /></div>
				<div>
					<a href={API.LINK_FORM_URI} className="btn btn-primary mr-3">
						<FormattedMessage id="schema_list_write_from.btn"/>
					</a>
					<a href={API.LINK_LIST_URI} className="btn btn-secondary">
						<FormattedMessage id="schema_define.back.btn"/>
					</a>
				</div>
				<div>
					<Button onClick={() => this.changeLocale('en')}>영어</Button>        
					<Button onClick={() => this.changeLocale('ko')}>한글</Button>    
				</div>
			</section>
						
		</div>
	);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
	return {
		vo: state.schemaVo,
		schemaList: state.schemaList
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const PanelFieldInfoConnected = injectIntl(connect(mapStateToProps, actions.FieldInfo_DispatchToProps)(PanelFieldInfo), { intlPropName:'intl' });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PanelFieldAddConnected = injectIntl(connect(mapStateToProps, actions.FieldAdd_D2P)(PanelFieldAdd), { intlPropName:'intl' });


export default injectIntl(connect(
	mapStateToProps
)(App), { intlPropName:'intl' } );



//export default App