import { addProduct } from "../controllers/productController.js";
import express from 'express' ; 

const router = express.Router();


router.post('/add' , addProduct);



export default router;