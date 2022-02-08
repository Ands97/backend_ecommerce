import { Router } from "express";
import * as ProductController from '../controllers/ProductController'



const router = Router();

router.post('/', ProductController.create);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductId)
router.get('/products/search/:title', ProductController.search)

export default router;