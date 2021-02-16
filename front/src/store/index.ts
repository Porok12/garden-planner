import { createStore } from "redux";
import rootReduced from "./rootReduced";

// @ts-ignore
const store = createStore(rootReduced, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
