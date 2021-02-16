import compass from '../../assets/compass.png';
import React, { Suspense } from "react";
import {useLoader} from "react-three-fiber";
import {TextureLoader} from "three";
import { Plane } from '@react-three/drei';

const Compass = () => {
    const texture = useLoader(TextureLoader, compass);

    return <Suspense fallback={null}>
        <Plane position={[-2.5, 1.1, 0]} scale={[0.5, 0.5, 0.5]}>
            <meshBasicMaterial map={texture} alphaTest={0.4}/>
        </Plane>
    </Suspense>
}

export default Compass;
