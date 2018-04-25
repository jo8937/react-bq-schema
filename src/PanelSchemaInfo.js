import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'
import EditableCustom from './EditableCustom';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

class PanelSchemaInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			labelKeys : ["gameGroup","category","description","parentCategory"]
		}
	}
	
	updatePropertyValue = (k,v) => {
		console.log(k + "," + v);
		this.props.dispatch({
			type: "SCHEMA_PROP_EDIT_PENDING",
			payload:
				fetch('/app/k/define/schema/schema_edit_proc',{
					method: 'POST',
          headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({ name: k, value: v }),
					timeout:3000
				})
				.then(schema_prop => {
					this.props.dispatch({
						type: "SCHEMA_PROP_EDIT_FULFILLED",
						schema_prop
					});
				}).catch((err) => {
					alert(err);
				})
		});
	}

	getContent(){
		if(this.props.vo != null){

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
											<Col xs="4" className="text-right font-weight-bold">
											{k}
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
    vo: state.schemaVo.schema
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

