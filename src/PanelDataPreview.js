import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'

class PanelDataPreview extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	
	getContent(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
				<Container>
						
								<Row className="mt-md-3 mb-md-3 justify-content-center">
											<Col xs="4" className="text-right font-weight-bold">
						ss
											</Col>
											<Col xs="8" className="text-left">
											....
											</Col>
								</Row>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelDataPreview);

