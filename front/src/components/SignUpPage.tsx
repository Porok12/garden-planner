import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";

class SignUpPage extends Component {
    render() {
        return <>
            <Form style={{width: '400px', margin: 'auto'}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Switch type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        </>;
    }
}

export default SignUpPage;
