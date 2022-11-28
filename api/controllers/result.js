const ObjectId = require("mongoose").Types.ObjectId;
const ScoreboardResultSchema = require("../models/result");
const ScoreboardSchema = require("../models/scoreboard");

module.exports.CREATE_SCRB_RESULT = (req, res) => {
  const result = new ScoreboardResultSchema({
    scoreboard_id: req.body.scoreboard_id,
    points: req.body.points,
    title: req.body.title,
  });

  result.save().then((result) => {
    ScoreboardResultSchema.updateOne(
      { _id: result._id },
      { id: result._id }
    ).exec();
    ScoreboardSchema.updateOne(
      { _id: req.body.scoreboard_id },
      { $push: { results_ids: result._id.toString() } }
    ).exec();
    return res.status(200).json({
      statusMessage: "Task added successfully",
      result: result,
    });
  });
};

module.exports.EDIT_TITLE = (req, res) => {
  ScoreboardResultSchema.findByIdAndUpdate(req.params.id, {
    title: req.body.editedTitle,
  }).exec();
  return res.status(200).json({ statusMessage: "Eddited successfully." });
};

module.exports.GET_RESULTS = (req, res) => {
  ScoreboardResultSchema.find({}).then((results) => {
    return res.status(200).json({ allResults: results });
  });
};

module.exports.GET_SCRB_RESULTS = async function (req, res) {
  const data = await ScoreboardSchema.aggregate([
    {
      $lookup: {
        from: "results",
        localField: "results_ids",
        foreignField: "id",
        as: "scoreboard_results",
      },
    },
    {
      $match: { _id: ObjectId(req.params.id) },
    },
  ]).exec();
  const sorted = data[0].scoreboard_results.sort((a, b) => b.points - a.points);
  return res.status(200).json({ scoreboard: sorted });
};

module.exports.GETRESULUTSSCRB = (req, res) => {
  const scoreboardId = req.params.id;
  ScoreboardResultSchema.find({ scoreboard_id: scoreboardId })
    .sort([[`points`, -1]])
    .exec((err, docs) => {
      return res.status(200).json({ scores: docs });
    });
};
