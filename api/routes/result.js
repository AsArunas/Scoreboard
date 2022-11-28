const express = require("express");
const router = express.Router();
const {
  CREATE_SCRB_RESULT,
  EDIT_TITLE,
  GET_RESULTS,
  GET_SCRB_RESULTS,
  GETRESULUTSSCRB,
} = require("../controllers/result");
router.post("/createScore", CREATE_SCRB_RESULT);
router.put("/editTitle/:id", EDIT_TITLE);
router.get("/getAllResults", GET_RESULTS);
router.get("/getAllResultsByScoreboardId/:id", GET_SCRB_RESULTS);

module.exports = router;
