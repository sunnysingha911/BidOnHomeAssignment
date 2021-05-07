import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

import CombinedReducer from "../reducers"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, CombinedReducer)

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const persistor = persistStore(store)

export { store, persistor }
