import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Table } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle, CardHeader,Container, Row, Col, Collapse, Alert } from 'reactstrap';
import Checkbox from './Checkbox';
//import Editable from 'react-x-editable';
import EditableCustom from './EditableCustom';
import Panel from './Panel';
import PanelInfo from './PanelInfo';
import { CircleLoader, RingLoader } from 'react-spinners';
import ReactLoading from 'react-loading';
import fetch from 'cross-fetch';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
			content: <RingLoader color={'#112233'}/>
		};
		
	}

	componentDidMount(){

		Promise.race([
			fetch('/app/k/define/schema/view/cate.json')
		.then(res => {
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
			return res.json();
		})
		.then(schema => {
			console.log(schema);
			this.setState({
				content: this.getContent()
			});
		})
		.catch(err => {
			console.log("call error");
			console.error(err);
		}),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('ajax timeout')), 3000)
			)
		]).catch(err => {
			 alert(err.message);
		});
		
  }
  
  render() {
    return (
      <div className="App">
        <PanelInfo/>
        <PanelInfo/>
      </div>
    );
  }
}

export default App;
