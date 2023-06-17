require("dotenv").config();
const mongoose = require("mongoose");

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// const URI = `mongodb://localhost:27017/anthagalleryapp`;
const URI = `mongodb://mongo:WPd0WkfWIr2v4Q4qDaJY@containers-us-west-44.railway.app:6411`;

const mongooseConnect = mongoose.connect(
    URI,
    connectionParams
    ).then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log(err);
});

module.exports = mongooseConnect;