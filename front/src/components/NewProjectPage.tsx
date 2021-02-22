import React, {Component} from "react";
import StepModal from "./StepModal";
import {Button, Container, Form, Modal, Row} from "react-bootstrap";

class NewProjectPage extends Component<any, any> {
    state = {
        modal: false,
        width: 10,
        height: 10
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

        const { width, height } = this.state;

        let steps = [
            {
                name: 'Dimensions',
                validation: () => { return true; },
                content: <div>
                    <Form>
                        <Form.Group>
                            <Form.Control type="number" name="width" placeholder=""
                                          value={width} onChange={(e) =>
                                this.setState({width: e.target.value})}
                                          min={10} />
                            <Form.Label>Width</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="number" name="height" placeholder=""
                                          value={height} onChange={(e) =>
                                this.setState({height: e.target.value})}
                                          min={10} />
                            <Form.Label>Height</Form.Label>
                        </Form.Group>
                    </Form>
                </div>
            },
            {
                name: 'Summary',
                validation: () => { return true; },
                content: <div>
                    Width: {width} <br/>
                    Height: {height}
                </div>
            }
        ];

        return <>
            {modalBox}

            <div className="d-flex justify-content-center">
                <StepModal steps={steps} onFinish={() => this.props.history.push('editor')}/>
            </div>
        </>;
    }
}

export default NewProjectPage;
