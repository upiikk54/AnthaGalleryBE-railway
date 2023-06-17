const historyChatRepository = require('../repositories/historyChatRepository')

class historyChatService {
    // ------------------------- Create History Chat ------------------------- //
    static async createHistoryChat({
        user_id,
        product_id,
        chat_users
    }) {
        try {

            const createHistoryChat = await historyChatRepository.createHistoryChat({
                user_id,
                product_id,
                chat_users
            });

            return {
                status: true,
                statusCode: 201,
                message: "Chat berhasil masuk.",
                data: {
                    created_history_chat: createHistoryChat,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    created_history_chat: null,
                },
            };
        }
    };
    // ------------------------- End Create History Chat ------------------------- //

    // ------------------------- Get All History Chat ------------------------- //
    static async getAllHistoryChat() {
        try {
            const getAllHistoryChat = await historyChatRepository.getAllHistoryChat();

            return {
                status: true,
                statusCode: 200,
                message: "History Chat berhasil ditampilkan",
                data: {
                    get_all_history_chat: getAllHistoryChat,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    get_all_history_chat: null,
                },
            };
        }
    }
    // ------------------------- End Get All History Chat ------------------------- //
}

module.exports = historyChatService;