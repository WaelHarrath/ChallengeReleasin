import "./SingleProduct.css"
import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function SingleProduct( {
  id,
  name,
  productImg,
  productType,
  assignedAttributes,
  created_at,
} ) {


  const dispatch = useDispatch()
  return (
    <div className="product-card-container">
      <Card
        className="product-card"
        style={{
          width: '20rem',
          height: '30rem',
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

              {assignedAttributes}
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
