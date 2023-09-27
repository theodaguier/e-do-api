const GetCurrentSessionsModel = require("./GetCurrentSessionsModel");
const CreateCurrentSessionsModel = require("./CreateCurrentSessionsModel");
const SessionModel = require("./SessionModel");

module.exports = {
  SessionModel,
  GetCurrentSessionsModel: new GetCurrentSessionsModel(),
  CreateCurrentSessionsModel: new CreateCurrentSessionsModel(),
};
