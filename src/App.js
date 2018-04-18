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
import InfoCard from './InfoCard';

class App extends Component {

  render() {
    return (
      <div className="App">

      <InfoCard/>
      <InfoCard/>
      </div>
    );
  }
}

export default App;
