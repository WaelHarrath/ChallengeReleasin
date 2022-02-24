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
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCT_TYPES_FAIL,
  GET_ALL_ATTRIBUTES,
  GET_ALL_ATTRIBUTES_FAIL,
  GET_ALL_ATTRIBUTE_VALUES,
  GET_ALL_ATTRIBUTE_VALUES_FAIL,
GET_ASSIGNED_ATTRIBUTES_BY_ID,
GET_ASSIGNED_ATTRIBUTES_BY_ID_FAIL
} from '../Constants/ProductConstants'

//initializing the state
const initialState = {
  products: [],
  productType: [],
  attribute: [],
  assignedAttributes: [],
  errors: null,
}

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: payload.result, errors: null }
    case GET_ALL_PRODUCTS_FAIL:
      return { ...state,products:[], errors: payload }
    case GET_ALL_PRODUCT_TYPES:
      return { ...state, productType: payload.products, errors: null }
    case GET_ALL_PRODUCT_TYPES_FAIL:
      return { ...state, productType: [], errors: payload }
    case GET_ALL_ATTRIBUTES:
      return { ...state, attribute: payload.AllAttribute, errors: null }
    case GET_ALL_ATTRIBUTES_FAIL:
      return { ...state, attribute: [], errors: payload }
      case GET_ASSIGNED_ATTRIBUTES_BY_ID:
        return { ...state, assignedAttributes: payload.assignedAttribute, errors: null } 
        case GET_ASSIGNED_ATTRIBUTES_BY_ID_FAIL:
        return { ...state, assignedAttributes: [], errors: payload } 
        case ADD_PRODUCT:
          return {...state,errors:null}
          case ADD_PRODUCT_FAIL:
            return{...state,errors:payload}
    default:
      return state
  }
}
