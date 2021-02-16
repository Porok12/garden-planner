import MySky from "./MySky";
import Camera from "./Camera";
import CameraControls from "./CameraControls";
import GroundModel from "./GroundModel";
import {Scene, Sprite, Vector2, WebGLRenderTarget} from "three";
import * as THREE from "three";
import {Html} from "@react-three/drei";
import {Button, ButtonGroup} from "react-bootstrap";
import {Canvas} from "react-three-fiber";
import React, {Suspense, useRef, useState} from "react";
import MySprite from "./MySprite";
import {ReactReduxContext, Provider, useSelector, shallowEqual} from "react-redux";
import Compass from "./Compass";
import Cubes from "./Cubes";
import GroundSides from "./GroundSides";

const renderTarget = new WebGLRenderTarget(800, 800);

function MainCanvas() {
    const testScene = useRef<Scene>();
    const sceneRef = useRef<Scene>();
    const hudScene = useRef<Scene>();
    const spriteRef = useRef<Sprite>();
    const gRef = useRef<THREE.Mesh>(null);

    const sky = useSelector((state: AppRootState) => state.canvas.sky.enabled, shallowEqual);

    return <>
        <ReactReduxContext.Consumer>
            {({store}) => (
                <Canvas id="canvas" invalidateFrameloop={true}
                        onDrop={e => console.log(e)}
                        onDragOver={e => {
                            e.preventDefault();
                            return false;
                        }}
                >
                    <Provider store={store}>
                        <scene ref={sceneRef}>
                            {!sky ? null : <MySky />}
                            <Camera position={[0, 0, 3]}/>
                            <CameraControls />
                            <ambientLight color={'#ffffff'} intensity={0.2}/>
                            <pointLight color={'#ffffff'} position={[2, 2, 2]} intensity={2.0}/>
                            <Suspense fallback={null}>
                                <GroundModel ref={gRef} args={[10, 10]} scale={[0.5, 0.5, 0.5]} position={[0, 0, -2]} />
                                {
                                    gRef.current && <GroundSides plane={gRef.current} args={[10, 10]} scale={[0.5, 0.5, 0.5]}
                                                                 position={[0, 0, -2]} rotation={[- Math.PI / 2, 0, 0]} />
                                }
                            </Suspense>
                            {
                                gRef.current && <Cubes spawnPlane={gRef.current} />
                            }
                        </scene>


                        <scene ref={hudScene}>
                            <sprite name="sprite"
                                    ref={spriteRef}
                                    center={new Vector2(-1.4, -0.2)}
                                    scale={[1.1, 1.1, 1]}
                                    position={[0, 0, 0]}
                            >
                                <spriteMaterial map={renderTarget.texture}/>
                            </sprite>
                            <Suspense fallback={null}>
                                <Compass />
                            </Suspense>
                        </scene>
                        <scene ref={testScene}>
                            <MySprite
                                scene={testScene}
                                sceneRef={sceneRef}
                                target={renderTarget}
                                sprite={spriteRef}
                                hud={hudScene}
                            />
                        </scene>
                    </Provider>
                </Canvas>
            )}
        </ReactReduxContext.Consumer>
    </>;
}

export default MainCanvas;
