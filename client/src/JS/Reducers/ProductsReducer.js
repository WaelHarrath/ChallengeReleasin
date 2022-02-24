import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCT_TYPES,
  LOADING,
  ADD_PRODUCT,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_TYPE,
  ADD_PRODUCT_TYPE_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_TYPE,
  UPDATE_PRODUCT_TYPE_FAIL,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_TYPE_BY_ID,
  GET_PRODUCT_TYPE_BY_ID_FAIL,
} from '../Constants/ProductConstants'

//initializing the state
const initialState = {
  products: [],
  productType: [],
  loading: false,
  errors: null,
}

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return { ...state }
    default:
      return state
  }
}
