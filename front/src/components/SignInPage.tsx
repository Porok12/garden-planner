import React, {Component, createRef} from "react";
import {Button, Form} from "react-bootstrap";
import AuthService from "../services/AuthService";
import {useSpring, animated} from "react-spring";
import { Spring, config, interpolate } from "react-spring/renderprops";
import {Redirect, RouteComponentProps,} from "react-router-dom";
import {withRouter}from "react-router";

type LocationState = {
    from: string;
};

interface PropsType extends RouteComponentProps<any, any, LocationState | undefined>, React.Props<any> {

}

type StateType = {
    login: string;
    password: string;
    redirect?: string;
}

class SignInPage extends Component<PropsType, StateType> {
    state: StateType = {
        login: '',
        password: ''
    }

    submit(e: any) {
        e.preventDefault();

        const {login, password} = this.state;
        AuthService.login(login, password)
            .then(response => {
                console.log(response);
                this.setState({redirect: "/"});
            })
            .catch(err => console.log(err.response));
    }

    change(e: any) {
        this.setState({[e.target.name]: e.target.value} as StateType);
    }

    render() {
        const {login, password, redirect} = this.state;
        const change = this.change.bind(this);
        const submit = this.submit.bind(this);
        const enableBtn = login != "" && password != "";

        const spring = createRef<any>();

        if (redirect) {
            let path = null;
            if (this.props.location.state) {
                path = this.props.location.state.from;
                this.props.location.state = undefined;
            }
            return <Redirect to={path || redirect} />;
        }

        return <Spring ref={spring}
            from={{opacity: 0, margin: -50}}
            to={{opacity: 1, margin: 50}}
            config={config.gentle}
            delay={100}
        >
            {({opacity, margin}) => (
                <Form className="form"
                      style={{opacity: opacity, marginTop: margin, width: '350px', margin: 'auto'}}
                      onSubmit={submit}>
                    <Form.Group controlId="formLogin">
                        <Form.Control type="text" placeholder="" name="login"
                                      value={login} onChange={change} />
                        <Form.Label className="form__label">Login</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Control type="password" placeholder="" name="password"
                                      value={password} onChange={change} />
                        <Form.Label className="form-label">Password</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="formCheckbox" className="text-left">
                        <Form.Check type="checkbox" label="Remember me" className="primary" />
                    </Form.Group>

                    <Form.Text as="a" className="text-left" style={{cursor: 'pointer'}} onClick={()=>{this.setState({redirect: "/reset"})}}>
                        Forgot your password?
                    </Form.Text>

                    <Button variant={`outline-${enableBtn ? "primary" : "secondary"}`}
                            type="submit"
                            disabled={!enableBtn}
                            block>
                        Submit
                    </Button>
                </Form>
                )}
        </Spring>;
    }
}

export default withRouter(SignInPage);
