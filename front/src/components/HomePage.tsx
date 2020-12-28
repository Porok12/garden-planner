import React, {Component, createRef, useEffect, useRef} from 'react';
import {Button, ButtonGroup, Container, Modal, Nav, Overlay, OverlayTrigger, Row, Col, Form}
    from "react-bootstrap";
import {Canvas, extend, Renderer, useFrame, useThree} from "react-three-fiber";
import { Html, OrbitControls } from '@react-three/drei';
import Box from "./Box";
import { request, gql, GraphQLClient } from 'graphql-request';
import Camera from "./Camera";
import CameraControls from "./CameraControls";
import axios from "axios";
import AuthHeader from "../services/AuthHeader";
import Ground from "./Ground";
import {
    Color,
    Mesh,
    MeshPhongMaterial,
    OrthographicCamera,
    Scene,
    SpriteMaterial,
    Texture, Vector2,
    Vector3,
    WebGLRenderTarget
} from "three";
import {MapControls} from "three/examples/jsm/controls/OrbitControls";
import {useCanvas} from 'react-three-fiber';
import MySky from "./MySky";
import Sidebar from './Sidebar';
// import { WaterPass } from 'three/examples/jsm/postprocessing/'
import { Effects } from '@react-three/drei/Effects'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
extend({  EffectComposer, RenderPass, GlitchPass })



// function Test({camera}) {
//     const scene = useRef();
//     const {gl} = useThree();
//
//     gl.autoClear = false;
//     gl.render(scene.current, camera);
//
//     // useFrame();
//
//     return <scene ref={scene} renderOrder={}/>
// }

// function Content({ camera }) {
//     const scene = useRef();
//     const {gl} = useThree();
//
//     // useRender(({ gl }) => void ((gl.autoClear = true), gl.render(scene.current, camera)), true)
//     return <scene ref={scene}>{/* ... */}</scene>
// }

// function HeadsUpDisplay({ camera }) {
//     const scene = useRef();
//     useRender(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)))
//     return <scene ref={scene}>{/* ... */}</scene>
// }

// const drawing = new Texture();

// function MyTexture() {
//
//     const { gl } = useThree();
//     // const {  } = use();
//
//     // gl.render();
//
//     return null;
// };

// function Gui(params) {
//     return (
//         <Html scaleFactor={15} class="main">
//             <div class="content">{`Score: ${100}`}</div>
//         </Html>
//     )
// }

// const renderTarget = new WebGLRenderTarget(800, 800);
//
//
// const material = new MeshPhongMaterial({
//     map: renderTarget.texture,
// });
//
// function Foo() {
//     const { gl } = useThree();
//     gl.setRenderTarget(renderTarget);
//     gl.render(scene, camera);
//     gl.setRenderTarget(null);
//     return undefined;
// }

const Comp = () => {
    const { gl, scene, camera, size } = useThree();
    const composer = useRef<EffectComposer>();
    const factor = 2;

    useEffect(() => {
        if (composer.current) { // @ts-ignore
                composer.current.obj.setSize(size.width, size.height)
        }}, [size]);
    // This takes over as the main render-loop (when 2nd arg is set to true)
    // useRender(() => composer.current.obj.render(), true)

    return <>
        <effectComposer ref={composer} args={[gl]}>
            {/* @ts-ignore */}
            <renderPass name="passes" args={[scene, camera]} />
            {/* @ts-ignore */}
            <glitchPass name="passes" factor={factor} renderToScreen />
        </effectComposer>
    </>
}

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

    // const { setDefaultCamera } = useThree();
    // if (cam.current)
    //     setDefaultCamera(cam.current);

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

    testScene: React.RefObject<Scene> = createRef<Scene>();
    sceneRef: React.RefObject<Scene> = createRef<Scene>();
    state = {
        wireframe: false,
        modal: false,
        sky: true
    }

    render() {
        const Animator = () => {
            const {invalidate} = useThree();

            setInterval(invalidate, 25);

            return <ambientLight></ambientLight>;
        }

        // const Invalidate = () => {
        //     useThree().invalidate();
        //     return
        // };

        // const Sky = () => {
        //     return <></>;
        // }

        // spriteMaterial.needsUpdate = true;
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
        // @ts-ignore
        return <>
            <Container id="container" fluid>
                {modalBox}
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
                    {/*<scene ref={this.testScene}>*/}
                    {/*    <mesh>*/}
                    {/*        <boxGeometry />*/}
                    {/*        <meshBasicMaterial />*/}
                    {/*    </mesh>*/}
                    {/*</scene>*/}
                </Canvas>
            </Container>
        </>;
    }
}

export default HomePage;
