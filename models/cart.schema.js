const mongoose = require("mongoose");

const cartschema = new mongoose.Schema({
    productID :  { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    qty : Number,
})

let cart = mongoose.model("cart", cartschema)
module.exports = cart