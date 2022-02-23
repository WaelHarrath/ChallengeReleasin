const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductTypeSchema = new schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at:{ type: Date},
  attributes:[{type:schema.Types.ObjectId,ref:"attribute"}]

})
module.exports = mongoose.model('productType', ProductTypeSchema)
