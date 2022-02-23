const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductSchema = new schema({
  name: { type: String },
  productImg: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
  productType: { type: schema.Types.ObjectId, ref: 'productType' },
  assignedAttributes: [
    { type: schema.Types.ObjectId, ref: 'assignedAttribute' },
  ],
})
module.exports = mongoose.model('product', ProductSchema)
