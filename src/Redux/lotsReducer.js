let initialState = {
    lots: null,
};

const lotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET-LOTS': {
            return {...state, lots: action.lots}
        }
        default:
            return state;
    }
}


export default lotsReducer;

export const setLots = lots => {
    return {type: 'SET-LOTS', lots}
}