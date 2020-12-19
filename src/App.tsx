import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import {Button, Form} from 'react-bootstrap';
import {Canvas} from "react-three-fiber";
import Box from "./components/Box";

function App() {
    return (
        <div className="App">
            <NavBar/>
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

            <header className="App-header">
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </header>
        </div>
    );
}

export default App;
