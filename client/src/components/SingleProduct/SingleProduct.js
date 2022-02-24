import "./SingleProduct.css"
import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Axios from "axios"
function SingleProduct( {
  id,
  name,
  productImg,
  productType,
  assignedAttributes,
  created_at,
} ) {


  const dispatch = useDispatch()
  const [assAtt,setAssAtt]=useState([])
  const getAssignAtt=(assignedAttributes)=>{
Axios.get(`http://localhost:5000/products/assigned-attributes/${assignedAttributes}`).then((res)=>{
  console.log(res.data.assignedAttribute.attributeValue); setAssAtt(res.data.assignedAttribute.attributeValue)
}).catch((err)=>console.log(err))
  }
 useEffect(() => {
  getAssignAtt(assignedAttributes)
 }, []);
  return (
    <div className="product-card-container">
      <Card
        className="product-card"
        style={{
          width: '20rem',
          height: '35rem',
          borderRadius: '10px',
        }}
      >
        <Card.Header>
          <img
            className="d-block w-100"
            src={process.env.REACT_APP_IMG_URL + productImg}
            alt="Img"
          />
        </Card.Header>
        <Card.Body>
          <div className="first-section">
            <Card.Text>  <span>
                <b>Name</b>
              </span>
              <br />
            {name}</Card.Text>
            <Card.Text>
              <span>
                <b>Attributes</b>
              </span>
              <br />
              {assAtt&&assAtt.map((el,i)=>{
        return <p key={i} style={{margin:"3px"}} >{el.name}</p>
               
              })}
            </Card.Text>
            <Card.Text>
              <span>
                <b>Product Type</b>
              </span>
              <br />

              {productType}
            </Card.Text>
          </div>
          <div className="buttons">
            <Link to={{ pathname: '/update-product', state: id }}>
              <Button variant="outline-primary edit-button">Edit</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct
