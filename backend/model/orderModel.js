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

const Order = mongoose.model('Order', orderSchema);
export default Order;
