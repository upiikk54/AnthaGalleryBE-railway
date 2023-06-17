const productRepository = require("../repositories/productRepository");
const cloudinary = require("../utils/cloudinary");

class productService {
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
        try {
            const images = [];

            await Promise.all(image.image.map(async (img) => {
                const fileBase64 = img.buffer.toString("base64");
                const file = `data:${img.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images.push(cloudinaryImage.url);
            }))

            const createProduct = await productRepository.createProduct({
                user_id,
                category_id,
                product_name,
                product_price,
                product_description,
                image: images,
                archives
            });

            return {
                status: true,
                statusCode: 201,
                message: "Berhasil Membuat Produk.",
                data: {
                    created_product: createProduct,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    created_product: null,
                },
            };
        }
    };
    // ------------------------- End Create product ------------------------- //

    // ------------------------- Get All Product ------------------------- //
    static async getAllProduct({archives}) {
        try {
            const getAllProduct = await productRepository.getAllProduct({archives});

            return {
                status: true,
                statusCode: 200,
                message: "Produk berhasil ditampilkan",
                data: {
                    get_all_product: getAllProduct,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    get_all_producty: null,
                },
            };
        }
    }
    // ------------------------- End Get All Product ------------------------- //

    // ------------------------- Get Product By Id ------------------------- //
    static async getProductById({
        id,
    }) {
        try {
            const getProductById = await productRepository.getProductById({
                id,
            });
            return {
                status: true,
                statusCode: 200,
                message: "Product berhasil ditampilkan",
                data: {
                    get_product_By_Id: getProductById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    get_product_By_Id: null,
                },
            };
        }
    };
    // ------------------------- End Get Product By Id ------------------------- //

    // ------------------------- Update Category ------------------------- //
    static async updateProduct({
        id,
        user_id,
        category_id,
        product_name,
        product_price,
        product_description,
        image,
        archives
    }) {
        try {
            const getProductProduct = await productRepository.getProductById({
                id
            });

            if (getProductProduct.user_id == user_id) {

                let images = [];

                if (image.image) {
                    await Promise.all(image.image.map(async (img) => {
                        const fileBase64 = img.buffer.toString("base64");
                        const file = `data:${img.mimetype};base64,${fileBase64}`;
                        const cloudinaryImage = await cloudinary.uploader.upload(file);
                        images.push(cloudinaryImage.url);
                    }))
                } else {
                    images = getProductProduct.image
                }

                if (!category_id) {
                    category_id = getProductProduct.category_id
                }

                if (!product_name) {
                    product_name = getProductProduct.product_name
                }

                if (!product_price) {
                    product_price = getProductProduct.product_price
                }

                if (!product_description) {
                    product_description = getProductProduct.product_description
                }

                if (!archives) {
                    archives = getProductProduct.archives
                }

                const updateProduct = await productRepository.updateProduct({
                    id,
                    category_id,
                    product_name,
                    product_price,
                    product_description,
                    image: images,
                    archives
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Produk berhasil di perbarui",
                    data: {
                        updated_product: updateProduct,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai",
                    data: {
                        updated_product: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    updated_product: null,
                },
            };
        }
    };
    // ------------------------- End Update Category ------------------------- //

    // ------------------------- Delete Category ------------------------- //
    static async deleteProduct({
        id,
        user_id,
    }) {
        try {
            const getProductById = await productRepository.getProductById({
                id
            });

            if (getProductById.user_id == user_id) {
                const deleteProduct = await productRepository.deleteProduct({
                    id
                });

                return {
                    status: true,
                    statusCode: 200,
                    message: "Produk berhasil dihapus",
                    data: {
                        delete_product: deleteProduct,
                    },
                };
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: "user tidak sesuai.",
                    data: {
                        delete_product: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    delete_product: null,
                },
            };
        }
    };
    // ------------------------- End Delete Category ------------------------- //

    // ------------------------- Get Product By Category Id ------------------------- //
    static async getProductByCategoryId({
        category_id,
        archives
    }) {
        try {
            const getProductByCategoryId = await productRepository.getProductByCategoryId({
                category_id,
                archives
            });
            return {
                status: true,
                statusCode: 200,
                message: "Product berhasil ditampilkan",
                data: {
                    get_product_By_CategoryId: getProductByCategoryId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: err.message,
                data: {
                    get_product_By_CategoryId: null,
                },
            };
        }
    };
    // ------------------------- End Get Product By Category Id ------------------------- //
};

module.exports = productService;