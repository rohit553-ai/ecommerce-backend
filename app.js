const express = require("express");
const app = express();
const {CustomError} = require("./helpers")

require("dotenv").config();
const db = require("./models");

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

app.get("/", (req, res, next)=>{
  return res.status(200).json("Hello from FYP")
})
app.use("/api", require("./routes"));

app.use("*", (req, res, next)=>{
  return next(new CustomError(`${req.originalUrl} not found`, 404))
})

app.use(require("./middlewares/errorHandler"))

app.listen(4000, ()=>{
  console.log("listening to port 4000")
})