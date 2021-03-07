import React, {Suspense} from "react";
import * as THREE from "three";
import {useLoader} from "react-three-fiber";

import color from '../../assets/bladeOfGrass/Color.jpg';
import normal from '../../assets/bladeOfGrass/Normal.jpg';
import displacement from '../../assets/bladeOfGrass/Displacement.jpg';
import roughness from '../../assets/bladeOfGrass/Roughness.jpg';
import opacity from '../../assets/bladeOfGrass/Opacity.jpg';

// @ts-ignore
import model from '../../assets/bladeOfGrass/grass.dae';

import nx from '../../assets/envMap/nx.jpg';
import ny from '../../assets/envMap/ny.jpg';
import nz from '../../assets/envMap/nz.jpg';
import px from '../../assets/envMap/px.jpg';
import py from '../../assets/envMap/py.jpg';
import pz from '../../assets/envMap/pz.jpg';
import {Box, Environment, Sphere, useCubeTexture, useFBX } from "@react-three/drei";
import {Collada, ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader";
import {AdditiveBlending} from "three";


type GroundProps = {
    args: [number, number]
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number]
}

const BladeOfGrass = React.forwardRef<THREE.Mesh, GroundProps>(({
                                                                   args = [1, 1],
                                                                   position = [0, 0, 0],
                                                                   rotation = [- Math.PI / 2, 0, 0],
                                                                   scale = [1, 1, 1] }, ref) => {
    const colorTex: THREE.Texture = useLoader(THREE.TextureLoader, color);
    const normalTex: THREE.Texture = useLoader(THREE.TextureLoader, normal);
    const displacementTex: THREE.Texture = useLoader(THREE.TextureLoader, displacement);
    const roughnessTex: THREE.Texture = useLoader(THREE.TextureLoader, roughness);
    const envMap: THREE.CubeTexture = useCubeTexture([px, nx, py, ny, pz, nz], { path: '' });
    const opacityTex: THREE.Texture = useLoader(THREE.TextureLoader, opacity);

    // let fbx = useFBX(model);
    // console.warn(fbx);
    // // @ts-ignore
    // fbx.material.color = 0x00ff00;

    const grass: Collada = useLoader(ColladaLoader, model);
    // @ts-ignore
    const grasGeometry = grass.nodes.Grass.geometry;

    return <Suspense fallback={null}>
        <mesh
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0.3, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            geometry={grasGeometry}
        >
                <meshStandardMaterial attach="material"
                                      map={colorTex}
                                      normalMap={normalTex}
                                      displacementMap={displacementTex}
                                      roughnessMap={roughnessTex}
                                      roughness={0.75}
                                      metalness={0.05}
                                      alphaMap={opacityTex}
                                      envMap={envMap}
                                      emissive={new THREE.Color(0, 0.05, 0)}
                                      toneMapped={true}
                                      wireframe={false}
                                      side={THREE.DoubleSide}
                                      transparent={true}
                                      alphaTest={0.25}
                                      depthTest={true}
                                      // blending={AdditiveBlending}
                />
        </mesh>
        {/*<primitive*/}
        {/*    */}
        {/*>*/}
        {/*    <meshStandardMaterial attach="material"*/}
        {/*                          map={colorTex}*/}
        {/*                          normalMap={normalTex}*/}
        {/*                          displacementMap={displacementTex}*/}
        {/*                          roughnessMap={roughnessTex}*/}
        {/*                          roughness={0.75}*/}
        {/*                          metalness={0.05}*/}
        {/*                          alphaMap={opacityTex}*/}
        {/*                          envMap={envMap}*/}
        {/*                          emissive={new THREE.Color(0, 0.05, 0)}*/}
        {/*                          toneMapped={true}*/}
        {/*                          wireframe={false}*/}
        {/*                          side={THREE.DoubleSide}*/}
        {/*                          transparent={true}*/}
        {/*    />*/}
        {/*</primitive>*/}

        {/*<Plane*/}
        {/*    ref={ref}*/}
        {/*    name="bladeOfGrass"*/}
        {/*    args={[...args, 10, 10]}*/}
        {/*    position={position}*/}
        {/*    scale={scale}*/}
        {/*    rotation={rotation}*/}
        {/*>*/}
        {/*    <meshStandardMaterial attach="material"*/}
        {/*                          map={colorTex}*/}
        {/*                          normalMap={normalTex}*/}
        {/*                          displacementMap={displacementTex}*/}
        {/*                          roughnessMap={roughnessTex}*/}
        {/*                          roughness={0.75}*/}
        {/*                          metalness={0.05}*/}
        {/*                          alphaMap={opacityTex}*/}
        {/*                          envMap={envMap}*/}
        {/*                          emissive={new THREE.Color(0, 0.05, 0)}*/}
        {/*                          toneMapped={true}*/}
        {/*                          wireframe={false}*/}
        {/*                          side={THREE.DoubleSide}*/}
        {/*                          transparent={true}*/}
        {/*    />*/}
        {/*</Plane>*/}
    </Suspense>;
})

export default BladeOfGrass;
