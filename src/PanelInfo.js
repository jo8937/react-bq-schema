import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'

class PanelInfo extends Component {
  constructor(props) {
    super(props);
	}

	getContent(){
		if(this.props.schema != null){
			return (
				<Container>
						<Row className="mt-md-3 mb-md-3 justify-content-center">
									<Col xs="4" className="text-right font-weight-bold">
									대상 앱 선택
									</Col>
									<Col xs="8" className="text-left">
										{Object.keys(this.props.schema).map(k => k)}
									</Col>
						</Row>
						<Row className="mt-md-3 mb-md-3 justify-content-center">
									<Col xs="4" className="text-right font-weight-bold">
									테이블명
									</Col>
									<Col xs="8" className="text-left">
									2017-01-01 15:33:44
									</Col>
						</Row>
						<Row className="mt-md-3 mb-md-3 justify-content-center">
									<Col xs="4" className="text-right font-weight-bold">
									설명
									</Col>
									<Col xs="8" className="text-left">
									s
									</Col>
						</Row>	
				</Container>
			);
		}else{
			return (
				<div>
					<RingLoader color={'#112233'}/>
				</div>
			);
		}
	}

  render() {
    return (
      <Panel title="정보">
				{this.getContent()}
      </Panel>
    );
  }
}

const mapStateToProps = state => {
	return {
    schema: state.test
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
)(PanelInfo);

