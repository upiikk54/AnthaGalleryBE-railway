const productService = require("../services/productService");

// ------------------------- Create Product ------------------------- //
const createProduct = async (req, res) => {
    const {
        category_id,
        product_name,
        product_price,
        product_description,
        archives
    } = req.body;

    const user_id = req.user._id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await productService.createProduct({
        user_id,
        category_id,
        product_name,
        product_price,
        product_description,
        image: req.files,
        archives
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Create Product ------------------------- //

// ------------------------- Get All Product ------------------------- //
const getAllProduct = async (req, res) => {
    const {
        archives
    } = req.query;
    const {
        status,
        statusCode,
        message,
        data
    } = await productService.getAllProduct({archives});

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get All Product ------------------------- //

// ------------------------- Get Product By Id ------------------------- //
const getProductById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await productService.getProductById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get Product By Id ------------------------- //

// ------------------------- Update Product ------------------------- //
const updateProduct = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        category_id,
        product_name,
        product_price,
        product_description,
        archives,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await productService.updateProduct({
        id,
        user_id,
        category_id,
        product_name,
        product_price,
        product_description,
        image: req.files,
        archives
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Update Product ------------------------- //

// ------------------------- Delete Product ------------------------- //
const deleteProduct = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await productService.deleteProduct({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Delete Product ------------------------- //

// ------------------------- Get Product By Category Id ------------------------- //
const getProductByCategoryId = async (req, res) => {
    const {
        category_id
    } = req.params;

    const {
        archives
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } = await productService.getProductByCategoryId({
        category_id,
        archives
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- Get Product By Category Id ------------------------- //


module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    getProductByCategoryId,
    updateProduct,
    deleteProduct
}