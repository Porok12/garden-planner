import React, {Component} from 'react';
import {Button, Container} from "react-bootstrap";
import {Canvas} from "react-three-fiber";
import Box from "./Box";
import { request, gql } from 'graphql-request';
import Camera from "./Camera";
import CameraControls from "./CameraControls";

class HomePage extends Component<any, any> {
    graphql() {
        const query2 = gql`
            {
                users {
                    username
                }
            }
        `;
        request('/graphql', query2).then((data2) => console.log(data2));
    }

    render() {
        return <>
            <Container id="container" fluid>
                <br/>
                <Button onClick={this.graphql}>GraphQL</Button>

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
