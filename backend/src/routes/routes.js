import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/usersController.js";
import { verifyToken } from "../helpers/jwt.js"
import { refreshToken } from "../controller/refreshToken.js";
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);


export default router;