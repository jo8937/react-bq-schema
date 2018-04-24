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
      <Container>
        <Row>
					<Col>
					<div className="d-flex bg-secondary bd-highlight">
						<div className="p-2">{this.props.title}</div>
						<button type="button" aria-label="Close" onClick={this.eventHandler} className="btn btn-link ml-auto p-2">
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
