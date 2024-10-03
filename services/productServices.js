const Product = require('../models/productModel');

exports.createProductService = async (products) => {
    const newProduct = new Product(products);
    return await newProduct.save();
};

exports.getAllProductsService = async () => {
    return await Product.find();
};

exports.getMyProductsService = async (userId) => {
    return await Product.find({ userId });
};

exports.getSingleProductService = async (productId) => {
    return await Product.findById(productId);
};

exports.updateProductService = async (id, updateData) => {
    console.log(id, updateData);
    
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProductService = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};

exports.searchProductsService = async (query) => {
    if (query.title) {
    return await Product.find({ title: { $regex: query.title, $options: 'i' } });
    }
    return [];
};




