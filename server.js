
console.clear();
//imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/ConnectDB");
const ProductRoute=require('./routes/ProductRoutes')
//Initialisation express
const app = express();
app.use(express.json());
app.use(cors());
//les constants
const PORT = process.env.PORT;
//connect to DB
dbConnect();

//product routes
app.use('/products',ProductRoute)

//get images
app.use("/images", express.static("imageUploads"));
//creation serveur
app.listen(PORT, (err) => {
    err
      ? console.log("erreur ", err)
      : console.log("Server is running on port", PORT);
  });