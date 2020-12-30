import React, {Component, createRef} from "react";
import {Button, Form} from "react-bootstrap";
import AuthService from "../services/AuthService";
import {useSpring, animated} from "react-spring";
import { Spring, config, interpolate } from "react-spring/renderprops";
import axios from "axios";
import AuthHeader from "../services/AuthHeader";

function Test() {
    const [props, set] = useSpring(() => ({
        transform: `scale(1)`,
        from: { transform: `scale(0.5)`},
        config: {
            tension: 400,
            mass: 5,
            velocity: 8
        }
    }));

    return <animated.div style={props}
                         onMouseOver={() => set({transform: 'scale(0.5)'})}
                         onMouseLeave={() => set({transform: 'scale(1.0)'})}
    >
        <h1>Test</h1>
    </animated.div>
}

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

        const spring = createRef<any>();

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
                    <Button variant="outline-primary" type="submit" block>
                        Submit
                    </Button>
                </Form>
                )}
        </Spring>;
    }
}

export default SignInPage;
