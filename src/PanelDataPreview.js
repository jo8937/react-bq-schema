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
		if(this.props.vo && this.props.vo.fields && this.props.vo.fields.length){
			return (
          <Row>
            <Col className="m-3">
<Table className="table-bordered-top-down table-thead-padded table-striped">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
					{this.props.vo.fields.map( k => 
          <tr key={k.name}>
            <th scope="row">{k.name}</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
					)}
        </tbody>
			</Table> 
          </Col>
        </Row>
			);
		}else{
			return (
				<Row className="mt-md-3 mb-md-3 justify-content-center">
							<Col xs="2" className="text-left">
							<RingLoader color={'#2a84d8'}/>
							</Col>
				</Row>
			);
		}
	}

  render() {
    return (
      <Panel title={this.props.title}>
				{this.getContent()}
      </Panel>
    );
  }
}

const mapStateToProps = state => {
	return {
    vo: state.schemaVo.schema
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

