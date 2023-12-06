const {Router }= require("express");
const { displayproduct, Product, Products, dproduct, all, Cart } = require("../controllers/product.contrlloer");
const Auth = require("../middleware/auth");

const productRoutes = Router()

productRoutes.get("/pro",Auth,displayproduct);

productRoutes.post("/pro",Auth,Product);

productRoutes.get("/products",Auth,Products);

productRoutes.get("/",dproduct);

productRoutes.get("/all",all);

productRoutes.post("/cart/:id",Cart);

module.exports = productRoutes   
