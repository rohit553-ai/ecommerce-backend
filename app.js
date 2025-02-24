const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"))

const {CustomError} = require("./helpers")

require("dotenv").config();
const db = require("./models");
const { khaltiService } = require("./services");

app.use(express.json());

const dbConnector = ()=>{
  console.log("might get stuck here")
  db.sequelize.authenticate().then(()=>{
    console.log("mysql connected");
  }).catch(err=>{
    console.log("Error connecting to db: ", err);
  }) 
}

dbConnector();

const prodImagePath = path.join(__dirname + "/uploads");

if(!fs.existsSync(prodImagePath)){
  fs.mkdirSync(prodImagePath);
  console.log("created directory ", prodImagePath, " for images")
}

app.use("/uploads", express.static(prodImagePath))

app.get("/", (req, res, next)=>{
  return res.status(200).json("Hello from FYP")
})
app.use("/api", require("./routes"));

app.get("/hehe", async(req, res, next)=>{
  khaltiService.verifyTransaction({
    token:"asdasdas",
    amount:1000
  })
})

app.use("*", (req, res, next)=>{
  return next(new CustomError(`${req.originalUrl} not found`, 404))
})

app.use(require("./middlewares").errorHandler)

app.listen(4000, ()=>{
  console.log("listening to port 4000")
})