import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown  } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import Panel from './Panel';
import { connect } from 'react-redux'
import SelectBoxFieldActive from './SelectBoxFieldActive'
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import { formatMessage as f } from './custom-utils'
import EditableCustom from './EditableCustom';
import CustomUtils from './custom-utils'
import Select from 'react-select';
import serialize from 'form-serialize';
import fetch from './cross-fetch-with-timeout';

class PanelFieldAdd extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
		}
		
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}


	
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
		//const data = new FormData(event.target);
		this.props.dispatch({ type: "REQUEST_FIELD_ADD", payload: serialize(event.target, { hash: true })});
		event.preventDefault();
		event.target.reset();
  }


	getFieldAddForm(){
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
					<form onSubmit={this.handleSubmit} action={CustomUtils.FIELD_ADD_URI} method="POST">
					<Table>
					<tbody>
						<tr>
							<th scope="row">
								<Input type="text" name="field_name" id="field_name" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_field.name"})} invalid={false} pattern="[a-zA-Z_]+[a-zA-Z0-9_]+" required/>
							</th>
							<td>
							<Input type="text" name="field_type" id="field_type" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_type.name"})} required/>
							</td>
							<td>
							<Input type="text" name="field_desc" id="field_desc" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_desc.name"})} required/>
							</td>
							<td>
							<Input type="text" name="field_sample_value" id="field_sample_value" placeholder={this.props.intl.formatMessage({"id":"schema_define.add_sample.name"})} required/>
							</td>
							<td>
							<Select
									name="active"
									clearable={false}
									searchable={false}
									value={0}
									options={[
										{ value: '0', label: <FormattedMessage id="schema_view.use_select.select"/> },
										{ value: '1', label: <FormattedMessage id="schema_view.use_select.recommend"/> },
										{ value: '2', label: <FormattedMessage id="schema_view.use_select.required"/> },
									]}
								/>
							</td>
							<td>
							<Button type="submit" className="btn-bordered-primary" color="primary" value={<FormattedMessage id="schema_view.add_field.btn"/>}>필드 추가 실행</Button>
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

const mapStateToProps = state => {
	return {
    vo: state.schemaVo
  }
}


export default injectIntl(connect(
  mapStateToProps
)(PanelFieldAdd), { intlPropName:'intl' } );
