import { addProduct, deleteProduct, getAllProducts, getMens } from "../controllers/productController.js";
import express from 'express' ; 

const router = express.Router();


router.post('/add' , addProduct);
router.post('/delete' , deleteProduct);
router.get('/get' , getAllProducts);
router.get('/mens' , getMens);



export default router;