import express from "express"
import { getProducts,submitOrder,addProduct } from "../controller/packageController.js";

const router=express.Router();

router.route('/getproducts').get(getProducts);
router.route('/submitorder').post(submitOrder);
router.route('/addproduct').post(addProduct);

export default router;