const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce-fyp", "root", "",{
  host:"127.0.0.1",
  dialect: "mysql",
  operatorAliases: false
}).then(()=>console.log("connected to database")).catch(err=>{
  console.log(err);
  console.log("failed connecting to database")
});

module.exports = sequelize;