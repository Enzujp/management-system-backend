const mongoose = require("mongoose");
const { Product } = require("../model/Product");

module.exports.get_all_products = async (req, res) => {
  try {
    const products = await Product.find()
      .select("productName productCode productDescription")
      .exec();
    if (products) {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            name: product.productName,
            productCode: product.productCode,
            productDescription: product.productDescription,
          };
        }),
      };

      return res.status(200).json({
        response: response,
        message: "Available products are being displayed",
      });
    } else {
      res.status(401).json({
        message: "There are no available products at this time.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err0r: error.message,
    });
  }
};

module.exports.post_create_product = async (req, res) => {
  try {
    const { productName, productCode, productDescription } = req.body;
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      productCode: productCode,
      productName: productName,
      productDescription: productDescription,
    });
    res.status(201).json({
      message: "Product successfully created",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err0r: error.message,
    });
  }
};

module.exports.get_product_by_id = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId });
    if (product) {
      res.status(200).json({
        success: true,
        product: product,
      });
    } else {
      res.status(404).json({
        message: "No products matching this product ID.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err0r: error.message,
    });
  }
};

module.exports.edit_product = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      const updatedOps = [];
      for (ops of req.body) {
        updatedOps[ops.propName] = ops.value;
      }

      const updatedProduct = await Product.findById(
        { _id: productId },
        { $set: updatedOps }
      );
      await updatedProduct.save();
      res.status.json({
        message: "Successfully updated product",
        product: product,
      });
    } 
    else {
        return res.status(404).json({
            message: "No products matching this product ID"
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err0r: error.message,
    });
  }
};

module.exports.delete_product = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOneAndDelete({ _id: productId });
    await product.save();
    res.status(200).json({
        message: "Product successfully deleted!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err0r: error.message,
    });
  }
};
