import React, {Component} from "react";
import {MeshProps, useFrame} from "react-three-fiber";
import {Mesh} from "three";

type BoxState = {
    hovered: boolean,
    active: boolean
}

class Box extends Component<MeshProps, BoxState> {
    state: BoxState = {
        hovered: false,
        active: false
    }
    mesh: React.RefObject<Mesh> = React.createRef();

    setHover(hover: boolean) {
        this.setState({hovered: hover});
    }

    setActive(active: boolean) {
        this.setState({active: active});
    }

    render() {
        const {active, hovered} = this.state;
        const props = this.props;

        // This reference will give us direct access to the mesh
        // const mesh = useRef<Mesh>()
        const mesh = this.mesh;

        // Rotate mesh every frame, this is outside of React without overhead
        // useFrame(() => {
        //     if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
        // })

        return (
            <mesh
                {...props}
                ref={mesh}
                scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
                onClick={(_event) => this.setActive(!active)}
                onPointerOver={(event) => this.setHover(true)}
                onPointerOut={(event) => this.setHover(false)}>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        )
    }
}

export default Box;
