import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Editable from 'react-x-editable';
//import 'font-awesome/css/font-awesome.min.css'

class EditableCustom extends Editable {
    render() {
        const { editable, title, validate, showButtons,
                defaultValue, dataType, mode, disabled } = this.state;
        const editableContainerClass = (disabled) ? "editable-disabled" : "editable-container";
        return (
          <div className={editableContainerClass + " input-group"} key={this.props.name} >
            { !(mode == 'inline' && editable)
                ? (<a ref={ref => this.editableAnchor = ref}
                      onClick={this.setEditable.bind(this, true)}
                      href="javascript:;"
                    >
                      { this.getValueForAnchor() || this.props.emptyValueText }
                    </a>
                  )
                : null
            }
            {this.getContent()}
          </div>
        );
      }

      getButtons(){
        if(this.state.showButtons){
          return (
            <div className="editable-btn" key={this.props.name+"editable-btn"}>
              <Button bsStyle="success" bsSize="xsmall" onClick={this.onSubmit.bind(this)} key={"btn-success"+this.props.name}>
                <i className="fa fa-check" key={"icon-fa-check"+this.props.name}></i></Button>
              <Button bsStyle="danger" bsSize="xsmall" onClick={this.onCancel.bind(this)} key={"btn-danger"+this.props.name}>
                  <i className="fa fa-times" key={"icon-fa-times"+this.props.name}></i>
              </Button>
            </div>
          )
        }
        return null;
      }      
}

export default EditableCustom;
