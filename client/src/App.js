import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ErrorPage from './components/Error/ErrorPage'
import HomePage from './components/HomePage/HomePage'
import AddProduct from './components/AddProduct/AddProduct'
import AddProductType from './components/AddProductType/AddProductType'
import UpdateProduct from './components/UpdateProduct/UpdateProduct'
import UpdateProductType from './components/UpdateProductType/UpdateProductType'
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/add-product-type" element={<AddProductType/>} />
        <Route path="/update-product" element={<UpdateProduct/>} />
        <Route path="/update-product-type" element={<UpdateProductType/>} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
 
    </div>
  )
}

export default App
