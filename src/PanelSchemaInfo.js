import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'

class PanelSchemaInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			labelKeys : ["gameGroup","category","description","parentCategory"]
		}
	}
	
	getContent(){
		if(this.props.vo != null){
			return (
				<Container>
						{this.state.labelKeys.map( k => 
								(
								<Row className="mt-md-3 mb-md-3 justify-content-center">
											<Col xs="4" className="text-right font-weight-bold">
											{k}
											</Col>
											<Col xs="8" className="text-left">
											{this.props.vo.schema[k]}
											</Col>
								</Row>
								)
							)
						}	
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
      <Panel title="스키마 정보">
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelSchemaInfo);

