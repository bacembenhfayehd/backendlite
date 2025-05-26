import express from "express";
import { addToCart, fetchUser, getCart, login, removeFromCart, signup } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/add", fetchUser, addToCart);
router.post("/remove", fetchUser, removeFromCart);
router.get("/get", fetchUser, getCart);
router.post('/deleteFromCart',fetchUser,removeFromCart);
router.post('/addToCart',fetchUser,addToCart)


export default router;
