import * as actionTypes from "./types";

const initialState: AppCanvasState = {
    orbitControls: {
        enabled: true
    },
    sky: {
        enabled: true
    },
    brush: {
        size: 4,
        opacity: 0.4
    }
}

const reducer = (
    state: AppCanvasState = initialState,
    action: AppCanvasAction
): AppCanvasState => {
    switch (action.type) {
        case actionTypes.ENABLE_ORBIT_CONTROLS:
            return {
                ...state,
                orbitControls: {
                    enabled: true
                },
            }
        case actionTypes.DISABLE_ORBIT_CONTROLS:
            return {
                ...state,
                orbitControls: {
                    enabled: false
                },
            }
        case actionTypes.ENABLE_SKY:
            return {
                ...state,
                sky: {
                    enabled: true
                },
            }
        case actionTypes.DISABLE_SKY:
            return {
                ...state,
                sky: {
                    enabled: false
                },
            }
        case actionTypes.SET_BRUSH_SIZE:
            return {
                ...state,
                brush: {
                    size: action.payload || 4,
                    opacity: state.brush.opacity
                },
            }
        case actionTypes.SET_BRUSH_OPACITY:
            return {
                ...state,
                brush: {
                    size: state.brush.size,
                    opacity: action.payload || 0.4
                },
            }
    }

    return state;
}

export default reducer
