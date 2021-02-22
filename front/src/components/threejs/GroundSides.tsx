import React, {Suspense} from "react";
import {sides} from "./Utils";
import {BufferGeometry} from "three";
import * as THREE from "three";
import {useLoader} from "react-three-fiber";
import grid from "../../assets/grid.png";

type Props = {
    plane: THREE.Mesh,
    args: [number, number],
    position: [number, number, number],
    scale: [number, number, number],
    rotation: [number, number, number]
}

const GroundSides = ({plane, args, position, scale, rotation}: Props) => {
    const texture: THREE.Texture = useLoader(THREE.TextureLoader, grid);
    return <Suspense fallback={null}>
        {sides(plane.geometry as BufferGeometry, texture, {
            args,
            position,
            scale,
            rotation
        })}
    </Suspense>;
}

export default GroundSides;
