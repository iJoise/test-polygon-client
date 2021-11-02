import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice/authSlice";
import {appReducer} from "./appSlice/appSlice";
import {creditReducer} from "./creditFormSlice/creditFormSlice";
import {dadataReducer} from "./dadataSlice/dadataSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  credit: creditReducer,
  dadata: dadataReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, Action<string>>

// @ts-ignore
window.store = store;