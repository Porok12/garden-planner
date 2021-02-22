import React, {Component} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faFilter, faList, faTh} from "@fortawesome/free-solid-svg-icons";

type StateType = {
    gridMode: boolean
}

type PropsType = {
    toggleGrid: (toggle: boolean) => void
}

class SortBell extends Component<PropsType, StateType> {
    state: StateType = {
        gridMode: false
    }

    render() {
        return <>
            <div className="advanced-search d-flex" style={{backgroundColor: 'white'}}>
                <div className="">
                    <h3>
                        <FontAwesomeIcon icon={faFilter} />
                        Sort
                    </h3>
                </div>
                <div className="mx-auto" />
                <div className="">
                    <ButtonGroup>
                        <Button variant={this.state.gridMode ? "secondary" : "primary"}
                                onClick={() => this.props.toggleGrid(false)}>
                            <FontAwesomeIcon icon={faList} />
                        </Button>
                        <Button variant={this.state.gridMode ? "primary" : "secondary"}
                                onClick={() => this.props.toggleGrid(true)}>
                            <FontAwesomeIcon icon={faTh} />
                        </Button>
                    </ButtonGroup>
                    {/*<Button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"*/}
                    {/*        aria-expanded="false" aria-controls="navbar">*/}
                    {/*    <span className="sr-only">Toggle navigation</span>*/}
                    {/*    <FontAwesomeIcon icon={faBars} />*/}
                    {/*</Button>*/}
                </div>
            </div>
        </>;
    }
}

export default SortBell;
