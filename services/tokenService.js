const {VerificationToken} = require("../models");
let tokenService = {};

tokenService.add = async(data)=>{
  const tokenData = await VerificationToken.create(data);
  return tokenData;
}

tokenService.findOne = async(query)=>{
  const token = await VerificationToken.findOne({
    where: query
  })
  return token;
}

tokenService.delete = async(query)=>{
  return await VerificationToken.destroy({
    where: query
  })
}

module.exports = tokenService;