import React, { Component } from "react";
import { Container, Row, Col, Collapse, Table } from "reactstrap";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonDropdown
} from "reactstrap";
import { CircleLoader, RingLoader } from "react-spinners";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback,
    Tooltip
} from "reactstrap";
import Panel from "./Panel";
import { connect } from "react-redux";
import SelectBoxFieldActive from "./SelectBoxFieldActive";
import {
    injectIntl,
    IntlProvider,
    FormattedMessage,
    addLocaleData
} from "react-intl";
import { formatMessage as f } from "./custom-utils";
import EditableCustom from "./EditableCustom";
import CustomUtils from "./custom-utils";
import Select from "react-select";
import serialize from "form-serialize";
import classnames from "classnames";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

class PanelFieldInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            fieldOpen: false
        };
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleFields = this.toggleFields.bind(this);
    }

    updateFieldProperty = (k, v, prop) => {
        this.props.dispatch({
            type: "REQUEST_FIELD_EDIT",
            payload: {
                category: this.props.vo.schema.category,
                col: prop.col,
                name: k,
                value: v
            }
        });
    };

    toggleTooltip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    toggleFields() {
        this.setState({
            fieldOpen: !this.state.fieldOpen
        });
    }

    getFieldList() {
        return (
            <Row>
                <Col className="m-3">
                    <Container fluid className="tablestyle">
                    <Row className="rowhead">
                        <Col md="2">{f("field_name")}</Col>
                        <Col md="2">{f("type")}</Col>
                        <Col md="3">{f("desc")}</Col>
                        <Col md="2">{f("sample_value")}</Col>
                        <Col md="2" className="align-middle">
                        <span className="">{f("usage")}</span>
                                    <span id="whatisthis" className="ml-2">
                                        <i className="fa fa-question-circle-o" />
                                    </span>
                                    <span
                                        className="ml-2"
                                        onClick={this.toggleFields}
                                    >
                                        <i className="fa fa-question-circle-o" />
                                    </span>
                                    <Tooltip
                                        placement="bottom"
                                        isOpen={this.state.tooltipOpen}
                                        target="whatisthis"
                                        toggle={this.toggleTooltip}
                                    >
                                        <FormattedMessage id="schema_define.select_data.helpText" />
                                    </Tooltip>
                        </Col>
                        <Col md="1">{f("state")}</Col>
                    </Row>
                    <ReactCSSTransitionGroup
                        transitionName="switch"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppearTimeout={500}
                        transitionAppear={true}
                        component="div"
                        >
                            
                            {this.props.vo.fields.map(k => {
                                let isUse = k.active > 0;
                                let isOpen =
                                    this.state.fieldOpen ||
                                    (!k.generated && isUse);
                                return (
                                    <Row 
                                        key={k.name}
                                        className={'rowbody flex-nowrap fieldrow ' + (isOpen
                                                ? "collapse show"
                                                : "collapse")
                                        }
                                    >
                                        <Col md="2">{k.name}</Col>
                                        <Col md="2">{k.type}</Col>
                                        <Col md="3">
                                            <EditableCustom
                                                col="description"
                                                name={k.name}
                                                dataType="text"
                                                mode="inline"
                                                value={k.description}
                                                onSubmit={
                                                    this.updateFieldProperty
                                                }
                                            />
                                        </Col>
                                        <Col md="2">
                                            <EditableCustom
                                                col="sampleValue"
                                                name={k.name}
                                                dataType="text"
                                                mode="inline"
                                                value={k.sampleValue}
                                                onSubmit={
                                                    this.updateFieldProperty
                                                }
                                            />
                                        </Col>
                                        <Col md="2">
                                            <SelectBoxFieldActive
                                                field={k}
                                                schema={this.props.vo.schema}
                                            />
                                        </Col>
                                        <Col md="1" />
                                    </Row>
                                );
                            })}
                        </ReactCSSTransitionGroup>
                    </Container>
                </Col>
            </Row>
        )
        return (
            <Row>
                <Col className="m-3">
                <Container fluid className="tablestyle">
                <Row className="rowhead">
                    <Col md="2">
                    1
                    </Col>
                    <Col md="2">
                    2
                    </Col>
                    <Col md="2">
                    3
                    </Col>
                    <Col md="2">
                    4
                    </Col>
                    <Col md="2">
                    5
                    </Col>
                    <Col md="2">
                    6
                    </Col>
                </Row>
                <Row className="rowbody d-flex flex-nowrap">
                    <Col md="2">
                    1
                    </Col>
                    <Col md="2">
                    2
                    </Col>
                    <Col md="2">
                    3
                    </Col>
                    <Col md="2">
                    4
                    </Col>
                    <Col md="2">
                    6asdasdasdasasdasd123123121231231231231213f32f2
                    </Col>
                    <Col md="2">
                    6
                    </Col>
                </Row>
                                  
            </Container>                
                </Col>
            </Row>            

        )
    }

    render() {
        if (
            this.props.vo &&
            this.props.vo.fields &&
            this.props.vo.fields.length
        ) {
            return (
                <Panel title={this.props.title}>{this.getFieldList()}</Panel>
            );
        } else {
            return (
                <Panel title={this.props.title}>
                    <Row className="mt-md-3 mb-md-3 justify-content-center">
                        <Col xs="2" className="text-left">
                            <RingLoader color={"#2a84d8"} />
                        </Col>
                    </Row>
                </Panel>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        vo: state.schemaVo
    };
};

export default injectIntl(connect(mapStateToProps, null)(PanelFieldInfo));
