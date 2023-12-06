const cart = require("../models/cart.schema");
const product = require("../models/product.schema");

const displayproduct = (req, res) => {
  res.render("product");
};

const Product = async (req, res) => {
  let productcreate = await product.create(req.body);
  res.send({ data: productcreate });
};

const Products = async (req, res) => {
  let data = await product.find({ userID: req.cookies.id });
  res.json(data);
};

const dproduct = (req, res) => {
  res.render("products");
};

const all = async(req, res) => {
   let data = await product.find()
   res.send(data);
}


//cart

const Cart = async (req, res) => {
    let data = await cart.create(req.body);
    res.send(data);
}
module.exports = { displayproduct, Product, Products, dproduct , all , Cart};
