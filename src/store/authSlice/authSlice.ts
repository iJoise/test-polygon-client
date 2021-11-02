import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types";
import {AuthService} from "../../api/service/auth-sevice";
import axios from "axios";
import {AuthResponse, LoginPayload, RegistrationPayload} from "../../api/types";
import {API_URL} from "../../api/api-config";
import {isAxiosError} from "../../utils/error-server-handler";
import {handleAppError, setAppStatus} from "../appSlice/appSlice";
import {AppDispatch} from "../store";


const authInitialState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false
}

export const loginAT = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, {dispatch}: {dispatch: AppDispatch}) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await AuthService.login(payload);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(handleAppError(err.response?.data.message))
      }
    } finally {
      dispatch(setAppStatus('success'))
    }
  }
)

export const registrationAT = createAsyncThunk(
  'auth/registration',
  async (payload: RegistrationPayload, {dispatch}: {dispatch: AppDispatch}) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await AuthService.registration(payload);
      console.log(response)
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(handleAppError(err.response?.data.message))
      }
    } finally {
      dispatch(setAppStatus('success'))
    }
  }
)
export const logoutTS = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch}: {dispatch: AppDispatch}) => {
    try {
      dispatch(setAppStatus('loading'))
      await AuthService.logout();
      localStorage.removeItem('token');
      dispatch(setAuth(false));
      dispatch(setUser({} as IUser));
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(handleAppError(err.response?.data.message))
      }
    } finally {
      dispatch(setAppStatus('success'))
    }
  }
)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, {dispatch}: {dispatch: AppDispatch}) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await axios.get<AuthResponse>(
        `${API_URL}/refresh`,
        {withCredentials: true}
      )
      localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(handleAppError(err.response?.data.message))
      }
    } finally {
      dispatch(setAppStatus('success'))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  }
})

const {setUser, setAuth} = authSlice.actions;
export const authReducer = authSlice.reducer;
