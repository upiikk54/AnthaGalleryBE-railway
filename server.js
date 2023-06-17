const express = require("express");
const app = express();
const PORT = 8987;
const cors = require("cors");
const mongooseConnect = require("./config/config.db");
const bodyParser = require("body-parser");
const upload = require("./utils/fileUpload")


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

const authController = require("./controllers/authController");
const categoryProductController = require("./controllers/categoryProductController");
const productController = require("./controllers/productController");
const historyChatController = require("./controllers/historyChatController");
const middlewares = require("./middlewares/auth");

// ------------------------- API AUTH ------------------------- //
app.post("/api/v1/register", authController.handleRegister);
app.post("/api/v1/login", authController.handleLogin);
app.get("/api/v1/me", middlewares.authenticate, authController.currentUser);
// ------------------------- End API  AUTH ------------------------- //

// ------------------------- API Category ------------------------- //
app.post("/api/v1/category/create", middlewares.authenticate, upload.single("image"), categoryProductController.createCategoryProduct);
app.get("/api/v1/category/read", categoryProductController.getAllCategoryProduct)
app.get("/api/v1/category/readAdmin/:id", middlewares.authenticate, categoryProductController.getCategoryProductById);
app.get("/api/v1/category/readUser/:id", categoryProductController.getCategoryProductById);
app.put("/api/v1/category/update/:id", middlewares.authenticate,upload.single("image"), categoryProductController.updateCategoryProduct);
app.delete("/api/v1/category/delete/:id", middlewares.authenticate, categoryProductController.deleteCategoryProduct);
// ------------------------- End API Category ------------------------- //

// ------------------------- API Product ------------------------- //
app.post("/api/v1/product/create", middlewares.authenticate, upload.fields([{name: "image"}]), productController.createProduct);
app.get("/api/v1/product/read/:id", middlewares.authenticate, productController.getProductById);
app.put("/api/v1/product/update/:id", middlewares.authenticate, upload.fields([{name: "image"}]), productController.updateProduct);
app.delete("/api/v1/product/delete/:id", middlewares.authenticate, productController.deleteProduct);
app.get("/api/v1/product/read", productController.getAllProduct);
app.get("/api/v1/product/readCategory/:category_id", productController.getProductByCategoryId);
app.get("/api/v1/product/user/read/:id", productController.getProductById);
// ------------------------- End API Product ------------------------- //

// ------------------------- API chat history ------------------------- //
app.post("/api/v1/chatHistory/create", middlewares.authenticate, historyChatController.createHistoryChat);
app.get("/api/v1/chatHistory/read", historyChatController.getAllHistoryChat);

// ------------------------- End API chat history ------------------------- //


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});