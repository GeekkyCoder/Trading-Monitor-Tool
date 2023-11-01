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
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)

  const upcomingWeekStart = new Date(currentWeekStart);
  upcomingWeekStart.setDate(currentWeekStart.getDate() + 7);

  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
      },
      {
        $match: {
          "trade_history.date": { $gte: currentWeekStart, $lte: upcomingWeekStart },
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
    res.status(200).json({ data: result,date:{currentWeekStart,upcomingWeekStart} });
  } catch (err) {
    res.status(500).json({ status: "error", msg: `could not update entry` });
  }
};

const getMonthlyProfitLoss = async (req, res) => {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const upcomingMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
      },
      {
        $match: {
          "trade_history.date": { $gte: currentMonthStart, $lt: upcomingMonthStart },
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
    res.status(200).json({ data: result, date: { currentMonthStart, upcomingMonthStart } });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "Could not update entry" });
  }
};

const getOverallProfitLoss = async (req, res) => {
  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
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

const getSpecificMonthAndYearStats = async (req, res) => {
  const { year, month } = req.query;

  const startOfMonth = new Date(`${year}-${month}-01`);
  const endOfMonth = new Date(year, month, 0);

  try {
    const result = await TradeModel.aggregate([
      {
        $unwind: "$trade_history",
      },
      {
        $match: {
          "trade_history.date": { $gte: startOfMonth, $lte: endOfMonth },
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

const getAllMonthProfitLoss = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  let results = [];

  for (let month = currentMonth; month < 12; month++) {
    const currentMonthStart = new Date(currentYear, month, 1);
    const upcomingMonthStart = new Date(currentYear, month + 1, 1);

    try {
      const result = await TradeModel.aggregate([
        {
          $unwind: "$trade_history",
        },
        {
          $match: {
            "trade_history.date": { $gte: currentMonthStart, $lt: upcomingMonthStart },
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

      results.push({
        month: currentMonthStart.getMonth() + 1, // Add 1 because months are zero-based
        year: currentMonthStart.getFullYear(),
        profit: result[0].total_profit,
        loss: result[0].total_loss,
      });
    } catch (err) {
      res.status(500).json({ status: "error", msg: "Could not update entry" });
      return; 
    }
  }

  res.status(200).json({ data: results });
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
  getOverallProfitLoss,
  getSpecificMonthAndYearStats,
  getAllMonthProfitLoss
};
