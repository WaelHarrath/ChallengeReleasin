const Product = require('../models/ProductSchema')
const ProductType = require('../models/ProductTypeSchema')
const AssignedAttribute = require('../models/AssignedAttributeSchema')
const AttributeValue = require('../models/AttributeValueSchema')
const Attribute = require('../models/AttributeSchema')

//test
exports.testController = async (req, res) => {
  res.status(200).send('hello server is running!!!')
}
//add attribute value
exports.addAttributeValue = async (req, res) => {
  const name = req.body.name
  const boolType = req.body.boolType
  const date = req.body.date
  try {
    const newAttributeValue = new AttributeValue({
      name,
      boolType,
      date,
    })

    await newAttributeValue.save()
    res.status(200).send({
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
exports.addAttribute = async (req, res) => {
  const name = req.body.name
  const type = req.body.type
  const attributeValueId = req.body.attributeValueId
  try {
    const attributeValue = await AttributeValue.findOne({
      _id: attributeValueId,
    })
    const attribute = await Attribute.findOne({ name })
    if (attribute) {
      attribute.attributeValue.push(attributeValue)
      await attribute.save()

      return res.status(200).send({
        newAttribute: attribute,
        msg: 'new Attribute is saved with success',
      })
    } else {
      const newAttribute = new Attribute({
        name,
        type,
        attributeValue,
      })
      await newAttribute.save()
      return res.status(200).send({
        newAttribute: newAttribute,
        msg: 'new Attribute is saved with success',
      })
    }
    //console.log(attributeValue)
  } catch (error) {
    res.status(500).send({ msg: 'can not save the Attribute!!', error: error })
  }
}
//add assigned attribute
exports.addAssignedAttribute = async (req, res) => {
  const attributeValue = req.body.attributeValue

  try {
    const newAssignedAtt= new AssignedAttribute({});
    const attArray = attributeValue.split(',')
      for (let i = 0; i < attArray.length; i++) {
      const res = await AttributeValue.findOne({ name: attArray[i] })
      newAssignedAtt.attributeValue.push(res)
      }
      await newAssignedAtt.save()
    res.status(200).send({
      newAssignedAttribute: newAssignedAtt,
      msg: 'new Assigned Attribute is saved with success',
    })
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
    })
    const searchedProductType = await ProductType.findOne({ name })
    if (searchedProductType) {
      return res.status(400).send({ msg: 'Product Type already exists!' })
    } else {
      const attArray = attributes.split(',')
      for (let i = 0; i < attArray.length; i++) {
      const res = await Attribute.findOne({ name: attArray[i] }).populate('attributeValue')
     newProductType.attributes.push(res)
     
      }
     
    }
    await newProductType.save()

     res.status(200).send({
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
exports.addProduct = async (req, res) => {
  const name = req.body.name
  const productTypeId=req.body.productTypeId;
  const assignedAttributes=req.body.assignedAttribute;
  const productImg = req.file.filename
  console.log("req.body",req.body)
  try {
    const productType= await ProductType.findOne({_id:productTypeId});
    const newProduct = new Product({
      name,
      productImg,
      productType
    })
    
      const newAssignedAtt= new AssignedAttribute({});
    const attArray = assignedAttributes.trim().split(',')
      for (let i = 0; i < attArray.length; i++) {
      const res = await AttributeValue.findOne({ name: attArray[i] })
      newAssignedAtt.attributeValue.push(res)
      }
      await newAssignedAtt.save()
      newProduct.assignedAttributes=newAssignedAtt;
    await newProduct.save()
    res.status(200).send({
      product: newProduct,
      msg: 'Product is saved with success',
    })
    
    
  } catch (error) {
    res.status(500).send({ msg: 'can not save the Product!!', error: error })
  }
}

//update a product
exports.updateProduct = async (req, res) => {
  const productId = req.params.productId
  const name = req.body.name
  const productTypeId = req.body.productTypeId
  const assignedAttributes = req.body.assignedAttribute
  const productImg = req.file
  try {
    const productType = await ProductType.findOne({ _id: productTypeId })
    await Product.findOne({ _id: productId }, (err, searchedProduct) => {
      if (err) {
        res.status(400).send({ msg: 'no product with this id is found' })
      }
      if (searchedProduct) {
        if (name) searchedProduct.name = name
        if (assignedAttributes)
          searchedProduct.assignedAttributes = assignedAttributes
        if (productImg) searchedProduct.productImg = productImg
        if (productTypeId) {
          if (productType) {
            searchedProduct.productType = productType
          }
        }
        let result = searchedProduct.save()
        if (result) {
          res.status(200).send({ updated: result, msg: 'product updated' })
        } else {
          res.status(400).send({ msg: 'error while updating' })
        }
      }
    })
  } catch (error) {
    res.status(500).send({ msg: 'updating was unsuccessful !!', error: error })
  }
}
//get all products
exports.getAllProducts = async (req, res) => {
  try {
    let result = await Product.find().populate('productType')
    if (result) {
      return res
        .status(200)
        .send({ result, msg: 'Found all products' })
    } else {
      return res.status(400).send({ msg: 'No product Found !' })
    }
  } catch (error) {
    res.status(500).send({ errors: error, msg: 'Error getting all products' })
  }
}
//get all product types
exports.getAllProductTypes = async (req, res) => {
  try {
    let result = await ProductType.find().populate({path:'attributes',populate:{path:"attributeValue"}})
    if (!result) {
      return res.status(400).send({ msg: 'No product types Found !' })
    }
    res.status(200).send({ products: result, msg: 'Found all products types' })
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting all products types' })
  }
}
//get product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.productId
  try {
    let result = await Product.findOne({ _id: productId })
    if (result) {
      return res
        .status(200)
        .send({ product: result, msg: 'Found the product with this iD' })
    } else {
      return res.status(400).send({ msg: 'No product with this iD is Found !' })
    }
  } catch (error) {
    res.status(500).send({ errors: error, msg: 'Error getting the product' })
  }
}
//get product Type by ID
exports.getProductTypeById = async (req, res) => {
  const productTypeId = req.params.productTypeId
  try {
    let result = await ProductType.findOne({ _id: productTypeId }).populate({path:'attributes',populate:{path:"attributeValue"}})
    if (result) {
      return res
        .status(200)
        .send({ product: result, msg: 'Found the product type with this iD' })
    } else {
      return res
        .status(400)
        .send({ msg: 'No product type with this iD is Found !' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting the product type' })
  }
}

//get all assigned attributes
exports.getAllAssignedAttribute = async (req, res) => {
  try {
    let result = await AssignedAttribute.find()
      .populate('attributeValue')
    if (result) {
      return res
        .status(200)
        .send({
          AllAssignedAttribute: result,
          msg: 'Found all Assigned attribute',
        })
    } else {
      return res.status(400).send({ msg: 'No Assigned attribute Found !' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting all Assigned attribute' })
  }
}
//get all attribute values
exports.getAllAttributeValues = async (req, res) => {
  try {
    let result = await AttributeValue.find()
    if (result) {
      return res
        .status(200)
        .send({ AllAttributeValue: result, msg: 'Found all attribute values' })
    } else {
      return res.status(400).send({ msg: 'No attribute values Found !' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting all attribute values' })
  }
}
//get all attributes
exports.getAllAttributes = async (req, res) => {
  try {
    let result = await Attribute.find().populate('attributeValue')
    if (result) {
      return res
        .status(200)
        .send({ AllAttribute: result, msg: 'Found all attributes ' })
    } else {
      return res.status(400).send({ msg: 'No attributes  Found !' })
    }
  } catch (error) {
    res.status(500).send({ errors: error, msg: 'Error getting all attributes' })
  }
}
//get assigned attributes by Id
exports.getAssignedAttributesById=async(req,res)=>{
  const assignAttId=req.params.assignAttId
  try {
    let result = await AssignedAttribute.findOne({ _id: assignAttId }).populate('attributeValue')
    if (result) {
      return res
        .status(200)
        .send({ assignedAttribute: result, msg: 'Found the Assigned Attribute with this iD' })
    } else {
      return res
        .status(400)
        .send({ msg: 'No Assigned Attribute with this iD is Found !' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting the Assigned Attribute' })
  }
}
//get attribute value by id
exports.getAttributeValuesById=async(req,res)=>{
  const attrValId=req.body.attrValId

  try {
    let result = await Attribute.findOne({ name: attrValId }).populate("attributeValue")
    if (result) {
      return res
        .status(200)
        .send({ AttributeValue: result, msg: 'Found the Attribute value with this iD' })
    } else {
      return res
        .status(400)
        .send({ msg: 'No Attribute value with this iD is Found !' })
    }
  } catch (error) {
    res
      .status(500)
      .send({ errors: error, msg: 'Error getting the Attribute value' })
  }
}