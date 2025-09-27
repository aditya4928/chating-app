import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // as input like in postman
    const { id: receiverId } = req.params; //renaming as receiverid
    //Take the property id from req.params, Store its value in a new variable named receiverId
    //eg. router.post("/messages/:id", sendMessage); and post is:POST /api/messages/64f2fefc34b

    //req.params will be:{ id: "64f2fefc34b" } and receiverId === "64f2fefc34b"

    const senderId = req.user._id; //getting user from protectroute middleware and using that we getting _id from db

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, //all these fields [senderId, receiverId] in db return the convo between these two users if already there
    });

    if (!conversation) {
      //very first time talking
      conversation = await Conversation.create({
        //create an array if not created it's already an empty array as defined in schema
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      // calling message model new Message
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    } //pushing message id

    //saving into db

    // await conversation.save(); it takes long so we use promise

    // await newMessage.save(); it takes long so we use promise

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]); //both runs at same exact time

    res.status(201).json(newMessage); // returning response as all field of new messagesenderId,receiverId,message,
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  //to get message
  try {
    const { id: userToChatId } = req.params; //aliasing the same done above
    const senderId = req.user._id; //getting from protected route

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }, //as participants only containing the message id not actual message
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES, polpulate the field between these two users and give all the values of message field, instead of returning th eids of array, returns array of objects and put each message into the object

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
