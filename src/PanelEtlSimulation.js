import React, { Component } from 'react';
import { CircleLoader, RingLoader } from 'react-spinners';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import {injectIntl, FormattedMessage } from 'react-intl';
import { formatMessage as f } from './custom-utils'
import Panel from './Panel';
import { connect } from 'react-redux'
import Select from 'react-select';
import serialize from 'form-serialize';
//import {Controlled as CodeMirror} from 'react-codemirror2'
//require('codemirror/mode/javascript/javascript');

class PanelDataPreview extends Component {
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
  }
  
	getForm(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length > 0){
			return (
        <form>
        <Row>
          
          <Col md="12" className="m-3 d-flex justify-content-center">
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
							<Col md="3" className="m-auto">
						  <Button type="submit" className="btn-bordered-primary btn-block" color="primary">
              테스트 데이터 입력
              </Button>
              </Col>
              <Col md="3">
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
      <Col md="8" className="m-3">
      <Card body>
          <CardTitle>ETL Status</CardTitle>
          <CardText className="d-flex justify-content-around">
            <Button>1</Button>
            <span>→</span>
            <Button>2</Button>
            <span>→</span>
            <Button>3</Button>
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

