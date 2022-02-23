const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AttributeValueSchema= new schema (
    {
        name:{type:String},
        boolType:{type:Boolean,default:false},
        date:{type:Date}
    }
);
module.exports = mongoose.model("attributeValue", AttributeValueSchema);