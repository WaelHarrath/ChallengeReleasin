import "./HomePage.css"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../SingleProduct/SingleProduct'
import {
  getAllProducts,
  getAllProductTypes,
  getAllAttributes,
  getAllAssignedAttribute,
} from '../../JS/Actions/ProductActions'
function HomePage() {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.productReducer.products)
  const allAttribute = useSelector((state) => state.productReducer.attribute)
  useEffect(() => {
    //dispatch(getAllProducts())
    //dispatch(getAllAttributes())
    //dispatch(getAllProductTypes())
    dispatch(getAllProducts())
  }, [])

  return (
    <div className='container'>
      {allProducts&&allProducts.map((el, i) => {
        return (
          <SingleProduct
            key={i}
            id={el._id}
            name={el.name}
            productImg={el.productImg}
            productType={el.productType.name}
          assignedAttributes={el.assignedAttributes._id}
            created_at={el.created_at}
          />
        )
      })}
    </div>
  )
}

export default HomePage
