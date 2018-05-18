import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Table } from 'reactstrap';
import Checkbox from '../compo/Checkbox';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const About = () => (
      <div className="App">
        About
      </div>
    );
    
export default About;