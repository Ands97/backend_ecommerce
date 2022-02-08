"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getProductId = exports.getProducts = exports.create = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = req.body.category.toLowerCase();
    let { title, price, description, discount, imagePath } = req.body;
    if (title && price && category) {
        if (discount > 0) {
            discount = discount / 100;
            let finalPrice = ((price * discount) - price) * (-1);
            const newProduct = yield productModel_1.default.create({
                productTitle: title,
                productPrice: price,
                productCategory: category,
                productDescription: description,
                productDiscount: discount,
                productFinalPrice: finalPrice,
                productImage: imagePath
            });
            res.status(200).json(newProduct);
        }
        else {
            const newProduct = yield productModel_1.default.create({
                productTitle: title,
                productPrice: price,
                productCategory: category,
                productDescription: description,
                productDiscount: discount,
                productImage: imagePath
            });
            res.status(200).json(newProduct);
        }
    }
    else {
        res.status(404).json({ message: "Falha ao receber informações" });
    }
});
exports.create = create;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products = yield productModel_1.default.find({});
        res.json(products);
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.getProducts = getProducts;
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        let product = yield productModel_1.default.findOne({ _id: id });
        res.json({ product });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProductId = getProductId;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let title = req.params.title;
    if (title) {
        let product = yield productModel_1.default.find({
            productTitle: new RegExp(title, 'i')
        });
        if (product) {
            res.json({ product });
        }
        else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    }
    else {
        res.json({ message: "Você deve inserir um produto!" });
    }
});
exports.search = search;
