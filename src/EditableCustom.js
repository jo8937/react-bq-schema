import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Editable from 'react-x-editable';
//import 'font-awesome/css/font-awesome.min.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

class EditableCustom extends Editable {

    componentWillMount(){
      var oldOnSubmit = this.onSubmit
      this.onSubmit = () => {
        oldOnSubmit();
        if(this.props.onSubmit){
          this.props.onSubmit(this.props.name, this.value, this.props);
        }
      }
    }
    

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
              <Button className="btn btn-xs" onClick={this.onSubmit.bind(this)} key={"btn-success"+this.props.name}>
                <i className="fa fa-check" key={"icon-fa-check"+this.props.name}></i></Button>
              <Button className="btn btn-xs" onClick={this.onCancel.bind(this)} key={"btn-danger"+this.props.name}>
                  <i className="fa fa-times" key={"icon-fa-times"+this.props.name}></i>
              </Button>
            </div>
          )
        }
        return null;
      }      

}

export default EditableCustom;
