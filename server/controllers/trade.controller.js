const TradeModel = require("../modals/trade.modal");

const addATrade = async (req, res) => {
  const user = req.user.userId;

  if (!req.body.trade_name || !req.body.direction) {
    return res
      .status(400)
      .json({ status: "error", msg: "no field can be empty" });
  }

  try {
    const trade = await TradeModel.create({ ...req.body, user });
    res.status(201).json({ data: trade });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", msg: "adding entry failed" });
  }
};

const getAllTrades = async (req, res) => {
  try {
    const trades = await TradeModel.find({ user: req.user.userId });
    if (!trades) {
      return res
        .status(500)
        .json({ status: "error", msg: "could not fetch trades" });
    }
    res.status(200).json({ data: trades });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "something went wrong" });
  }
};

const getRunningTrades = async (req, res) => {
  try {
    const runningTrades = await TradeModel.find({
      status: "running",
      user: req.user.userId,
    });
    res.status(200).json({ data: runningTrades });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "something went wrong" });
  }
};

const getStoppedTrades = async (req, res) => {
  try {
    const stoppedTrades = await TradeModel.find({
      status: "stopped",
      user: req.user.userId,
    });
    res.status(200).json({ data: stoppedTrades });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "something went wrong" });
  }
};

const updateATrade = async (req, res) => {
  const { id } = req.query;

  try {
    const foundTrade = await TradeModel.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!foundTrade) {
      return res
        .status(500)
        .json({ status: "error", msg: `could not find trade with ${id}` });
    }

    const updatedTrade = await TradeModel.findOneAndUpdate(
      { _id: foundTrade._id, user: req.user.userId },
      { ...req.body },
      { upsert: true }
    );

    if (!updatedTrade) {
      return res
        .status(500)
        .json({ status: "error", msg: "could not update trade" });
    }

    return res.status(200).json({ data: updatedTrade });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: `could not update this trade ` });
  }
};

const UpdateProfitAndLoss = async (req, res) => {
  try {
    const foundTrade = await TradeModel.findById({ _id: req.query.id });

    if (!foundTrade)
      return res.status(400).json({
        status: "error",
        msg: `could not find trade with id ${req.query.id}`,
      });

    foundTrade.trade_history.push({
      date: new Date(),
      profit: req.body.profit,
      loss: req.body.loss,
    });

    foundTrade.save();

    return res.status(200).json({ data: foundTrade });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "error", msg: `could not update profit and loss` });
  }
};

const deleteATrade = async (req, res) => {
  const { id } = req.query;

  try {
    const foundTrade = await TradeModel.findOne({
      _id: id,
      user: req.user.userId,
    });
    if (!foundTrade) {
      return res
        .status(500)
        .json({ status: "error", msg: `could not find trade with id ${id}` });
    }

    await TradeModel.findByIdAndDelete({ _id: foundTrade._id });
    res.status(201).json({ data: `deleted ${foundTrade.trade_name}` });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", msg: `could not find trade with id ${id}` });
  }
};

const getWeeklyProfitLoss = async (req, res) => {
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
      },
      {
        $match: {
          "trade_history.date": { $gte: oneWeekAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: null,
          total_profit: { $sum: "$trade_history.profit" },
          total_loss: { $sum: "$trade_history.loss" },
        },
      },
    ]);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ status: "error", msg: `could not update entry` });
  }
};

const getMonthlyProfitLoss = async (req, res) => {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  // yearly
//   const today = new Date();
// const oneYearAgo = new Date(today);
// oneYearAgo.setFullYear(today.getFullYear() - 1)

  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
      },
      {
        $match: {
          "trade_history.date": { $gte: oneMonthAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: null,
          total_profit: { $sum: "$trade_history.profit" },
          total_loss: { $sum: "$trade_history.loss" },
        },
      },
    ]);
    res.status(200).json({ data: result });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", msg: `could not generate monthly report` });
  }
};

module.exports = {
  addATrade,
  getAllTrades,
  updateATrade,
  deleteATrade,
  getRunningTrades,
  getStoppedTrades,
  getWeeklyProfitLoss,
  getMonthlyProfitLoss,
  UpdateProfitAndLoss,
};
