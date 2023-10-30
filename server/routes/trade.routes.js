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
} = require("../controllers/trade.controller");
const authMiddleware = require("../middlewares/auth");

const tradeRouter = require("express").Router();

tradeRouter.get("/trades", getAllTrades);
tradeRouter.post("/add", authMiddleware, addATrade);
tradeRouter.put("/update", authMiddleware, updateATrade);
tradeRouter.delete("/delete",authMiddleware, deleteATrade)
tradeRouter.get("/running",authMiddleware, getRunningTrades)
tradeRouter.get("/stopped",authMiddleware, getStoppedTrades)
tradeRouter.get("/weekly-summary",authMiddleware, getWeeklyProfitLoss)
tradeRouter.get("/monthly-summary",authMiddleware, getMonthlyProfitLoss)
tradeRouter.post("/update-summary",authMiddleware, UpdateProfitAndLoss)


module.exports = tradeRouter;
