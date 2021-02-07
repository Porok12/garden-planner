import React from "react";
import {Component} from "react";
import {Button, Form, Table} from "react-bootstrap";
import AccountService from "../services/AccountService";


class ResetPasswordPage extends Component<any, any> {
    state = {
        email: ''
    }

    render() {
        const {email} = this.state;
        const change = (e: any) => { this.setState({email: e.target.value}); };
        const submit = (e: any) => {
            e.preventDefault();
            AccountService.requestReset(email)
                .then(res => console.log(res));
        };
        const enableBtn = email != "";

        return <>
            <Form className="form"
                style={{width: '500px', margin: 'auto'}}
                onSubmit={submit}>
                <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="" name="email" value={email} onChange={change} />
                    <Form.Label>Email address</Form.Label>
                    <Form.Text className="text-muted">
                        We'll send you an email that allow you to reset your password.
                    </Form.Text>
                </Form.Group>

                <Button variant={`outline-${enableBtn ? "primary" : "secondary"}`}
                        type="submit"
                        disabled={!enableBtn}
                        block>
                    Submit
                </Button>
            </Form>
        </>;
    }
}

export default ResetPasswordPage;
