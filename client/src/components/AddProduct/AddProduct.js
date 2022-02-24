import './AddProduct.css'
import React,{useEffect,useState} from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import {getAllProductTypes,addProduct} from "../../JS/Actions/ProductActions"
import {useDispatch,useSelector} from "react-redux"
import Axios from "axios"
import { Link } from 'react-router-dom'
function AddProduct() {
  const dispatch=useDispatch()
  useEffect(() => {
   dispatch(getAllProductTypes())
  }, []);
  const productType = useSelector((state) => state.productReducer.productType)
  const [productName,setProductName]=useState("")
  const [productDate,setProductDate]=useState()
  const [typeProduct,setTypeProduct]=useState()
  const[productAtt,setProductAtt]=useState([])
  const [productImage,setProductImage]=useState(null)
  const [productAttVal,setProductAttVal]=useState([])
  const [productAttributes,setProductAttributes]=useState("")
  const getAttributes=(typeProduct)=>{
Axios.get(`http://localhost:5000/products/all-product-types/${typeProduct}`).then((res)=>{
  setProductAtt(res.data.product.attributes)

}).catch((err)=>{
  console.log(err)
})
  }
useEffect(() => {
  getAttributes(typeProduct)
}, [typeProduct]);

const handleSubmit=()=>{
const ProductNew= new FormData();
ProductNew.append("name",productName);
ProductNew.append("created_at",productDate);
ProductNew.append("productTypeId",typeProduct);
ProductNew.append("assignedAttribute",productAttributes);
ProductNew.append("productImg",productImage);


dispatch(addProduct(ProductNew))
}
  return (
    <div
      className="add-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '22rem',
          height: 'auto',
          marginRight: '30px',
          marginLeft: '30px',
          marginBottom: '20px',
          marginTop: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: 'transparent',
          boxShadow: '0 10px 10px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Card.Header
          style={{
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            backgroundColor: '#277fa5',
            color: 'white',
          }}
        >
          Add Contact Product
        </Card.Header>

        <Card.Body>
          <Form onSubmit={(e)=>e.preventDefault()}>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: 'left' }}
            >
              <Form.Label>Product Name :</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                placeholder="Enter product name"
                name="name"
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: 'left' }}
            >
              <Form.Label>Created At :</Form.Label>
              <Form.Control type="date" onChange={(e)=>setProductDate(e.target.value)} />
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: 'left' }}
            >
              <Form.Label>Choose Product Type :</Form.Label>
              <Form.Select as="select" onChange={(e)=>{setTypeProduct(e.target.value)}}  aria-label="Choose Product Type">
              <option></option>
            {productType&&productType.map((el,i)=>{
              return <option key={i} value={el._id}>{el.name}</option>
            })}
               
             
              </Form.Select>
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: 'left' }}
            >
              <Form.Label>Import an Image :</Form.Label>
              <Form.Control
                type="file"
               onChange={(e)=>setProductImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: 'left' }}
            >
              <Form.Label>Select Attributes :</Form.Label>
              {productAtt.map((el,i)=>{
               return <div key={i} style={{display:"flex" ,alignItems:"center",flexDirection:"column"}}>
              <Form.Label>{el.name}</Form.Label>
              <Form.Select onChange={(e)=>setProductAttributes((prev)=>prev+","+e.target.value)} aria-label="Select Attributes">
              <option></option>
          {el.attributeValue.map((el,i)=>{
            return <option key={i} value={el.name}>{el.name}</option>
          })}
         
          </Form.Select>
              </div>
              })}
              
              
            </Form.Group>
         <Link to="/">
            <Button onClick={()=>handleSubmit()} variant="outline-primary add-button" type="submit">
              Add
            </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddProduct
