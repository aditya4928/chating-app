import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      //array with ref from user model
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId, //array with ref from user model
        ref: "Message",
        default: [], //starting with default array
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
