import { combineReducers, createStore } from "redux";
import appReducer from "./appReducer";

const combineReducer = combineReducers({
    reducers : appReducer
})

const store = createStore(combineReducer);

export default store;