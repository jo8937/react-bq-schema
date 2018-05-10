import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'
import EditableCustom from './EditableCustom';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { FormattedMessage } from 'react-intl';
import CustomUtils from './custom-utils'

class PanelSchemaInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			labelKeys : ["gameGroup","category","description","parentCategory"]
		}
	}
	
	updatePropertyValue = (k, v, prop) => {
		this.props.dispatch({
			type: "REQUEST_SCHEMA_EDIT",
			payload:{ category: this.props.vo.schema.category, name: k, value: v }
		});
	}

	getContent(){
		if(this.props.vo && this.props.vo.schema){

			return (
				<Container>
						{this.state.labelKeys.map( k => {
								var content = this.props.vo.schema[k]
								if(["description"].includes(k)){
										content = <EditableCustom 
										name={k}
										dataType="text"
										mode="inline"
										value={this.props.vo.schema[k]}
										onSubmit={this.updatePropertyValue}
										/>
								}

								return (
								<Row className="mt-md-3 mb-md-3 justify-content-center" key={k}>
											<Col xs="4" className="text-right colhead">
											<FormattedMessage id={'schema_view.' + k}/>
											</Col>
											<Col xs="8" className="text-left">
											{content}
											</Col>
								</Row>
								)
						})}	
				</Container>
			);
		}else{
			return (
				<Row className="mt-md-3 mb-md-3 justify-content-center">
							<Col xs="2" className="text-left">
							<RingLoader color={'#2a84d8'}/>
							</Col>
				</Row>
			);
		}
	}

  render() {
    return (
      <Panel title={this.props.title}>
				{this.getContent()}
      </Panel>
    );
  }
}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch()
		}
		,
		dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelSchemaInfo);
