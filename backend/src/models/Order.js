import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    chair: Number,
    items: [
      {
        name: String,
        qty: Number,
        price: Number
      }
    ],
    total: Number,
    payment: String,
    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);