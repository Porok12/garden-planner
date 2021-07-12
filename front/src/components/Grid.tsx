import React, {Component, useEffect, useState} from 'react';
import {Rect} from "react-konva";
import pattern1 from "../assets/simple-grid.png";
import useImage from "use-image";

type GridProps = {
    stagePosition: { x: number, y: number };
}

const Grid = (props: GridProps) => {
    const cellSize = 100;
    const offsetX = 0;
    const offsetY = 0;
    const width = 1920;
    const height = 500;

    const amountX = (width / cellSize);
    const amountY = (height / cellSize);

    console.log(props.stagePosition);

    const stageOffsetX = Math.floor(props.stagePosition.x / cellSize) * cellSize;
    const stageOffsetY = Math.floor(props.stagePosition.y / cellSize) * cellSize;
    console.log(stageOffsetX);

    const [pattern, status] = useImage(pattern1);
    // const [pattern, setPattern] = useState<HTMLImageElement | undefined>(undefined);
    // useEffect(() => {
    //     const image = new Image();
    //     image.onload = function () {
    //         setPattern(image);
    //     }
    //     image.src = pattern1;
    // }, []);

    const grid: Array<any> = []
    for (let x = -1; x < amountX; x++) {
        for (let y = -1; y < amountY; y++) {
            grid.push(
                <Rect
                    x={offsetX + cellSize * x - stageOffsetX}
                    y={offsetY + cellSize * y - stageOffsetY}
                    width={cellSize}
                    height={cellSize}
                    strokeWidth={0.8}
                    stroke={"black"}
                    shadowForStrokeEnabled={false}
                    // fill={"black"}
                    fillPatternImage={pattern}
                    // fillPatternRotation={45}
                    // fillPatternX={20}
                    // fillPatternOffsetX={20}
                />
            )
        }
    }
    return <>
        <Rect
            x={offsetX - cellSize - stageOffsetX}
            y={offsetY - cellSize - stageOffsetY}
            width={cellSize * (amountX + 1)}
            height={cellSize * (amountY + 1)}
            strokeWidth={0.8}
            stroke={"black"}
            shadowForStrokeEnabled={false}
            // fill={"black"}
            fillPatternImage={pattern}
            fillPatternRepeat={"repeat"}
            // fillPatternRotation={45}
            // fillPatternX={20}
            // fillPatternOffsetX={20}
        />
        {/*{ grid }*/}
    </>
}

export default Grid;