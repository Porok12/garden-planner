import React, {
    Attributes,
    ClassAttributes,
    Component,
    createRef,
    CSSProperties,
    ReactElement, RefObject,
    useRef,
    useState
} from "react";
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Image, Line, Circle } from "react-konva";
import leaf from "../assets/leaf.svg";
import tree from "../assets/tree.svg";

import useImage from 'use-image';
import {Button} from "react-bootstrap";


const CanvasContext = React.createContext([]);

type CanvasLayerProps = {
    layer?: number
    innerRef?: any//React.RefObject<HTMLCanvasElement> | undefined
}

class CanvasLayer extends Component<CanvasLayerProps, any> {
    ref = createRef<HTMLCanvasElement>();

    drawCircle(r: number) {
        console.log(r);
    }

    render() {
        const canvasStyle: CSSProperties = {
            position: 'absolute',
            backgroundColor: 'transparent',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: '0',
            left: '0'
        }

        console.log(this.props.layer);

        return <canvas ref={this.ref} style={canvasStyle} />;
    }
}

let CanvasLayer2 = React.forwardRef<HTMLCanvasElement, CanvasLayerProps>((props, ref) => {
    return <CanvasLayer innerRef={ref} {...props} />
});

type LayeredCanvasProps = {
    children: React.ReactElement<CanvasLayer>[] | React.ReactElement<CanvasLayer>;
}

type LayeredCanvasState = {
    selected: number
}

class LayeredCanvas extends Component<LayeredCanvasProps, LayeredCanvasState>{
    state: LayeredCanvasState = {
        selected: 0
    }

    selectItem(selected: any) {
        this.setState({selected});
    }

    drawCircle(r: number) {
        const { children } = this.props;
        // const fn = (child: CanvasLayer) => {
        //     child.drawCircle(r);
        // }
        // React.Children.forEach(children, fn);
        // @ts-ignore
        //children[0].drawCircle(r);
        console.log();
        // @ts-ignore
        (children[0] as CanvasLayer).drawCircle(5);
    }

    render() {
        const viewportStyle: CSSProperties = {
            position: 'relative',
            width: '100%',
            height: '800px',
            border: '1px solid'
        }

        const fn = (child: React.ReactElement<CanvasLayer>, i: number) => {
            const props: CanvasLayerProps = { layer: i };
            return React.cloneElement<CanvasLayerProps>(
                child as ReactElement<CanvasLayerProps>,
                props as Partial<CanvasLayerProps> & Attributes
            );
        };

        const children = React.Children.map(this.props.children, fn);

        return <div id="viewport" style={viewportStyle}>
            { children }
        </div>;
    }
}

const Testing = () => {
    const [image] = useImage(tree);
    const [points, setPoints] = useState([10, 10, 100, 100, 150, 50]);
    const [mode, setMode] = useState("move");

    const lineRef = useRef<typeof Line>();

    const circles = [];
    for (let i = 0; i < points.length; i += 2) {
        circles.push(<Circle key={i}
                             radius={10}
                             x={points[i]}
                             y={points[i+1]}
                             fill={'#008800'}
                             lineCap="round"
                             lineJoin="round"
                             opacity={0.5}
                             draggable={mode === "move"}
                             onClick={() => {
                                 if (mode === "del") {
                                     console.log("remove?");
                                     setPoints(points.filter((_, j) => j !== i && j !== i + 1));
                                 }
                                }
                             }
                             onMouseOver={(e) => {
                                    //console.log(e);
                                }
                             }
                             onDragStart={(e) => {
                                 //console.log(e.target.attrs);
                                 if (lineRef.current) {
                                     // @ts-ignore
                                     lineRef.current.lineJoin("round");
                                 }
                                }
                             }
                             onDragEnd={(e) => {
                                 //console.log(e.target.attrs);

                                }
                             }
                             onDragMove={(e) => {
                                 setPoints(points.map((p, j) => {
                                     if (j === i) {
                                         return e.target.attrs.x;
                                     } else if (j === i+1) {
                                         return e.target.attrs.y;
                                     } else {
                                         return p;
                                     }
                                 }))
                                 // console.log(i, e.target.attrs);
                                }
                             }

        /> )
    }

    const dist = (x1: number, y1: number, x2: number, y2: number) =>
        ""+Math.round(Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2)));

    const texts = [];
    for (let i = 0; i < points.length - 2; i += 2) {
        texts.push(<Text key={i}
                         fontSize={20}
                         text={dist(points[i], points[i+1], points[i+2], points[i+3])}
                         x={(points[i+0]+points[i+2])/2}
                         y={(points[i+1]+points[i+3])/2}
        /> )
    }

    //console.log(points);

    const grids = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 6; c++) {
            grids.push(<Rect x={r*100} y={c*100} width={100} height={100} strokeWidth={1} stroke={"black"}/>);
        }
    }

    return <>
        <Button onClick={() => setMode("add")}>Add</Button>
        <Button onClick={() => setMode("move")}>Move</Button>
        <Button onClick={() => setMode("del")}>Remove</Button>
        {/*width={800} height={600}*/}
        <Stage width={1800} height={500} onClick={(e) => {
            if (mode === 'add') {
                console.log(e);
                //setPoints(points.concat([e.target.attrs.x, e.target.attrs.y]));
                // @ts-ignore
                setPoints(points.concat([e.evt.layerX, e.evt.layerY]));
            }
        }}>
            <Layer>
                {
                    grids.map(grid => grid)
                }
            </Layer>
            <Layer>
                <Image image={image} scale={{x: 0.5, y: 0.5}} draggable/>
            </Layer>
            <Layer>
                {/*@ts-ignore*/}
                <Line ref={lineRef}
                    points={points}
                    stroke={'red'}
                    strokeWidth={15}
                    //tension={0.01}
                />
            </Layer>
            <Layer>
                {
                    circles.map((circle, key) => circle)
                }
            </Layer>
            <Layer>
                {
                    texts.map(text => text)
                }
            </Layer>
        </Stage>
    </>
}

class PageForTesting extends Component<any, any>{
    private canvas: React.RefObject<LayeredCanvas>;

    constructor(props: any) {
        super(props);

        this.canvas = React.createRef<LayeredCanvas>();
    }


    componentDidMount() {
        const canvas = this.canvas.current;
        if (canvas) {
            React.Children.forEach(canvas.props.children, child => {
                if (React.isValidElement(child)) {
                    console.log(child.props);
                }
            })

            canvas.drawCircle(5);
        }
    }

    render() {
        // return <div id="viewport" style={viewportStyle}>
        //     <canvas id="layer1" ref={this.l1} style={canvasStyle} />
        //     <canvas id="layer2" style={canvasStyle} />
        // </div>;
        // @ts-ignore
        // return <LayeredCanvas ref={this.canvas}>
        //     <CanvasLayer />
        //     <CanvasLayer />
        // </LayeredCanvas>
        let img = null;
        Konva.Image.fromURL(leaf, function (node: any) {
            img = node;
            console.log(node);
        });

        return <>
            <Testing />
        </>
    }
}

export default PageForTesting;
