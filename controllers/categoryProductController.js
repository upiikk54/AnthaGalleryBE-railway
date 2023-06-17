const categoryProductService = require("../services/categoryProductService");

// ------------------------- Create Category ------------------------- //
const createCategoryProduct = async (req, res) => {
    const {
        category_name
    } = req.body;

    const user_id = req.user._id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await categoryProductService.createCategoryProduct({
        user_id,
        category_name,
        image: req.file
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Create Category ------------------------- //

// ------------------------- Get All Category ------------------------- //
const getAllCategoryProduct = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await categoryProductService.getAllCategoryProduct();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get All Category ------------------------- //

// ------------------------- Get Category By Id ------------------------- //
const getCategoryProductById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await categoryProductService.getCategoryProductById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get Category By Id ------------------------- //


// ------------------------- Update Category ------------------------- //
const updateCategoryProduct = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        category_name
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await categoryProductService.updateCategoryProduct({
        id,
        user_id,
        category_name,
        image: req.file
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Update Category ------------------------- //

// ------------------------- Delete Category ------------------------- //
const deleteCategoryProduct = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await categoryProductService.deleteCategoryProduct({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Delete Category ------------------------- //


module.exports = {
    createCategoryProduct,
    getAllCategoryProduct,
    getCategoryProductById,
    updateCategoryProduct,
    deleteCategoryProduct,
}