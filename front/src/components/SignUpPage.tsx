import React, {Component, createRef} from "react";
import {Button, Col, Form} from "react-bootstrap";
import AuthService from "../services/AuthService";
import {config, Spring} from "react-spring/renderprops";
import {Redirect} from "react-router-dom";
import {FormattedMessage} from "react-intl";

type StateType = {
    login: string;
    email: string;
    password: string;
    repeated: string;
    agreed: boolean;
    redirect?: string;
}

class SignUpPage extends Component<any, StateType> {
    state: StateType = {
        login: '',
        email: '',
        password: '',
        repeated: '',
        agreed: false
    }

    submit(e: any) {
        e.preventDefault();

        const {login, email, password, repeated, agreed} = this.state;

        if (password !== repeated) {
            return;
        }

        AuthService.register(login, email, password, agreed)
            .then(response => {
                console.log(response);
                this.setState({redirect: "/account/active"});
            })
            .catch(err => console.log(err.response));
    }

    change(e: any) {
        this.setState({[e.target.name]: e.target.value} as StateType);
    }

    checkboxChange(e: any) {
        this.setState(({agreed}: StateType) => ({agreed: !agreed}));
    }

    render() {
        const {login, email, password, repeated, agreed, redirect} = this.state;
        const change = this.change.bind(this);
        const checkboxChange = this.checkboxChange.bind(this);
        const submit = this.submit.bind(this);
        const enableBtn = login != "" && email != "" && password != "" && repeated != "" && agreed;

        const spring = createRef<any>();

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        return <Spring ref={spring}
                       from={{opacity: 0, margin: -50}}
                       to={{opacity: 1, margin: 50}}
                       config={config.gentle}
                       delay={100}
        >
            {
                ({opacity, margin}) => (
                    <Form className="form"
                          style={{opacity: opacity, marginTop: margin, width: '450px', margin: 'auto'}}
                          onSubmit={submit}>
                        <Form.Group controlId="formLogin">
                            <Form.Control type="text" placeholder="" name="login" value={login} onChange={change} />
                            <Form.Label className="form-label">
                                <FormattedMessage id="app.signup.login" />
                            </Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control type="email" placeholder="" name="email" value={email} onChange={change} />
                            <Form.Label className="form-label">
                                <FormattedMessage id="app.signup.email" />
                            </Form.Label>
                            <Form.Text className="text-muted">
                                <FormattedMessage id="app.signup.email.subtext" />
                            </Form.Text>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formPassword">
                                <Form.Control type="password" placeholder="" name="password" value={password} onChange={change} />
                                <Form.Label className="form-label">
                                    <FormattedMessage id="app.signup.password" />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formRepeatPassword">
                                <Form.Control type="password" placeholder="" name="repeated" value={repeated} onChange={change} />
                                <Form.Label className="form-label">
                                    <FormattedMessage id="app.signup.repeat" />
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        {/*<Form.Group controlId="formBasicCheckbox">*/}
                        {/*    <Form.Switch type="checkbox" label="I agree to the terms of service" />*/}
                        {/*</Form.Group>*/}
                        <Form.Group controlId="formCheckbox" className="text-left">
                            <FormattedMessage id="app.signup.terms">
                                {
                                    (msg) =>
                                        <Form.Check type="checkbox"
                                                    name="agreed"
                                                    label={msg}
                                                    className="primary"
                                                    checked={agreed}
                                                    onChange={checkboxChange}
                                        />
                                }
                            </FormattedMessage>
                        </Form.Group>

                        <Button variant={`outline-${enableBtn ? "primary" : "secondary"}`}
                                type="submit"
                                disabled={!enableBtn}
                                block>
                            <FormattedMessage id="app.signup.submit" />
                        </Button>
                    </Form>
                )
            }
        </Spring>
    }
}

export default SignUpPage;
