import React, {useRef, useState} from "react";
import {Suspense} from "react";
import * as THREE from "three";
import {useFrame, useLoader} from "react-three-fiber";
import grid from '../../assets/grid.png';
import {Plane} from "drei";
import {sides} from "./Utils/index.js";
import {BufferGeometry, Geometry} from "three";

// const planeGeometry = new THREE.PlaneGeometry(1, 1, 2, 2);

type GroundProps = {
    args: [number, number]
}

const GroundModel = ({args}: GroundProps) => {
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, grid);
    const ref = useRef<THREE.Mesh>();
    // const left = useRef<THREE.Mesh>();
    const [cnt, setCnt] = useState(0);

    setTimeout(() => setCnt(cnt+1), 1000);

    // let test = new Geometry();
    // test.vertices.push(new THREE.Vector3(0, 1, 0));
    // test.vertices.push(new THREE.Vector3(1, 0, 0));
    // test.vertices.push(new THREE.Vector3(0, 0, 0));
    // console.log(test);
    let test: number[] = [];
    // let [elem, setElem] = useState(new THREE.Mesh());

    useFrame(() => {

        // console.log(ref);
        if (ref.current) {
            // console.log(ref.current);
            // setElem(sides(ref.current.geometry as BufferGeometry));
        }

        // if (left.current) {
        //     const geom = left.current.geometry as BufferGeometry;
        //     for (let i = 0; i < geom.attributes.position.array.length; i++) {
        //         const p = geom.attributes.position.array;
        //     }
        //     geom.attributes.position.needsUpdate = true;
        //     // console.log();
        // }
    });

    return <Suspense fallback={null}>
        <Plane
            ref={ref}
            name="ground"
            args={[...args, 10, 5]}
            position={[0, 0.5, 0.2]}
            scale={[0.5, 0.5, 0.5]}
            rotation={[- Math.PI / 2, 0, 0]}
        >
            <meshLambertMaterial attach="material" map={texture} wireframe={false} />
        </Plane>
        {ref.current && sides(ref.current.geometry as BufferGeometry, texture)}
        {/*<mesh>*/}
        {/*    /!*<geometry vertices={test}/>*!/*/}
        {/*    <bufferGeometry attach="geometry">*/}
        {/*        <bufferAttribute*/}
        {/*            name="position"*/}
        {/*            attachObject={['attributes', 'position']}*/}
        {/*            array={new Float32Array([*/}
        {/*                0, 0, 0,*/}
        {/*                1, 0, 0,*/}
        {/*                0, 1, 0,*/}
        {/*                1, 0, 0,*/}
        {/*                1, 1, 0,*/}
        {/*                0, 1, 0*/}
        {/*            ])}*/}
        {/*            itemSize={3}*/}
        {/*            count={6}*/}
        {/*            needsUpdate={true} />*/}
        {/*    </bufferGeometry>*/}
        {/*    <meshBasicMaterial attach="material" color="red" />*/}
        {/*</mesh>*/}
        {/*<Plane*/}
        {/*    name="ground.bottom"*/}
        {/*    args={[...args, 1, 1]}*/}
        {/*    position={[0, 0.5, -0.5]}*/}
        {/*    rotation={[Math.PI, 0 , 0]}*/}
        {/*    scale={[0.5, 0.5, 0.5]}*/}
        {/*>*/}
        {/*    <meshLambertMaterial attach="material" color="black" wireframe />*/}
        {/*</Plane>*/}
        {/*<Plane*/}
        {/*    ref={left}*/}
        {/*    name="ground.left"*/}
        {/*    args={[1, 5, 1, 5]}*/}
        {/*    rotation={[0, - Math.PI / 2, 0]}*/}
        {/*    position={[-2.5, 0.5, -0.25]}*/}
        {/*    scale={[0.5, 0.5, 1]}*/}
        {/*>*/}
        {/*    <meshLambertMaterial attach="material" color="red" wireframe />*/}
        {/*</Plane>*/}
        {/*<Plane*/}
        {/*    name="ground.top"*/}
        {/*    args={[1, 10, 1, 10]}*/}
        {/*    rotation={[- Math.PI / 2, 0, Math.PI / 2]}*/}
        {/*    position={[0, 1.75, -0.25]}*/}
        {/*    scale={[0.5, 0.5, 1]}*/}
        {/*>*/}
        {/*    <meshLambertMaterial attach="material" color="green" wireframe />*/}
        {/*</Plane>*/}
    </Suspense>;
}

export default GroundModel;
