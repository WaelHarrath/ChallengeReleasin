console.clear()
//imports
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imageUploads")
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1080 * 1080 * 150,
  },
})
const express = require('express')
const router = express.Router()

//import controllers
const {
  addAssignedAttribute,
  addAttribute,
  addAttributeValue,
  addProduct,
  addProductType,
  updateProduct,
  updateProductType,
  getAllProducts,
  getAllProductTypes,
  testController,
  getProductById,
  getProductTypeById,
  getAllAssignedAttribute,
  getAllAttributeValues,
  getAllAttributes
} = require('../controllers/ProductRoute.controller')

// routes
//test
router.get('/test',testController)
//add atribute value
router.post('/add-attribute-value',addAttributeValue)
//add attribute
router.post('/add-attribute',addAttribute)
//add assigned attribute
router.post('/add-assigned-attribute',addAssignedAttribute)
//add a product type
router.post('/add-product-type',addProductType)
//update a product type
router.post('/update-product-type/:productTypeId',updateProductType)
//get all product Types
router.get('/all-product-types',getAllProductTypes)
//add a product
router.post('/add-product', upload.single('productImg'),addProduct)
//update a product
router.post('/update-product/:productId', upload.single('productImg'),updateProduct)
//get all products
router.get('/all-products',getAllProducts)
//get product by ID
router.get('/all-products/:productId',getProductById)
//get product type by ID
router.get('/all-product-types/:productTypeId',getProductTypeById)

//get all assigned attributes
router.get('/all-assigned-attributes',getAllAssignedAttribute)
//get all attribute values
router.get('/all-attribute-values',getAllAttributeValues)
//get all attribute
router.get('/all-attributes',getAllAttributes)
module.exports = router
