const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    }, 
    productDescription: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});


const Product = mongoose.model("product", productSchema);


module.exports = { Product }