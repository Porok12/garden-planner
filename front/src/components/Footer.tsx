import React from "react";
import {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import LanguageSwitch from "./LanguageSwitch";

class Foot extends Component {
    render() {
        return <footer id="footer">
            <Container>
                <Row className="pt-4">
                    <Col>
                        <h4>
                            <FormattedMessage id="app.footer.col1" />
                        </h4>
                        <LanguageSwitch />
                    </Col>
                    <Col>
                        <h4>
                            <FormattedMessage id="app.footer.col2" />
                        </h4>
                        <li>#1</li>
                        <li>#2</li>
                    </Col>
                    <Col>
                        <h4>
                            <FormattedMessage id="app.footer.col3" />
                        </h4>
                        <li>#1</li>
                        <li>#2</li>
                        <li>#3</li>
                        <li>#4</li>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col className="text-center">
                        <FormattedMessage id="app.footer.copyright" values={{copy: () => <>&copy;</>}}/>
                    </Col>
                </Row>
            </Container>
        </footer>;
    }
}

export default Foot;
