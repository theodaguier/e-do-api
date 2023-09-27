const GetCurrentSessionsModel = require("./GetCurrentSessionsModel");
const CreateCurrentSessionsModel = require("./CreateCurrentSessionsModel");

module.exports = {
  GetCurrentSessionsModel: new GetCurrentSessionsModel(),
  CreateCurrentSessionsModel: new CreateCurrentSessionsModel(),
};
