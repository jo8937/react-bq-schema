import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown  } from 'reactstrap';
import { BarLoader, RingLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import Select from 'react-select';
import serialize from 'form-serialize';

import Panel from '../compo/Panel';
import SelectBoxFieldActive from '../compo/SelectBoxFieldActive'
import EditableCustom from '../compo/EditableCustom';
import CustomUtils, {formatMessage as f } from '../utils/custom-utils'

export default class PanelFieldAdd extends Component {
  constructor(props) {
		super(props);
		this.state = {
			field_type: "STRING",
			field_active: 1,
			loading: false,
			field_name:null,
		}

	this.handleChangeType = this.handleChangeType.bind(this);		
    this.handleChangeActive = this.handleChangeActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}


	
  handleChangeActive(selectedOption) {
    this.setState({field_active: selectedOption.value});
  }
  handleChangeType(selectedOption) {
    this.setState({field_type: selectedOption.value});
  }

  handleSubmit(event) {
	event.preventDefault();	
	//const data = new FormData(event.target);
	let data = serialize(event.target, { hash: true });
	this.setState({loading:true,field_name:data["field_name"]});
	this.props.onFieldAdd(data);
	
	event.target.reset();
  }

	getFieldAddForm(){

		let loading = this.state.loading;
		if(loading && this.props.vo && this.props.vo.fields && this.props.vo.fields.find(row => row.name == this.state.field_name)){
			this.setState({loading:false})
			loading = false;
		}

		return (
			<div>
				<Row>
					<Col>
						<ul className="mb-0 mt-3">
							<li><FormattedMessage id="schema_define.custom.text1"/></li>
							<li><FormattedMessage id="schema_define.custom.text2"/></li>
						</ul>
					</Col>
				</Row>
				<Row>
				<Col className="m-3">				
					<form onSubmit={this.handleSubmit} action="#" method="POST">
					<Table>
					<tbody>
						<tr>
							<th scope="row">
								<Input type="text" name="field_name" id="field_name" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_field.name"})} invalid={false} pattern="[a-zA-Z_]+[a-zA-Z0-9_]+" required/>
							</th>
							<td>
							 {/* {this.props.intl.formatMessage({"id":"schema_define.add_type.name"})} */}
							 <Select
									placeholder={this.props.intl.formatMessage({"id":"schema_define.add_type.name"})}
									reqiured={true}
									name="field_type"
									clearable={false}
									searchable={false}
									value={this.state.field_type}
									onChange={this.handleChangeType}
									options={[
										{value:"STRING",label:"STRING"},
										{value:"INTEGER",label:"INTEGER"}
									]}
								/>
							</td>
							<td>
							<Input type="text" name="field_desc" id="field_desc" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_desc.name"})} required/>
							</td>
							<td>
							<Input type="text" name="field_sample_value" id="field_sample_value" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_sample.name"})} required/>
							</td>
							<td>
							<Select
									name="field_active"
									clearable={false}
									searchable={false}
									value={this.state.field_active}
									onChange={this.handleChangeActive}									
									options={[
										{ value: '0', label: <FormattedMessage id="schema_view.use_select.select"/> },
										{ value: '1', label: <FormattedMessage id="schema_view.use_select.recommend"/> },
										{ value: '2', label: <FormattedMessage id="schema_view.use_select.required"/> },
									]}
								/>
							</td>
							<td>
							{loading ? (
								<div className="m-auto">
								<BarLoader color={'#2a84d8'} width={100} height={10}/>	
								</div>
							) : (
								<Button type="submit" className="btn-bordered-primary" color="primary" value={<FormattedMessage id="schema_view.add_field.btn"/>}>필드 추가 실행</Button>	
							)}
							
							</td>
						</tr>
					</tbody>
					</Table>
					</form>
				</Col>
				</Row>	
			</div>
		);
	}

  render() {
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
			
				<Panel title={<FormattedMessage id="field_add"/>}>
					{this.getFieldAddForm()}
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

