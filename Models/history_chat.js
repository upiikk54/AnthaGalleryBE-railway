const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const historyChatSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    chat_users: {
        type: "string",
        required: [true, "chat users harus diisi"]
    },
})
historyChatSchema.set('timestamps', true);

const product = mongoose.model("history_chat", historyChatSchema);

module.exports = product;