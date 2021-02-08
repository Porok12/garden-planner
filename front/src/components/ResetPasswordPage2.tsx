import React from "react";
import {Component} from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FormattedMessage} from "react-intl";

type StateType = {
    password: string;
    repeated: string;
    showPass: boolean;
    showRep: boolean;
}

class ResetPasswordPage extends Component<any, StateType> {
    state = {
        password: '',
        repeated: '',
        showPass: false,
        showRep: false
    }

    render() {
        const {password, repeated, showPass, showRep} = this.state;
        const change = (e: any) => { this.setState({[e.target.name]: e.target.value} as StateType); };
        const submit = (e: any) => { e.preventDefault(); };
        const togglePass = () => { this.setState(({showPass}: StateType) => ({showPass: !showPass}))}
        const toggleRep = () => { this.setState(({showRep}: StateType) => ({showRep: !showRep}))}
        const enableBtn = password != "" && repeated != "";

        return <>
            <Form className="form"
                style={{width: '500px', margin: 'auto'}}
                onSubmit={submit}>
                <Form.Group controlId="formPassword">
                    <InputGroup className="form-group">
                        <Form.Control
                            type={showPass ? "text" : "password"}
                            placeholder=""
                            name="password"
                            value={password}
                            onChange={change} />
                        <Form.Label>
                            <FormattedMessage id="app.reset-password.password" />
                        </Form.Label>
                        <InputGroup.Append className="underline">
                            {showPass ? <FontAwesomeIcon icon={faEye} onClick={togglePass}/>
                                : <FontAwesomeIcon icon={faEyeSlash} onClick={togglePass}/>}
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formRepeated">
                    <InputGroup className="form-group">
                        <Form.Control
                            type={showRep ? "text" : "password"}
                            placeholder=""
                            name="repeated"
                            value={repeated}
                            onChange={change} />
                        <Form.Label>
                            <FormattedMessage id="app.reset-password.repeat" />
                        </Form.Label>
                        {/*<InputGroup.Append className="underline">*/}
                        {/*    {showRep ? <FontAwesomeIcon icon={faEye} size="2x" color="#777" onClick={toggleRep}/>*/}
                        {/*    : <FontAwesomeIcon icon={faEyeSlash} size="2x" color="#777" onClick={toggleRep}/>}*/}
                        {/*</InputGroup.Append>*/}
                    </InputGroup>
                </Form.Group>

                <Button variant={`outline-${enableBtn ? "primary" : "secondary"}`}
                        type="submit"
                        disabled={!enableBtn}
                        block>
                    <FormattedMessage id="app.reset-password.submit" />
                </Button>
            </Form>
        </>;
    }
}

export default ResetPasswordPage;
