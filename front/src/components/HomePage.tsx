import React, { Component, createRef, useRef } from 'react';
import { Button, ButtonGroup, Container, Modal, Nav, OverlayTrigger, Form}
    from "react-bootstrap";
import { Canvas, useFrame } from "react-three-fiber";
import { Html } from '@react-three/drei';
import Camera from "./threejs/Camera";
import CameraControls from "./threejs/CameraControls";
import Ground from "./threejs/Ground";
import {
    Mesh,
    OrthographicCamera,
    Scene,
    SpriteMaterial,
    Vector2,
    Vector3,
    WebGLRenderTarget
} from "three";
import MySky from ".//threejs/MySky";

const renderTarget = new WebGLRenderTarget(800, 800);
const spriteMaterial = new SpriteMaterial({map: renderTarget.texture});
type SpriteProps = {
    sceneRef: React.RefObject<Scene>
    scene: React.RefObject<Scene>
}

function MySprite(props: SpriteProps) {
    // const sceneRef = useRef<Scene>();
    const cam = useRef<OrthographicCamera>();
    const meshRef = useRef<Mesh>();

    useFrame(({ gl, scene, camera }, dt) => {
        if (props.scene.current && cam.current) {
            gl.setClearColor('#ffffff');
            gl.setRenderTarget(renderTarget);
            gl.render(props.scene.current, cam.current);
            gl.setRenderTarget(null);
        }

        if (props.sceneRef.current) {
            gl.clear(true, true, false);
            gl.render(props.sceneRef.current, camera);
        }

        if (meshRef.current) {
            // meshRef.current.rotateX(0.1);
            meshRef.current.rotation.y += 2 * dt;
        }

    }, 1);

    if (cam.current) {
        cam.current.lookAt(new Vector3(0, 0, 0), 0.1, 100);
    }

    return <>
        <orthographicCamera ref={cam} args={[-1, 1, 1, -1]} position={[0, 3, 0]}
                            onClick={(e) => {
                                console.log(e);
                            }} />
        <mesh ref={meshRef} scale={[0.1, 0.1, 0.1]}>
            <sphereGeometry />
            <meshBasicMaterial color={'#9d4a55'} />
        </mesh>
        {/*<mesh scale={[0.2, 0.2, 0.2]} position={[0.5, 0, 0]}>*/}
        {/*    <sphereGeometry />*/}
        {/*    <meshBasicMaterial color={'#9d4a55'} />*/}
        {/*</mesh>*/}
    </>;
}

class HomePage extends Component<any, any> {
    testScene: React.RefObject<Scene> = createRef<Scene>();
    sceneRef: React.RefObject<Scene> = createRef<Scene>();
    state = {
        wireframe: false,
        modal: false,
        sky: true
    }

    render() {
        let modalBox;
        if (this.state.modal) {
            modalBox = <Modal.Dialog>
                <Modal.Header>Create project</Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group>
                                <Form.Control type="number" name="width" placeholder=""
                                              min={10} />
                                <Form.Label>Width</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" name="height" placeholder=""
                                              min={10} />
                                <Form.Label>Height</Form.Label>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>this.setState({modal: false})}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        }

        // @ts-ignore
        return <>
            <Container id="container" fluid>
                {modalBox}
                <br/>
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
                <Button onClick={()=>{this.setState({modal: !this.state.modal})}}>
                    Create project
                </Button>

                <Canvas id="canvas" invalidateFrameloop={true}>
                    <scene ref={this.sceneRef}>
                        {!this.state.sky ? null : <MySky />}
                        <Camera position={[0, 0, 3]}/>
                        <CameraControls />
                        <ambientLight color={'#ffffff'} intensity={0.2}/>
                        <pointLight color={'#ffffff'} position={[2, 2, 2]} intensity={2.0}/>
                        <Ground testScene={this.testScene} wireframe={this.state.wireframe} sceneRef={this.sceneRef}/>
                        <sprite name="sprite" material={spriteMaterial} center={new Vector2(-1, -.1)} scale={[1.3, 1.3, 1]} />
                    </scene>
                    <scene ref={this.testScene}>
                        <MySprite scene={this.testScene} sceneRef={this.sceneRef} />
                    </scene>
                    <Html>
                        <div style={{
                            position: "absolute",
                            left: "600px",
                            top: "0"
                        }}>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="primary" onClick={
                                    () => {
                                        this.setState({wireframe: !this.state.wireframe})
                                    }
                                }>wiremode</Button>
                                <Button variant="primary" onClick={() => {
                                    this.setState({sky: !this.state.sky});
                                }}>SKY</Button>
                                <Button variant="primary">3</Button>
                            </ButtonGroup>
                        </div>
                    </Html>
                </Canvas>
            </Container>
        </>;
    }
}

export default HomePage;
