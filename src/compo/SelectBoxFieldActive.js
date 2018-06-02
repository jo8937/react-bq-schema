import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux'
import {injectIntl, IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import CustomUtils, {formatMessage as f } from '../utils/custom-utils'

export default class SelectBoxFieldActive extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      schema  : this.props.schema,
      field : this.props.field,
      value : this.props.field.active,
      dropdownOpen: false,
      locale : null
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = (selectedOption) => {
    this.setState(selectedOption);
    console.log(`Selected: ${selectedOption.value}, ${selectedOption.label}`);
    this.props.onFieldActivate({ category: this.props.schema.category, col:"ACTIVE", name: this.state.field.name, value: selectedOption.value });
  }

  render() {

    if(this.state.field.generated === true){
      return (
        <div>필수(자동생성)</div>
      )
    }else if(this.state.field.required === true){
      return (
        <div>필수</div>
      )
    }else{
      return (
        <div>
        <Select
            name={this.state.field.name + '_active'}
            clearable={false}
            searchable={false}
            value={this.state.value}
            onChange={this.handleChange}
            options={[
               { value: '0', label: this.props.intl.formatMessage({"id":"schema_view.use_select.select","className":"text-light"}) },
               { value: '1', label: this.props.intl.formatMessage({"id":"schema_view.use_select.recommend"}) },
               { value: '2', label: this.props.intl.formatMessage({"id":"schema_view.use_select.required","className":"text-primary"}) },
            ]}
          />
        </div>
      );
    }
  }
}


// const mapStateToProps = state => {
// 	return {
//     vo: state.schemaVo
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch : dispatch
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
//   null,
//   {pure:false}
// )(SelectBoxFieldActive);
