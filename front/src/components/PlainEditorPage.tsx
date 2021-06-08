import React, {
    Component, Dispatch,
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
import GardenConsole from "./GardenConsole";
import EditorPanel from "./EditorPanel";

type Point2D = {
    x: number;
    y: number;
}

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

const foo = (arr: Point2D[], i: number): any => {
    let A: Point = arr[i - 1 < 0 ? arr.length - 1 : i - 1];
    let B: Point = arr[i];
    let C: Point = arr[i + 1 < arr.length ? i + 1 : 0];
    let R: Point = {
        x: arr[i].x + 10,
        y: arr[i].y
    }

    let fa1: any = find_angle(R, B, A);
    let fa2: any = find_angle(R, B, C);

    if (fa2.direction < 0)
        fa2.angle = 2 * Math.PI - fa2.angle;

    if (fa1.direction < 0)
        fa1.angle = 2 * Math.PI - fa1.angle;


    return {
        start: fa1.angle,
        end: fa2.angle
    }
}

const enterSide = (setActiveSide: Dispatch<number>, index: number) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        setActiveSide(index);
    }
}

const leaveSide = (setActiveSide: Dispatch<number>, index: number) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        setActiveSide(-1);
    }
}

const downSide = (
    setActiveSide: Dispatch<number>,
    activeSide: number,
    index: number
) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (activeSide === -1) {
            setActiveSide(index);
            // @ts-ignore
            const container = e.target.getStage().container();
            container.style.cursor = "move";
        }
    }
}

const upSide = (setStartSide: Dispatch<Point2D | undefined>, index: number) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        setStartSide(undefined);
    }
}

const moveSide = (setPoints: Dispatch<Point2D[]>, points: Point2D[], setStartSide: Dispatch<Point2D | undefined>, startSide: Point2D | undefined, index: number) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => { // DragEvent

    }
}

const stageMouseMove = (
    setPoints: Dispatch<Point2D[]>,
    points: Point2D[],
    setStartSide: Dispatch<Point2D | undefined>,
    startSide: Point2D | undefined,
    activeSide: number
) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        const x = e.evt.clientX;
        const y = e.evt.clientY;

        if (!startSide) {
            setStartSide({x, y});
        }

        // const pipe = (...fns: any) => (x: any) => fns.reduce((v: any, f: any) => f(v), x);
        // const p1 = pipe(
        //     (x: any) => x * 2,
        //     (x: any) => x + 2
        // );
        // console.log(p1(2), p1(3));

        // const p2 = pipe(
        //     (p: any, j: any, a: any) => startSide === undefined ? p : pipe(
        //         (p: any, j: any, a: any) =>
        //     )
        // )

        const addPoints = (p1: Point2D, p2: Point2D) => {
            return {x: p1.x + p2.x, y: p1.y + p2.y}
        }

        const subPoints = (p1: Point2D, p2: Point2D) => {
            return {x: p1.x - p2.x, y: p1.y - p2.y}
        }

        const movePointFun = (p1: Point2D, p2: Point2D) => {
            return (point: Point2D) => addPoints(point, subPoints(p1, p2))
        }

        const movePoint = movePointFun({x, y}, startSide || {x, y});

        const isSidePoint = (p: Point2D, index: number, length: number) => {
            if (index === activeSide) {
                return true;
            } else {
                const pIndex = index - 1 < 0 ? length - 1 : index - 1;

                if (pIndex === activeSide) {
                    return true;
                }
            }

            return false;
        }

        const moveSide = (p: Point2D, index: number, length: number) => {
            return isSidePoint(p, index, length) ? movePoint(p) : p;
        }

        if (activeSide !== -1) {
            setPoints(
                points.map((p, j, a) => moveSide(p, j, a.length))
            );
        }
        setStartSide({x, y});
    }
}

const movePoint = (setPoints: Dispatch<Point2D[]>, points: Point2D[], snap: boolean, index: number) => {
    return (e: Konva.KonvaEventObject<DragEvent>) => {
        const snapFun = (step: number) => {
            return (value: number) => Math.round(value / step) * step;
        }

        const snap10 = snapFun(10);

        const x: number = snap ? snap10(e.target.attrs.x) : e.target.attrs.x;
        const y: number = snap ? snap10(e.target.attrs.y) : e.target.attrs.y;

        if (snap) {
            e.target.setPosition({x, y});
        }

        setPoints(
            points.map((p, j) => {
                if (j === index)
                    return {x, y};
                return p;
            })
        );
    }
}

const moveEnd = () => {
    return (e: Konva.KonvaEventObject<DragEvent>) => {
        if (false) {
            let x = e.target.attrs.x;
            let y = e.target.attrs.y;
            x = Math.floor(x / 10) * 10;
            y = Math.floor(y / 10) * 10;
            e.target.setPosition({x, y});
        }
    }
}

const moveOver = (setPoint: Dispatch<number>, mode: string, index: number) => {
    return (e: Konva.KonvaEventObject<DragEvent>) => {
        if (mode === "move") {
            setPoint(index);
            // @ts-ignore
            const container = e.target.getStage().container();
            container.style.cursor = "move";
        }
    }
}

const moveLeave = (setPoint: Dispatch<number>, mode: string) => {
    return (e: Konva.KonvaEventObject<DragEvent>) => {
        if (mode === "move") {
            setPoint(-1);
            // @ts-ignore
            const container = e.target.getStage().container();
            container.style.cursor = "default";
        }
    }
}

const moveStart = (lineRef: React.RefObject<typeof Line | undefined>) => {
    return (e: Konva.KonvaEventObject<DragEvent>) => {
        if (lineRef.current) {
            // @ts-ignore
            lineRef.current.lineJoin("round");
        }
    }
}

const addPoint = (setPoints: Dispatch<Point2D[]>, points: Point2D[], mode: string) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (mode === 'add') {
            // @ts-ignore
            setPoints([...points, {x: e.evt.layerX, y: e.evt.layerY}]);
        }
    }
}

const removePoint = (setPoints: Dispatch<Point2D[]>, points: Point2D[], mode: string, index: number) => {
    return (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (mode === "del") {
            setPoints(points.filter((_, j) => j !== index));
        }
    }
}

const areas = [
    {
        name: 'area1',
        offset: {
            x: 0, y: 0
        },
        zIndex: 0,
        color: 'transparent',
        points: [
            {x: 0, y: 0}
        ]
    }
]

//FIXME
const zoomFun = (setPoints: Dispatch<Point2D[]>, points: Point2D[]) => {
    return (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = e.currentTarget;
        // const stage = this.stageRef.getStage();
        // const stage = e.target.getStage();

        const oldScale = stage.scale() || 1;
        // @ts-ignore
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()),
            y: (pointer.y - stage.y()),
        };

        const scaleBy = 1.01;
        const newScale = e.evt.deltaY > 0 ? oldScale.x * scaleBy : oldScale.x / scaleBy;

        stage.scaleX(newScale);
        stage.scaleY(newScale);

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        }

        stage.position(newPos);
        setPoints(points.map(p => p));
    }
}

const PlainEditor = () => {
    const [image] = useImage(tree);
    const [points, setPoints] = useState<Point2D[]>([
        {x: 10, y: 10},
        {x: 100, y: 100},
        {x: 150, y: 50}
    ]);
    const [mode, setMode] = useState("move");
    const [snap, setSnap] = useState(false);
    const [mousePoint, setPoint] = useState(-1);
    const [startSide, setStartSide] = useState<Point2D | undefined>(undefined);
    const [activeSide, setActiveSide] = useState<number>(-1);

    const lineRef: React.RefObject<typeof Line | undefined> = useRef<typeof Line>();

    const removePointsIndex = (index: number) => removePoint(setPoints, points, mode, index);
    const movePointIndex = (index: number) => movePoint(setPoints, points, snap, index);
    const addPointMode = (mode: string) => addPoint(setPoints, points, mode);
    const moveOverMode = (index: number) => moveOver(setPoint, mode, index);
    const mouseLeaveMode = () => moveLeave(setPoint, mode);
    const moveSideIndex = (index: number) => moveSide(setPoints, points, setStartSide, startSide, index);
    // const enterSideIndex = (index: number) => enterSide(setEnter, points, index);
    const downSideIndex = (index: number) => downSide(setActiveSide, activeSide, index);
    const upSideIndex = (index: number) => upSide(setStartSide, index);
    const stageMouseMoveCurr = () => stageMouseMove(setPoints, points, setStartSide, startSide, activeSide);

    const circles = points
        .map((point, index) =>
            <Circle key={index}
                    radius={6}
                    x={point.x}
                    y={point.y}
                    fill={'black'}
                    lineCap="round"
                    lineJoin="round"
                    opacity={1}
                    scale={index === mousePoint ? {x: 1.5, y: 1.5} : {x: 1.0, y: 1.0}}
                    draggable={mode === "move"}
                    onClick={removePointsIndex(index)}
                    onMouseOver={moveOverMode(index)}
                    onMouseLeave={mouseLeaveMode()}
                    onDragStart={moveStart(lineRef)}
                    onDragEnd={moveEnd()}
                    onDragMove={movePointIndex(index)}
            />)


    const dist = (p1: Point2D, p2: Point2D) =>
        "" + Math.round(Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)));

    const texts = points
        .filter((_, index, array) => index !== array.length - 1)
        .map((point, index, array) =>
            <Text key={index}
                  fontSize={20}
                  text={dist(point, points[index + 1])}
                  x={(point.x + points[index + 1].x) / 2}
                  y={(point.y + points[index + 1].y) / 2}
            />)
        .concat(
            <Text key={points.length}
                  fontSize={20}
                  text={dist(points[0], points[points.length - 1])}
                  x={(points[0].x + points[points.length - 1].x) / 2}
                  y={(points[0].y + points[points.length - 1].y) / 2}
            />
        );

    const angles = Array.from({length: points.length - 0}, (v, k) => k + 0)
        .map(k => <Shape
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.arc(0, 0, 30,
                    foo(points, k).start,
                    foo(points, k).end,
                    false);
                // @ts-ignore
                context.lineWidth = 2;
                context.stroke();
            }}
            x={points[k].x}
            y={points[k].y}
        />);

    const width = window.innerWidth;
    const height = 500;

    const grids = [];
    for (let r = 0; r < width / 100; r++) {
        for (let c = 0; c < height / 100; c++) {
            grids.push(<Rect x={r * 100} y={c * 100} width={100} height={100} strokeWidth={0.5}
                             stroke={"gray"}/>);
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
        <Stage
            onMouseUp={(e: Konva.KonvaEventObject<MouseEvent>) => {
                setActiveSide(-1);
                // @ts-ignore
                const container = e.target.getStage().container();
                container.style.cursor = "default";
            }}
            onMouseMove={stageMouseMoveCurr()}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onWheel={zoomFun(setPoints, points)}
            width={width}
            height={height}
            onClick={addPointMode(mode)}>
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
            </Layer>
            <Layer>
                {/*@ts-ignore*/}
                {/*<Line ref={lineRef}*/}
                {/*      points={points.flatMap(p => [p.x, p.y])}*/}
                {/*      stroke={'black'}*/}
                {/*      strokeWidth={5}*/}
                {/*      closed={true}*/}
                {/*      onMouseMove={() => console.log('x')}*/}
                {/*    // fill={'hsl(120,60%,86%)'}*/}
                {/*/>*/}
                {
                    points.concat(points[0]).map((p, i, a) => <Line
                        points={
                            a.slice(i, i + 2).flatMap(p => [p.x, p.y])
                        }
                        stroke="black"
                        strokeWidth={5}
                        // draggable={mode === "move"}
                        // onDragMove={moveSideIndex(i)}
                        // onMouseEnter={}
                        // onMouseLeave={}
                        onMouseDown={downSideIndex(i)}
                        // onMouseUp={upSideIndex(i)}
                        // onMouseMove={moveSideIndex(i)}
                    />).slice(0, -1)
                }
                {
                    angles.map(angle => angle)
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

class PlainEditorPage extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div style={{position: 'relative'}}>
            <div>
                1 : 100 + - v^
            </div>
            <PlainEditor/>
            <ItemSidebar/>
            <EditorPanel/>
            <GardenConsole/>
        </div>
    }
}

export default PlainEditorPage;
