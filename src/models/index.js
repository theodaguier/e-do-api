const CurrentSessionsModel = require("./currentSession");
const EquipmentModel = require("./equipment");
const ClientModel = require("./client");
const ColoramaModel = require("./colorama");

module.exports = {
  CurrentSessionsModel: new CurrentSessionsModel(),
  EquipmentModel: new EquipmentModel(),
  ClientModel: new ClientModel(),
  ColoramaModel: new ColoramaModel(),
};
