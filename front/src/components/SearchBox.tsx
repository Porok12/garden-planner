import React, {Component} from "react";
import {Button, Col, Collapse, Container, FormControl, FormLabel, InputGroup, Row, Table} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faSearch} from "@fortawesome/free-solid-svg-icons";
import MultiSelect from "react-multi-select-component";
import MyMultiSelect from "./MyMultiSelect";
import criteria from '../assets/criteria';
import {connect} from "react-redux";
import {fetchBrowse} from "../store/browser/reducers";


const mapDispatchToProps = (dispatch: any) => {
    return {
        search: dispatch(fetchBrowse)
    }
}

type StateType = {
    showAdvanced: boolean
    selected: any
}

type PropsType = {
    onSearch: () => void
}

class SearchBox extends Component<PropsType, StateType> {
    state: StateType = {
        showAdvanced: false,
        selected: null
    }

    render() {
        const { showAdvanced, selected } = this.state;

        return <>
            <div className="search-box">
                <Col className="col-12">
                    <div className="d-flex flex-grow-1">
                        <div className="flex-grow-1">
                            <FormattedMessage id="app.browse.search.prompt">
                                {
                                    /* @ts-ignore */
                                    placeholder => <input type="text" placeholder={placeholder} className="h4"/>
                                }
                            </FormattedMessage>
                        </div>
                        <div className="my-auto ml-3">
                            <Button
                                variant="secondary"
                                className="btn-lg"
                                onClick={e => this.props.onSearch()}
                            >
                                <FontAwesomeIcon icon={faSearch} color="#fff" />
                                <span>
                                    <FormattedMessage id="app.browse.search" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </Col>
                {/*<InputGroup>*/}
                {/*    <div className="form-group">*/}
                {/*        <FormControl placeholder="" />*/}
                {/*        <FormLabel>*/}
                {/*            <FormattedMessage id="app.browse.search.prompt" />*/}
                {/*        </FormLabel>*/}
                {/*    </div>*/}
                {/*    <InputGroup.Append>*/}
                {/*        <Button variant="outline-secondary" onClick={this.props.onSearch} className="btn-svg">*/}
                {/*            <FontAwesomeIcon icon={faSearch} color="#fff" />*/}
                {/*            <FormattedMessage id="app.browse.search" />*/}
                {/*        </Button>*/}
                {/*    </InputGroup.Append>*/}
                {/*</InputGroup>*/}
                <Col className="text-right">
                    <Button variant="link"
                            style={{color: 'white'}}
                            onClick={() => this.setState(({showAdvanced}: StateType) => ({showAdvanced: !showAdvanced}))}
                            className="btn-svg"
                    >
                        <span>
                            <FormattedMessage id="app.browse.search.advanced" />
                        </span>
                        <FontAwesomeIcon icon={faCaretDown}
                                         size="2x"
                                         color="#fff"
                                         className={this.state.showAdvanced ? "rot180" : ""} />
                    </Button>
                </Col>
            </div>
            <Collapse in={showAdvanced}>
                <div className="advanced-search">
                    <div className="row">
                        {
                            criteria.map((c: any, i: number) => (
                                <div className="col-12 col-md-6 mb-2">
                                    <MyMultiSelect items={c.items.map((i: any) => i.value)} name={c.type} />
                                </div>
                            ))
                        }
                        <div className="col-12 text-md-right">
                            <Button>
                                <FormattedMessage id="app.browse.search" />
                            </Button>
                        </div>
                    </div>

                </div>
            </Collapse>
        </>;
    }
}


export default connect(null, {fetchBrowse})(SearchBox);
