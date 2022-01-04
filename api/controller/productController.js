const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllProducts = async (req, res, next) => {
    try {
        const documents = await Product.find().exec();
        res.status(200).json(documents)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : err})
    }
}

exports.createproduct = (req, res, next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage: req.file.path
    })
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created product!',
            createdProduct : product
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error : err})
    })
}

exports.getProductById = (req, res, next) => {
    const id = req.params.productId;
    if (id) {
        Product.findById(id)
            .exec()
            .then(document => {
                console.log(document);
                res.status(200).json(document)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error : err})
            })
        
    }
}

/**
 * Todo - discovered some bugs - still working on this update api
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const response = await Product.findByIdAndUpdate(id, {$set: req.body}).exec();
        res.status(200).json({
            message: 'Resource updated successfully',
            response: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.productId;
        const response = await Product.deleteOne({_id: id}).exec()
        res.status(200).json({
            message: `Deleted product!`,
            response: response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}