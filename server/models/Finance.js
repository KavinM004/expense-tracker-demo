import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  category: { type: String, enum: ["Income", "Expense"], required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Finance", financeSchema);
