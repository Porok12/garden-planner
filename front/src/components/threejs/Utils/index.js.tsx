import React, {Suspense} from "react";
import * as THREE from "three";
import {BufferGeometry, Geometry} from "three";
// import cube from "../../../assets/cube.dae";

type Args = {

}

const make = (array: ArrayLike<number>, index: number, prev: number, f: number = 2) => {
    return [
        [
            array[prev+0],
            array[prev+1],
            array[prev+2]
        ], [
            array[index+0],
            array[index+1],
            array[index+2]
        ], [
            array[prev+0],
            array[prev+1],
            array[prev+2] - f
        ],
        [
            array[index+0],
            array[index+1],
            array[index+2] - f
        ]
    ];
}

const make2 = (array: ArrayLike<number>, index: number, prev: number, f: number = 1) => {
    return [
        [
            0,
            1
        ], [
            1,
            1
        ], [
            0,
            0
        ],
        [
            1,
            0
        ]
    ];
}

type ParamsType = { args: [number, number]; rotation: [number, number, number] | undefined; scale: [number, number, number] | undefined; position: [number, number, number] | undefined }

const sides = ({attributes}: BufferGeometry, texture: THREE.Texture, params: ParamsType) => {
    const {count, itemSize, array} = attributes.position;
    
    let max = [Number.MIN_VALUE, Number.MIN_VALUE];
    let min = [Number.MAX_VALUE, Number.MAX_VALUE];
    for (let i = 0; i < count * itemSize; i += itemSize) {
        max[0] = max[0] > array[i] ? max[0] : array[i];
        max[1] = max[1] > array[i+1] ? max[1] : array[i+1];

        min[0] = min[0] < array[i] ? min[0] : array[i];
        min[1] = min[1] < array[i+1] ? min[1] : array[i+1];
    }

    let g1, g2, g3, g4: number[];
    g1 = []; g2 = []; g3 = []; g4 = [];
    const precision = 0.001;

    for (let i = 0; i < count * itemSize; i += itemSize) {
        if (Math.abs(array[i] - max[0]) <= precision)
            g1.push(i);

        if (Math.abs(array[i+1] - max[1]) <= precision)
            g2.push(i);

        if (Math.abs(array[i] - min[0]) <= precision)
            g3.push(i);

        if (Math.abs(array[i+1] - min[1]) <= precision)
            g4.push(i);
    }

    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];

    for (let i = 1; i < g1.length; i++) {
        const [v1, v2, v3, v4] = make(array, g1[i], g1[i-1]);
        vertices.push(...v1, ...v2, ...v3, ...v3, ...v2, ...v4);
    }

    for (let i = 1; i < g2.length; i++) {
        const [v1, v2, v3, v4] = make(array, g2[i], g2[i-1]);
        vertices.push(...v1, ...v2, ...v3, ...v3, ...v2, ...v4);
    }

    for (let i = 1; i < g3.length; i++) {
        const [v1, v2, v3, v4] = make(array, g3[i], g3[i-1]);
        vertices.push(...v1, ...v3, ...v2, ...v3, ...v4, ...v2);
    }

    for (let i = 1; i < g4.length; i++) {
        const [v1, v2, v3, v4] = make(array, g4[i], g4[i-1]);
        vertices.push(...v1,...v3, ...v2, ...v3, ...v4, ...v2);
    }

    for (let i = 1; i < g1.length; i++) {
        const n = [1, 0, 0];
        normals.push(...n, ...n, ...n, ...n, ...n, ...n);
    }

    for (let i = 1; i < g2.length; i++) {
        const n = [0, 1, 0];
        normals.push(...n, ...n, ...n, ...n, ...n, ...n);
    }

    for (let i = 1; i < g3.length; i++) {
        const n = [-1, 0, 0];
        normals.push(...n, ...n, ...n, ...n, ...n, ...n);
    }

    for (let i = 1; i < g4.length; i++) {
        const n = [0, -1, 0];
        normals.push(...n, ...n, ...n, ...n, ...n, ...n);
    }

    for (let i = 1; i < g1.length; i++) {
        const [v1, v2, v3, v4] = make2(array, g1[i], g1[i - 1]);
        uvs.push(...v1, ...v2, ...v3, ...v3, ...v2, ...v4);
    }

    for (let i = 1; i < g2.length; i++) {
        const [v1, v2, v3, v4] = make2(array, g2[i], g2[i - 1]);
        uvs.push(...v1, ...v2, ...v3, ...v3, ...v2, ...v4);
    }

    for (let i = 1; i < g3.length; i++) {
        const [v1, v2, v3, v4] = make2(array, g3[i], g3[i-1]);
        uvs.push(...v1, ...v3, ...v2, ...v3, ...v4, ...v2);
    }

    for (let i = 1; i < g4.length; i++) {
        const [v1, v2, v3, v4] = make2(array, g4[i], g4[i-1]);
        uvs.push(...v1,...v3, ...v2, ...v3, ...v4, ...v2);
    }

    return <mesh
        position={params.position}
        scale={params.scale}
        rotation={params.rotation}
    >
        <bufferGeometry attach="geometry">
            <bufferAttribute
                name="position"
                attachObject={['attributes', 'position']}
                array={new Float32Array(vertices)}
                itemSize={3}
                count={vertices.length / 3}
                needsUpdate={true} />
            <bufferAttribute
                name="normal"
                attachObject={['attributes', 'normal']}
                array={new Float32Array(normals)}
                itemSize={3}
                count={normals.length / 3}
                needsUpdate={true} />
            <bufferAttribute
                name="uv"
                attachObject={['attributes', 'uv']}
                array={new Float32Array(uvs)}
                itemSize={2}
                count={uvs.length / 2}
                needsUpdate={true} />
        </bufferGeometry>
        <meshLambertMaterial attach="material" map={texture} color="white" wireframe={false} />
    </mesh>
}

export {sides}
