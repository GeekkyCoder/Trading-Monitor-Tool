const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    trade_name: { type: String, required: true },
    result: {
      type: String,
      enum: ["win", "loss", "entry Miss", "unknown","entry-miss","break-even"],
      default: "unknown",
    },
    status: { type: String, enum: ["running", "stopped"], default: "running" },
    risk_reward: { type: Number, required: true, default: 0.0 },
    direction: { type: String, required: true, default: "unknown" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trade_history: {
      type: [
        {
          date: { type: Date, required: true },
          profit: { type: Number, required: true },
          loss: { type: Number, required: true },
        },
      ],
      default: [{ date: new Date(), profit: 0, loss: 0 }], // Set the default value as an empty array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("trade", tradeSchema);
