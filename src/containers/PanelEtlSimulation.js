import React, { Component } from 'react';
import { PacmanLoader, ClimbingBoxLoader, RingLoader } from 'react-spinners';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import {injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import Select from 'react-select';
import serialize from 'form-serialize';
//import {Controlled as CodeMirror} from 'react-codemirror2'
//require('codemirror/mode/javascript/javascript');

import CustomUtils, {formatMessage as f } from '../utils/custom-utils'
import Panel from '../compo/Panel';
import { etlSimulDispatchToProps } from "../actions/action"

class PanelEtlSimulation extends Component {
  constructor(props) {
		super(props);
		this.state = {
			options : {
        lineNumbers: true,
        theme: "default",
        mode:"javascript", 
        json: true
      }
    }
    this.sendLogData = this.sendLogData.bind(this);
  }
  
  sendLogData(event){
    let data = serialize(event.target, { hash: true });
    console.log(data);
    this.props.onSendData(data);
    event.preventDefault();
  }

	getForm(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length > 0){
			return (
        <form style={{margin:0}} onSubmit={this.sendLogData} method="POST" action="#">
        <Row>
          
          <Col md="12" className="mt-3 mb-3 d-flex justify-content-center">
              <Col md="6">
              {
                this.props.vo.fields.filter(row => row.active > 0 || row.required)
                .map( row=>  (
                  <Row className="d-flex justify-content-left p-1" key={row.name}>
                    <Col md="3" className="text-right">{row.name}</Col>
                    <Col md="9">
                    <Input type="text" name={row.name} defaultValue={row.sampleValue} required/>
                    </Col>
                  </Row>
                ))
              }
              </Col>
							<Col md="4" className="m-auto">
                {this.props.etl.sending ? (
                  <div>
                      <div><ClimbingBoxLoader color={'#2a84d8'}/></div>
                      <div>sending ...</div>
                  </div>
                  ) : (
                    <div>
                      <div>
                      <Button type="submit" className="btn-bordered-primary btn-block" color="primary">
                      데이터 입력
                      </Button>
                      </div>
                      <div>
                      <ul>
                        <li>
                          <FormattedMessage id="etl_simulation_data_cannnot_delete"/>
                        </li>
                      </ul>
                      </div>
                    </div>
                )}
              </Col>
              <Col md="2">
              </Col>
          </Col>
        </Row>
        </form>
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
  
  getStatus(){
    return (
      <Row className="d-flex justify-content-center">  
      <Col md="6" className="mt-3 mb-3">
      <Card body>
          <CardTitle>ETL Status</CardTitle>
          <CardText className="d-flex justify-content-around">
            <Button className={this.props.etl.status.was?"btn-bordered-primary":""}>WAS</Button>
            <span>→</span>
            <Button className={this.props.etl.status.fluentd?"btn-bordered-primary":""}>Fluentd</Button>
            <span>→</span>
            <Button className={this.props.etl.status.bigquery?"btn-bordered-primary":""}>Bigquery</Button>
          </CardText>
      </Card>
      </Col>
      </Row>

    );
  }

  render() {
    return (
      <Panel title={this.props.title}>
        {this.getForm()}
        {this.getStatus()}
      </Panel>
    );
  }
}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo,
    etl: state.etl
  }
}

export default injectIntl(connect(
  mapStateToProps,
  etlSimulDispatchToProps
)(PanelEtlSimulation), {intlPropName:'intl'});
