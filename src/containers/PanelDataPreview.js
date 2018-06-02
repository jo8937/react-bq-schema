import React, { Component } from 'react';
import { CircleLoader, RingLoader } from 'react-spinners';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Tooltip, UncontrolledTooltip } from 'reactstrap';
import {injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
import Select from 'react-select';
import serialize from 'form-serialize';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import CustomUtils, {formatMessage as f } from '../utils/custom-utils'
import Panel from '../compo/Panel';
import Switch from "react-switch";
import ReactTooltip from 'react-tooltip';

import * as actions from '../actions/action';

class PanelDataPreview extends Component {
  constructor(props) {
		super(props);
		this.state = {
      k: "",
      m: "",
      v: "",
      fieldOpen: false
    }
    this.dataPreviewArea = React.createRef();
    this.movePage = this.movePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSearchKey = this.handleSearchKey.bind(this);
    this.handleSearchMethod = this.handleSearchMethod.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.dataRefresh = this.dataRefresh.bind(this);
    this.toggleFields = this.toggleFields.bind(this);
	}
  
  

	componentDidMount(){
    this.props.requestDatalist({
      page:this.props.dataPreview.paging.page
    });
  }

  toggleFields(){
    this.setState({
      fieldOpen: !this.state.fieldOpen
    });
  }


  toggleSwitchTooltip() {
    this.setState({
        switchTooltipOpen: !this.state.switchTooltipOpen
    });
}

  movePage(page){
    return (event) => {
        this.props.requestDatalist(
          {
            page:page,
            k:this.props.dataPreview.param.k,
            m:this.props.dataPreview.param.m,
            v:this.props.dataPreview.param.v,
            sm:this.props.dataPreview.param.sortMethod,
            sk:this.props.dataPreview.param.sortKey
          }
        );
        event.preventDefault();
    };
  }

  handleSort(event, colname){
    event.preventDefault();
    if(false === this.props.dataPreview.colList.includes(colname)){
      return;
    }
		this.props.requestDatalist({
      page: 1,
      k:this.props.dataPreview.param.k,
      m:this.props.dataPreview.param.m,
      v:this.props.dataPreview.param.v,
      sk: colname,
      sm: this.props.dataPreview.param.sm.toUpperCase() == "DESC" ? "ASC" : "DESC",
    });
		
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
      k:selectedOption.value
    });
  }

  handleSearchMethod(selectedOption){
    this.setState({
      m:selectedOption.value
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(
      (prevState.fieldOpen != this.state.fieldOpen)
      ||
      (prevProps.dataPreview != this.props.dataPreview)
    ){
      ReactTooltip.rebuild();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPreview.param.v !== this.props.dataPreview.param.v) {
      this.setState({
        v: nextProps.dataPreview.param.v
      });
    }
  }
  
  onSearchInput(event){
    if(this.props.editDatalistCond){
      this.props.editDatalistCond(event.target);
    }
    this.setState({v:event.target.value});
  }
  
  dataRefresh(){
    this.props.requestDatalist(
      {
        page:1
      }
    );
  }

  resetSearch(event){
    this.props.requestDatalist(
      {
        page:1
      }
    );
  }

  getFilteredCols(){
    if(this.state.fieldOpen){
      let colstatList = this.props.dataPreview.colList.map( colname => {
        let logdeffield = this.props.vo.fieldMap[colname];
        return ({
          name: colname,
          exists_bq: true,
          exists_def: logdeffield ? true:false,
          active: logdeffield ? logdeffield.active : 0
        });
       } );
       this.props.vo.fields.map(row => {
         if(false === this.props.dataPreview.colList.includes(row.name)){
            colstatList.push( 
              {
                name: row.name,
                exists_bq: false,
                exists_def: true,
                active: row.active
              }   
            );
         }
       });
       return colstatList;
    }else{
      return this.props.vo.fields.filter(row => {
        return this.state.fieldOpen || row.active > 0;
      }).map( row => ({ 
        name: row.name, 
        active: row.active, 
        exists_bq: row.bigquery_info?true:false ,
        exists_def: true
      }));
    }
  }

  /*
  ////////////////////////////////////////////////////////////////////
  // render jsx part
  ////////////////////////////////////////////////////////////////////
  */

	getContent(){
    let filterdCols = this.getFilteredCols();
    //console.log(filterdCols);
    

			return (
          
          <Row>
            <Col className="m-3">
{/*  테이블 해더 .............................................. */}
<Table className="table-bordered-top-down table-thead-padded table-striped" id="datePreviewTable">
        <thead className="thead-light">
          <tr>
            <th>no</th>
            {
              filterdCols.map( col=>{
                let className  = "";
                let titledesc = "";
                let orderby = "";
                if(this.props.dataPreview.param.sk == col.name){
                  if(this.props.dataPreview.param.sm.toUpperCase() == "DESC"){
                    orderby = <span data-for="colSyncDesc" data-tip="sort_desc"><i className="fa fa-sort-amount-desc text-danger pr-1"/></span>;
                  }else{
                    orderby = <span data-for="colSyncDesc" data-tip="sort_asc"><i className="fa fa-sort-amount-asc text-warning pr-1"/></span>;
                  }
                }else{
                  orderby = <span data-for="colSyncDesc" data-tip="sort_desc"><i className="fa fa-sort text-default pr-1"/></span>;
                }
                
                if (col.exists_bq && !col.exists_def){
                  className  = "text-warning";
                  titledesc = "define.not.found";
                }else if (!col.exists_bq && col.exists_def){
                  className  = "text-danger";
                  titledesc = "bigquery.not.found";
                }else if (col.active > 0){
                  className  = "text-primary";
                  titledesc = "active";
                }else{
                  titledesc = "sync_ok";
                }

                return (
                  <th key={col.name}>
                  {orderby}
                  <a href="#" onClick={(e) => this.handleSort(e, col.name)} >
                  <span className={className} data-for='colSyncDesc' data-tip={titledesc}>
                  {col.name}
                  </span>
                  </a>
                  </th>     
                );
              })
            }
          </tr>
        </thead>
        <ReactCSSTransitionGroup
        transitionName="row"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppearTimeout={300}
        transitionAppear={true}
        component="tbody"
    >
    {/*  여기서부터 테이블 데이터 목록 나옴.............................................. */}
          {this.props.dataPreview.dataList.map( (datarow, i) => {

            let trClassName = "";
            let tooltipText = "";
            
            if(datarow.bigqueryPartitionTime !== undefined && datarow.bigqueryPartitionTime.trim().length == 0){
              trClassName = "table-success";
              tooltipText = "new_arrival_data";
            }
            if(datarow.bigqueryTableName && datarow.bigqueryTableName == "uniontable"){
              trClassName = "table-dander";
              tooltipText = "data_in_temp";
            }

            
            return (
            <tr key={datarow.guid + '_' + i}>
              <td className={trClassName} data-for='rowDesc' data-tip={tooltipText}>
              { this.props.dataPreview.paging.offset + i + 1}
              </td>
                {/* ################# 여기서부터 td 루프 시작 #################################### */}
                {filterdCols.map( col=>{
                  let tdClassName = "";
                  // 검색한 값이 있으면 하이라이팅
                  if(this.props.dataPreview.param.k == col.name && datarow[col.name].includes(this.props.dataPreview.param.v)){
                    tdClassName = "table-primary";
                  }
                    return (
                        <td key={datarow.guid + '_' + col.name} className={tdClassName}>
                          <span data-for="columnDesc" data-tip={col.name}>
                            {datarow[col.name]}
                          </span>
                        </td>      
                    )
                }
                )} 
            </tr>
            )
          })}
        </ReactCSSTransitionGroup>   
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

  getSearch(){
    let filterdCols = this.getFilteredCols();
    let searchOptions = filterdCols.filter(col => col.exists_bq).map( col => ({ value: col.name, label : col.name }));
    let searchCol = this.props.dataPreview.param.k ? this.props.dataPreview.param.k : (filterdCols.length > 0 ? filterdCols[0].name : null);

    return (
      <Row>
        <Col className="p-3">
        <form onSubmit={this.handleSearch} method="POST" action="#">
					<div className="d-flex justify-content-center">
            <Col md="1" className="p-0">
            <Select
									name="k"
									clearable={false}
									searchable={false}
									value={this.state.k}
									onChange={this.handleSearchKey}									
									options={searchOptions}
								/>
            </Col>
            <Col md="1" className="p-0">
            <Select
									name="m"
									clearable={false}
									searchable={false}
									value={this.state.m ? this.state.m : "LIKE"}
									onChange={this.handleSearchMethod}									
									options={[
                    { value: 'LIKE', label: "LIKE" },
                    { value: 'EQUAL', label: "=" },
									]}
								/>
            </Col>
            <Col md="2" className="p-0">
            <Input type="text" name="v" value={this.state.v} onChange={this.onSearchInput} id="field_sample_value" placeholder={this.props.intl.formatMessage({"id":"input_search"})} required/>
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


  render() {
    if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length && this.props.dataPreview && this.props.dataPreview.paging.totalPage){
			return (
        <div ref={this.dataPreviewArea} id="dataPreviewArea">
        <Panel title={
          (
            <div id="dataPreviewTitleArea">
            {this.props.title}
            </div>
          )
        } titleOptional={
          (
            <a type="button" className="btn btn-secondary btn-sm" onClick={this.dataRefresh}>
            <i className="fa fa-refresh"/>
            </a>
          )
      } titleOptional2={
        (
          <div id="dataFieldToggleArea">
          <Switch
                  checked={this.state.fieldOpen}
                  onChange={this.toggleFields}
                  id="data-field-open-switch"
                  width={60}
                  height={24}
                  uncheckedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          color: "orange",
                          paddingRight: 2
                        }}
                      >
                        <FormattedMessage id="toggle_hide" />
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          color: "orange",
                          paddingLeft: 2
                        }}                                            
                      ><FormattedMessage id="toggle_show" /></div>
                    }
              />
              </div>
        )
    }>
        <UncontrolledTooltip 
            placement="top"
            target="dataFieldToggleArea"
        >
          <FormattedMessage id="toggle_optional_fields" />
        </UncontrolledTooltip >
        <UncontrolledTooltip 
            placement="top"
            target="dataPreviewTitleArea">
          <FormattedMessage id="data_preview_desc" />
        </UncontrolledTooltip >
        <ReactTooltip id="colSyncDesc" 
                  type="success"
                  aria-haspopup='true'
                  effect="float"
                  getContent={(dataTip) =>{
                      return (
                        <div>
                          <p><li>{f('click_for_sort')}</li></p>
                          {["define.not.found","bigquery.not.found"].includes(dataTip) ? (
                            <p className="text-danger">{f(dataTip)}</p>
                          ) : ""}
                        </div>            
                      );
                    }
                  }/>
        <ReactTooltip id="rowDesc" 
                  type="info"
                  aria-haspopup='true'
                  effect="float"
                  getContent={(dataTip) => f(dataTip)}/>                  
        <ReactTooltip id="columnDesc" 
          type="success"
          aria-haspopup='true'
          effect="float"
          getContent={(dataTip) => this.props.vo.fieldMap[dataTip] ?
                                                            (
                                                              <div>
                                                              <p><li>{this.props.vo.fieldMap[dataTip].name} ({this.props.vo.fieldMap[dataTip].type})</li></p>
                                                              <p> {this.props.vo.fieldMap[dataTip].description}</p>
                                                              </div>
                                                            ) : dataTip
                                                            }
                                                            />
        {this.getContent()}
        {this.getPaging()}
        {this.getSearch()}
        </Panel>
        </div>
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

