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
import Plant from "./Plant";

const PlainEditor = () => {
    const [image] = useImage(tree);
    const [points, setPoints] = useState([10, 10, 100, 100, 150, 50]);
    const [mode, setMode] = useState("move");
    const [snap, setSnap] = useState(false);

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
                                 if (false) {
                                     let x = e.target.attrs.x;
                                     let y = e.target.attrs.y;
                                     x = Math.floor(x / 10) * 10;
                                     y = Math.floor(y / 10) * 10;
                                     e.target.setPosition({x, y});
                                 }
                                }
                             }
                             onDragMove={(e) => {
                                 setPoints(points.map((p, j) => {
                                     let x = e.target.attrs.x;
                                     let y = e.target.attrs.y;

                                     if (snap) {
                                         // x = Math.floor(x / 10) * 10;
                                         // y = Math.floor(y / 10) * 10;
                                         if (snap) {
                                             x = Math.round(x / 10) * 10;
                                             y = Math.round(y / 10) * 10;
                                             e.target.setPosition({x, y});
                                         }
                                     }

                                     if (j === i) {
                                         return x;
                                     } else if (j === i+1) {
                                         return y;
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



    const width = window.innerWidth;
    const height = 500;

    const grids = [];
    for (let r = 0; r < width / 100; r++) {
        for (let c = 0; c < height / 100; c++) {
            grids.push(<Rect x={r*100} y={c*100} width={100} height={100} strokeWidth={0.5} stroke={"gray"}/>);
        }
    }

    const plant = {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        id: 'rect2',
    };

    const [plants, setPlants] = React.useState([
        plant
    ]);
    const [selectedId, selectPlant] = React.useState<any>(null);

    const checkDeselect = (e: any) => {
        // const clickedOnEmpty = e.target === e.target.getStage();
        // console.log(e.target.getLayer());
        const clickedOnEmpty = e.target.getLayer().attrs.name !== 'plants';
        if (clickedOnEmpty) {
            selectPlant(null);
        }
    };

    return <>
        <Button onClick={() => setMode("add")}>Add</Button>
        <Button onClick={() => setMode("move")}>Move</Button>
        <Button onClick={() => setMode("del")}>Remove</Button>
        <Button onClick={() => setSnap(!snap)}>Snap</Button>
        {/*width={800} height={600}*/}
        <Stage
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            width={width}
            height={height}
            onClick={(e) => {
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
            <Layer name="plants">
                {
                    plants.map((plant, i) => (
                        <Plant
                            key={i}
                            image={image}
                            shapeProps={plant}
                            isSelected={plant.id === selectedId}
                            onSelect={() => {
                                selectPlant(plant.id);
                            }}
                            onChange={(newAttrs: any) => {
                                const newPlants = plants.slice();
                                newPlants[i] = newAttrs;
                                setPlants(newPlants);
                            }}
                        />
                    ))
                }

                {/*<Image image={image} scale={{x: 0.5, y: 0.5}} draggable/>*/}
            </Layer>
            <Layer>
                {/*@ts-ignore*/}
                <Line ref={lineRef}
                    points={points}
                    stroke={'#650425'}
                    strokeWidth={5}
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
