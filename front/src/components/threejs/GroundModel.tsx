import React, {useMemo, useRef, useState} from "react";
import {Suspense} from "react";
import * as THREE from "three";
import {useLoader, useThree} from "react-three-fiber";
import {Plane} from "drei";
import {BufferGeometry} from "three";
import grid from '../../assets/grid.png';
// @ts-ignore
import cube from '../../assets/cube.dae';
// @ts-ignore
import pointer from '../../assets/pointer.dae';
import {Collada, ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import {MouseEvent, PointerEvent} from "react-three-fiber/canvas";
import { a, useSpring, useSprings } from "@react-spring/three";
import {useSelector} from "react-redux";


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
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, grid);
    const model: Collada = useLoader(ColladaLoader, cube);
    // @ts-ignore
    const cubeGeom = model.nodes.Cube.geometry;

    const modelPointer: Collada = useLoader(ColladaLoader, pointer);
    // @ts-ignore
    const pointerGeom = modelPointer.nodes.Cylinder.geometry;

    const pntRef = useRef<THREE.Mesh>();

    const canvasTex = useMemo(() => new THREE.CanvasTexture(ctx.canvas), [ctx]);

    // const ref = useRef<THREE.Mesh>();

    const brush = useSelector((state: AppRootState) => state.canvas.brush);

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
        >
            <meshLambertMaterial attach="material" map={canvasTex} wireframe={false} />
        </Plane>
        {/*{ref.current && sides(ref.current.geometry as BufferGeometry, texture, {args, position, scale, rotation})}*/}
    </Suspense>;
})

export default GroundModel;
