import React, {useRef} from "react";
import {Mesh, OrthographicCamera, RenderTarget, Scene, SpriteMaterial, Vector3, WebGLRenderTarget} from "three";
import {useFrame} from "react-three-fiber";

type SpriteProps = {
    sceneRef: React.MutableRefObject<Scene | undefined>
    scene: React.MutableRefObject<Scene | undefined>
    target: any
}

function MySprite(props: SpriteProps) {
    // const sceneRef = useRef<Scene>();
    const cam = useRef<OrthographicCamera>();
    const meshRef = useRef<Mesh>();

    useFrame(({ gl, scene, camera }, dt) => {
        if (props.scene.current && cam.current) {
            gl.setClearColor('#ffffff');
            gl.setRenderTarget(props.target);
            gl.render(props.scene.current, cam.current);
            gl.setRenderTarget(null);
        }

        if (props.sceneRef.current) {
            gl.clear(true, true, false);
            gl.render(props.sceneRef.current, camera);
        }

        if (meshRef.current) {
            // meshRef.current.rotateX(0.1);
            meshRef.current.rotation.y += 2 * dt;
        }

    }, 1);

    if (cam.current) {
        cam.current.lookAt(new Vector3(0, 0, 0), 0.1, 100);
    }

    return <>
        <orthographicCamera ref={cam} args={[-1, 1, 1, -1]} position={[0, 3, 0]}
                            onClick={(e) => {
                                console.log(e);
                            }} />
        <mesh ref={meshRef} scale={[0.1, 0.1, 0.1]}>
            <sphereGeometry />
            <meshBasicMaterial color={'#9d4a55'} />
        </mesh>
        {/*<mesh scale={[0.2, 0.2, 0.2]} position={[0.5, 0, 0]}>*/}
        {/*    <sphereGeometry />*/}
        {/*    <meshBasicMaterial color={'#9d4a55'} />*/}
        {/*</mesh>*/}
    </>;
}

export default MySprite;
