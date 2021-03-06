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
import { connect } from "react-redux";

import {
    injectIntl,
    IntlProvider,
    FormattedMessage,
    addLocaleData
} from "react-intl";

import Select from "react-select";
import serialize from "form-serialize";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Switch from "react-switch";

import ReactTooltip from 'react-tooltip';
import CustomUtils, {formatMessage as f } from '../utils/custom-utils'
import EditableCustom from "../compo/EditableCustom";
import Panel from "../compo/Panel";
import SelectBoxFieldActive from "../compo/SelectBoxFieldActive";
import * as moment from 'moment';

export default class PanelFieldInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            fieldOpen: false,
            switchTooltipOpen: false
        };
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleFields = this.toggleFields.bind(this);
        this.toggleSwitchTooltip = this.toggleSwitchTooltip.bind(this);

    }

    componentDidUpdate(prevProps, prevState){
        if(
            (prevState.fieldOpen != this.state.fieldOpen)
            ||
            (prevProps.vo.fields != this.props.vo.fields)
        ){
            ReactTooltip.rebuild();
        }
    }

      
    updateFieldProperty = (k, v, prop) => {
        this.props.onFieldEdit(this.props.vo.schema.category, prop.col, k, v);
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

    toggleSwitchTooltip() {
        this.setState({
            switchTooltipOpen: !this.state.switchTooltipOpen
        });
    }

    getFieldList() {
        return (
            <Row>
                <Col className="m-3">
                    <Container fluid className="tablestyle">
                        <Row className="rowhead flex-nowrap">
                            <Col md="2" className="m-auto">{f("field_name")}</Col>
                            <Col md="2" className="m-auto">{f("type")}</Col>
                            <Col md="3" className="m-auto">{f("desc")}</Col>
                            <Col md="2" className="m-auto">{f("sample_value")}</Col>
                            <Col md="2" className="m-auto d-flex justify-content-between">
                                <div>
                                <span>{f("usage")}</span>
                                <span id="whatisthis" className="ml-2">
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
                                </div>
                                <div id="switchArea">
                                <Switch
                                        checked={this.state.fieldOpen}
                                        onChange={this.toggleFields}
                                        id="field-open-switch"
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
                                <Tooltip
                                    placement="top"
                                    target="switchArea"
                                    isOpen={this.state.switchTooltipOpen}
                                    toggle={this.toggleSwitchTooltip}
                                >
                                <FormattedMessage id="toggle_optional_fields" />
                                </Tooltip>
                            </Col>
                            <Col md="1" className="m-auto">
                            
                            </Col>
                        </Row>
                        <ReactCSSTransitionGroup
                            transitionName="row"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                            transitionAppearTimeout={300}
                            transitionAppear={true}
                            component="div"
                        >
                            {this.props.vo.fields.map(k => {
                                let isUse = k.active > 0;
                                let isOpen =
                                    this.state.fieldOpen ||
                                    (!k.generated && isUse);
                                if (!isOpen) {
                                    return;
                                }
                                //let txtClass = isUse ? {color:'blue'}:{};
                                let txtClass = isUse ? "text-primary":"";
                                return (
                                    <Row
                                        key={k.name}
                                        className={
                                            "rowbody flex-nowrap fieldrow"
                                        }
                                    >
                                        <Col md="2" className={txtClass} data-for="">
                                        {k.name}
                                        </Col>
                                        <Col md="2" className={txtClass}>{k.type}</Col>
                                        <Col md="3">
                                            <EditableCustom
                                                col="DESC"
                                                name={k.name}
                                                dataType="text"
                                                mode="inline"
                                                value={k.description}
                                                onSubmit={
                                                    this.updateFieldProperty
                                                }
                                            />
                                        </Col>
                                        <Col md="2" >
                                            <EditableCustom
                                                col="SAMPLE"
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
                                                intl={this.props.intl}
                                                onFieldActivate={this.props.onFieldActivate}
                                            />
                                        </Col>
                                        <Col md="1" data-for="fieldStatus" data-tip={
                                            k.bigquery_info? 
                                            (
                                            this.props.intl.messages['schema_list.datalist.title.regDate'] + " : " + moment(k.regDate).format("YYYY-MM-DD HH:mm:ss")
                                            )
                                            :
                                            this.props.intl.messages['bigquery.not.found']
                                        }>
                                        {
                                            k.bigquery_info ? 
                                            ""
                                            :
                                            <span><i className="fa fa-remove text-danger"/></span>
                                        }
                                        </Col>
                                    </Row>
                                );
                            })}
                        </ReactCSSTransitionGroup>
                    </Container>
                </Col>
            </Row >
        );
    }

    render() {
        if (
            this.props.vo &&
            this.props.vo.fields &&
            this.props.vo.fields.length
        ) {
            return (
                <Panel title={this.props.title}>
                {this.getFieldList()}
                <ReactTooltip 
                    id="fieldStatus"
                    type="success"
                    aria-haspopup='true'
                    effect="float"
                    getContent={(status) => status}/>
                </Panel>
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

