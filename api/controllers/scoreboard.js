const ScoreboardSchema = require("../models/scoreboard");

module.exports.CREATE_SCRB = (req, res) => {
  const scoreboard = new ScoreboardSchema({
    name: req.body.name,
    dateCreated: new Date(),
    scoreDirection: req.body.scoreDirection,
    results_ids: [],
  });

  scoreboard.save().then((result) => {
    return res.status(200).json({ response: "Scoreboard is created." });
  });
};

module.exports.EDIT_SCRB_NAME = (req, res) => {
  ScoreboardSchema.updateOne(
    { _id: req.params.id },
    { name: req.body.editedName }
  ).then((result) => {
    return res.status(200).json({
      statusMessage: "Eddited successfully",
      editedScoreboard: result,
    });
  });
};

module.exports.EDIT_SCRB_DIREC = async (req, res) => {
  const currentScoreboard = await ScoreboardSchema.findOne({
    _id: req.params.id,
  }).exec();
  console.log(currentScoreboard);

  function direction(value) {
    switch (value) {
      case "ASC":
        value = "DESC";
        break;
      case "DESC":
        value = "ASC";
    }
    return value;
  }

  ScoreboardSchema.updateOne(
    { _id: req.params.id },
    {
      scoreDirection: Direction(currentScoreboard.scoreDirection),
    }
  ).then((result) => {
    return res.status(200).json({
      statusMessage: "Eddited successfully",
      editedScoreboard: result,
    });
  });
};

module.exports.GET_ALL_SCRB = (req, res) => {
  ScoreboardSchema.find({}).then((results) => {
    return res.status(200).json({ scoreboards: results });
  });
};

module.exports.GET_SCRB_BY_ID = (req, res) => {
  ScoreboardSchema.findById(req.params.id).then((result) => {
    return res.status(200).json({ scoreboard: result });
  });
};
