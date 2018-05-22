import React, { Component } from 'react';
import { CircleLoader, RingLoader } from 'react-spinners';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import {injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import Select from 'react-select';
import serialize from 'form-serialize';

import CustomUtils, {formatMessage as f } from '../utils/custom-utils'
import Panel from '../compo/Panel';

import * as actions from '../actions/action';

class PanelDataPreview extends Component {
  constructor(props) {
		super(props);
		this.state = {
    }
    this.movePage = this.movePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearchKey = this.handleSearchKey.bind(this);
    this.handleSearchMethod = this.handleSearchMethod.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.searchInput = this.searchInput.bind(this);
    this.dataRefresh = this.dataRefresh.bind(this);
	}
  
  

	componentDidMount(){
    this.props.requestDatalist({page:this.props.dataPreview.paging.page});
  }

  movePage(page){
    return (event) => {
        this.props.requestDatalist(
          {
            page:page,
            K:this.props.dataPreview.param.k,
            M:this.props.dataPreview.param.m,
            V:this.props.dataPreview.param.v,
            SM:this.props.dataPreview.param.sortMethod,
            SK:this.props.dataPreview.param.sortKey,
          }
        );
        event.preventDefault();
    };
  }

  handleSort(event){
    let searchParams = serialize(event.target, { hash: true });
    this.setState({
      ...searchParams
    })
		this.props.dispatch({ type: "REQUEST_DATALIST", ...searchParams});
		event.preventDefault();
  }

  handleSearch(event){
    let searchParams = serialize(event.target, { hash: true });
    this.setState({
      ...searchParams
    })
		this.props.requestDatalist(searchParams);
		event.preventDefault();
  }

  handleSearchKey(selectedOption){
    this.setState({
      K:selectedOption.value
    });
  }

  handleSearchMethod(selectedOption){
    this.setState({
      M:selectedOption.value
    });
  }

  getFilteredCols(){
    return this.props.vo.fields.filter(row => {
      return row.active > 0;
    }).map( row=> row.name );
  }

	getContent(){
    let filterdCols = this.getFilteredCols();
			return (
          <Row>
            <Col className="m-3">
<Table className="table-bordered-top-down table-thead-padded table-striped" id="datePreviewTable">
        <thead className="thead-light">
          <tr>
            {
              filterdCols.map( col=>{
                return (
                  <th key={col}>{col}</th>     
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {this.props.dataPreview.dataList.map( (datarow, i) => {
            return (
            <tr key={datarow.guid + '_' + i}>
              {filterdCols.map( col=>
                (
                  <th key={datarow.guid + '_' + col}>{datarow[col]}</th>      
                )
              )} 
            </tr>
            )
          })}
        </tbody>
			</Table> 
          </Col>
        </Row>
        
			);
  }
  

  getPaging(){
    let paging = this.props.dataPreview.paging;
    if(paging.totalData <= 0){
      return;
    }
    let pageList = [];
    for (let i = paging.startPage; i <= paging.endPage; i++){
      pageList.push(i);
    }
      return (
        <Row className="m-auto">
          <Col>
          <Pagination className="justify-content-center m-auto">
            <PaginationItem>
              <PaginationLink previous href="#datePreviewTable" onClick={this.movePage(paging.prevPage)}/>
            </PaginationItem>
            {pageList.map( page => (
              <PaginationItem key={page} active={(page==this.props.dataPreview.paging.page)}>
              <PaginationLink href="#datePreviewTable" onClick={this.movePage(page)}>
                {page}
              </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink next href="#datePreviewTable" onClick={this.movePage(paging.nextPage)}/>
            </PaginationItem>
          </Pagination>
          </Col>
        </Row>
      );
  }

  resetSearch(event){
    this.props.requestDatalist(
      {
        page:1
      }
    );
  }
  
  searchInput(event){
    this.props.editDatalistCond(event.target);
  }
  getSearch(){
    let filterdCols = this.getFilteredCols();
    let searchOptions = filterdCols.map( col => ({ value: col, label : col }));

    let searchCol = this.state.K ? this.state.K : (filterdCols.length > 0 ? filterdCols[0] : null);

    return (
      <Row>
        <Col className="p-3">
        <form onSubmit={this.handleSearch} method="POST" action="#">
					<div className="d-flex justify-content-center">
            <Col md="1" className="p-0">
            <Select
									name="K"
									clearable={false}
									searchable={false}
									value={searchCol}
									onChange={this.handleSearchKey}									
									options={searchOptions}
								/>
            </Col>
            <Col md="1" className="p-0">
            <Select
									name="M"
									clearable={false}
									searchable={false}
									value={this.state.M ? this.state.M : "LIKE"}
									onChange={this.handleSearchMethod}									
									options={[
                    { value: 'LIKE', label: "LIKE" },
                    { value: 'EQUAL', label: "=" },
									]}
								/>
            </Col>
            <Col md="2" className="p-0">
            <Input type="text" name="V" defaultValue={this.props.dataPreview.param.v} onChange={this.searchInput} id="field_sample_value" placeholder={this.props.intl.formatMessage({"id":"input_search"})} required/>
            </Col>
            <Col md="1" className="p-0 d-flex">
            <Button type="submit" className="btn-bordered-primary btn-block" color="primary"><FormattedMessage id="search"/></Button>
            {this.props.dataPreview.param.v &&
            <Button className="btn-white" color="secondary" onClick={this.resetSearch}><FormattedMessage id="reset"/></Button>
            }
            </Col>
          </div>
				</form>
        </Col>
      </Row>

    )
  }

  dataRefresh(){
    console.log("refresh...");
    this.props.requestDatalist(
      {
        page:1
      }
    );
  }

  render() {
    if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
        <Panel title={this.props.title} titleOptional={
          (
            <a type="button" className="btn btn-secondary btn-sm" onClick={this.dataRefresh}>
            <i className="fa fa-refresh"/>
            </a>
          )
      }>
        {this.getContent()}
        {this.getPaging()}
        {this.getSearch()}
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

export default injectIntl(connect(
  actions.dataListStateToProps,
  actions.datalistDispatchToProps
)(PanelDataPreview), { intlPropName:'intl' });

