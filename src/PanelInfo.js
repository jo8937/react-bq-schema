import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import ReactLoading from 'react-loading';
import fetch from 'cross-fetch';
import Panel from './Panel';

class PanelInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
			content: <RingLoader color={'#112233'}/>
		};
		
	}

	getContent(){
		return (
			<Container>
          <Row className="mt-md-3 mb-md-3 justify-content-center">
								<Col xs="4" className="text-right font-weight-bold">
								대상 앱 선택
								</Col>
								<Col xs="8" className="text-left">
									One of two columns
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
	}
  render() {
    return (
      <Panel title="정보">
				{this.state.content}
      </Panel>
    );
  }
}

export default PanelInfo;
