const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema ({
    userName: {
        type: "string",
        required: [true, "userName harus diisi"]
    },

    email: {
        type: "string",
        required: [true, "email harus diisi"]
    },

    password: {
        type: "string",
        required: [true, "password harus diisi"]
    },

    role: {
        type: "string",
        required: [true, "role harus diisi"]
    },

    otp: {
        type: "string"
    }
})

const users = mongoose.model("users", userSchema);

module.exports = users;