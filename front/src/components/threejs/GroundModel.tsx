import React, {useMemo, useRef, useState} from "react";
import {Suspense} from "react";
import * as THREE from "three";
import {useFrame, useLoader, useThree} from "react-three-fiber";
import {Html, Plane} from "drei";
import {sides} from "./Utils/index.js";
import {BufferGeometry, Geometry} from "three";
import grid from '../../assets/grid.png';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import cube from '../../assets/cube.dae';
// @ts-ignore
import pointer from '../../assets/pointer.dae';
import {Collada, ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import {MouseEvent, PointerEvent} from "react-three-fiber/canvas";
// import { useSpring } from "react-spring";
import { a, useSpring, useSprings } from "@react-spring/three";

// const planeGeometry = new THREE.PlaneGeometry(1, 1, 2, 2);

type GroundProps = {
    args: [number, number]
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number]
}

// const DefaultProps: GroundProps = {
//     args: [1, 1],
//     position: [0, 0, 0],
//     rotation: [- Math.PI / 2, 0, 0],
//     scale: [1, 1, 1]
// }

let zmiana = 0;
// @ts-ignore
let ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d');
ctx.canvas.height = 256;
ctx.canvas.width = 256;
ctx.fillStyle = '#c4c4c4';
ctx.fillRect(0, 0, 256, 256);
ctx.fillStyle = '#11829e';
ctx.fillRect(0, 0, 128, 128);
ctx.fillStyle = '#4a860c';
ctx.fillRect(128, 128, 256, 256);

const GroundModel = ({
                         args = [1, 1],
                         position = [0, 0, 0],
                         rotation = [- Math.PI / 2, 0, 0],
                         scale = [1, 1, 1] }: GroundProps) => {
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, grid);
    // const dae = useLoader(GLTFLoader, cube);
    const model: Collada = useLoader(ColladaLoader, cube);
    // @ts-ignore
    const cubeGeom = model.nodes.Cube.geometry;

    const modelPointer: Collada = useLoader(ColladaLoader, pointer);
    // @ts-ignore
    const pointerGeom = modelPointer.nodes.Cylinder.geometry;

    const pntRef = useRef<THREE.Mesh>();

    // const pointerGeom = useMemo(() => new ColladaLoader().load(pointer), [cube])

    const canvasTex = useMemo(() => new THREE.CanvasTexture(ctx.canvas), [ctx, zmiana]);

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

    const {invalidate} = useThree();

    type Type = {
        xyz: [number, number, number],
        config: unknown
    }

    const [{xyz}, set] = useSpring(() => ({xyz: [0, 0.38, 0], config: {mass: 10}}));
    // const xyz = useSpring({
    //     from: {xyz: [0, 0, 0]},
    //     to: {xyz: [0, 1, 0]},
    //     config: {
    //
    //     },
    //     reset: true
    // });
    // console.log(xyz);
    // console.log(myPos);

    const handlePointerMove = (e: PointerEvent) => {
        if (e.uv) {
            const x = Math.floor(e.uv?.x * 256);
            const y = 256 - Math.floor(e.uv?.y * 256);
            // ctx.fillRect(x, y, 5, 5);
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#454545';
            ctx.fill();
            canvasTex.needsUpdate = true;
            invalidate();
            // zmiana++;
            // invalidate();
            // console.log(x, y);

        }
        // if (pntRef.current) {
        //     set({xyz: [e.point.x, 0.4, e.point.z]});
        // }
    }

    const [cubes, setCubes] = useState<Array<[number, number, number]>>([]);
    // const springs = useSprings(cubes.length, cubes.map(cube => ({
    //     xyz: cube,
    //     scale: [0.4, 0.4, 0.4],
    //     rotation: [0, 0, 0],
    //     color: '#99e5d8', //Math.random() > 0.5 ? '#94bf94' : '#2dbfaa',
    //     from: {
    //         xyz: [cube[0], 1, cube[2]],
    //         scale: [0.1, 0.1, 0.1],
    //         rotation: [0, Math.PI / 2, 0],
    //         color: '#ffffff'
    //     },
    //     config: {
    //         mass: 8,
    //         bounce: 0.5,
    //         velocity: [0, 0.003, 0]
    //     }})));
    const [springs, setSprings] = useSprings(cubes.length, (index) => ({
        xyz: cubes[index],
        scale: [0.4, 0.4, 0.4],
        rotation: [0, 0, 0],
        color: '#99e5d8', //Math.random() > 0.5 ? '#94bf94' : '#2dbfaa',
        from: {
            xyz: [cubes[index][0], 1, cubes[index][2]],
            scale: [0.1, 0.1, 0.1],
            rotation: [0, Math.PI / 2, 0],
            color: '#ffffff'
        },
        config: {
            mass: 8,
            bounce: 0.5,
            velocity: [0, 0.003, 0]
        }
    }));
    const spawnCube = (e: MouseEvent) => {
        setCubes(prev => [...prev, [e.point.x, 0.09, e.point.z]]);
    }
    const movePointer = (e: MouseEvent) => {
        if (pntRef.current) {
            set({xyz: [e.point.x, 0.4, e.point.z]});
            console.log(e.uv);
        }
    }
    // console.log(cubes);

    useFrame(() => {
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
        {/*{*/}
        {/*    cubes.map((cube, i) => <mesh*/}
        {/*        key={i}*/}
        {/*        geometry={cubeGeom}*/}
        {/*        position={cube}*/}
        {/*        scale={[0.4, 0.4, 0.4]}*/}
        {/*        onPointerOver={e => {*/}
        {/*            cubes[i][1] = 1;*/}
        {/*        }}*/}
        {/*        onPointerOut={e => {*/}
        {/*            cubes[i][1] = 0.2;*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        <meshLambertMaterial />*/}
        {/*    </mesh>)*/}
        {/*}*/}
        {
            // @ts-ignore
            springs.map((props, i) => <a.mesh
                    key={i}
                    geometry={cubeGeom}
                    // @ts-ignore
                    position={props.xyz}
                    // @ts-ignore
                    scale={props.scale}
                    // @ts-ignore
                    rotation={props.rotation}
                    // onPointerOver={e => {
                    //     setSprings((index) => {
                    //         if (i === index) {
                    //             return ({config: {  }, reset: true});
                    //         }
                    //
                    //         return ({});
                    //     });
                    // }}
                >
                    <a.meshLambertMaterial color={props.color} />
                </a.mesh>)
        }
        {/*<a.mesh*/}
        {/*    ref={pntRef}*/}
        {/*    geometry={pointerGeom}*/}
        {/*    //  @ts-ignore*/}
        {/*    position={xyz}*/}
        {/*    // renderOrder={1}*/}
        {/*>*/}
        {/*    <meshLambertMaterial color="red"/>*/}
        {/*</a.mesh>*/}

        <Plane
            ref={ref}
            name="ground"
            args={[...args, 10, 10]}
            position={position}
            scale={scale}
            rotation={rotation}
            onClick={movePointer}
            onDoubleClick={spawnCube}
            onPointerMove={handlePointerMove}
        >
            <meshLambertMaterial attach="material" map={canvasTex} wireframe={false} />
        </Plane>
        {ref.current && sides(ref.current.geometry as BufferGeometry, texture, {args, position, scale, rotation})}
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
