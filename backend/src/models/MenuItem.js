import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  available: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("MenuItem", menuSchema);