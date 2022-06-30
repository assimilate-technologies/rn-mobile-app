import thunk from 'redux-thunk'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootReducer from './reducers/rootReducer';

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage
}
const initialState = {}
// const middlewares = [sagaMiddleware, thunk]
let devtools = (x) => x
const persistedReducer = persistReducer(persistConfig, RootReducer)
export const Store = createStore(
    persistedReducer,
    initialState,
    // compose(applyMiddleware(...middlewares), devtools)
)
export const persistor = persistStore(Store);
