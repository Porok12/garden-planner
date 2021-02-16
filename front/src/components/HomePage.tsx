import React, { Component, createRef, useRef } from 'react';
import {Button, ButtonGroup, Container, Modal, Nav, Form, Row, NavDropdown}
    from "react-bootstrap";
import SecCanvas from "./threejs/SecCanvas";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import MainCanvas from "./threejs/MainCanvas";
import TemplateCanvas from "./threejs/TemplateCanvas";
import Sidebar from "./Sidebar";
import {connect, Provider} from "react-redux";
import {disableOrbitControls, disableSky} from "../store/canvas/actions";

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
                    <Button variant="primary" onClick={this.props.disableOrbitControls}>Disable OrbitControls</Button>
                </ButtonGroup>
            </div>

            <div className={this.state.fullscreen ? "div-expand" : ""}
                 style={{ display: 'flex', alignItems: 'stretch'}}
            >
                <MainCanvas />
                {/*<TemplateCanvas />*/}
                <Sidebar />
            </div>
        </>;
    }
}

export default connect(null, {disableOrbitControls, disableSky})(HomePage);
