const history_chat = require ('../Models/history_chat')

class historyChatRepository {
    // ------------------------- Create History Chat ------------------------- //
    static async createHistoryChat({
        user_id,
        product_id,
        chat_users
    }) {
        const payloadData = new history_chat({
            user_id,
            product_id,
            chat_users
        })

        const createHistoryChat = await payloadData.save();

        return createHistoryChat;
    };
    // ------------------------- End Create History Chat ------------------------- //

    // ------------------------- Get All History Chat ------------------------- //
    static async getAllHistoryChat() {
        const getAllHistoryChat = await history_chat.find().populate("user_id").populate("product_id");

        return getAllHistoryChat;
    };
    // ------------------------- End Get All History Chat ------------------------- //
}

module.exports = historyChatRepository;