import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse } from 'reactstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AlertWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.clickOk = this.clickOk.bind(this);
	}

	toggleModal() {
		let isOpen = this.props.alertmessage ? this.props.alertmessage.open : false;
		this.props.dispatch({
			type: "TOGGLE_ALERT",
			open: !isOpen
		})
	}

	clickOk(){
		if(this.props.alertmessage.onOk){
			this.props.alertmessage.onOk();
		}
		this.toggleModal();
	}

  render() {
    return (
				<div>
				<Button color="danger" onClick={this.toggleModal}>Open</Button>
				<Modal isOpen={this.props.alertmessage.open} toggle={this.toggleModal} contentClassName={this.props.alertmessage.theme}>
				<ModalHeader toggle={this.toggleModal}>
					<span>
					<i className="mr-2 fa fa-info-circle" aria-hidden="false"/>
					</span>
					<FormattedMessage id={this.props.alertmessage.msgIdTitle}/>
				</ModalHeader>
				<ModalBody>
					{this.props.alertmessage.message}
				</ModalBody>
				<ModalFooter>
					<Button className={"mr-auto text-"+this.props.alertmessage.theme} color="secondary" onClick={this.clickOk}><FormattedMessage id={this.props.alertmessage.msgIdOk}/></Button>{' '}
					{/* <Button color="secondary" onClick={this.toggleModal}><FormattedMessage id="cancel"/></Button> */}
				</ModalFooter>
				</Modal>
				</div>
    );
  }
}

const mapStateToProps = state => {
	return {
		vo: state.schemaVo.schema,
		alertmessage: state.alertmessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModel: id => {
      dispatch({

			})
		}
		,
		dispatch: dispatch
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertWindow));
