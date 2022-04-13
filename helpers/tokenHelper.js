let tokenHelpers = {};

tokenHelpers.generateRandomToken = ()=>{
  return Math.floor((Math.random()*900000) + 100000)
}

module.exports = tokenHelpers;