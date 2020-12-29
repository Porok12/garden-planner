import React, {useRef} from 'react';
import { extend, useFrame, useThree} from "react-three-fiber";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import {Vector3} from "three";

extend({ Sky });


const effectController = {
    turbidity: 12,
    rayleigh: 3,
    mieCoefficient: 0.008,
    mieDirectionalG: 0.75,
    inclination: 0.55,// 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    exposure: 0.35
};

const sun = new Vector3();

function MySky() {
    const sky = useRef<Sky>();
    const {gl} = useThree();

    useFrame(() => {
        if (sky.current) {
            const uniforms = sky.current.material.uniforms;
            // const uniforms = sky.material.uniforms;
            uniforms[ "turbidity" ].value = effectController.turbidity;
            uniforms[ "rayleigh" ].value = effectController.rayleigh;
            uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
            uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

            const theta = Math.PI * ( effectController.inclination - 0.5 );
            const phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

            sun.x = Math.cos( phi );
            sun.y = Math.abs( Math.sin( phi ) * Math.sin( theta ) );
            sun.z = Math.sin( phi ) * Math.cos( theta );
            uniforms[ "sunPosition" ].value.copy( sun );

            gl.toneMappingExposure = effectController.exposure;

            // effectController.azimuth += 0.0002;
            // effectController.inclination += 0.001;
        }

    });

    // @ts-ignore
    return <sky ref={sky} scale={[45000, 45000, 45000]} />
}

export default MySky;
