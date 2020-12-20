import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Canvas} from "react-three-fiber";
import Box from "./Box";

class HomePage extends Component<any, any> {
    graphql() {
        const query = `query { users { username } }`;

        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query
            })
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));
    }

    render() {
        return <>
            <br/>
            <Form style={{width: '300px', margin: 'auto'}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Switch type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Button onClick={this.graphql}>GraphQL</Button>

            <header className="App-header">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </header>
        </>;
    }
}

export default HomePage;
