import Product from "../model/productModel.js";
import Order from "../model/orderModel.js";

// @desc    get a product
// @route   GET /api/products
// @access  public

const getProducts=async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}

// @desc    get a product
// @route   POST /api/submitorder
// @access  public
const submitOrder=async(req,res)=>{
    const { selectedProducts } = req.body;

    try {
        // Packaging Logic
        const packages = [];
        const maxPrice = 250;
        const courierCost = 15;

        let currentPackage = { items: [], totalPrice: 0, totalWeight: 0 };

        selectedProducts.forEach(product => {
            if (currentPackage.totalPrice + product.price > maxPrice) {
                packages.push({ ...currentPackage, courierPrice: courierCost });
                currentPackage = { items: [], totalPrice: 0, totalWeight: 0 };
            }
            currentPackage.items.push(product.name);
            currentPackage.totalPrice += product.price;
            currentPackage.totalWeight += product.weight;
        });

        if (currentPackage.items.length > 0) {
            packages.push({ ...currentPackage, courierPrice: courierCost });
        }

        // Save Order to Database
        const order = new Order({ packages });
        await order.save();

        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error processing order' });
    }
}

const addProduct= async (req, res) => {
    const { name, price, weight } = req.body;

    try {
        const product = new Product({ name, price, weight });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

export {getProducts,submitOrder,addProduct};