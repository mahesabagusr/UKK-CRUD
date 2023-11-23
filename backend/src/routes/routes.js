import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/usersController.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProduct } from "../controller/productController.js";
import { verifyToken } from "../helpers/jwt.js"
import { refreshToken } from "../controller/refreshToken.js";
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/search', searchProduct)

export default router;