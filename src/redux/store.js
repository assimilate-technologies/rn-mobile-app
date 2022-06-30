import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './reducers/RootReducer'

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage
}
const initialState = {}
const middlewares = [sagaMiddleware, thunk]
let devtools = (x) => x
const persistedReducer = persistReducer(persistConfig, RootReducer)
export const Store = configureStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools)
)
export const persistor = persistStore(Store);
