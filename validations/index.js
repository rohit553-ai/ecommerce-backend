module.exports = Object.assign(
  {},
  require("./authValidator"),
  require("./checkErrors"),
  require("./categoryValidator"),
  require("./productValidator"),
  require("./subCategoryValidator"),
  require("./userValidator"),
  require("./reviewValidator"),
  require("./orderValidator")
)