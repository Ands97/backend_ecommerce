import { Request, Response } from 'express';
import Product from '../models/productModel';

export const create = async (req: Request, res: Response) => {
    let category = req.body.category.toLowerCase();
    let { title, price, description, discount, imagePath } = req.body

    if (title && price && category) {
        if (discount > 0) {
            discount = discount / 100
            let finalPrice = ((price * discount) - price) * (-1);
            const newProduct = await Product.create({
                productTitle: title,
                productPrice: price,
                productCategory: category,
                productDescription: description,
                productDiscount: discount,
                productFinalPrice: finalPrice,
                productImage: imagePath
            })
            res.status(200).json(newProduct)
        } else {
            const newProduct = await Product.create({
                productTitle: title,
                productPrice: price,
                productCategory: category,
                productDescription: description,
                productDiscount: discount,
                productImage: imagePath
            })
            res.status(200).json(newProduct)
        }

    } else {
        res.status(404).json({ message: "Falha ao receber informações" })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        let products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.status(404).json({ error })
    }
}

export const getProductId = async (req: Request, res: Response) => {
    try {
        let id = req.params.id
        let product = await Product.findOne({ _id: id });
        res.json({ product })
    } catch (error) {
        res.json({ error })
    }
}
export const search = async (req: Request, res: Response) => {
    let title = req.params.title
    if (title) {
        let product = await Product.find({
            productTitle:  new RegExp(title, 'i')
        })
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ message: "Produto não encontrado" })
        }
    } else {
        res.json({ message: "Você deve inserir um produto!" })
    }
}