const multer = require("multer");
const sharp = require("sharp");
const {CustomError} = require("../helpers");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, "./uploads");
//   },
//   filename: function(req, file, cb) {
//       cb(null,Date.now()+"_"+file.originalname);
//   }
// });

const memoryStorage = multer.memoryStorage();

const filter = (req, file, cb)=>{
  if(file.mimetype.startsWith("image")){
    cb(null, true)
  }else{
    cb(new CustomError("Not an image! Please upload images only", 400), false);
  }
}

const upload = multer({storage:memoryStorage,
  limits:{
      fileSize: 1024 * 1024 * 4
  },
  fileFilter: filter
});

const resizeImage = (req, res, next)=>{
  try{
    if(!req.file) {
      return next()
    };
    console.log("why am I here")
    let originalname = req.file.originalname.split(".")
                        .slice(0, -1)
                        .join(".")+".jpeg";
    let filename = `${Date.now()}-${originalname}`
    req.file.filename = filename;
    req.file.path = "uploads/"+ filename;

      sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({quality: 90})
      .toFile(req.file.path);

      next();
  }catch(err){
    return next(new CustomError(err.message, 500))
  }
}

module.exports.upload = upload;
module.exports.resizeImage = resizeImage;
