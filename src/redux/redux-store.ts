import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleWear, { ThunkAction } from 'redux-thunk';
import StudentInfoReducer from "./StudentsInfo";

let reducers = combineReducers({
    studentsInfo: StudentInfoReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWear))

export default store

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
