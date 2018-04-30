import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import classnames from 'classnames';
import Panel from './Panel';
import { connect } from 'react-redux'
import {Controlled as CodeMirror} from 'react-codemirror2'
//require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

class PanelDataPreview extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
		this.state = {
      activeTab: "json",
      value: JSON.stringify({"test":"1"}),
      options : {
        lineNumbers: true,
        theme: "default",
        mode:"javascript", 
        json: true
      }
		}
	}
	
	getContent(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
          <Row>
            <Col className="m-3">
            <CodeMirror
                value={this.state.value}
                options={this.state.options}
                onBeforeChange={(editor, data, value) => {
                  this.setState({value});
                }}
                onChange={(editor, data, value) => {
                  console.log(value);
                }}
              />
            </Col>
        </Row>
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
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Panel title={this.props.title}>
          <Row>
            <Col className="m-3">
            <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'json' })}
              onClick={() => { this.toggle('json'); }}
            >
              JSON
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              AAA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Other
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane>
            <Card style={{borderTop:0, borderRadius:0}}>
                {this.getContent()}
            </Card>
          </TabPane>
        </TabContent>
            </Col>
          </Row>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo.schema
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

