import React, { useEffect, useRef} from 'react';
import {extend, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls, MapControls} from "three/examples/jsm/controls/OrbitControls";
import {shallowEqual, useSelector} from "react-redux";
import { RootState } from '../../store';

extend({ OrbitControls });
extend({ MapControls });

function CameraControls(props: any) {
    const { camera, gl: { domElement }, invalidate } = useThree();

    const ref: any = useRef<MapControls>();
    useFrame(() => {if (ref.current) {
        ref.current.update();
    }});

    useEffect(() => {
        if (ref.current) {
            ref.current.removeEventListener('change', invalidate);
            ref.current.addEventListener('change', invalidate);
        }
    }, [ref.current]);

    const enabled = useSelector((state: RootState) => state.canvas.orbitControls.enabled, shallowEqual);

    // @ts-ignore
    return <orbitControls ref={ref} args={[camera, domElement]} maxPolarAngle={Math.PI/1.9} enableDamping enabled={enabled} />
    // return <mapControls ref={ref} args={[camera, domElement]} maxPolarAngle={Math.PI/1.9} />;
}

export default CameraControls;
