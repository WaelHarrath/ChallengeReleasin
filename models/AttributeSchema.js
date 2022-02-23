const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AttributeSchema= new schema (
    {
        name:{type:String},
        type:{type:schema.Types.Mixed},
        attributeValue:{type:schema.Types.ObjectId,ref:"attributeValue"}
    }
);
module.exports = mongoose.model("attribute", AttributeSchema);