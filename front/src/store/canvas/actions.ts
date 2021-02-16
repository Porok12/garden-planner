import * as actionTypes from "./types";

export const enableOrbitControls = () => ({
    type: actionTypes.ENABLE_ORBIT_CONTROLS
})

export const disableOrbitControls = () => ({
    type: actionTypes.DISABLE_ORBIT_CONTROLS
})

export const enableSky = () => ({
    type: actionTypes.ENABLE_SKY
})

export const disableSky = () => ({
    type: actionTypes.DISABLE_SKY
})

export const setBrushSize = (size: number) => ({
    type: actionTypes.SET_BRUSH_SIZE,
    size
})

export const setBrushOpacity = (opacity: number) => ({
    type: actionTypes.SET_BRUSH_OPACITY,
    opacity
})
