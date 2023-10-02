const CurrentSessionsModel = require("./currentSession");
const EquipmentModel = require("./equipment");
const ClientModel = require("./client");

module.exports = {
  CurrentSessionsModel: new CurrentSessionsModel(),
  EquipmentModel: new EquipmentModel(),
  ClientModel: new ClientModel(),
};
