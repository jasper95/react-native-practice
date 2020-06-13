import { call, put, takeLatest, putResolve, select } from 'redux-saga/effects'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-community/async-storage'
import {
  loginRequest,
  getLocation,
  User,
  authorize,
  sessionRequest,
  setToken,
  setLocation,
  unauthorize
} from './reducer'
import { Platform } from 'react-native'
import { PayloadAction } from '@reduxjs/toolkit'
import Config from '../../../config'
import axios from '../../utils/axios'

function* GetLocation() {
  if (navigator.geolocation) {
    const position = yield new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve))
    const coords = { lat: position.coords.latitude, lng: position.coords.longitude }
    yield put(setLocation(coords))
  }
}

function* GetUserSession() {
  try {
    const token = yield AsyncStorage.getItem('access_token')
    if (token) {
      yield putResolve(setToken(token))
      const result: User = yield call(axios.request, {
        url: '/userinfo',
      })
      yield put(authorize(result))
      return
    }
  } catch(err) {
    console.error(err)
  }
  yield put(unauthorize())
}

function* LoginUser(action: PayloadAction<AuthSession.DiscoveryDocument>) {
  const { payload: discovery }  = action
  const useProxy = Platform.select({ web: false, default: true });
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy,
  });
  try {
    const response: { params: { access_token: string }, error: object, type: string } = yield AuthSession
      .loadAsync({
        redirectUri,
        clientId: Config.auth0ClientId,
        responseType: AuthSession.ResponseType.Token,
        scopes: ["openid", "profile"],
      }, discovery)
      .then((request: AuthSession.AuthRequest) => request.promptAsync(discovery))
    if (response.error || response.type !== "success") {
      return;
    }
    yield AsyncStorage.setItem('access_token', response.params.access_token)
    yield put(sessionRequest())
  } catch(err) {
    console.error('err: ', err);
  }
}

function* LogoutUser() {
  try {
    AsyncStorage.removeItem('access_token')
  } catch(err) {
  }
}

export default function* rootSaga() {
  yield takeLatest(sessionRequest.type, GetUserSession)
  yield takeLatest(loginRequest.type, LoginUser)
  yield takeLatest(unauthorize.type, LogoutUser)
  yield takeLatest(getLocation.type, GetLocation)
}
