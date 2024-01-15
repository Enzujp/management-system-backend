const mongoose = require("mongoose");

const workOrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    quantities : {
        type: Number,
        required: true
    }
},
{
    timestamps: true
})


const WorkOrder = mongoose.model("workorder", workOrderSchema);

module.exports = { WorkOrder };