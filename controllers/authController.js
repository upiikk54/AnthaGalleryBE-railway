const authService = require("../services/authService");

// ------------------------- Auth Register ------------------------- //
const handleRegister = async (req, res) => {
    const {
        userName,
        email,
        password,
        role
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleRegister({
        userName,
        email,
        password,
        role
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};
// ------------------------- End Auth Register ------------------------- //

// ------------------------- Auth Login ------------------------- //
const handleLogin = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleLogin({
        email,
        password
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};
// ------------------------- End Auth Login ------------------------- //

// ------------------------- Auth CurrentUser ------------------------- //
const currentUser = async (req, res) => {
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: "Get current user success.",
        data: {
            user: currentUser,
        },
    });
};
// ------------------------- Auth End CurentUser ------------------------- //



module.exports = {
    handleRegister,
    handleLogin,
    currentUser
}