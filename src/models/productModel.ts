import { Schema, model, Mongoose, ObjectId } from "mongoose";

type ProductType = {
    productTitle: string,
    productPrice: number,
    productCategory: string,
    productDescription: string,
    productDiscount: number,
    productFinalPrice: number,
    productImage: string,
}

const productSchema = new Schema<ProductType>({
    productTitle: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true
    },
    productDescription: {
        type: String
    },
    productDiscount: {
        type: Number,
        default: 0
    },
    productFinalPrice:{
        type: Number,
    },
    productImage: {
        type: String,
        default: 'http://localhost:4000/images/noImage.jpg'
    },
});

export default model("Product", productSchema);