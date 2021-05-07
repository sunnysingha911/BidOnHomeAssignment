import * as actions from "../constants/ProductConstants"

const initialState = {
  loading: false,
  product: [],
  error: null,
  filteredProducts: [],
}

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PRODUCT_ADD_STARTED:
      return {
        ...state,
        loading: true,
        product: [...state.product],
        error: null,
      }
    case actions.PRODUCT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        product: [...state.product, payload],
        error: null,
      }
    case actions.PRODUCT_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        product: [...state.product],
        error: payload,
      }
    case actions.PRODUCT_FILTER:
      return {
        loading: false,
        error: null,
        product: [...state.product],
        filteredProducts: payload,
      }
    case actions.PRODUCT_EDIT_SUCCESS:
      return {
        product: payload,
      }
    default:
      return state
  }
}

export default ProductReducer
