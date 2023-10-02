const express = require("express");
const router = express.Router();
const app = express();

const { CurrentSessionsController } = require("../controllers");

router.get("/", CurrentSessionsController.get.bind(CurrentSessionsController));

router.get(
  "/:id",
  CurrentSessionsController.getById.bind(CurrentSessionsController)
);

router.post(
  "/",
  CurrentSessionsController.post.bind(CurrentSessionsController)
);

module.exports = router;
