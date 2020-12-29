import MySky from "./MySky";
import Camera from "./Camera";
import CameraControls from "./CameraControls";
import Ground from "./Ground";
import {Scene, SpriteMaterial, Vector2, WebGLRenderTarget} from "three";
import {Html} from "@react-three/drei";
import {Button, ButtonGroup} from "react-bootstrap";
import {Canvas} from "react-three-fiber";
import React, {createRef, useRef, useState} from "react";
import MySprite from "./MySprite";

const renderTarget = new WebGLRenderTarget(800, 800);
const spriteMaterial = new SpriteMaterial({map: renderTarget.texture});

function MainCanvas() {
    const testScene = useRef<Scene>();
    const sceneRef = useRef<Scene>();

    const [wireframe, setWireframe] = useState(false);
    const [sky, setSky] = useState(true);

    return <Canvas id="canvas" invalidateFrameloop={true}>
        <scene ref={sceneRef}>
            {!sky ? null : <MySky />}
            <Camera position={[0, 0, 3]}/>
            <CameraControls />
            <ambientLight color={'#ffffff'} intensity={0.2}/>
            <pointLight color={'#ffffff'} position={[2, 2, 2]} intensity={2.0}/>
            <Ground testScene={testScene} wireframe={wireframe} sceneRef={sceneRef}/>
            <sprite name="sprite" material={spriteMaterial} center={new Vector2(-1, -.1)} scale={[1.3, 1.3, 1]} />
        </scene>
        <scene ref={testScene}>
            <MySprite
                scene={testScene}
                sceneRef={sceneRef}
                target={renderTarget}/>
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
                            setWireframe(!wireframe)
                        }
                    }>wiremode</Button>
                    <Button variant="primary" onClick={() => {
                        setSky(!sky);
                    }}>SKY</Button>
                    <Button variant="primary">3</Button>
                </ButtonGroup>
            </div>
        </Html>
    </Canvas>;
}

export default MainCanvas;
