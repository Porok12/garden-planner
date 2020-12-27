import React, {Component} from "react";
import {Button, Col, Form} from "react-bootstrap";
import AuthService from "../services/AuthService";

class SignUpPage extends Component {
    state = {
        login: '',
        email: '',
        password: '',
        repeated: ''
    }

    submit(e: any) {
        e.preventDefault();

        const {login, email, password, repeated} = this.state;

        if (password !== repeated) {
            return;
        }

        AuthService.register(login, email, password)
            .then(response => console.log(response))
            .catch(err => console.log(err.response));
    }

    change(e: any) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {login, email, password, repeated} = this.state;
        const change = this.change.bind(this);
        const submit = this.submit.bind(this);

        return <>
            <Form style={{width: '400px', margin: 'auto'}} onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login" name="login" value={login} onChange={change} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={change} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={change} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="repeated" value={repeated} onChange={change} />
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
