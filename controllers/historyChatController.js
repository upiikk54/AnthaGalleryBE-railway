const historyChatService = require('../services/historyChatService');

// ------------------------- Create History Chat ------------------------- //
const createHistoryChat = async (req, res) => {
    const {
        product_id,
        chat_users
    } = req.body;

    const user_id = req.user._id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await historyChatService.createHistoryChat({
        user_id,
        product_id,
        chat_users
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Create History Chat ------------------------- //

// ------------------------- Get All History Chat ------------------------- //
const getAllHistoryChat = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await historyChatService.getAllHistoryChat();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get All History Chat ------------------------- //

module.exports = {
    createHistoryChat,
    getAllHistoryChat
}