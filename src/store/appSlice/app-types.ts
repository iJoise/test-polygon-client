import {Nullable} from "../../types";

export type AppInitialStateType = {
  errorMessage: Nullable<string>,
  appStatus: AppStatusType
}

export type AppStatusType = 'success' | 'loading' | 'error'
