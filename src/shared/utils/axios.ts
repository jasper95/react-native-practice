import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import store from '../redux/store'
import { unauthorize } from '../redux/auth/reducer'

const baseURL = 'https://dev-d4d12d1x.au.auth0.com'
const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    const { token } = store.getState().auth
    if (token && config.baseURL === baseURL) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err: Error) => {
    return Promise.reject(err)
  },
)

axiosInstance.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error: AxiosError) {
    const { response } = error
    if (response?.status === 401) {
      store.dispatch(unauthorize())
    } else if (response?.status === 500) {
      // const notification: Notification = { message: 'Something went wrong', type: 'error' }
      // store.dispatch(showError(notification))
    } else if (response?.status === 400) {
      // const notification: Notification = { message: response.data.message, type: 'error' }
      // store.dispatch(showError(notification))
    }
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axiosInstance
