import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { DiscoveryDocument } from 'expo-auth-session'

interface Location {
  lat: number,
  lng: number
}

export interface AuthState {
  user: User | null
  sessionLoading: boolean
  sessionRequested: boolean
  token: string
  location?: Location
}

export interface User {
  nickname: string
  name: string
  picture: string
}

export interface LoginPayload {
  email: string
  password: string
  remember_me: boolean
}

const initialState: AuthState = {
  user: null,
  token: '',
  sessionLoading: false,
  sessionRequested: false,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.sessionLoading = false
    },
    setLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    unauthorize(state) {
      state.user = null
      state.sessionLoading = false
    },
    sessionRequest(state) {
      state.sessionRequested = true
      state.sessionLoading = true
    },
    // setLoginLoading(state, action: PayloadAction<boolean>) {
    //   state.loginLoading = action.payload
    // },
    // setCsrf(state, action: PayloadAction<{ csrf: string }>) {
    //   state.csrf = action.payload.csrf
    // },
  },
})

export const logoutRequest = createAction('auth/logoutRequest')
// export const sessionRequest = createAction('auth/sessionRequest')
export const getLocation = createAction('auth/getLocation')
export const loginRequest = createAction<DiscoveryDocument>('auth/loginRequest')

export const {
  setLocation,
  authorize,
  setToken,
  unauthorize,
  sessionRequest
} = auth.actions

export default auth.reducer
