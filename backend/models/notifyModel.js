import mongoose from "mongoose";

const notifySchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  actorID: {
    type: String,
    required: true,
  },
  actionDetail: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
export const Notify = mongoose.model("Notify", notifySchema);
