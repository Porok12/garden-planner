import React, { Component, createRef, useRef } from 'react';
import {Button, ButtonGroup, Container, Modal, Nav, Form, Row, NavDropdown, Col}
    from "react-bootstrap";
import SecCanvas from "./threejs/SecCanvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxOpen, faLayerGroup, faPaintBrush, faPlus, faSeedling, faTools} from "@fortawesome/free-solid-svg-icons";
import MainCanvas from "./threejs/MainCanvas";
import TemplateCanvas from "./threejs/TemplateCanvas";
import Sidebar from "./Sidebar";
import {connect, Provider, useSelector} from "react-redux";
import {disableOrbitControls, disableSky, enableSky, enableOrbitControls, setBrushOpacity, setBrushSize, setBrush} from "../store/canvas/actions";
import { RootState } from '../store';
import StepModal from "./StepModal";
import TileButton from "./TileButton";

class ProjectEditorPage extends Component<any, any> {
    state = {
        fullscreen: false,
        sidebar: true
    }

    render() {
        return <>
            <div>
                {/*<Nav variant="pills" activeKey="1">*/}
                {/*    <NavDropdown title="Dropdown" id="nav-dropdown">*/}
                {/*        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>*/}
                {/*        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>*/}
                {/*        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>*/}
                {/*        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>*/}
                {/*    </NavDropdown>*/}
                {/*    <Nav.Item>*/}
                {/*        {*/}
                {/*            this.state.fullscreen ?*/}
                {/*                <Button onClick={() => this.setState({fullscreen: false})}>Exit</Button>*/}
                {/*                :*/}
                {/*                <Button onClick={()=>{this.setState({fullscreen: true})}}>Fullscreen</Button>*/}
                {/*        }*/}
                {/*    </Nav.Item>*/}
                {/*</Nav>*/}
                <ButtonGroup aria-label="Basic example">
                    {
                        this.props.sky.enabled ?
                            <Button variant="primary" onClick={this.props.disableSky}>Sky</Button>
                            :
                            <Button variant="secondary" onClick={this.props.enableSky}>Sky</Button>
                    }
                    {
                        this.props.orbitControls.enabled ?
                            <Button variant="primary" onClick={this.props.disableOrbitControls}>OrbitControls</Button>
                            :
                            <Button variant="secondary" onClick={this.props.enableOrbitControls}>OrbitControls</Button>
                    }
                    <Button variant="primary" onClick={() => alert('#TODO')}>Wiremode</Button>
                </ButtonGroup>

                <label>Brush covering</label>
                <input type="number" min={0} max={1} style={{width: '64px'}} onChange={(e) =>
                    this.props.setBrushOpacity(e.target.value)} />
                <label>Brush size</label>
                <input type="number" min={1} max={10} style={{width: '64px'}} onChange={(e) =>
                    this.props.setBrushSize(e.target.value)} />

                <Button
                    variant={this.state.sidebar ? "primary" : "secondary"}
                    onClick={e => this.setState((prev: any) => ({sidebar: !prev.sidebar}))}>
                    <FontAwesomeIcon icon={faSeedling} />
                </Button>
                <Button
                    variant={this.props.brush.enabled ? "primary" : "secondary"}
                    onClick={e => this.props.setBrush(!this.props.brush.enabled)}>
                    <FontAwesomeIcon icon={faPaintBrush} />
                </Button>
                <Button onClick={() => alert('#TODO')}>
                    <FontAwesomeIcon icon={faLayerGroup} />
                </Button>
                <Button onClick={() => alert('#TODO')}>
                    <FontAwesomeIcon icon={faTools} />
                </Button>
            </div>

            <div className={this.state.fullscreen ? "div-expand" : ""}
                 style={{ display: 'flex', alignItems: 'stretch', overflow: 'hidden'}}
            >
                <MainCanvas />
                {/*<TemplateCanvas />*/}
                <Sidebar show={this.state.sidebar} />
            </div>
        </>;
    }
}

export default connect((state: RootState) => state.canvas,
    {disableOrbitControls, enableOrbitControls, disableSky, enableSky, setBrushOpacity, setBrushSize, setBrush})(ProjectEditorPage);
