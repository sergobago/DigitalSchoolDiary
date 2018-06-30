import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import MainReducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['usertoken']
};

const persistedReducer = persistReducer(persistConfig, MainReducers);
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store);

export { store, persistor };