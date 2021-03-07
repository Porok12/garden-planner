import React, {useMemo, useRef, useState} from "react";
import {Suspense} from "react";
import * as THREE from "three";
import {useLoader, useThree} from "react-three-fiber";
import {Plane} from "drei";
import grid from '../../assets/grid.png';
// @ts-ignore
import cube from '../../assets/cube.dae';
// @ts-ignore
import pointer from '../../assets/pointer.dae';
import {Collada, ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import {MouseEvent, PointerEvent} from "react-three-fiber/canvas";
import { a, useSpring, useSprings } from "@react-spring/three";
import {useSelector} from "react-redux";
import { RootState } from "../../store";

import color from '../../assets/grass/Color.jpg';
import normal from '../../assets/grass/Normal.jpg';
import displacement from '../../assets/grass/Displacement.jpg';
import roughness from '../../assets/grass/Roughness.jpg';
import ambientOcclusion from '../../assets/grass/AmbientOcclusion.jpg';

import nx from '../../assets/envMap/nx.jpg';
import ny from '../../assets/envMap/ny.jpg';
import nz from '../../assets/envMap/nz.jpg';
import px from '../../assets/envMap/px.jpg';
import py from '../../assets/envMap/py.jpg';
import pz from '../../assets/envMap/pz.jpg';
import {Box, Environment, Sphere, useCubeTexture } from "@react-three/drei";
import BladeOfGrass from "./BladeOfGrass";

type GroundProps = {
    args: [number, number]
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number]
}

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

const GroundModel = React.forwardRef<THREE.Mesh, GroundProps>(({
                         args = [1, 1],
                         position = [0, 0, 0],
                         rotation = [- Math.PI / 2, 0, 0],
                         scale = [1, 1, 1] }, ref) => {
    const colorTex: THREE.Texture = useLoader(THREE.TextureLoader, color);
    const normalTex: THREE.Texture = useLoader(THREE.TextureLoader, normal);
    const displacementTex: THREE.Texture = useLoader(THREE.TextureLoader, displacement);
    const roughnessTex: THREE.Texture = useLoader(THREE.TextureLoader, roughness);
    const ambientOcclusionTex: THREE.Texture = useLoader(THREE.TextureLoader, ambientOcclusion);
    const envMap: THREE.CubeTexture = useCubeTexture([px, nx, py, ny, pz, nz], { path: '' });
    const model: Collada = useLoader(ColladaLoader, cube);
    // @ts-ignore
    const cubeGeom = model.nodes.Cube.geometry;

    const modelPointer: Collada = useLoader(ColladaLoader, pointer);
    // @ts-ignore
    const pointerGeom = modelPointer.nodes.Cylinder.geometry;

    const pntRef = useRef<THREE.Mesh>();

    const canvasTex = useMemo(() => new THREE.CanvasTexture(ctx.canvas), [ctx]);

    // const ref = useRef<THREE.Mesh>();

    const brush = useSelector((state: RootState) => state.canvas.brush);

    const {invalidate} = useThree();
    const [{xyz}, set] = useSpring(() => ({xyz: [0, 0.38, 0], config: {mass: 10}}));
    const handlePointerMove = (e: PointerEvent) => {
        if (paintingEnabled && brush.enabled) {
            if (e.uv) {
                const x = Math.floor(e.uv?.x * 256);
                const y = 256 - Math.floor(e.uv?.y * 256);

                const [r, g, b] = brush.color;
                const a = brush.opacity;
                const s = brush.size;

                ctx.beginPath();
                ctx.arc(x, y, s, 0, 2 * Math.PI, false);
                // ctx.fillStyle = '#454545';
                const grd = ctx.createRadialGradient(x, y, 0, x, y, s);
                grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a}`); //#454545
                grd.addColorStop(1, "transparent");
                ctx.fillStyle = grd;
                ctx.fill();
                canvasTex.needsUpdate = true;
                invalidate();
            }
        }
    }

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

    const spawnCube = (e: MouseEvent) => {
        setCubes(prev => [...prev, [e.point.x, 0.09, e.point.z]]);
    }
    const movePointer = (e: MouseEvent) => {
        if (pntRef.current) {
            set({xyz: [e.point.x, 0.4, e.point.z]});
        }
    }
    const handlePointerDown = (e: PointerEvent) => {
        if (e.button === 0) {
            setPainting(true);
        }
    }
    const handlePointerUp = (e: PointerEvent) => {
        setPainting(false);
    }

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
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOut={handlePointerUp}
            receiveShadow
        >
            <meshStandardMaterial attach="material"
                                  map={colorTex}
                                  normalMap={normalTex}
                                  // displacementMap={displacementTex}
                                  roughnessMap={roughnessTex}
                                  roughness={0.75}
                                  metalness={0.05}
                                  aoMap={ambientOcclusionTex}
                                  envMap={envMap}
                                  emissive={new THREE.Color(0, 0.05, 0)}
                                  toneMapped={true}
                                  wireframe={false} />
        </Plane>
        <Sphere args={[1, 12, 12]} scale={[0.5, 0.5, 0.5]} position={[0, 1, -2]} castShadow>
            <meshStandardMaterial
                attach="material"
                metalness={1}
                roughness={0.25}
                envMap={envMap}
            />
        </Sphere>
        <BladeOfGrass args={[12, 12]} rotation={[0, 0, Math.PI / 2]} scale={[0.1, 0.1, 0.1]} position={[0, 1, 0]}/>
        {/*<Environment*/}
        {/*    background={false} // Whether to affect scene.background*/}
        {/*    files={[px, nx, py, ny, pz, nz]} // Array of cubemap files OR single equirectangular file*/}
        {/*    path={''} // Path to the above file(s)*/}
        {/*    // preset={null} // Preset string (overrides files and path)*/}
        {/*    // scene={undefined} // adds the ability to pass a custom THREE.Scene*/}
        {/*/>*/}
        {/*{ref.current && sides(ref.current.geometry as BufferGeometry, texture, {args, position, scale, rotation})}*/}
    </Suspense>;
})

export default GroundModel;
