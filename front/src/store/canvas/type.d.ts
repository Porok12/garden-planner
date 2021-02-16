type AppCanvasState = {
    orbitControls: {
        enabled: boolean;
    },
    sky: {
        enabled: boolean;
    },
    brush: {
        size: number,
        opacity: number,
        color: [number, number, number]
    }
}

type AppCanvasAction = {
    type: string,
    payload?: number
}

type DispatchType = (args: CanvasAction) => CanvasAction
