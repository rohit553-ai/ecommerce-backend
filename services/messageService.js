const {Message} =require("../models");

let messageService = {};

messageService.newMessage = async (data)=>{
  const createdMessage = await Message.create(data);
  return createdMessage
}

messageService.findAll = async (query)=>{
  return await Message.findAll({
    where: query
  })
}

module.exports = messageService;