import React, { useRef } from "react";
import { MeshProps, useFrame, useLoader, useThree } from "react-three-fiber";
import {
    Geometry,
    Mesh,
    Vector3,
    Face3,
    PlaneGeometry,
    Raycaster,
    Vector2,
    PerspectiveCamera,
    OrthographicCamera,
    Scene,
    TextureLoader
} from "three";
import * as THREE from 'three'
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier.js';
import grid from '../../assets/grid.png';
import { Plane } from "drei";
import GroundModel from "./GroundModel";


let geometry = new Geometry();
geometry.vertices.push(
    new Vector3(-1, -0.5,  1),  // 0
    new Vector3( 1, -0.5,  1),  // 1
    new Vector3(-1,  0.0,  1),  // 2
    new Vector3( 1,  0.0,  1),  // 3
    new Vector3(-1, -0.5, -1),  // 4
    new Vector3( 1, -0.5, -1),  // 5
    new Vector3(-1,  0.0, -1),  // 6
    new Vector3( 1,  0.0, -1),  // 7
);

geometry.faces.push(
    // front
    new Face3(0, 3, 2),
    new Face3(0, 1, 3),
    // right
    new Face3(1, 7, 3),
    new Face3(1, 5, 7),
    // back
    new Face3(5, 6, 7),
    new Face3(5, 4, 6),
    // left
    new Face3(4, 2, 6),
    new Face3(4, 0, 2),
    // top
    new Face3(2, 7, 6),
    new Face3(2, 3, 7),
    // bottom
    new Face3(4, 1, 0),
    new Face3(4, 5, 1),
);

// function generate(size: number) {
//     const geometry = new Geometry();
//
//     const vertices = [];
//     for (let x = 0; x < size; x++) {
//         for (let z = 0; z < size; z++) {
//             vertices.push(new Vector3(x/size,0, z/size));
//             vertices.push(new Vector3(x/size,0, z/size));
//         }
//     }
//
//     return geometry;
// }



const size = 2;
geometry = new PlaneGeometry(size, size, 8, 8);
geometry.rotateX(-Math.PI / 2);
// geometry.vertices.forEach(v => v.add(new Vector3(0, Math.random() * 0.12 - 0.12, 0)));
// geometry.vertices = geometry.vertices.map(v => {
//     v.add(new Vector3(0, Math.random() * 2, 0));
//     return v;
// });
// geometry.verticesNeedUpdate = true;

const tessellateModifier = new TessellateModifier( 0.1, 6 );
const subdivisionModifier = new SubdivisionModifier(2);
// @ts-ignore
// geometry = tessellateModifier.modify( geometry );
// geometry = subdivisionModifier.modify( geometry );

// geometry.computeFaceNormals();
// geometry.computeFlatVertexNormals();


const leftGeom = new Geometry();
const left = geometry.vertices.filter(v => v.x === size * 0.5);
left.sort((a, b) => a.z > b.z ? 1 : -1);
console.log(left);
const rightGeom = new Geometry();
const right = geometry.vertices.filter(v => v.x === -size * 0.5);
right.sort((a, b) => a.z > b.z ? 1 : -1);
console.log(right);
const frontGeom = new Geometry();
const front = geometry.vertices.filter(v => v.z === -size * 0.5);
front.sort((a, b) => a.x > b.x ? 1 : -1);
console.log(front);
const backGeom = new Geometry();
const back = geometry.vertices.filter(v => v.z === size * 0.5);
back.sort((a, b) => a.x > b.x ? 1 : -1);
console.log(back);

for (let i = 0; i < left.length; i++) {
    leftGeom.vertices.push(new Vector3(left[i].x, left[i].y, left[i].z));
    leftGeom.vertices.push(new Vector3(left[i].x, -0.5, left[i].z));
}

for (let i = 0; i < left.length - 1; i++) {
    leftGeom.faces.push(new Face3(i*2, (i+1)*2, i*2+1));
    leftGeom.faces.push(new Face3(i*2+1, (i+1)*2, i*2+3));
}

leftGeom.computeFaceNormals();
// geometry.merge(leftGeom);


for (let i = 0; i < right.length; i++) {
    rightGeom.vertices.push(new Vector3(right[i].x, right[i].y, right[i].z));
    rightGeom.vertices.push(new Vector3(right[i].x, -0.5, right[i].z));
}

for (let i = 0; i < right.length - 1; i++) {
    rightGeom.faces.push(new Face3((i+1)*2,i*2,  i*2+1));
    rightGeom.faces.push(new Face3((i+1)*2, i*2+1,  i*2+3));
}

rightGeom.computeFaceNormals();
// geometry.merge(rightGeom);


for (let i = 0; i < front.length; i++) {
    frontGeom.vertices.push(new Vector3(front[i].x, front[i].y, front[i].z));
    frontGeom.vertices.push(new Vector3(front[i].x, -0.5, front[i].z));
}

for (let i = 0; i < front.length - 1; i++) {
    frontGeom.faces.push(new Face3(i*2, (i+1)*2, i*2+1));
    frontGeom.faces.push(new Face3(i*2+1, (i+1)*2, i*2+3));
}

frontGeom.computeFaceNormals();
// geometry.merge(frontGeom);


for (let i = 0; i < back.length; i++) {
    backGeom.vertices.push(new Vector3(back[i].x, back[i].y, back[i].z));
    backGeom.vertices.push(new Vector3(back[i].x, -0.5, back[i].z));
}

for (let i = 0; i < back.length - 1; i++) {
    backGeom.faces.push(new Face3((i+1)*2, i*2,  i*2+1));
    backGeom.faces.push(new Face3((i+1)*2, i*2+1, i*2+3));
}

backGeom.computeFaceNormals();
// geometry.merge(backGeom);


const bottomGeom = new Geometry();

bottomGeom.vertices.push(new Vector3(size * 0.5, -0.5, size * 0.5));
bottomGeom.vertices.push(new Vector3(size * 0.5, -0.5, -size * 0.5));
bottomGeom.vertices.push(new Vector3(-size * 0.5, -0.5, size * 0.5));
bottomGeom.vertices.push(new Vector3(-size * 0.5, -0.5, -size * 0.5));
bottomGeom.faces.push(new Face3(0, 2, 1));
bottomGeom.faces.push(new Face3(1, 2, 3));

bottomGeom.computeFaceNormals();
// geometry.merge(bottomGeom);


const raycaster = new Raycaster();

const sidesGeom = new Geometry();
sidesGeom.merge(leftGeom);
sidesGeom.merge(rightGeom);
sidesGeom.merge(frontGeom);
sidesGeom.merge(backGeom);
sidesGeom.merge(bottomGeom);

// let gCam = new PerspectiveCamera();
let gCam: any = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
gCam.position.set(0, 2, 0);
gCam.lookAt(0, 0, 0);

let objects: Array<any> = [];
let i = 0;
let time = 0;

type GroundProps = {
    testScene: React.MutableRefObject<Scene | undefined>,
    wireframe: boolean,
    sceneRef: React.MutableRefObject<Scene | undefined>
}

function Ground(props: MeshProps & GroundProps) {
    const pointer = useRef<Mesh>();
    const groundMesh = useRef<Mesh>();
    const wireframe: boolean = props.wireframe;

    const {camera, scene, mouse, invalidate} = useThree();

    useFrame(({mouse, camera, invalidate}) => {
        raycaster.setFromCamera( mouse, camera );

        if (props.sceneRef.current)
            objects = raycaster.intersectObjects(props.sceneRef.current.children.filter(ch => ch.name === 'groundMesh'));

        if (objects.length > 0) {
                if (pointer.current) {
                    pointer.current.position.setX(objects[ i ].point.x);
                    pointer.current.position.setY(objects[ i ].point.y);
                    pointer.current.position.setZ(objects[ i ].point.z);
                    invalidate();
                }
        }

        objects = raycaster.intersectObjects(scene.children.filter(ch => ch.name === 'sprite'));
        if (objects.length > 0) {
            // console.log(objects[ 0 ].point);

            const v = new Vector2();
            v.setX(Math.sin(time) * 0.5);
            v.setY(Math.cos(time) * 0.5);
            time += 0.1;

            raycaster.setFromCamera( v, gCam );
            objects = raycaster.intersectObjects(scene.children.filter(ch => ch.name === 'groundMesh'));
            if (objects.length > 0) {
                if (pointer.current) {
                    pointer.current.position.setX(objects[ i ].point.x);
                    pointer.current.position.setY(objects[ i ].point.y);
                    pointer.current.position.setZ(objects[ i ].point.z);
                }
            }
        }
    });

    const texture = useLoader(TextureLoader, grid);

    // if (texture) {
        // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(1500, 1500);
    //     texture.anisotropy = 16;
    // }

    return (
            <>
                <GroundModel args={[10, 5]}/>
                <Plane
                    ref={groundMesh}
                    name="groundMesh"
                    args={[size, size, 8, 8]}
                    position={[0, -.2, 0]}
                    rotation={[- Math.PI / 2, 0, 0]}
                    // onDoubleClick={(e: any) => {
                    //     if (gCam.type === 'OrthographicCamera') {
                    //         gCam = new PerspectiveCamera();
                    //     } else {
                    //         gCam = new OrthographicCamera(-1, 1, 1, -1);
                    //     }
                    //
                    //     gCam.position.set(0, 2, 0);
                    //     gCam.lookAt(0, 0, 0);
                    // }}
                >
                    <meshLambertMaterial attach="material" map={texture} />
                </Plane>
                {/*<mesh*/}
                {/*    ref={groundMesh}*/}
                {/*    name="groundMesh"*/}
                {/*    position={[0, -0.2, 0]}*/}
                {/*    // rotation={[- Math.PI / 2, 0, 0]}*/}
                {/*    onDoubleClick={(e:any) => {*/}
                {/*        if (gCam.type === 'OrthographicCamera') {*/}
                {/*            gCam = new PerspectiveCamera();*/}
                {/*        } else {*/}
                {/*            gCam = new OrthographicCamera(-1, 1, 1, -1);*/}
                {/*        }*/}

                {/*        gCam.position.set(0, 2, 0);*/}
                {/*        gCam.lookAt(0, 0, 0);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    /!*<octahedronGeometry name="geometry" />*!/*/}
                {/*    /!*<geometry vertices={geometry.vertices} faces={geometry.faces} />*!/*/}
                {/*    /!*<planeGeometry args={[size, size, 8, 8]} />*!/*/}
                {/*    <geometry vertices={geometry.vertices} faces={geometry.faces} />*/}
                {/*    /!*<meshLambertMaterial name="material" color={'#fff'} wireframe/>*!/*/}
                {/*    <meshLambertMaterial attach="material" map={texture} />*/}
                {/*    /!*{*!/*/}
                {/*    /!*    texture ?*!/*/}
                {/*    /!*        <meshPhongMaterial attach="material" map={texture} />*!/*/}
                {/*    /!*            :*!/*/}
                {/*    /!*        <meshLambertMaterial attach="material" color={'#355e0a'} wireframe={wireframe} />*!/*/}
                {/*    /!*}*!/*/}
                {/*    /!*<meshStandardMaterial attach="material" color={"#fff"} />*!/*/}
                {/*</mesh>*/}

                <mesh
                    name="groundSidesMesh"
                    position={[0, -0.2, 0]}
                >
                    <geometry vertices={sidesGeom.vertices} faces={sidesGeom.faces} />
                    <meshLambertMaterial name="material" color={'#503a27'} />
                </mesh>

                <mesh ref={pointer} position={[0, 0, 0]} scale={[0.05, 0.05, 0.05]}>
                    <sphereGeometry />
                    <meshLambertMaterial name="material" color={'#d01a9a'} />
                </mesh>

                {/*<mesh name="box" position={[0, 1, 0]} scale={[0.5, 0.5, 0.5]} material={material}>*/}
                {/*    <boxGeometry />*/}
                {/*</mesh>*/}
                <ambientLight />
                {/*<MySprite sceneRef={props.sceneRef}/>*/}
            </>
    );

    // </group>
}

export default Ground;
