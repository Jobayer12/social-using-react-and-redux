import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dataReducers from "./reducers/dataReducers";
import uiReducer from "./reducers/uiReducer";
import userReducer from "./reducers/userReducer";

const initialState = {};
const midleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducers,
  UI: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...midleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
