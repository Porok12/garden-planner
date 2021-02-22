import React, {useEffect, useRef, useState} from 'react';
import {Canvas, PerspectiveCameraProps, useFrame, useThree} from 'react-three-fiber';
import {PerspectiveCamera, Vector3} from 'three';
import {Html} from "@react-three/drei";
import compass from "../../assets/compass.svg";

function Camera(props: PerspectiveCameraProps) {
    const ref: any = useRef<PerspectiveCamera>();
    const { setDefaultCamera } = useThree();

    const [angle, setAngle] = useState(0);

    useEffect(() => void setDefaultCamera(ref.current), []);

    // let angle = 0;
    useFrame(() => {
        if (ref.current) {
            ref.current.updateMatrixWorld();

            // const NORTH = new Vector3(0, 0, -1);
            // const direction = new Vector3();
            // ref.current.getWorldDirection( direction );
            // setAngle(NORTH.angleTo(direction));
            const direction = new Vector3();
            ref.current.getWorldDirection( direction );
            setAngle(Math.atan2(direction.x, direction.z) - Math.PI);
            // console.log(angle);
        }
    });

    return <>
        <perspectiveCamera ref={ref} {...props} />
        {/*<Html position={[-0.5, 0.5, 0]}>*/}
        {/*    <img src={compass} style={{transform: `rotate(${angle}rad)`, width: '128px', height: '128px' }} draggable={false} />*/}
        {/*</Html>*/}
    </>
}

export default Camera;
