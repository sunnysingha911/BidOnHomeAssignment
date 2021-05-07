import * as actions from "../constants/ProductConstants"

export const addProducts = (product) => {
  return (dispatch) => {
    dispatch({
      type: actions.PRODUCT_ADD_STARTED,
    })
    try {
      dispatch({
        type: actions.PRODUCT_ADD_SUCCESS,
        payload: product,
      })
    } catch (e) {
      dispatch({
        type: actions.PRODUCT_ADD_FAILURE,
        payload: "Error in adding product",
      })
    }
  }
}

export const filterProducts = (price = [], quantity = [], name) => {
  return (dispatch, getState) => {
    const { product } = getState().product
    let filteredProduct = product ? product : []
    if (price.length > 0) {
      filteredProduct = filteredProduct.filter((prod) =>
        price.find((p) => p >= parseInt(prod.price))
      )
    }
    if (quantity.length > 0) {
      filteredProduct = filteredProduct.filter((prod) =>
        quantity.find((q) => q >= parseInt(prod.quantity))
      )
    }

    if (name) {
      filteredProduct = filteredProduct.filter((prod) => prod.name === name)
    }

    dispatch({
      type: actions.PRODUCT_FILTER,
      payload: filteredProduct,
    })
  }
}

export const editProduct = (id, data) => {
  return (dispatch, getState) => {
    const { product } = getState().product
    dispatch({
      type: actions.PRODUCT_EDIT_STARTED,
    })
    dispatch({
      type: actions.PRODUCT_EDIT_SUCCESS,
      payload: product.map((prod) =>
        prod.productId === id ? { ...data, productId: id } : { ...prod }
      ),
    })
  }
}
