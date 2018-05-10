import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown  } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Tooltip } from 'reactstrap';
import Panel from './Panel';
import { connect } from 'react-redux'
import SelectBoxFieldActive from './SelectBoxFieldActive'
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import { formatMessage as f } from './custom-utils'
import EditableCustom from './EditableCustom';
import CustomUtils from './custom-utils'
import Select from 'react-select';
import serialize from 'form-serialize';

class PanelFieldInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			tooltipOpen: false
		}
		this.toggleTooltip = this.toggleTooltip.bind(this);
	}

	updateFieldProperty = (k, v, prop) =>{
		this.props.dispatch({ type: "REQUEST_FIELD_EDIT", payload: { category: this.props.vo.schema.category, col: prop.col, name: k, value: v }});
	}
	
	
  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
	}
	
	getFieldList(){
			return (
				<Row>
				<Col className="m-3">				
				<Table className="table-bordered-top-down table-thead-padded">
        <thead className="thead-light">
          <tr>
            <th>{f('field_name')}</th>
            <th>{f('type')}</th>
            <th>{f('desc')}</th>
            <th>{f('sample_value')}</th>
						<th>
						{f('usage')}
						<span id="whatisthis" className="ml-1"><i className="fa fa-question-circle-o"/></span>
						<Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="whatisthis" toggle={this.toggleTooltip}>
							<FormattedMessage id="schema_define.select_data.helpText"/>
						</Tooltip>
						</th>
						<th>{f('state')}</th>
          </tr>
        </thead>
        <tbody>
					{this.props.vo.fields.map( k => 
          <tr key={k.name}>
            <th scope="row">{k.name}</th>
            <td>{k.type}</td>
						<td>
						<EditableCustom 
										col = "description"
										name={k.name}
										dataType="text"
										mode="inline"
										value={k.description}
										onSubmit={this.updateFieldProperty}
										/>
						</td>
						<td>
						<EditableCustom 
										col = "sampleValue"
										name={k.name}
										dataType="text"
										mode="inline"
										value={k.sampleValue}
										onSubmit={this.updateFieldProperty}
										/>
						</td>
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
	}

  render() {
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
				<Panel title={this.props.title}>
					{this.getFieldList()}
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

  }
}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo
  }
}

export default injectIntl(connect(
  mapStateToProps,
  null
)(PanelFieldInfo));

