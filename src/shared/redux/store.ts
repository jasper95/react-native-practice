import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import AsyncStorage from '@react-native-community/async-storage';
// import {persistReducer, persistStore} from 'redux-persist';
import rootSaga from './saga'
import reducer from './reducer'


const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer,
  preloadedState: {},
  middleware: [sagaMiddleware],
})
sagaMiddleware.run(rootSaga)
// export const persistor = persistStore(store);
export default store
