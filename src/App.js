import React, { Component } from 'react';
import fetch from './cross-fetch-with-timeout';
import {  combineReducers, createStore, applyMiddleware, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LoadingBar from 'react-redux-loading-bar'
import PropTypes from 'prop-types';
//import Loading from 'react-loading-bar'
//import 'react-loading-bar/dist/index.css'
//import {IntlProvider, FormattedMessage} from 'react-intl';
//import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
//import { Button } from 'reactstrap';
import { Button, Container, Row, Col, Collapse } from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { updateIntl } from 'react-intl-redux'
import Select from 'react-select';
import { locales } from './locale'
import PanelSchemaInfo from './PanelSchemaInfo';
import PanelFieldInfo from './PanelFieldInfo';
import PanelDataPreview from './PanelDataPreview';
import PanelSourceGenerator from './PanelSourceGenerator';
import PanelEtlSimulation from './PanelEtlSimulation';
import PanelFieldAdd from './PanelFieldAdd';
import AlertWindow from './AlertWindow';
import CustomUtils from './custom-utils'

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
				<PanelSchemaInfo title={<FormattedMessage id="schema_info" defaultMessage="Info"/>}/>
				<PanelFieldInfo title={<FormattedMessage id="field_info" defaultMessage="Info"/>}/>
				<PanelFieldAdd title={<FormattedMessage id="field_add" defaultMessage="Info"/>}/>
				<PanelDataPreview title={<FormattedMessage id="data_preview" defaultMessage="Info"/>}/>
				<PanelSourceGenerator title={<FormattedMessage id="source_genaration" defaultMessage="Info"/>}/>
				<PanelEtlSimulation title={<FormattedMessage id="etl_simulation" defaultMessage="Info"/>}/>
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

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
// });
// export default connect(() => ({}), mapDispatchToProps)(App)
export default injectIntl(connect()(App));
//export default App