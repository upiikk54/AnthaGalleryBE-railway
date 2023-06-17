const product = require("../Models/product");
class productRepository {
    // ------------------------- Create product ------------------------- //
    static async createProduct({
        user_id,
        category_id,
        product_name,
        product_price,
        product_description,
        image,
        archives
    }) {
        const payloadData = new product({
            user_id,
            category_id,
            product_name,
            product_price,
            product_description,
            image,
            archives
        })

        const createProduct = await payloadData.save();

        return createProduct;
    };
    // ------------------------- End Create product ------------------------- //

    // ------------------------- Get All Product ------------------------- //
    static async getAllProduct({
        archives
    }) {
        if (archives) {
            const getProductByarchives = await product.find({archives})

            return getProductByarchives;
        }

        const getAllProduct = await product.find().populate("category_id")

        return getAllProduct;
    };
    // ------------------------- End Get All Product ------------------------- //

    // ------------------------- Get Product By Id ------------------------- //
    static async getProductById({
        id
    }) {
        const getProductById = await product.findById(id).populate("category_id");

        return getProductById;
    };
    // ------------------------- End Get Product By Id ------------------------- //

    // ------------------------- Get Product By Id ------------------------- //
    static async getProductByCategoryId({
        category_id,
        archives
    }) {
        if (archives) {
            const getProductByarchives = await product.find({archives})

            return getProductByarchives;
        }
        const getProductByCategoryId = await product.find({
            category_id: category_id
        }).populate("category_id");

        return getProductByCategoryId;
    };
    // ------------------------- End Get Product By Id ------------------------- //

    // ------------------------- Update Product ------------------------- //
    static async updateProduct({
        id,
        category_id,
        product_name,
        product_price,
        product_description,
        image,
        archives
    }) {

        const updateProduct = await product.findByIdAndUpdate(id, {
            category_id,
            product_name,
            product_price,
            product_description,
            image,
            archives
        }, {
            new: true
        });

        return updateProduct;
    };
    // ------------------------- End Update Product ------------------------- //

    // ------------------------- Delete Product ------------------------- //
    static async deleteProduct({
        id
    }) {
        const deleteProduct = product.findByIdAndDelete(id, {
            new: true
        });

        return deleteProduct;
    };
    // ------------------------- End Delete Product ------------------------- //
};

module.exports = productRepository;