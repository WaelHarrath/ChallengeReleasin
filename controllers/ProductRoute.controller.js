const Product = require('../models/ProductSchema')
const ProductType = require('../models/ProductTypeSchema')
//const AssignedAttribute = require('../models/AssignedAttributeSchema')
//const AttributeValue = require('../models/AttributeValueSchema')
//const Attribute = require('../models/AttributeSchema')

// add new product type
exports.addProductType = async (req, res) => {
  const name = req.body.name
  const attributes = req.body.attributes

  try {
    const newProductType = new ProductType({
      name,
      attributes,
    })
    const searchedProductType = await ProductType.findOne({ name, attributes })
    if (searchedProductType) {
      return res.status(400).send({ msg: 'Product Type already exists!' })
    }
    await newProductType.save()
    res
      .status(200)
      .send({
        ProductType: newProductType,
        msg: 'ProductType is saved with success',
      })
  } catch (error) {
    res
      .status(500)
      .send({ msg: 'can not save the ProductType!!', error: error })
  }
}
// update a product type
exports.updateProductType = async (req, res) => {
  const productTypeId = req.params.productTypeId
  const name = req.body.name
  const attributes = req.body.attributes
  try {
    await ProductType.findOne(
      { _id: productTypeId },
      (err, searchedProductType) => {
        if (err) {
          res.status(400).send({ msg: 'no product type with this id is found' })
        }
        if (searchedProductType) {
          if (name) searchedProductType.name = name
          if (attributes) searchedProductType.attributes = attributes
          let result = searchedProductType.save()
          if (result) {
            res
              .status(200)
              .send({ updated: result, msg: 'product type updated' })
          } else {
            res.status(400).send({ msg: 'error while updating' })
          }
        }
      },
    )
  } catch (error) {
    res.status(500).send({ msg: 'updating was unsuccessful !!', error: error })
  }
}

//add a new product
exports.addProduct=async(req,res)=>{
    const name=req.body.name;
    const productTypeId=req.body.productTypeId,
    const assignedAttributes=req.body.assignedAttribute,
    const productImg=req.file;
    try {
        const productType= await ProductType.findOne({_id:productTypeId});
        const newProduct= new Product({
            name,
            productImg,
            assignedAttributes,
            productType
        })
        const searchedProduct= await Product.findOne({name,productType,assignedAttributes})
        if(searchedProduct)
        {
            return res.status(400).send({ msg: 'Product already exists!' }) 
        }
        await newProduct.save()
        res
      .status(200)
      .send({
        product: newProduct,
        msg: 'Product is saved with success',
      })
    } catch (error) {
        res
        .status(500)
        .send({ msg: 'can not save the Product!!', error: error })
    }
    
}

//update a product
exports.updateProduct=async(req,res)=>{
    const productId=req.params.productId;
    const name=req.body.name;
    const productTypeId=req.body.productTypeId,
    const assignedAttributes=req.body.assignedAttribute,
    const productImg=req.file;
    try {
        await Product.findOne({_id:productId},(err,searchedProduct)=>{
            if (err) {
                res.status(400).send({ msg: 'no product with this id is found' })
              }
              if(searchedProduct){
                 if(name) searchedProduct.name=name;
                 if (assignedAttributes) searchedProduct.assignedAttributes=assignedAttributes
                 if(productImg) searchedProduct.productImg=productImg;
                 if(productTypeId){
                    const productType= await ProductType.findOne({_id:productTypeId});
                    if(productType){
                        searchedProduct.productType=productType;
                    }
                 } 
                 let result = searchedProduct.save()
          if (result) {
            res
              .status(200)
              .send({ updated: result, msg: 'product updated' })
          } else {
            res.status(400).send({ msg: 'error while updating' })
          }
              }
        })
        
    } catch (error) {
        res.status(500).send({ msg: 'updating was unsuccessful !!', error: error })
    }
}