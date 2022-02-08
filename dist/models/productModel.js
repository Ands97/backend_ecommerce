"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
    productFinalPrice: {
        type: Number,
    },
    productImage: {
        type: String,
        default: 'http://localhost:4000/images/noImage.jpg'
    },
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
