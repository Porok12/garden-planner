import React, {
    Component,
    useRef,
    useState
} from "react";
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Image, Line, Circle } from "react-konva";
import leaf from "../assets/leaf.svg";
import tree from "../assets/tree.svg";
import useImage from 'use-image';
import {Button} from "react-bootstrap";

const PlainEditor = () => {
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

class PlainEditorPage extends Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <>
            <PlainEditor />
        </>
    }
}

export default PlainEditorPage;
