const GetCurrentSessionsModel = require("./GetCurrentSessionsModel");
const CreateCurrentSessionsModel = require("./CreateCurrentSessionsModel");
const SessionModel = require("./SessionModel");
const GetEquipmentModel = require("./GetEquipmentModel");

module.exports = {
  SessionModel,
  GetCurrentSessionsModel: new GetCurrentSessionsModel(),
  CreateCurrentSessionsModel: new CreateCurrentSessionsModel(),
  GetEquipmentModel: new GetEquipmentModel(),
};
