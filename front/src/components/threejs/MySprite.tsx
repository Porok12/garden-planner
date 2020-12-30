import React, {useRef} from "react";
import {Mesh, OrthographicCamera, RenderTarget, Scene, Sprite, SpriteMaterial, Vector3, WebGLRenderTarget} from "three";
import {useFrame, useThree} from "react-three-fiber";

type SpriteProps = {
    sceneRef: React.MutableRefObject<Scene | undefined>
    scene: React.MutableRefObject<Scene | undefined>
    hud: React.MutableRefObject<Scene | undefined>
    sprite: React.MutableRefObject<Sprite | undefined>
    target: any
}

let orto = new OrthographicCamera(-1, 1, 1, -1, -10, 10);

function MySprite(props: SpriteProps) {
    // const sceneRef = useRef<Scene>();
    const cam = useRef<OrthographicCamera>();
    const meshRef = useRef<Mesh>();

    const { viewport } = useThree();

    console.log(viewport.width, viewport.height);
    orto = new OrthographicCamera(
        viewport.width / -2,
        viewport.width / 2,
        viewport.height / 2,
        viewport.height / -2,
        -10, 10);

    useFrame(({ gl, scene, camera }, dt) => {
        if (props.scene.current && cam.current) {
            gl.setClearColor('#ffffff');
            gl.setRenderTarget(props.target);
            gl.render(props.scene.current, cam.current);
            gl.setRenderTarget(null);
        }

        if (props.sceneRef.current) {
            gl.autoClear = false;
            gl.clear(true, true, false);
            gl.render(props.sceneRef.current, camera);
        }

        if (props.hud.current) {
            gl.render(props.hud.current, orto);
            gl.autoClear = true;
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
