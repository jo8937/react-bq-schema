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

	moreInfo(event){
		event.stopPropagation();
		console.log("test")
	}
	
  render() {

		let addtionalButton;
		if(this.props.buttton){
			addtionalButton = <button type="button" className="btn btn-secondary btn-small" onClick={this.moreInfo}>
														Link
												</button>
		}

    return (
      <Container fluid>
        <Row>
					<Col>
					<div className="d-flex bg-secondary bd-highlight" onClick={this.eventHandler}>
						<div className="p-2 panelhead">{this.props.title}</div>
						{addtionalButton}
						
						<button type="button" aria-label="Close" className="btn btn-link ml-auto p-2">
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
