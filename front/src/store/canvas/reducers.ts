import {createSlice} from "@reduxjs/toolkit";

const initialState: AppCanvasState = {
    orbitControls: {
        enabled: true
    },
    sky: {
        enabled: true
    },
    brush: {
        enabled: true,
        size: 4,
        opacity: 0.4,
        color: [0, 0, 0]
    }
}

type project = {
    name: string,
    north: [],
    size: [],
    borders: [],
    heightAboveSeaLevel: any,
    winds: []
    layers: {
        pH: any,
        groundWater: any,
        landform: any
    }
}

const slice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        enableOrbitControls(state, action) {
            state.orbitControls.enabled = true;
        },
        disableOrbitControls(state, action) {
            state.orbitControls.enabled = false;
        },
        enableSky(state, action) {
            state.sky.enabled = true;
        },
        disableSky(state, action) {
            state.sky.enabled = false;
        },
        setBrush(state, action) {
            state.brush.enabled = action.payload;
        },
        setBrushSize(state, action) {
            state.brush.size = action.payload;
        },
        setBrushOpacity(state, action) {
            state.brush.opacity = action.payload;
        },
        setBrushColor(state, action) {
            state.brush.color = action.payload;
        },
    }
});

export const { actions } = slice;
export default slice.reducer;
