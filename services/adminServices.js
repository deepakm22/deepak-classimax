const Product = require('../models/productModel')

exports.updateProductServices = async (id, updateData) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
        throw new Error('Product update failed');
    }
    return updatedProduct;
};
