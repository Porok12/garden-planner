import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";

class SignInPage extends Component {
    render() {
        return <>
            <Form style={{width: '300px', margin: 'auto'}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Switch type="checkbox" label="Remeber me" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        </>;
    }
}

export default SignInPage;
