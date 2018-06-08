import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
//import Editable from 'react-x-editable';
//import 'font-awesome/css/font-awesome.min.css'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

/**
 * 
 * 
 
name={k}
dataType="text"
mode="inline"
value={this.props.vo.schema[k]}
onSubmit={this.updatePropertyValue}

 */
class EditableCustom extends Component {
    constructor(props){
        super(props);
        this.state = {
          name : props.name,
          value: props.value,
          editableContainerClass : "editable-container"
        };
        this.validation = {};
        this.onSubmit = this.onSubmit.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    componentWillMount(){
      
    }

    render() {
        return (
            <div className={this.state.editableContainerClass + " input-group"} key={this.props.name} >
            { this.state.editable
              ? this.getContent()
              :
              (<a href="#"
                  onClick={this.onActive}
                  className="editableLink"
                    >
                      { this.props.value || this.props.emptyValueText }
                    </a>
              )
            }
          </div>
        );
      }

      onActive = (event) => {
        this.setState({editable:true});
        event.preventDefault();	
      }

      onCancel = (event) => {
        this.setState({
          editable:false,
          value: this.props.value
        });
        event.preventDefault();	
      }
      
    validation = () =>{
      
    }

    changeValue = (e) =>{
      this.setState({
        value: e.target.value
      });
    }
    onSubmit = (event) => {
      if(this.props.onSubmit){
        this.props.onSubmit(this.props.name, this.state.value, this.props);
      }
      this.setState({editable:false});
    }

      getContent(){
        // <Input type="password" name="password" id="examplePassword" placeholder="Password" />
        return (
          <Form onSubmit={this.onSubmit} className="input-group" key={"editable-form"+this.props.name}>
            <Input type="text" value={this.state.value} onChange={this.changeValue} required={true}/>
            {this.getButtons()}
          </Form>
        );
      }      
      
      getButtons(){
          return (
            <div className="input-group-append editable-btn" key={this.props.name+"editable-btn"}>
              <Button className="btn btn-xs" onClick={this.onSubmit} key={"btn-success"+this.props.name}>
                <i className="fa fa-check" key={"icon-fa-check"+this.props.name}></i></Button>
              <Button className="btn btn-xs" onClick={this.onCancel} key={"btn-danger"+this.props.name}>
                  <i className="fa fa-times" key={"icon-fa-times"+this.props.name}></i>
              </Button>
            </div>
          );
      }      

}

EditableCustom.defaultProps = {
  emptyValueText: "empty",
  defaultValue: ""
}

export default EditableCustom;
