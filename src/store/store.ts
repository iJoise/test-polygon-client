import {Action, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {authReducer} from "./authSlice/authSlice";
import {appReducer} from "./appSlice/appSlice";
import {creditReducer} from "./creditFormSlice/creditFormSlice";
import {dadataReducer} from "./dadataSlice/dadataSlice";
import {randomApi} from "../api/service/rtq-service";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  credit: creditReducer,
  dadata: dadataReducer,
  [randomApi.reducerPath]: randomApi.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(randomApi.middleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, Action<string>>

// @ts-ignore
window.store = store;