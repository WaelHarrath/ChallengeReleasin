
console.clear();
//imports
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imageUploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});
const express = require("express");
const router = express.Router();
// routes
//add a product type
router.post("/add-product-type");
//update a product type
router.post("/update-product-type/:productTypeId");
//get all product Types
router.get('/product-types');
//add a product
router.post("/add-product",upload.single('productImg'));
//update a product
router.post("/update-product/:productId",upload.single('productImg'));
//get all products
router.get('/products');
 module.exports = router;