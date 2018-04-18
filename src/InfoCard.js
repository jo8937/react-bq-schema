import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle, CardHeader,Container, Row, Col, Collapse, Alert } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import ReactLoading from 'react-loading';
import fetch from 'cross-fetch';

class InfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
			visible: true,
			toggle: true,
			loading: true
		};
		
		this.eventHandler = this.eventHandler.bind(this);

	}
	
	componentDidMount(){
		fetch('/app/k/define/schema/view/cate.json')
		.then(res => {
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
			return res.json();
		})
		.then(schema => {
			console.log(schema);
			this.setState({
				loading: false
			});
		})
		.catch(err => {
			console.log("call error");
			console.error(err);
			alert(err);
		});
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
        <Collapse isOpen={this.state.loading}>
				<Col>
				<RingLoader
					color={'#2a84d8'} 
					loading={this.state.loading} 
				/>
				{/* <ReactLoading type="spin" color={'#2a84d8'} className="m-auto"/> */}
				</Col>
				</Collapse>
				<Collapse isOpen={this.state.loading == false}>
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
								<div className="textarea count">
																<textarea name="" id="" cols="30" rows="10"></textarea>
																<div className="cnt"><strong>0</strong>/150</div>
														</div>
								</Col>
					</Row>	
          </Container>
        </Collapse>
        </Row>
      </Container>
    );
  }
}

export default InfoCard;
