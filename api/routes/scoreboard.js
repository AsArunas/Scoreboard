const express = require("express");
const router = express.Router();
const {
  CREATE_SCRB,
  EDIT_SCRB_NAME,
  EDIT_SCRB_DIREC,
  GET_ALL_SCRB,
  GET_SCRB_BY_ID,
} = require("../controllers/scoreboard");
router.post("/createScoreboard", CREATE_SCRB);
router.put("/editScoreboardName/:id", EDIT_SCRB_NAME);
router.put("/editScoreboardDirection/:id", EDIT_SCRB_DIREC);
router.get("/getAllScoreboards", GET_ALL_SCRB);
router.get("/getScoreboardById/:id", GET_SCRB_BY_ID);

module.exports = router;
