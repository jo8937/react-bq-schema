import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table, Input } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown  } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'
import SelectBoxFieldActive from './SelectBoxFieldActive'
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import { formatMessage as f } from './custom-utils'
import EditableCustom from './EditableCustom';

class PanelFieldInfo extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	updateFieldProperty = (k, v, prop) =>{
		this.props.dispatch({
			type: "FIELD_PROP_EDIT_PENDING",
			payload:
				fetch('/app/k/define/schema/field_edit_proc',{
					method: 'POST',
          headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({ category: this.props.vo.schema.category, col: prop.col, name: k, value: v }),
					timeout:3000
				})
				.then(schema_prop => {
					this.props.dispatch({
						type: "FIELD_PROP_EDIT_FULFILLED",
						schema_prop
					});
				}).catch((err) => {
					alert(err);
				})
		});
	}
	
	getContent(){
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
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
						<th>{f('usage')}</th>
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

export default injectIntl(connect(
  mapStateToProps,
  null
)(PanelFieldInfo));

