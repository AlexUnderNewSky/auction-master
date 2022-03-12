import {combineReducers, createStore} from "redux";
import createLotReducer from "./createLotReducer";
import lotsReducer from "./lotsReducer";
import lotPageReducer from "./lotPageReducer";
import profileReducer from "./profileReducer";
import headerReducer from "./headerReducer";


let reducers = combineReducers({
    createLot: createLotReducer,
    lots: lotsReducer,
    lot: lotPageReducer,
    profile: profileReducer,
    header: headerReducer
})

const store = createStore(reducers);

window.store = store;

export default store;