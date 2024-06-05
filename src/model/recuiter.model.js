var mongoose = require("mongoose");
const recuiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true },
    address: { type: String, trim: true },
    company: { type: String, trim: true },
    isActive: { type: Boolean, default: true }
  },
  { collection: "recuiters", timestamps: true }
);
module.exports = mongoose.model("recuiters", recuiterSchema);
