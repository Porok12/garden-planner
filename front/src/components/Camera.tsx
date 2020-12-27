import React, {Component, useEffect, useRef} from 'react';
import {PerspectiveCameraProps, useFrame, useThree} from 'react-three-fiber';
import {Mesh, PerspectiveCamera} from 'three';
import {SharedCanvasContext} from "react-three-fiber/canvas";

// class Camera extends Component<PerspectiveCameraProps, {}>{
//     static contextType: any = SharedCanvasContext;
//     ref: React.RefObject<PerspectiveCamera> = React.createRef();
//
//     componentDidMount() {
//
//     }
//
//     render() {
//         return <perspectiveCamera ref={this.ref} {...props} />;
//     }
// }

function Camera(props: PerspectiveCameraProps) {
    const ref: any = useRef<PerspectiveCamera>();
    const { setDefaultCamera } = useThree();
    useEffect(() => void setDefaultCamera(ref.current), []);
    useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />

}

export default Camera;
