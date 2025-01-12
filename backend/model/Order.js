import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    packages: [
        {
            items: [String],
            totalPrice: Number,
            totalWeight: Number,
            courierPrice: Number,
        },
    ],
});

module.exports = mongoose.model('Order', orderSchema);

