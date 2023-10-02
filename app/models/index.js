const CurrentSessionsModel = require("./currentSession");
const EquipmentModel = require("./equipment");

module.exports = {
  CurrentSessionsModel: new CurrentSessionsModel(),
  EquipmentModel: new EquipmentModel(),
};
