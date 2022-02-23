
console.clear();
//imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/ConnectDB");
//Initialisation express
const app = express();
app.use(express.json());
app.use(cors());
//les constants
const PORT = process.env.PORT;
//connect to DB
dbConnect();

//get images
app.use("/images", express.static("imageUploads"));
//creation serveur
app.listen(PORT, (err) => {
    err
      ? console.log("erreur ", err)
      : console.log("Server is running on port", PORT);
  });