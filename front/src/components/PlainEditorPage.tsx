import React, {
    Component,
    useRef,
    useState
} from "react";
import Konva from 'konva';
import {Stage, Layer, Rect, Text, Image, Line, Circle, Arc, Shape} from "react-konva";
import leaf from "../assets/leaf.svg";
import tree from "../assets/tree.svg";
import useImage from 'use-image';
import {Button} from "react-bootstrap";
import Plant from "./Plant";
import ItemSidebar from "./ItemSidebar";
import {Vector3} from "three";
// import {faFont} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faLock,
    faLockOpen,
    faEye,
    faEyeSlash,
    faPlus,
    faQuestionCircle,
    faExclamationCircle, faExclamationTriangle, faCheckCircle, faHammer
} from '@fortawesome/free-solid-svg-icons';
import {getMaxListeners} from "cluster";
import GardenConsole from "./GardenConsole";
import EditorPanel from "./EditorPanel";


type Point = {
    x: number;
    y: number;
}

const find_angle = (A: Point, B: Point, C: Point): any => {
    // let AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
    // let BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
    // let AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
    // return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180 / Math.PI;

    const v1 = new Vector3(B.x - A.x, B.y - A.y, 0);
    const v2 = new Vector3(B.x - C.x, B.y - C.y, 0);
    const v3 = (new Vector3()).crossVectors(v1, v2);
    // return v1.angleTo(v2) * 180 / Math.PI;
    return {
        angle: (v1.angleTo(v2)), //  * 180 / Math.PI
        direction: (v3.z > 0 ? 1 : -1)
    };
}

const find_rotation = (A: Point, B: Point, C: Point): number => {
    const {angle, direction} = find_angle(
        A,
        B,
        C
    );

    let T = direction > 0 ? A : C;
    // if (direction > 0)
    //     T = A.x < C.x ? A : C;
    // else
    //     T = A.x > C.x ? A : C;

    let F: Point = {
        x: B.x + 1,
        y: B.y + 0
    }

    const tmp = find_angle(
        F,
        B,
        T
    );

    console.log(direction, tmp.direction)
    console.log(Math.round(angle), Math.round(tmp.angle))
    //tmp.angle += tmp.direction > 0 ? 0 : 180;
    if (direction < 0)
        tmp.angle = 180 + tmp.angle;

    return 30;
    //return (180 / Math.PI * Math.atan2(B.y - C.y, B.x - C.x));

    if (direction > 0)
        return 360 - tmp.angle;
    else
        return tmp.angle;

    // return tmp.angle + (direction > 0 ? 180 : 0);
}

const foo = (arr: number[], i: number): any => {
    let A: Point = {
        x: arr[i - 2],
        y: arr[i - 1]
    }
    let B: Point = {
        x: arr[i - 0],
        y: arr[i + 1]
    }
    let C: Point = {
        x: arr[i + 2],
        y: arr[i + 3]
    }
    let R: Point = {
        x: arr[i - 0] + 10,
        y: arr[i + 1] + 0
    }

    let fa1: any = find_angle(R, B, A);
    let fa2: any = find_angle(R, B, C);

    if (fa2.direction < 0)
        fa2.angle = 2 * Math.PI - fa2.angle;

    if (fa1.direction < 0)
        fa1.angle = 2 * Math.PI - fa1.angle;

    // console.log(fa1.angle, fa1.direction);
    // console.log(fa2.angle, fa2.direction);

    // let min = fa1.angle > fa2.angle ? fa2.angle : fa1.angle;
    // let max = fa1.angle > fa2.angle ? fa1.angle : fa2.angle;
    //
    // console.log(max - min > Math.PI);
    //
    // if (max - min > Math.PI) {
    //     console.log((max - min) * 180 / Math.PI, min * 180 / Math.PI, max * 180 / Math.PI);
    //     let tmp = min;
    //     min = max;
    //     max = 2 * Math.PI + tmp;
    // }

    return {
        start: fa1.angle,
        end: fa2.angle
    }
}

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
                {/*<Line ref={lineRef}*/}
                {/*      points={points}*/}
                {/*      stroke={'#650425'}*/}
                {/*      strokeWidth={5}*/}
                {/*/>*/}

                {/*@ts-ignore*/}
                <Line ref={lineRef}
                      points={points}
                      stroke={'#650425'}
                      strokeWidth={5}
                      closed={true}
                      fill={'hsl(120,60%,86%)'}
                />
                {/*{*/}
                {/*    Array.from({length: points.length / 2 - 1 - 1}, (v, k) => k + 2)*/}
                {/*        .map(k => <Arc*/}
                {/*            x={points[k]} y={points[k + 1]}*/}
                {/*            clockwise={false}*/}
                {/*            angle={find_angle({*/}
                {/*                x: points[k - 2],*/}
                {/*                y: points[k - 1]*/}
                {/*            }, {*/}
                {/*                x: points[k - 0],*/}
                {/*                y: points[k + 1]*/}
                {/*            }, {*/}
                {/*                x: points[k + 2],*/}
                {/*                y: points[k + 3]*/}
                {/*            }).angle}*/}
                {/*            rotation={find_rotation({*/}
                {/*                x: points[k - 2],*/}
                {/*                y: points[k - 1]*/}
                {/*            }, {*/}
                {/*                x: points[k - 0],*/}
                {/*                y: points[k + 1]*/}
                {/*            }, {*/}
                {/*                x: points[k + 2],*/}
                {/*                y: points[k + 3]*/}
                {/*            })}*/}
                {/*            innerRadius={0}*/}
                {/*            outerRadius={50}*/}
                {/*            stroke="color"*/}
                {/*            strokeWidth={2}*/}
                {/*        />)*/}
                {/*}*/}
                {
                    Array.from({length: points.length / 2}, (v, k) => k * 2)
                        .map(k => <Shape
                            sceneFunc={(context, shape) => {
                                context.beginPath();
                                context.arc(0, 0, 50,
                                    foo(points, k).start,
                                    foo(points, k).end,
                                    false);
                                context.stroke();
                            }}
                            x={points[k]} y={points[k + 1]}
                            fill="red"
                            stroke="black"
                            strokeWidth={5}
                        />)
                }
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
        return <div style={{position: 'relative'}}>
            <PlainEditor/>
            <ItemSidebar/>
            <EditorPanel/>
            <GardenConsole/>
        </div>
    }
}

export default PlainEditorPage;
