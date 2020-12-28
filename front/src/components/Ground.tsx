import React, {Component, useEffect, useRef} from "react";
import {Canvas, MeshProps, useFrame, useThree} from "react-three-fiber";
import {
    BoxBufferGeometry,
    Geometry,
    Mesh,
    MeshStandardMaterial,
    SphereGeometry,
    Vector3,
    Face3,
    PlaneGeometry,
    Triangle,
    Raycaster,
    Vector2,
    WebGLRenderTarget,
    MeshPhongMaterial,
    MeshBasicMaterial,
    PerspectiveCamera,
    Sprite,
    SpriteMaterial, OrthographicCamera, Scene, Color
} from "three";
import {Face} from "three/examples/jsm/math/ConvexHull";
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier.js';
import {Effects} from "@react-three/drei/Effects";

// class Ground extends Component<MeshProps, any> {
//     mesh: React.RefObject<Mesh>;
//     geo: BoxBufferGeometry;
//     mat: MeshStandardMaterial;
//
//     constructor(props: any) {
//         super(props);
//
//         this.geo = new BoxBufferGeometry(2,2,2);
//         this.mat = new MeshStandardMaterial({color: 0x1fbeca});
//         this.mesh = React.createRef();
//     }
//
//     render() {
//         const props = this.props;
//
//         // This reference will give us direct access to the mesh
//         // const mesh = useRef<Mesh>()
//         const mesh = this.mesh;
//
//         // Rotate mesh every frame, this is outside of React without overhead
//         // useFrame(() => {
//         //     if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
//         // })
//
//         return (
//             <mesh //onAfterRender={event => console.log(event)}
//                 {...props}
//                 ref={mesh}
//                 rotation={[Math.PI / 2, 0, 0]}
//                 scale={[1, 1, 1]} >
//                 <boxBufferGeometry args={[1, 1, 1]} />
//                 <meshStandardMaterial color={'#4c3009'} />
//             </mesh>
//         )
//     }
// }



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
geometry.vertices.forEach(v => v.add(new Vector3(0, Math.random() * 0.12 - 0.12, 0)));
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
geometry.computeFlatVertexNormals();


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

const renderTarget = new WebGLRenderTarget(800, 800);
// let gCam = new PerspectiveCamera();
let gCam: any = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
gCam.position.set(0, 2, 0);
gCam.lookAt(0, 0, 0);
console.log(gCam);

// let sprite;
type SpriteProps = {
    sceneRef: React.RefObject<Scene>
}

function MySprite(props: SpriteProps) {
    // const spriteMaterial = new SpriteMaterial({color: '#ffffff'});
    const spriteMaterial = new SpriteMaterial({map: renderTarget.texture});
    // scale={new Vector3(800, 800, 1)}
    // position={[800, 800, 1]}
    const sceneRef = useRef<Scene>();
    const cam = useRef<OrthographicCamera>();

    // useFrame(({ gl, scene, camera }) => {
    //     // gl.render(scene, camera);
    // }, 1);

    useFrame(({ gl, scene, camera }, dt) => {
       if (sceneRef.current) {
           gl.setRenderTarget(renderTarget)
           gl.render(sceneRef.current, camera);
           gl.setRenderTarget(null);
       }

        if (props.sceneRef.current) {
            gl.clear(true, true, false);
            gl.render(props.sceneRef.current, camera);
        }
    }, 1);

    if (cam.current) {
        cam.current.lookAt(new Vector3(0, -1, 0), 0.1, 100);
    }

    return <>
        <scene ref={sceneRef}>
            <orthographicCamera ref={cam} position={[0, 3, 0]}/>
            <mesh>
                <sphereGeometry />
                <meshBasicMaterial color={new Color(0)} />
            </mesh>
        </scene>
        <sprite name="sprite" material={spriteMaterial} center={new Vector2(-1, -.1)} scale={[1.2, 1.2, 1]} />
    </>;
}

let objects: Array<any> = [];
let i = 0;
let time = 0;

type GroundProps = {
    testScene: React.RefObject<Scene>,
    wireframe: boolean,
    sceneRef: React.RefObject<Scene>
}

let tScene: Scene = new Scene();

function Ground(props: MeshProps & GroundProps) {
    const pointer = useRef<Mesh>();
    const groundMesh = useRef<Mesh>();
    const wireframe: boolean = props.wireframe;

    // if (!tScene.children.length) {
    //     if (groundMesh.current) {
    //         tScene.add(groundMesh.current);
    //     }
    // }

    const {camera, scene, mouse, invalidate} = useThree();

    // const material = new MeshBasicMaterial({
    //     map: renderTarget.texture
    // });

    // useFrame(({gl, scene}) => {
    //     gl.setRenderTarget(renderTarget);
    //     gl.render(scene, gCam);
    //     gl.setRenderTarget(null);
    //     gl.clear(true, true, false);
    // });

    // useEffect(() => invalidate(), [mouse]);

    useFrame(({mouse, camera, invalidate}) => {
        raycaster.setFromCamera( mouse, camera );
        // const ground = scene.children[3];
        // console.log(scene.children.map(ch => ch.name));
        if (props.sceneRef.current)
            objects = raycaster.intersectObjects(props.sceneRef.current.children.filter(ch => ch.name === 'groundMesh'));
        // console.log(mouse);
        // console.log(camera);
        // console.log(scene.children);
        // console.log(objects.length);
        // console.log(objects);
        // if (objects.length > 1) console.log(objects.map(o => o.distance));
        if (objects.length > 0) {
            // for (let i in objects) {

                // var iFace = objects[i].face;
                // var iPoint = objects[i].point;
                // var ab = iFace.a.distanceTo(iFace.b);
                // var ac = iFace.a.distanceTo(iFace.c);
                // var bc = iFace.b.distanceTo(iFace.c);
                // var lambda = Math.min(ab, ac, bc) - 0.1;
                // if(iFace.a.distanceTo(iPoint) <= lambda){
                //     return iFace.a;
                // }
                // if(iFace.b.distanceTo(iPoint) <= lambda){
                //     return iFace.b;
                // }
                // if(iFace.c.distanceTo(iPoint) <= lambda){
                //     return iFace.c;
                // }

                // console.log(objects[ i ].point);
                if (pointer.current) {
                    pointer.current.position.setX(objects[ i ].point.x);
                    pointer.current.position.setY(objects[ i ].point.y);
                    pointer.current.position.setZ(objects[ i ].point.z);
                    invalidate();
                }
                // objects[ i ].object.material.color.set( 0xff0000 );
            // }
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

    // <group ref={ref => console.log('we have access to the instance')}>
    // <line>
    //     <geometry
    //         name="geometry"
    //         vertices={vertices.map((v: Array<number>) => new Vector3(...v))}
    //         onUpdate={self => (self.verticesNeedUpdate = true)}
    //     />
    //     <lineBasicMaterial name="material" color="black" />
    // </line>



    return (
            <>
                <mesh
                    ref={groundMesh}
                    name="groundMesh"
                    position={[0, -0.2, 0]}
                    onDoubleClick={(e:any) => {
                        if (gCam.type === 'OrthographicCamera') {
                            gCam = new PerspectiveCamera();
                        } else {
                            gCam = new OrthographicCamera(-1, 1, 1, -1);
                        }

                        gCam.position.set(0, 2, 0);
                        gCam.lookAt(0, 0, 0);
                    }}
                    // geometry={geometry}
                    // geometry={new SphereGeometry(0.8, 8, 8)}
                    // onClick={(e: any) => console.log('click')}
                    // onHover={(e: any) => console.log('hover')}
                    // onUnhover={(e: any) => console.log('unhover')}
                >
                    {/*<octahedronGeometry name="geometry" />*/}
                    <geometry vertices={geometry.vertices} faces={geometry.faces} />
                    {/*<meshLambertMaterial name="material" color={'#fff'} wireframe/>*/}
                    <meshLambertMaterial name="material" color={'#355e0a'} wireframe={wireframe}/>
                    {/*<meshStandardMaterial attach="material" color={"#fff"} />*/}
                </mesh>

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
