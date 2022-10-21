const mongoose = require("mongoose");

const chatbox = new mongoose.Schema(
    {

    conversationId:
    {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
},
    { timestamps: true })

    const chat = new mongoose.model("chatbox", chatbox)
module.exports = chat;
