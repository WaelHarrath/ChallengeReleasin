import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProducts,
  getAllProductTypes,
  getAllAttributes,
  getAllAssignedAttribute,
} from '../../JS/Actions/ProductActions'
function HomePage() {
  const dispatch=useDispatch();
  useEffect(() => {
    //dispatch(getAllProducts())
    dispatch(getAllAttributes())

  }, []);
  return <div>HomePage</div>
}

export default HomePage
