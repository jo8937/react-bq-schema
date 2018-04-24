import React, { Component } from 'react';
import PanelInfo from './PanelInfo';
import fetch from './cross-fetch-with-timeout';
import {  combineReducers, createStore, applyMiddleware, bindActionCreators, dispatch  } from 'redux'
import { connect } from 'react-redux'
import {  loadingBarMiddleware , LoadingBar, loadingBarReducer, showLoading, hideLoading } from 'react-redux-loading-bar'
import PropTypes from 'prop-types'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
				schema: {},
				loading: true
			};
	}

	handleSchema(){
		fetch('/app/k/define/schema/view/cate.json',{timeout:3000})
		.then(schema => {
			this.props.store.dispatch({
				type: "PENDING",
				schema
			});
			this.setState({
				schema: schema,
				loading: false
			});
			this.store.dispatch(hideLoading());
		}).catch((err) => {
			alert(err);
		});
	}

	componentDidMount(){
		//let { dispatch } = this.props;
		//this.props.store.dispatch(showLoading());
	}

	render() {
	return (
		<Loading
			show={this.state.loading}
			color="red"
			/>
	

		/*
			<div className="App">
				<header>
				<Loading
					show={this.state.loading}
					color="red"
					/>
				</header>
				<section>
					<PanelInfo data={this.state.schema}/>
				</section>
		</div>

		*/
	);
	}
}
/*
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
});

export default connect(() => ({}), mapDispatchToProps)(App)
*/
export default App