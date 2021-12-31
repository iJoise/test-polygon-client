import {AppRootStateType} from "../store";
import {createSelector} from "@reduxjs/toolkit";

const dadataDomain = (state: AppRootStateType) => state.dadata

export const kladrSelector = createSelector(
  [dadataDomain],
  state => state
)