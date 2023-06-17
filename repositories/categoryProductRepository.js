const product_category = require("../Models/product_category");

class categoryProductRepository {
    // ------------------------- Create Category ------------------------- //
    static async createCategoryProduct({
        user_id,
        category_name,
        image
    }) {
        const payloadData = new product_category({
            user_id,
            category_name,
            image
        })

        const createCategoryProduct = await payloadData.save();

        return createCategoryProduct;
    };
    // ------------------------- End Create Category ------------------------- //

    // ------------------------- Get All Category ------------------------- //
    static async getAllCategoryProduct() {
        const getAllCategoryProduct = await product_category.find();

        return getAllCategoryProduct;
    };
    // ------------------------- End Get All Category ------------------------- //

    // ------------------------- Get Category By Id ------------------------- //
    static async getCategoryProductById({
        id
    }) {
        const getCategoryProductById = await product_category.findById(id);

        return getCategoryProductById;
    };
    // ------------------------- End Get Category By Id ------------------------- //

    // ------------------------- Update Category ------------------------- //
    static async updateCategoryProduct({
        id,
        category_name,
        image,
    }) {

        const updateCategoryProduct = await product_category.findByIdAndUpdate(id, {
            category_name,
            image
        }, {
            new: true
        });

        return updateCategoryProduct;
    };
    // ------------------------- End Update Category ------------------------- //

    // ------------------------- Delete Category ------------------------- //
    static async deleteCategoryProduct({
        id
    }) {
        const deleteCategoryProduct = product_category.findByIdAndDelete(id, {
            new: true
        });

        return deleteCategoryProduct;
    };
    // ------------------------- End Delete Category ------------------------- //

};

module.exports = categoryProductRepository;