import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import classnames from 'classnames';
import { connect } from 'react-redux'
import {Controlled as CodeMirror} from 'react-codemirror2'

import Panel from '../compo/Panel';
import CustomUtils, {formatMessage as f } from '../utils/custom-utils'

import * as actions from '../actions/action';

require('codemirror/mode/javascript/javascript');

class PanelSourceGenerator extends Component {
  constructor(props) {
    super(props);
    //this.toggle = this.toggle.bind(this);
		this.state = {
      tabList : [
        {
          "id":"doc",
          //"subTab" : ["DOC_JSON","REDMINE_WIKI"]
          "subTab" : ["JSONHTTP","REDMINE_WIKI"]
        },
        {
          "id":"server",
          "subTab" : ["SERVER_PHP","SERVER_JAVASCRIPT","SERVER_JAVA","SERVER_PYTHON","SERVER_CSHARP","SERVER_CSHARP_NXLOG","SERVER_PHP_SCRIBED"]
          //"subTab" : ["SERVER_PHP"]
        },
        {
          "id":"client",
          "subTab" : ["CSHARP","CPP","JAVA","OBJC"]
        },
      ],
      defaultLang: "JSONHTTP",
      dropdownOpen: [false,false,false],
      activeTab: null,
      activeSubTab: null,
      options : {
        lineNumbers: true,
        theme: "default",
        mode:"javascript", 
        json: true
      }
		}
	}
  
  requestSource(lang){
    this.props.dispatch(actions.requestSource(lang));
  }

	componentDidMount(){
    this.requestSource(this.state.defaultLang);
  }
  
  toggle(tab, subTabId) {
    return (e) => {
        this.setState({
          activeTab: tab['id'],
          activeSubTab: subTabId,
        });
        this.requestSource(subTabId);
    }
  }

  toggleDropdown = (tab) => (e) => {
      if (this.state.activeTab !== tab['id']){
        this.setState({
          activeTab: tab['id']
        });
      }else{
        this.setState({
          activeTab: null
        });
      }
        
  }

  findCategoryOfLang(lang){
    let parentId = null;

    this.state.tabList.forEach(tab =>{
      tab.subTab.forEach(subTabId =>{
        if(lang == subTabId){
          parentId = tab["id"]
        }
      });
    })
      
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~" + lang);
    return parentId;
  }

  render() {
    let lang = (this.props.sourceGen && this.props.sourceGen.lang) ? this.props.sourceGen.lang : this.state.defaultLang;
    let category = this.findCategoryOfLang(lang);

    let tabHtml = this.state.tabList.map( (tab,i) => {
      let isActive = this.state.activeTab === tab["id"];
      let isSelected = category === tab["id"];
      return (
      <Dropdown nav isOpen={isActive} toggle={this.toggleDropdown(tab)} className={classnames({ show: isSelected || isActive })} key={tab['id']}>
        <DropdownToggle nav caret>
          {isSelected ? 
            (
              <span>[{f(tab["id"]+"_source")}] <strong>{f(lang+"_source")}</strong></span>
            )  
            :
            f(tab["id"]+"_source")
          }
        </DropdownToggle>
        <DropdownMenu>
          {
            tab["subTab"].map( (subTabId) => (
              <DropdownItem onClick={this.toggle(tab,subTabId)} key={subTabId}>
                {f(subTabId+"_source")}
              </DropdownItem>
            ) 
            )
          }              
        </DropdownMenu>
      </Dropdown>
      )
    }
    );
  
    if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length > 0){
      return (
        <Panel title={this.props.title}>
            <Row>
              <Col className="m-3">
              <Nav tabs>
                {tabHtml}
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
    }else{
      return (
        <Panel title={this.props.title}>
          <Row className="mt-md-3 mb-md-3 justify-content-center">
                <Col xs="2" className="text-left">
                <RingLoader color={'#2a84d8'}/>
                </Col>
          </Row>
        </Panel>
			);
    }
  } // end render

	getContent(){
    if(this.props.sourceGen && this.props.sourceGen.source){
			return (
        <div>
          <Row>
              <Col className="m-3">
              <CodeMirror
                  value={this.props.sourceGen.source}
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
          {this.props.sourceGen.lang.startsWith("SERVER_") && (
          <Row>
              <Col className="m-3">
              <i className="fa fa-hand-o-right mr-2"/>
              <a href="#" target="_blank">
              #
              </a>
              </Col>
          </Row> 
          )
          }
        </div>
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
  } // end cont

}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo,
    sourceGen: state.sourceGen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch:  dispatch,
    onTodoClick: id => {
      dispatch()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelSourceGenerator);

