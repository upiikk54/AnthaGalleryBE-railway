const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const productSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_category",
    },
    product_name: {
        type: "string",
        required: [true, "nama produk harus diisi"]
    },
    product_price: {
        type: "Number",
        required: [true, "harga produk harus diisi"]
    },
    product_description: {
        type: "string",
        required: [true, "deskripsi produk harus diisi"]
    },
    image: [{
        type: String,
        required: [true, "foto produk harus diisi"]
    }],
    archives: {
        type: Boolean,
        required : [true, "arsip harus diisi"]
    }
})

const product = mongoose.model("product", productSchema);

module.exports = product;