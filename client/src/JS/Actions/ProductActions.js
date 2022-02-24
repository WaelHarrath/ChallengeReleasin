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
    GET_ALL_ASSIGNED_ATTRIBUTES,
    GET_ALL_ASSIGNED_ATTRIBUTES_FAIL
  } from '../Constants/ProductConstants.js'
  import axios from "axios"
//get all products
  export const getAllProducts=()=>async(dispatch)=>{
      
      try {
          let result= await axios.get('/products/all-products');
          dispatch({type:GET_ALL_PRODUCTS,payload:result.data})
      } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: error.response });
      }
  }
  //get all product types
  export const getAllProductTypes=()=>async(dispatch)=>{
      try {
          let result= await axios.get('/products/all-product-types')
          dispatch({type:GET_ALL_PRODUCT_TYPES,payload:result.data})
      } catch (error) {
        dispatch({ type: GET_ALL_PRODUCT_TYPES_FAIL, payload: error.response });
      }
  }

  //get All attributes
  export const getAllAttributes=()=>async(dispatch)=>{
try {
    let result= await axios.get('/products/all-attributes')
    dispatch({type:GET_ALL_ATTRIBUTES,payload:result.data})
} catch (error) {
    dispatch({type:GET_ALL_ATTRIBUTES_FAIL,payload: error.response})
}
  }
  //get All attribute values
  export const getAllAttributeValues=()=>async(dispatch)=>{
    try {
        let result= await axios.get('/products/all-attribute-values')
        dispatch({type:GET_ALL_ATTRIBUTE_VALUES,payload:result.data})
    } catch (error) {
        dispatch({type:GET_ALL_ATTRIBUTE_VALUES_FAIL,payload: error.response})
    }
  }
  //get all Assigned Attribute
  export const getAllAssignedAttribute=()=>async(dispatch)=>{
    try {
        let result= await axios.get('/products/all-assigned-attributes')
        dispatch({type:GET_ALL_ASSIGNED_ATTRIBUTES,payload:result.data})
    } catch (error) {
        dispatch({type:GET_ALL_ASSIGNED_ATTRIBUTES_FAIL,payload: error.response})
    }
  }