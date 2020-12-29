import React, {useEffect, useRef} from 'react';
import {PerspectiveCameraProps, useFrame, useThree} from 'react-three-fiber';
import { PerspectiveCamera} from 'three';

function Camera(props: PerspectiveCameraProps) {
    const ref: any = useRef<PerspectiveCamera>();
    const { setDefaultCamera } = useThree();
    useEffect(() => void setDefaultCamera(ref.current), []);
    useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />
}

export default Camera;
