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
            <Form className="form" style={{width: '450px', margin: 'auto'}} onSubmit={submit}>
                <Form.Group controlId="formLogin">
                    <Form.Control type="text" placeholder="" name="login" value={login} onChange={change} />
                    <Form.Label className="form-label">Login</Form.Label>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="" name="email" value={email} onChange={change} />
                    <Form.Label className="form-label">Email address</Form.Label>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formPassword">
                        <Form.Control type="password" placeholder="" name="password" value={password} onChange={change} />
                        <Form.Label className="form-label">Password</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formRepeatPassword">
                        <Form.Control type="password" placeholder="" name="repeated" value={repeated} onChange={change} />
                        <Form.Label className="form-label">Repeat password</Form.Label>
                    </Form.Group>
                </Form.Row>

                {/*<Form.Group controlId="formBasicCheckbox">*/}
                {/*    <Form.Switch type="checkbox" label="I agree to the terms of service" />*/}
                {/*</Form.Group>*/}
                <Form.Group controlId="formCheckbox" className="text-left">
                    <Form.Check type="checkbox" label="I agree to the terms of service" className="primary" />
                </Form.Group>

                <Button variant="outline-primary" type="submit" block>
                    Submit
                </Button>
            </Form>
        </>;
    }
}

export default SignUpPage;
