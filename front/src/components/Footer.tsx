import React from "react";
import {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";

class Foot extends Component {
    render() {
        return <footer id="footer">
            <Container>
                <Row className="pt-4">
                    <Col>
                        <h4>Docs</h4>
                        <ul>
                            <li>#1</li>
                            <li>#2</li>
                            <li>#3</li>
                            <li>#4</li>
                        </ul>
                    </Col>
                    <Col>
                        <h4>Community</h4>
                        <li>#1</li>
                        <li>#2</li>
                    </Col>
                    <Col>
                        <h4>Socials</h4>
                        <li>#1</li>
                        <li>#2</li>
                        <li>#3</li>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col className="text-center">
                        Copyright &copy; 2021 Garden Planner.
                    </Col>
                </Row>
            </Container>
        </footer>;
    }
}

export default Foot;
