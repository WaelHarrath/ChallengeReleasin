const Product = require('../models/ProductSchema')
const ProductType = require('../models/ProductTypeSchema')
const AssignedAttribute = require('../models/AssignedAttributeSchema')
const AttributeValue = require('../models/AttributeValueSchema')
const Attribute = require('../models/AttributeSchema')

//add attribute value
exports.addAttributeValue= async(req,res)=>{
    const name=req.body.name;
    const boolType=req.body.boolType;
    const date=req.body.date;
    try {
        const newAttributeValue= new AttributeValue({
            name, boolType,date
        })
        const searchedAttValue=AttributeValue.findOne({name,boolType,date})
        if(searchedAttValue){
            return res.status(400).send({ msg: 'Attribute Value already exists!' })
        }
        await newAttributeValue.save();
        res
      .status(200)
      .send({
        AttributeValue: newAttributeValue,
        msg: 'Attribute Value is saved with success',
      })
    } catch (error) {
        res
      .status(500)
      .send({ msg: 'can not save theAttribute Value!!', error: error })
  }
    
}
// add attribute 
exports.addAttribute=async(req,res)=>{
const name= req.body.name;
const type=req.body.type;
const AttributeValueId=req.body.AttributeValueId;
try {
    const attributeValue= AttributeValue.findOne({_id:AttributeValueId})
    const searchedAttribute=Attribute.findOne({name,type})
    if(attributeValue){
        if(!searchedAttribute){
            const newAttribute= new Attribute({
                name,type,attributeValue
            })
            await newAttribute.save()
            res
      .status(200)
      .send({
        newAttribute: newAttribute,
        msg: 'new Attribute is saved with success',
      })
        }else{
            return res.status(400).send({ msg: 'Attribute already exists!' })
        }

    }else{
        return res.status(400).send({ msg: 'Attribute value does not exist !' })
    }
} catch (error) {
    res
    .status(500)
    .send({ msg: 'can not save the Attribute!!', error: error })
}
}
//add assigned attribute
exports.addAssignedAttribute=async(req,res)=>{
    const attributeValueId=req.body.attributeValue;
    try {
        const attributeValue=AttributeValue.findOne({_id:attributeValueId})
        if(attributeValue){
            const newAssignedAttribute= new AssignedAttribute({
                attributeValue
            })
            await newAssignedAttribute.save()
            .status(200)
      .send({
        newAssignedAttribute: newAssignedAttribute,
        msg: 'new Assigned Attribute is saved with success',
      })
        }else{
            return res.status(400).send({ msg: 'Attribute value dont exists!' })
        }
    } catch (error) {
        res
    .status(500)
    .send({ msg: 'can not save new Assigned Attribute!!', error: error })
    }
}
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