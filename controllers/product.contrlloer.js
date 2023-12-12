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
  let data = await product.find({ userID : req.body.userID });
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

const deletepro = async (req, res) => {
  await product.findByIdAndDelete(req.params.id)
  let data = await product.find({ userID : req.body.userID });
  res.json(data);
}

const pro_cart = async (req, res) => {
  let data = await cart.find({ userID : req.body.userID }).populate("productID")
  res.send(data);
}


const displaycartpage =  (req, res) => {
  res.render("cart")
}

const addqty =async (req, res) => {
  let {id}=req.params
  let {val}=req.body
  let data = await cart.findById(id)

  if(data.qty == 1 && val == -1){
    await cart.findByIdAndDelete(id);

    return res.send({status : "success"});
  }

  data.qty = data.qty + val;
  await data.save()
  res.send(data);

}


module.exports = { displayproduct, Product, Products, dproduct , all , Cart , deletepro , pro_cart , displaycartpage , addqty};
