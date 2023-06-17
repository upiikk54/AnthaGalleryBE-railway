const cloudinary = require("cloudinary").v2;

// require("dotenv").config();

cloudinary.config({
	cloud_name: "dgse4mkvc",
	api_key: "656233818755982",
	api_secret: "qbId6LT6Maox40Zd52YyngiOkss",
});

module.exports = cloudinary;