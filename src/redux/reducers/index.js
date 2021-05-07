import { combineReducers } from "redux"
import LoginReducer from "./LoginReducer"
import ProductReducer from "./ProductReducer"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["login", "product"],
}

const rootReducer = combineReducers({
  login: LoginReducer,
  product: ProductReducer,
})

export default persistReducer(persistConfig, rootReducer)
