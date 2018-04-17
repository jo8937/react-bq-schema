import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle, CardHeader,Container, Row, Col, Collapse, Alert } from 'reactstrap';

class InfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
			visible: true,
			toggle: true
		};
		
		this.eventHandler = this.eventHandler.bind(this);

	}
	
	eventHandler(event) {
    this.setState((prevState) => ({
        toggle: !prevState.toggle
      })
    );
	}
	
  render() {
    return (
      <Container>
        <Row>
					<Col>
					<div className="d-flex bg-secondary bd-highlight">
						<div className="p-2">Flex item 1</div>
						<button type="button" aria-label="Close" onClick={this.eventHandler} className="btn btn-link ml-auto p-2">
						<i className={this.state.toggle ? 'fa fa-angle-up' : 'fa fa-angle-down'} aria-hidden="true">&nbsp;</i>
						</button>
					</div>
					</Col>
        </Row>
        <Row className={this.state.toggle ? 'd-block' : 'd-none'}>
        <Collapse isOpen={true}>
          <Container>
          <Row>
					<Col>
					<table className="table borderless">
								<tbody>
										<tr>
												<th scope="row" className="text-right">대상 앱 선택</th>
												<td>com.test</td>
										</tr>
										<tr>
												<th scope="row" className="text-right">테이블명</th>
												<td>2017-01-01 15:33:44</td>
										</tr>
										<tr>
												<th scope="row" className="text-right">설명</th>
												<td>
														<div className="textarea count">
																<textarea name="" id="" cols="30" rows="10"></textarea>
																<div className="cnt"><strong>0</strong>/150</div>
														</div>
												</td>
										</tr>
								</tbody>
						</table>
						</Col>
            {/* <Col className="text-right font-weight-bold">대상 게임 선택</Col>
            <Col className="text-left">com.com2us.soccersprits</Col> */}
          </Row>
          </Container>
        </Collapse>
        </Row>
      </Container>
    );
  }
}

export default InfoCard;
