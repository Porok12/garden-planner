import React, {useRef, useState} from 'react';
import someSVG from '../assets/leaf.svg';
import {Button} from "react-bootstrap";
import {Vector3} from "three";
// import { ReactComponent as SomeSVG } from '../assets/tree.svg';

// const getTransformParameters = (element) => {
//     const transform = element.style.transform;
//     let scale = 1,
//         x = 0,
//         y = 0;
//     if (transform.includes("scale"))
//         scale = parseFloat(transform.slice(transform.indexOf("scale") + 6));
//     if (transform.includes("translateX"))
//         x = parseInt(transform.slice(transform.indexOf("translateX") + 11));
//     if (transform.includes("translateY"))
//         y = parseInt(transform.slice(transform.indexOf("translateY") + 11));
//     return { scale, x, y };
// };

// const getTransformString = (scale: number, x: number, y: number) =>
//     "scale(" + scale + ") translateX(" + x + "%) translateY(" + y + "%)";

// const zoom = (direction) => {
//     const { scale, x, y } = getTransformParameters(svg);
//     let dScale = 0.1;
//     if (direction == "out") dScale *= -1;
//     if (scale == 0.1 && direction == "out") dScale = 0;
//     svg.style.transform = getTransformString(scale + dScale, x, y);
// };



// const zoomFun = (zoom: number) => {
//
// }

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const rotation = 0;

    return [
        "M", start.x, start.y,
        "A", radius, radius, rotation, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

type Point2D = {
    x: number;
    y: number
}

const find_angle = (A: Point2D, B: Point2D, C: Point2D): any => {
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

function foo(points: Point2D[], i: number) {
    let A: Point2D = points[i - 1 < 0 ? points.length - 1 : i - 1];
    let B: Point2D = points[i];
    let C: Point2D = points[i + 1 < points.length ? i + 1 : 0];
    let R: Point2D = {
        x: points[i].x + 10,
        y: points[i].y
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

let pressed = false;

const TestingSVG = () => {
    const [zoom, setZoom] = useState<number>(1);
    const [center, setCenter] = useState<Point2D>({x: 0, y: 0});
    const [points, setPoints] = useState<Point2D[]>([
        {x: 10, y: 10},
        {x: 90, y: 190},
        {x: 190, y: 10}
    ]);

    const [selected, setSelected] = useState<number | undefined>();
    const svgRef: any = useRef();

    return <div>
        <div>
            <Button onClick={() => setCenter({ x: center.x + 10, y: center.y})}>{"<"}</Button>
            <Button onClick={() => setCenter({ x: center.x - 10, y: center.y})}>{">"}</Button>
            <Button onClick={() => setCenter({ x: center.x, y: center.y + 10})}>{"^"}</Button>
            <Button onClick={() => setCenter({ x: center.x, y: center.y - 10})}>{"v"}</Button>
            <Button onClick={() => {
                const newZoom = zoom * 1.1;
                setZoom(newZoom);
                setCenter({x: center.x + (1 - 1.1) * 100, y: center.y + (1 - 1.1) * 100});
            }}>{"+"}</Button>
            <Button onClick={() => {
                const newZoom = zoom * 0.9;
                setZoom(newZoom);
                setCenter({x: center.x + (1 - 0.9) * 100, y: center.y + (1 - 0.9) * 100});
            }}>{"-"}</Button>
        </div>
        <div style={{width: "100%", height: "100%"}}>
            <svg
                ref={svgRef}
                onWheel={(e) => {
                    // console.log(e)
                    const diff = e.deltaY;
                    const factor = diff > 0 ? 1.1 : 0.9;
                    const newZoom = zoom * factor;
                    setZoom(newZoom);
                    setCenter({x: center.x + (1 - factor) * 100, y: center.y + (1 - factor) * 100});
                }}
                onMouseMove={(e) => {
                    if (pressed) {
                        console.log(e.movementX, e.movementY);
                        setCenter({ x: center.x + e.movementX, y: center.y + e.movementY});
                    }
                }}
                onMouseDown={(e) => pressed = true}
                onMouseUp={(e) => pressed = false}

                preserveAspectRatio="xMidYMid meet"
                width="100%"
                height="400px"
                viewBox={"0 0 200 200"}
                style={{backgroundColor: "hsl(44,26%,84%)"}}
                // viewBox={`${center.x} ${center.y} ${200*zoom+center.x} ${200*zoom+center.y}`}
                // transform={`matrix(${zoom} 0 0 ${zoom} ${center.x} ${center.y})`}
                // transform={`scale(${zoom}) translate(${center.x} ${center.y})`}
                // style={{transition: "transform 0.1s linear 0.1s;"}}
                // viewBox="0 0 40 20"
                onClick={(e) => {
                    // const t = e.target;
                    // const dim = t.getBoundingClientRect();
                    // const x = t.clientX - dim.left;
                    // const y = t.clientY - dim.top;
                    // setPoints(points.concat({x: (e.clientX / 1920.0) * 200, y: (e.clientY / 400.0) * 200}));
                    // const target = e.target;
                    // // @ts-ignore
                    // const dim = target.getBoundingClientRect();
                    // const x = e.clientX - dim.left;
                    // const y = e.clientY - dim.top;
                    // // console.log({x, y})
                    // console.log(e);

                    const svg = svgRef.current;
                    // const svg = e.target;
                    // @ts-ignore
                    const pt = svg.createSVGPoint();
                    pt.x = e.clientX;
                    pt.y = e.clientY;
                    // @ts-ignore
                    const coords = pt.matrixTransform(svg.getScreenCTM().inverse())
                    console.log(coords);
                    setPoints(points.concat(coords));
                }}
            >
                <defs>
                    <pattern id="pattern1" x={10} y={10} width={20} height={20} patternUnits="userSpaceOnUse">
                        {/*<circle cx={10} cy={10} r={10} style={{stroke: "none"}} fill={"#00f"}/>*/}
                        <rect x={0} y={0} width={20} height={20} style={{stroke: "#0f0"}} fill={"none"}/>
                    </pattern>
                </defs>

                <g
                    transform={`scale(${zoom}) translate(${center.x} ${center.y})`}
                    // transform={`matrix(${zoom} 0 0 ${zoom} ${center.x} ${center.y})`}
                >
                    <rect x={0} y={0} width={200} height={200} style={{stroke: "#f00"}} fill={"url(#pattern1)"}
                          onClick={() => console.log("click")}/>
                    <polygon
                        points={points.reduce((p, c) => p + `${c.x},${c.y} `, "")}
                        fill={"#ff0"}/>
                    {
                        points.map((c, i) => <circle cx={c.x} cy={c.y} r={10}
                                                     onMouseDown={(e) => {
                                                         setSelected(i);
                                                     }}
                                                     onMouseUp={(e) => {
                                                         setSelected(undefined);
                                                     }}
                                                     onMouseMove={(e) => {
                                                         // console.log(e);
                                                         setPoints(points.map((c, j) => {
                                                             if (i === j) {
                                                                 return { x: c.x + e.movementX, y: c.y + e.movementY}
                                                             }

                                                             return c;
                                                         }))
                                                     }}
                        />)
                    }
                    {
                        points.map((c, i, a) => {
                            const f = foo(a, i);
                            f.start *= 180 / Math.PI;
                            f.end *= 180 / Math.PI;

                            return <path key={`arc-${i}`} d={describeArc(c.x, c.y, 12, f.start+90, f.end+90)}
                                         stroke="green" strokeWidth="5" fill="none"/>

                            // <path d={`M ${c.x-20} ${c.y} A 20 20 0 0 0 ${c.x+20} ${c.y+20}`}
                            //       stroke="green" strokeWidth="5" fill="none" />
                        })
                    }
                    <g>
                        {/*<image x="10" y="20" width="80" height="80" href={someSVG} />*/}
                        <use x="10" y="20" width="80" height="80" href={`${someSVG}#layer1`} />
                        {/*<svg>*/}
                            {/*<embed type="image/svg+xml" src={someSVG} />*/}
                            {/*<object type="image/svg_xml" data={someSVG} />*/}
                        {/*</svg>*/}
                    </g>
                    {/*<path*/}
                    {/*    id="path833"*/}
                    {/*    // style="opacity:1;fill:#008000;stroke-width:0.422267"*/}
                    {/*    d="m 97.748371,42.277548 c 0,0 -8.924021,9.171946 -24.435962,7.301704 -18.947773,-0.5377 -26.180978,4.362123 -32.679814,12.818865 -3.180883,5.811277 -4.502879,11.239533 -4.922631,15.784663 2.137802,-1.528754 4.46956,-2.959586 6.919298,-4.351644 9.259776,-5.261586 10.798949,-4.531921 20.444935,-4.625158 7.273882,-0.07031 11.439918,-4.274355 11.439918,-4.274355 0,0 1.605146,1.230188 -4.381437,4.309678 -8.619301,4.433756 -15.627113,0.855551 -24.738627,6.805927 -2.544776,1.446033 -4.947756,3.03498 -7.165451,4.713225 -6.098734,4.250867 -8.703736,9.11226 -10.695661,11.72536 l 1.852355,0.544878 2.281386,0.915045 c 0.733679,-2.767728 1.37732,-4.204206 4.462773,-6.29172 20.940896,2.495556 45.260342,-11.453987 55.772462,-29.731039 6.388199,-11.407069 5.846456,-15.645429 5.846456,-15.645429 z" />*/}
                </g>
            </svg>
            {/*<SomeSVG />*/}
        </div>
    </div>
}

export default TestingSVG;