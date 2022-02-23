const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AssignedAttributeSchema= new schema (
    {
        attributeValue:{type:schema.Types.ObjectId,ref:"attributeValue"},
      
    }
);
module.exports = mongoose.model("assignedAttribute", AssignedAttributeSchema);