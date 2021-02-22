import React, {useMemo, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "react-three-fiber";
import * as THREE from 'three'
import {MapControls, OrbitControls} from "@react-three/drei";
import {CircleGeometry, Geometry, Mesh, OrthographicCamera, PlaneBufferGeometry} from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import compass from "../../assets/compass.svg";
import {Line, OrthographicCamera as DreiCamera } from 'drei';

const startPoint = [1, 0];
let moveable = false;
const points: Array<[number, number, number]> = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0]
]

function TemplateCanvas() {
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0.0);
    const geom = React.useRef<PlaneBufferGeometry>();
    const refMesh = React.useRef<Mesh>();

    const convert = (value: string, previous: number) => {
        if (value === "") {
            return 1;
        }
        const newValue = parseInt(value.split('.').join(''));
        return newValue ? newValue : previous;
    }

    const ZoomUpdater = () => {
        const { camera } = useThree();

        let w = width;
        let h = height;

        const geometry = geom.current;
        if (geometry) {
            geometry.computeBoundingBox();
            if (geometry.boundingBox && geometry.boundingBox.max) {
                console.log(geometry.boundingBox.max.x * 2, geometry.boundingBox.max.y * 2);
                // w = geometry.boundingBox.max.x * 2;
                // h = geometry.boundingBox.max.y * 2;
            }
        }
        // console.log(w, width, h, height);

        const widthFact = 1000 / w;
        const heightFact = 500 / h;

        // camera.rotateZ(45);
        camera.zoom = widthFact > heightFact ? heightFact : widthFact;
        camera.updateProjectionMatrix();

        return <></>;
    }

    const BorderPainter = () => {
        // let test: [number, number, number][];
        // type PointsType = Array<[number, number, number]>;
        // const [points, setPoints] = useState<PointsType>([
        //     [0, 0, 0],
        //     [1, 0, 0],
        //     [0, 1, 0]
        // ]);
        // type PointsType = Array<[number, number, number]>;
        // const [points, setPoints] = useMemo<PointsType>([
        //     [0, 0, 0],
        //     [1, 0, 0],
        //     [0, 1, 0]
        // ]);

        const [cnt, setCnt] = useState(0);

        const geom = useRef<Geometry>();
        const invalidate = useThree().invalidate;

        return <>
            {
                points.map((point, i, points) => {
                    if (i === 0) {
                        return null;
                    } else {
                        return <Line key={i} points={[points[i-1], point]} />
                    }
                })
            }
            {/*<Line points={points} color="green" position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} linewidth={2} />*/}
            {/*<line>*/}
            {/*    /!* @ts-ignore *!/*/}
            {/*    /!*<bufferGeometry setFromPoints={points.map(v => new THREE.Vector3(...v))} />*!/*/}
            {/*    <geometry*/}
            {/*        ref={geom}*/}
            {/*        attach="geometry"*/}
            {/*        vertices={points.map(v => new THREE.Vector3(...v))}*/}
            {/*        onUpdate={self => {*/}
            {/*            console.log('update', self);*/}
            {/*            return (self.verticesNeedUpdate = true);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    <lineBasicMaterial attach="material" color="green" linewidth={3} />*/}
            {/*</line>*/}
            <mesh onClick={(e) => {
                const {x, y, z} = e.intersections[0].point;
                const closest = points.filter(point =>
                    new THREE.Vector3(...point).distanceTo(e.intersections[0].point) < 0.1);

                // points.forEach(p => console.log(new THREE.Vector3(...p).distanceTo(e.intersections[0].point)));

                if (!closest.length) {
                    points.push([x, y, z]);
                    setCnt(cnt+1);
                }
                // if (geom.current) {
                //     geom.current.vertices.push(e.intersections[0].point);
                //     geom.current.verticesNeedUpdate = true;
                // }
                // setPoints(points.concat([[x, y, z]]));
            }}>
                <planeBufferGeometry args={[100, 100, 1, 1]} />
                <meshBasicMaterial visible={false}/>
            </mesh>
            {
                points.map((point, i) => (
                    <mesh key={i} position={point}
                          onPointerOver={(e) => {
                              // e.object.scale.setScalar(1.5);
                              setCnt(cnt+1);
                          }}
                          onPointerOut={(e) => e.object.scale.setScalar(1)}
                          onPointerMove={(e) => {
                              point[0] = e.point.x;
                              point[1] = e.point.y;
                          }}
                          onUpdate={self => {
                              self.position.set(...points[i]);
                              // console.log('self', self);
                          }}
                    >
                        <circleGeometry args={[0.1, 10]}
                                        // onUpdate={self => (self.verticesNeedUpdate = true)}
                        />
                        <meshBasicMaterial />
                    </mesh>
                ))
            }
        </>;
    }

    return <div>
        <input type="number" value={width} step="1" onChange={(e) =>
            setWidth(convert(e.target.value, width))} />
        <input type="number" value={height} step="1" onChange={(e) =>
            setHeight(convert(e.target.value, height))} />
        <input type="number" value={zoom} step="1" onChange={(e) =>
            setZoom(convert(e.target.value, zoom))} />
        <br/>
        <img src={compass} style={{transform: `scale(1.0) rotate(${-rotation}rad)`, width: '64px', height: '64px'}}/>
        <Canvas
            id="canvas"
            pixelRatio={window.devicePixelRatio}
            // invalidateFrameloop={true}
            // orthographic
            // camera={{
            //     zoom: calcZoom(width, height)
            // }}
            // onClick={(e) => {
            //     console.log(e);
            // }}
        >
            <DreiCamera makeDefault position={[0, 0, 1]}/>
            <ZoomUpdater />
            <BorderPainter />
            {/*<OrbitControls enableZoom={false} enableRotate={false} screenSpacePanning/>*/}

            <mesh name="ground" ref={refMesh} position={[0, 0, 0]} onPointerMove={(e) => {
                if (!moveable)
                    return;

                // console.log(e.object.rotation);
                // e.object.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.1);
                const currPoint = [e.intersections[0].point.x, e.intersections[0].point.y];
                let a = (new THREE.Vector3(startPoint[0], startPoint[1], 0).angleTo(new THREE.Vector3(currPoint[0], currPoint[1], 0)));
                // const currVec = new THREE.Vector3(currPoint[0], currPoint[1], 0).normalize();
                // const a = 0;
                a *= currPoint[1] > startPoint[1] ? 1 : -1;
                e.object.setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), a - Math.PI / 2);

                setRotation(refMesh.current ? refMesh.current.rotation.z : 0);
            }}
            // onClick={(e) => {
            //     // console.log(e.ray);
            //     // startPoint[0] = e.intersections[0].point.x + 1;
            //     // startPoint[1] = e.intersections[0].point.y - 1;
            //     // console.log(startPoint);
            // }}
            onPointerUp={() => {
                // startPoint[0] = 0; startPoint[1] = 0;
                moveable = false;
            }}
            onPointerDown={() => {
                moveable = true;
            }}
            >
                <planeBufferGeometry args={[width, height, 1 + width / 10, 1 + height / 10]} ref={geom} />

                <meshBasicMaterial color="black" wireframe />
            </mesh>

        </Canvas>
    </div>
}

export default TemplateCanvas;
