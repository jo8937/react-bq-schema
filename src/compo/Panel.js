import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
//import { CircleLoader, RingLoader } from 'react-spinners';
//import ReactLoading from 'react-loading';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
			visible: true,
			toggle: true,
			loading: true
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
      <Container fluid>
        <Row>
					<Col>
					<div className="d-flex bg-secondary bd-highlight">
						<div className="p-2 panelhead ml-1">{this.props.title}</div> 
						<div className="mt-auto mb-auto ml-1">
						{this.props.titleOptional}
						</div>
						<button type="button" aria-label="Close" className="btn btn-link ml-auto pl-3 pr-3" style={{borderLeft:1}} onClick={this.eventHandler}>
						<i className={this.state.toggle ? 'fa fa-angle-up' : 'fa fa-angle-down'} aria-hidden="true">&nbsp;</i>
						</button>
					</div>
					</Col>
        </Row>
        <Row>
					<Col>
						<Collapse isOpen={this.state.toggle}>
							{this.props.children}
						</Collapse>
					</Col>
        </Row>
      </Container>
    );
  }
}

export default Panel;
