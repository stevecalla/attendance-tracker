const { Router } = require("express");
const router = Router();
const controller = require("./controller");

router
  .post("/passwordreset", controller.passwordreset);

module.exports = router;
