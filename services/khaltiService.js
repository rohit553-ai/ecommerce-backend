const axios = require("axios");

async function verifyTransaction(payload){
  //   let data = {
  //     "token": "QUao9cqFzxPgvWJNi9aKac",
  //     "amount": 1000
  // };

  let config = {
      headers: {'Authorization': 'Key test_secret_key_d410bb4fa6864b238bf890b1607fce3e'}
  };
  try{
      const khaltiRes = await axios.post("https://khalti.com/api/v2/payment/verify/", payload, config);
      if(khaltiRes.status===200){
          return {
              status:"success"
          }
      }else{
          return {
              status:"fail"
          }
      }
  }catch(err){
      return {
          status:"error"
      }
  }     
}

module.exports = {verifyTransaction}