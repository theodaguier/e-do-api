const express = require("express");
const router = express.Router();
const app = express();

const { CurrentSessionsController } = require("../controllers");

router.get("/", CurrentSessionsController.get.bind(CurrentSessionsController));

router.get(
  "/:id",
  CurrentSessionsController.getById.bind(CurrentSessionsController)
);

router.put(
  "/:id",
  CurrentSessionsController.update.bind(CurrentSessionsController)
);

router.post(
  "/:id",
  CurrentSessionsController.update.bind(CurrentSessionsController)
);

router.put(
  "/update-equipment/:id",
  CurrentSessionsController.updateEquipment.bind(CurrentSessionsController)
);

router.post(
  "/",
  CurrentSessionsController.post.bind(CurrentSessionsController)
);

router.post(
  "/:id",
  CurrentSessionsController.stopSession.bind(CurrentSessionsController)
);

module.exports = router;
