import { createStore, applyMiddleware } from "redux";
import meetingSlice from "./meetingSlice";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  meetingSlice,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
