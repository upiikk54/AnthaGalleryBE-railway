const users = require("../Models/userModels");

class userRepository {

    static async getByEmail({
        email
    }) {
        const getUserByEmail = await users.findOne({
            email
        });

        return getUserByEmail;
    };

    static async handleRegister({
        userName,
        email,
        password,
        role
    }) {
        const payloadData = new users({
            userName,
            email,
            password,
            role
        });

        const registeredUser = await payloadData.save();

        return registeredUser;
    };
};

module.exports = userRepository;