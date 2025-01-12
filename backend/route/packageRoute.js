import express from "express"
import { getProducts,submitOrder } from "../controller/packageController.js";

const router=express.Router();

router.route('/getproducts').get(getProducts);
router.route('/submitorder').post(submitOrder)

export default router;