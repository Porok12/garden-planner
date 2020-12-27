import React, {Component} from 'react';
import {Button, Container, Nav, Overlay, OverlayTrigger} from "react-bootstrap";
import {Canvas} from "react-three-fiber";
import Box from "./Box";
import { request, gql, GraphQLClient } from 'graphql-request';
import Camera from "./Camera";
import CameraControls from "./CameraControls";
import axios from "axios";
import AuthHeader from "../services/AuthHeader";

class HomePage extends Component<any, any> {
    graphql() {
        const query2 = gql`
            {
                users {
                    username
                }
            }
        `;
        const client = new GraphQLClient('graphql');

        const header = AuthHeader();
        client.setHeader('x-access-token', header['x-access-token'] || '');
        client.request(query2).then((data2) => console.log(data2));
        // request('/graphql', query2).then((data2) => console.log(data2));


        axios
            .post("/auth/test", {}, {headers: AuthHeader()})
            .then((response: any) => {
                console.log(response.data);
            }).catch(err => console.log(err.response));
    }

    render() {
        return <>
            <Container id="container" fluid>
                <br/>
                <Button onClick={this.graphql}>GraphQL</Button>
                <OverlayTrigger
                    trigger='click'
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <div id={`tooltip-bottom`} style={{height: '80%', width: '80%', margin: '5px',backgroundColor: '#eee'}}>
                            <Nav variant="tabs">
                                <Nav.Item>
                                    <Nav.Link>Option 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>Option 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>Option 3</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    }
                >
                    <Button variant="secondary">Tooltip on {'top'}</Button>
                </OverlayTrigger>
                <Canvas id="canvas">
                    <Camera position={[0, 0, 3]}/>
                    <CameraControls />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </Container>
        </>;
    }
}

export default HomePage;
