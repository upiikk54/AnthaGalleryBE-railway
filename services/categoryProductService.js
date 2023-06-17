const categoryProductRepository = require("../repositories/categoryProductRepository");
const cloudinary = require("../utils/cloudinary")
class categoryProductService {
    // ------------------------- Create Category ------------------------- //
    static async createCategoryProduct({
        user_id,
        category_name,
        image
    }) {
        try {

            let images = "";

            if (image) {
                const fileBase64 = image.buffer.toString("base64");
                const file = `data:${image.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images = cloudinaryImage.url;
            }

            const createCategoryProduct = await categoryProductRepository.createCategoryProduct({
                user_id,
                category_name,
                image: images,
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil Membuat Kategori Produk.",
                data: {
                    created_category_product: createCategoryProduct,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    created_category_product: null,
                },
            };
        }
    };
    // ------------------------- End Create Category ------------------------- //

    // ------------------------- Get All Category ------------------------- //
    static async getAllCategoryProduct() {
        try {
            const getAllCategoryProduct = await categoryProductRepository.getAllCategoryProduct();

            return {
                status: true,
                statusCode: 200,
                message: "Kategori berhasil ditampilkan",
                data: {
                    get_all_product_category: getAllCategoryProduct,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    get_all_product_category: null,
                },
            };
        }
    }
    // ------------------------- End Get All Category ------------------------- //

    // ------------------------- Get Category By Id ------------------------- //
    static async getCategoryProductById({
        id,
    }) {
        try {
            const getCategoryProductById = await categoryProductRepository.getCategoryProductById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "Kategori berhasil ditampilkan",
                data: {
                    get_category_product_By_Id: getCategoryProductById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    get_category_product_By_Id: null,
                },
            };
        }
    };
    // ------------------------- End Get Category By Id ------------------------- //

    // ------------------------- Update Category ------------------------- //
    static async updateCategoryProduct({
        id,
        user_id,
        category_name,
        image,
    }) {
        try {
            const getCategoryProduct = await categoryProductRepository.getCategoryProductById({
                id
            });

            if (getCategoryProduct.user_id == user_id) {
                let images = "";

                if (image) {
                    const fileBase64 = image.buffer.toString("base64");
                    const file = `data:${image.mimetype};base64,${fileBase64}`;
                    const cloudinaryImage = await cloudinary.uploader.upload(file);
                    images = cloudinaryImage.url;
                } else {
                    images = getCategoryProduct.image
                }

                if (!category_name) {
                    category_name = getCategoryProduct.category_name
                }

                const updateCategoryProduct = await categoryProductRepository.updateCategoryProduct({
                    id,
                    category_name,
                    image: images,
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Kategori berhasil di perbarui",
                    data: {
                        updated_category_product: updateCategoryProduct,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updated_category_product: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updated_category_product: null,
                },
            };
        }
    };
    // ------------------------- End Update Category ------------------------- //

    // ------------------------- Delete Category ------------------------- //
    static async deleteCategoryProduct({
        id,
        user_id,
    }) {
        try {
            const getCategoryProductById = await categoryProductRepository.getCategoryProductById({
                id
            });

            if (getCategoryProductById.user_id == user_id) {
                const deleteCategoryProduct = await categoryProductRepository.deleteCategoryProduct({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Kategori berhasil dihapus",
                    data: {
                        delete_category_product: deleteCategoryProduct,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        delete_category_product: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    delete_category_product: null,
                },
            };
        }
    };
    // ------------------------- End Delete Category ------------------------- //

};

module.exports = categoryProductService;