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
