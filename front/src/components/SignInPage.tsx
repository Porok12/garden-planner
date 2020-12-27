import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import AuthService from "../services/AuthService";
import axios from "axios";
import AuthHeader from "../services/AuthHeader";

class SignInPage extends Component {
    state = {
        login: '',
        password: ''
    }

    submit(e: any) {
        e.preventDefault();

        const {login, password} = this.state;
        AuthService.login(login, password)
            .then(response => {
                console.log(response);

            })
            .catch(err => console.log(err.response));
    }

    change(e: any) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {login, password} = this.state;
        const change = this.change.bind(this);
        const submit = this.submit.bind(this);

        return <>
            <Form style={{width: '300px', margin: 'auto'}} onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter login" name="login" value={login} onChange={change} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={change} />
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
