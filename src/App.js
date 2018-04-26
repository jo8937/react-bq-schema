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
import {updateIntl } from 'react-intl-redux'
//import Loading from 'react-loading-bar'
//import 'react-loading-bar/dist/index.css'
//import {IntlProvider, FormattedMessage} from 'react-intl';
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount(){
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

	changeLocale = () => {
		this.props.dispatch(
			updateIntl ({
				locale: 'en',
				messages: {
					'schema_view.use_select.select': 's',
					'schema_view.use_select.required': 'a',
					'schema_view.use_select.recommend': 'b',
				}
			  })
		)
	}

	render() {
	return (
		<div>
			<header>
				<LoadingBar style={{ zIndex : 1,  backgroundColor: '#2a84d8', height: '5px' }} progressIncrease={50}/>
			</header>
			<section>
				<PanelSchemaInfo title="스키마 정보"/>
				<PanelFieldInfo title="필드 정보"/>
				<PanelDataPreview title="데이터 미리보기"/>
				<Button onClick={this.changeLocale}>a</Button>        <FormattedMessage id="schema_view.use_select.select"/>
			</section>
		</div>
	);
	}
}

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
// });
// export default connect(() => ({}), mapDispatchToProps)(App)
export default connect()(App);
//export default App