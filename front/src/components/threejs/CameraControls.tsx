import React, { useEffect, useRef} from 'react';
import {extend, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls, MapControls} from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });
extend({ MapControls });

function CameraControls(props: any) {
    const { camera, gl: { domElement }, invalidate } = useThree();

    //React.RefObject<OrbitControls>
    const ref: any = useRef<MapControls>();
    useFrame(() => ref.current.update());
    useEffect(() => {
        if (ref.current) {
            ref.current.removeEventListener('change', invalidate);
            ref.current.addEventListener('change', invalidate);
        }
    }, [ref.current]);
    // @ts-ignore
    return <orbitControls ref={ref} args={[camera, domElement]} maxPolarAngle={Math.PI/1.9} enableDamping />
    // return <mapControls ref={ref} args={[camera, domElement]} maxPolarAngle={Math.PI/1.9} />;
}

export default CameraControls;
