const {
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
  getAllMonthProfitLoss,
  deleteSpecificTrades,
} = require("../controllers/trade.controller");
const authMiddleware = require("../middlewares/auth");

const tradeRouter = require("express").Router();

tradeRouter.get("/trades", authMiddleware, getAllTrades);
tradeRouter.post("/add", authMiddleware, addATrade);
tradeRouter.put("/update", authMiddleware, updateATrade);
tradeRouter.delete("/delete", authMiddleware, deleteATrade);
tradeRouter.get("/running", authMiddleware, getRunningTrades);
tradeRouter.get("/stopped", authMiddleware, getStoppedTrades);
tradeRouter.get("/weekly-summary", authMiddleware, getWeeklyProfitLoss);
tradeRouter.get("/monthly-summary", authMiddleware, getMonthlyProfitLoss);
tradeRouter.post("/update-summary", authMiddleware, UpdateProfitAndLoss);
tradeRouter.get("/overall-stats", authMiddleware, getOverallProfitLoss);
tradeRouter.post(
  "/specific/records",
  authMiddleware,
  getSpecificMonthAndYearStats
);
tradeRouter.get("/allmonth/summary", authMiddleware, getAllMonthProfitLoss);
tradeRouter.delete("/delete/specific", authMiddleware, deleteSpecificTrades)

module.exports = tradeRouter;
