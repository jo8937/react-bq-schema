import React, { Component } from 'react';
import fetch from './cross-fetch-with-timeout';
import {  combineReducers, createStore, applyMiddleware, bindActionCreators  } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LoadingBar from 'react-redux-loading-bar'
import PropTypes from 'prop-types'
import PanelSchemaInfo from './PanelSchemaInfo';
import PanelFieldInfo from './PanelFieldInfo';
import PanelDataPreview from './PanelDataPreview';
import { Button } from 'reactstrap';
//import Loading from 'react-loading-bar'
//import 'react-loading-bar/dist/index.css'
//import {IntlProvider, FormattedMessage} from 'react-intl';
//import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import { FormattedMessage, injectIntl } from 'react-intl';
import { updateIntl } from 'react-intl-redux'
import Select from 'react-select';
import locales from './locale'
import PanelSourceGenerator from './PanelSourceGenerator';
import PanelEtlSimulation from './PanelEtlSimulation';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			locale : null
		};
	}

	componentDidMount(){
		this.setState(
			{
				locale: this.props.locale
			}
		)
		this.props.dispatch({
			type: "SCHEMA_PENDING",
			payload:
				fetch('/app/k/define/schema/view/cate.json',{timeout:3000})
				.then(schema => {
					this.props.dispatch({
						type: "SCHEMA_FULFILLED",
						schema
					});
				}).catch((err) => {
					alert(err);
				})
		});
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
				<LoadingBar style={{ zIndex : 1,  backgroundColor: '#2a84d8', height: '5px' }} progressIncrease={50}/>
			</header>
			<section>
				<PanelSchemaInfo title={<FormattedMessage id="schema_info"/>}/>
				<PanelFieldInfo title={<FormattedMessage id="field_info"/>}/>
				<PanelDataPreview title={<FormattedMessage id="data_preview"/>}/>
				<PanelSourceGenerator title={<FormattedMessage id="source_genaration"/>}/>
				<PanelEtlSimulation title={<FormattedMessage id="etl_simulation"/>}/>
				<div className="m-auto text-center">
				<Button onClick={() => this.changeLocale('en')}>영어</Button>        
				<Button onClick={() => this.changeLocale('ko')}>한글</Button>    
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