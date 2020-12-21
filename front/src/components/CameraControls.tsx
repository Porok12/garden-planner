import React, {Component, useRef} from 'react';
import {extend, useFrame, useThree} from 'react-three-fiber';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

function CameraControls(props: any) {
    const { camera, gl: { domElement } } = useThree();

    const ref: any = useRef<OrbitControls>();
    useFrame(() => ref.current.update());
    // @ts-ignore
    return <orbitControls ref={ref} args={[camera, domElement]} />

}

export default CameraControls;
