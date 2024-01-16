const { Product } = require("../model/Product");
const { WorkOrder } = require("../model/WorkOrder");

module.exports.post_add_missing_items = async (req, res) => {
    const { productCode, quantities } = req.body;
    try {
        const product = await Product.findOne({productCode: productCode});
        if (!product) {
            return res.status(404).json({
                message: "Error! No products match this product code."
            })
        }
        const workOrder = new WorkOrder({
            product: product.id,
            quantities: quantities
        })
        await workOrder.save();
        return res.status(201).json({
            message: "Successfully created work order for this Product Item",
            product: product
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Could not process this request at this time."
        })
    }
}

module.exports.get_missing_items = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "Missing start or end dates"
            })
        }

        const totalQtyPerItem = await WorkOrder.aggregate([
            {
                $match: {
                    createdAt: {
                        $gt: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: '$product',
                    totalQuantity: {
                        $sum: '$quantites'
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: '_id',
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $first: '$product'
                            },
                            '$$ROOT'
                        ]
                    }
                }
            },
            {
                $unwind: '$product'
            },
            {
                $project: {
                    _id: 1,
                    productCode: '$product.productCode',
                    productDescription: "$product.productDescription",
                    productName: "$product.productName",
                    totalQuantity: 1
                }
            }
        ]);

        console.log("AQUI ===>", totalQtyPerItem);
        return res.status(200).json({
            message: "Internal server error."
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}