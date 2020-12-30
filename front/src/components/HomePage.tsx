import React, { Component, createRef, useRef } from 'react';
import {Button, ButtonGroup, Container, Modal, Nav, OverlayTrigger, Form, Row}
    from "react-bootstrap";
import MainCanvas from "./threejs/MainCanvas";

class HomePage extends Component<any, any> {
    state = {
        modal : false
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
                </Modal.Footer>
            </Modal.Dialog>
        }

        // @ts-ignore
        return <>
            {modalBox}
            <OverlayTrigger
                trigger='click'
                key='bottom'
                placement='bottom'
                overlay={
                    <div id={`tooltip-bottom`} style={{height: '80%', width: '80%', margin: '5px',backgroundColor: '#eee'}}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link>Option 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>Option 2</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>Option 3</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                }
            >
                <Button variant="secondary">Tooltip</Button>
            </OverlayTrigger>
            <Button onClick={()=>{this.setState({modal: !this.state.modal})}}>
                Create project
            </Button>

                <MainCanvas />
        </>;
    }
}

export default HomePage;
