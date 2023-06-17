const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const productCategorySchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    category_name: {
        type: "string",
        required: [true, "nama kategori harus diisi"]
    },
    image: {
        type: String,
        required: [true, "foto kategori harus diisi"]
    },
})

const productCategory = mongoose.model("product_category", productCategorySchema);

module.exports = productCategory;