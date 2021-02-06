import {Canvas, extend, useFrame, useThree, useUpdate} from "react-three-fiber";
import {
    Intersection,
    PlaneHelper,
    Raycaster,
    Mesh,
    Vector3,
    Line,
    LineDashedMaterial,
    Geometry,
    BufferGeometry, Vector2, CircleBufferGeometry
} from "three";
import {useSpring} from "@react-spring/core";
import {a} from "@react-spring/three";
import React, {useRef, useState} from "react";
import {Html, OrthographicCamera} from "@react-three/drei";
import {MapControls, OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Button} from "react-bootstrap";
import {config, useTransition} from "react-spring";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


extend({ OrbitControls });
extend({ MapControls });

type SecCanvasProps = {

}

function CameraControls() {
    const { camera, gl: { domElement } } = useThree();

    // @ts-ignore
    return <orbitControls
        args={[camera, domElement]}
        enablePan={false}
        enableRotate={false}
        enableZoom={true}
    />;
}

function RaycasterCmp() {
    const myRaycaster = new Raycaster();

    useFrame(({mouse, camera, scene}) => {
        myRaycaster.setFromCamera(mouse, camera);

        const objects = myRaycaster.intersectObjects(
            scene.children.filter(ch => ch.type === 'Mesh')
        );

        if (objects.length) {
            // console.log(objects.length);

            // objects[0].object.position.set(
            //     mouse.x,
            //     mouse.y,
            //     0
            // )

            // setAnimatedProps({xy: [1, 1]});
            // console.log(animatedProps);

            // objects[0].object.position.set(0, 0, 0)
        }
    });

    return <></>;
}

function SecCanvas(params: SecCanvasProps) {
    // const raycast = (raycaster: Raycaster, intersects: Intersection[]) => {
    //     if (intersects.length) {
    //         console.log(raycaster);
    //     }
    // };
    // raycast={raycast}

    const lineRef = useRef<any>();
    const buffRef = useRef<any>();

    const [grid, setGrid] = useState<boolean>(true);
    const [points, setPoint] = useState<Array<Vector3>>([new Vector3(0, 0, 0), new Vector3(0, 1, 0)]);

    // const geometry = new Geometry();
    // for (let i = 0; i < points.length; i++) {
    //     geometry.vertices.push(points[i]);
    // }
    // const line = new Line(geometry, new LineDashedMaterial({
    //     color: 0x0000ff,
    //     linewidth: 3,
    //     scale: .1,
    //     dashSize: .3,
    //     gapSize: .1
    // }));
    // line.computeLineDistances();

    const meshRef = useRef<Mesh>();

    const [ props, set ] = useSpring(() => ({
        scale: [1, 1, 1],
        from: [0.1, 0.1, 0.1],
        config: {mass: 10, tension: 400}
    }));

    const Buffer = () => {
        const geoRef: any = useUpdate(geometry => {
            // @ts-ignore
            geometry.setFromPoints(points);
        }, []);
        console.log('geoRef', geoRef.current);

        return <line>
            <bufferGeometry ref={geoRef} />
            <lineBasicMaterial linewidth={1} color={'#44aa00'} />
        </line>;
    };


    // const ref = useUpdate(
    //     geometry => {
    //         geometry.addAttribute('position', getVertices(x, y, z))
    //         geometry.attributes.position.needsUpdate = true
    //     },
    //     [x, y, z], // execute only if these properties change
    // )

    return <Canvas orthographic={true} camera={{
        // position: [0, 0, 0],
        // left: -10,
        // right: 10,
        // top: 10,
        // bottom: -10,
        zoom: 100
    }}>
        {/*<orthographicCamera />*/}
        {/* @ts-ignore */}
        <a.mesh ref={meshRef}
                // onPointerOver={() => set({scale: [0.5, 0.5, 0.5]})}
                // onPointerOut={() => set({scale: [1.0, 1.0, 1.0]})}
                onClick={(e) => console.log(e.object)}
        >
            <circleGeometry args={[0.2, 16]} />
            <meshBasicMaterial color={'#000'}/>
        </a.mesh>

        <Buffer />

        {/*<line ref={lineRef}>*/}
        {/*    /!* @ts-ignore */ /* setFromPoints={points} *!/*/}
        {/*    <geometry*/}
        {/*        vertices={points}*/}
        {/*        // vertices={[new Vector3(0, 0, 0), new Vector3(0, 1, 0)]}*/}
        {/*        onUpdate={self => (self.verticesNeedUpdate = true)}*/}
        {/*    />*/}
        {/*    /!*<circleBufferGeometry />*!/*/}
        {/*    /!*color={'#0000ff'} linewidth={3} scale={.1} dashSize={.3} gapSize={.1}*!/*/}
        {/*    <lineDashedMaterial />*/}
        {/*</line>*/}

        {points.map(p => <mesh position={p}>
            <circleGeometry args={[0.1, 8]} />
            <meshBasicMaterial color="#aaff99"/>
        </mesh>)}

        <mesh position={[0, 0, -2]}
            onClick={(e) => {
                console.log(e.point);
                if (meshRef.current) {
                    meshRef.current.position.setX(e.point.x)
                    meshRef.current.position.setY(e.point.y)

                    const pts = points.map((i: any) => i);
                    pts.push(new Vector3(e.point.x, e.point.y, 0));
                    setPoint(pts);

                    // console.log(lineRef.current);
                    // if (lineRef.current) {
                    //     lineRef.current.geometry.vertices.push(new Vector3(e.point.x, e.point.y, 0));
                    //     lineRef.current.geometry.verticesNeedUpdate = true;
                    //     lineRef.current.geometry.lineDistancesNeedUpdate = true;
                    //     lineRef.current.geometry.attributes.position.needsUpdate = true;
                    // }
                }
            }}
        >
            <planeGeometry args={[6, 6]} />
            <meshBasicMaterial color="#ffffff"/>
            {/*<meshNormalMaterial opacity={1.0}/>*/}
        </mesh>
        <gridHelper args={[6, 8, '#000']}
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, 0, -1]}
                    visible={grid}
        />
        <RaycasterCmp />
        <CameraControls />
        <Html position={[4, -1, 0]}>
            <div>
                <Button onClick={() => setGrid(!grid)}>Grid</Button>
            </div>
            <div style={{
                boxShadow: '0 0 4px black',
                // position: "absolute",
                // top: 0,
                // right: 0,
            }}>
                <i className="fa fa-caret-up fa-2x"></i>
                <i className="fa fa-caret-down fa-2x"></i>
                <i className="fa fa-caret-left fa-2x"></i>
                <i className="fa fa-caret-right fa-2x"></i>
                <div>
                    <FontAwesomeIcon icon={faCoffee} size="3x"/>
                </div>
            </div>
        </Html>
    </Canvas>
}

export default SecCanvas;
