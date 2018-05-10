import React, { Component } from 'react';
import { Container, Row, Col, Collapse, Table  } from 'reactstrap';
import { CircleLoader, RingLoader } from 'react-spinners';
import Panel from './Panel';
import { connect } from 'react-redux'

class PanelDataPreview extends Component {
  constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	
	getContent(){
    let filterdCols = this.props.vo.fields.filter(row => {
        return row.active > 0;
    }).map( row=> row.name );
			return (
          <Row>
            <Col className="m-3">
<Table className="table-bordered-top-down table-thead-padded table-striped">
        <thead className="thead-light">
          <tr>
            {
              filterdCols.map( col=>{
                return (
                  <th>{col}</th>      
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {this.props.datalist.map( datarow => {
            return (
            <tr>
              {filterdCols.map( col=>
                (
                  <th>{col}</th>      
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

  render() {
    if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
        <Panel title={this.props.title}>
        {this.getContent()}
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

const mapStateToProps = state => {
	return {
    vo: state.schemaVo,
    datalist: []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelDataPreview);

