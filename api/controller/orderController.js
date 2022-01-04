const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllOrders = async (req, res, next) => {
    try {
        const documents = await Order.find()
        .select('productId quantity _id')
        .populate('product', 'name _id')
        .exec();
        res.status(200).json(documents)
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.createOrder = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.productId).exec();
        if(product) {
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            const response = await order.save();
            res.status(201).json({
                message: 'Order placed',
                response: response
            });
        }
        else {
            res.status(404).json({response: {
                message: 'Product not found for given product ID'
            }});
        }
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const id = req.params.orderId;
        const document = await Order.findById(id)
        .populate('product')
        .exec();
        res.status(200).json(document)
    } catch (error) {
        res.status(500).json({error: error});
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.orderId;
        const response = await Order.findByIdAndDelete(id).exec();
        res.status(200).json({
            message: `Deleted order!`,
            response: response
        })
    } catch (error) {
        res.status(500).json({error: error});
    }
}