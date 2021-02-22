import React, {useState} from "react";
import {Suspense} from "react";
import {useLoader, useThree} from "react-three-fiber";
// @ts-ignore
import cube from '../../assets/cube.dae';
import {Collada, ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import { a, useSprings } from "@react-spring/three";
import * as THREE from 'three';


type CubesProps = {
    spawnPlane: THREE.Mesh,
    spawnCube?: () => void
}

const Cubes = ({ spawnPlane }: CubesProps) => {
    const model: Collada = useLoader(ColladaLoader, cube);
    // @ts-ignore
    const cubeGeom = model.nodes.Cube.geometry;

    const [cubes, setCubes] = useState<Array<[number, number, number]>>([]);
    const [paintingEnabled, setPainting] = useState<boolean>(false);
    const [springs, setSprings] = useSprings(cubes.length, (index) => ({
        xyz: cubes[index],
        scale: [0.4, 0.4, 0.4],
        rotation: [0, 0, 0],
        color: '#99e5d8',
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

    return <Suspense fallback={null}>
        {
            springs.map((props, i) => <a.mesh
                    key={i}
                    geometry={cubeGeom}
                    // @ts-ignore
                    position={props.xyz}
                    // @ts-ignore
                    scale={props.scale}
                    // @ts-ignore
                    rotation={props.rotation}
                >
                    <a.meshLambertMaterial color={props.color} />
                </a.mesh>)
        }
    </Suspense>;
}

export default Cubes;
