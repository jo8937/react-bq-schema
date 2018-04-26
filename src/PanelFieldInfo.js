import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table, Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown  } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'
import SelectBoxFieldActive from './SelectBoxFieldActive'

class PanelFieldInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	
	getContent(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
				<Row>
				<Col className="m-3">				
				<Table className="table-bordered-top-down table-thead-padded">
        <thead className="thead-light">
          <tr>
            <th>필드명</th>
            <th>타입</th>
            <th>설명</th>
            <th>샘플값</th>
						<th>사용</th>
						<th>상태</th>
          </tr>
        </thead>
        <tbody>
					{this.props.vo.fields.map( k => 
          <tr key={k.name}>
            <th scope="row">{k.name}</th>
            <td>{k.type}</td>
            <td>{k.description}</td>
            <td>{k.sampleValue}</td>
						<td>
						<SelectBoxFieldActive field={k} schema={this.props.vo.schema}/>
						</td>
						<td></td>
          </tr>
					)}
        </tbody>
			</Table>
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

  render() {
    return (
      <Panel title={this.props.title}>
				{this.getContent()}
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
)(PanelFieldInfo);

