import React, { Component, createRef, useRef } from 'react';
import {Button, ButtonGroup, Container, Modal, Nav, Form, Row, NavDropdown}
    from "react-bootstrap";
import SecCanvas from "./threejs/SecCanvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup, faPaintBrush, faPlus, faSeedling, faTools} from "@fortawesome/free-solid-svg-icons";
import MainCanvas from "./threejs/MainCanvas";
import TemplateCanvas from "./threejs/TemplateCanvas";
import Sidebar from "./Sidebar";
import {connect, Provider, useSelector} from "react-redux";
import {disableOrbitControls, disableSky, enableOrbitControls, setBrushOpacity, setBrushSize, setBrush} from "../store/canvas/actions";

class HomePage extends Component<any, any> {
    state = {
        modal : false,
        fullscreen: false,
        sidebar: true
    }

    render() {
        let modalBox;
        if (this.state.modal) {
            modalBox = <Modal.Dialog>
                <Modal.Header>Create project</Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" name="width" placeholder=""
                                              min={10} />
                                <Form.Label>Width</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" name="height" placeholder=""
                                              min={10} />
                                <Form.Label>Height</Form.Label>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>this.setState({modal: false})}>Close</Button>
                    <Button onClick={()=>this.setState({modal: false})}>Next</Button>
                </Modal.Footer>
            </Modal.Dialog>
        }

        // @ts-ignore
        return <>
            {modalBox}

            <div>
                <Nav variant="pills" activeKey="1">
                    <NavDropdown title="Dropdown" id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    {/*<Nav.Item>*/}
                    {/*    {*/}
                    {/*        this.state.fullscreen ?*/}
                    {/*            <Button onClick={() => this.setState({fullscreen: false})}>Exit</Button>*/}
                    {/*            :*/}
                    {/*            <Button onClick={()=>{this.setState({fullscreen: true})}}>Fullscreen</Button>*/}
                    {/*    }*/}
                    {/*</Nav.Item>*/}
                    <Nav.Item>
                        <Button onClick={() => this.setState({modal: true})}>New project</Button>
                    </Nav.Item>
                </Nav>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="primary" onClick={() => {}}>Wiremode</Button>
                    <Button variant="primary" onClick={this.props.disableSky}>Sky</Button>
                    {
                        this.props.orbitControls.enabled ?
                            <Button variant="primary" onClick={this.props.disableOrbitControls}>Disable OrbitControls</Button>
                            :
                            <Button variant="primary" onClick={this.props.enableOrbitControls}>Enable OrbitControls</Button>
                    }
                </ButtonGroup>
                <input type="number" min={0} max={1} onChange={(e) =>
                    this.props.setBrushOpacity(e.target.value)} />
                <input type="number" min={1} max={10} onChange={(e) =>
                    this.props.setBrushSize(e.target.value)} />
                    <Button onClick={e => this.setState((prev: any) => ({sidebar: !prev.sidebar}))}>
                        <FontAwesomeIcon icon={faSeedling} />
                    </Button>
                <Button>
                    <FontAwesomeIcon icon={faLayerGroup} />
                </Button>
                <Button onClick={e => this.props.setBrush(!this.props.brush.enabled)}>
                    <FontAwesomeIcon icon={faPaintBrush} />
                </Button>
                <Button>
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

export default connect((state: AppRootState) => state.canvas,
    {disableOrbitControls, enableOrbitControls, disableSky, setBrushOpacity, setBrushSize, setBrush})(HomePage);
