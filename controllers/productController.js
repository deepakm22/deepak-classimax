const {createProductService, getAllProductsService, getMyProductsService, getSingleProductService, updateProductService, deleteProductService, searchProductsService} = require('../services/productServices')

exports.createProduct = async (req, res) => {
    try {
        const products = { ...req.body, image: req.files?.image?.data };
        products.userId = req.userId;
        products.created_by = req.userId;
        products.updated_by = req.userId;

        const product = await createProductService(products);

        return res.status(201).json({
            result: product,
            message: 'Product created successfully',
            status: 'success',
            responseCode: 201,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();

        return res.status(200).json({
            result: {totalProducts:products.length,products},
            message: 'Products retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.getMyProducts = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await getMyProductsService(userId);

        return res.status(200).json({
            result: {totalProducts:products.length,products},
            message: 'My products retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.getSingleProduct = async (req, res) => {
    
    try {
        const productId = req.params.id;
        const product = await getSingleProductService(productId);

        if (!product) {
            return res.status(404).json({
                result: null,
                message: 'Product not found',
                status: 'error',
                responseCode: 404,
            });
        }

        return res.status(200).json({
            result: product,
            message: 'Product retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params; 
    const products = req.body;
// console.log(products);

    if (req.files && req.files.image) {
    products.image = req.files.image.data;
    }

    if (req.files && req.files.image) {
    console.log('Image data:', req.files.image);
    }

    products.updated_by = req.user;

    try {
    const updatedProduct = await updateProductService(id, products);
console.log(updatedProduct);

    if (!updatedProduct) {
        return res.status(400).json({
        result: null,
        message: 'Failed to update product',
        status: 'error',
        responseCode: 400
        });
    }

    return res.status(200).json({
        result: updatedProduct,
        message: 'Product updated successfully',
        status: 'success',
        responseCode: 200
    });

    } catch (error) {
    return res.status(500).json({
        result: null,
        message: error.message,
        status: 'error',
        responseCode: 500
    });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteProductService(productId);

        return res.status(200).json({
            result: null,
            message: 'Product deleted successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const query = req.query;
        const products = await searchProductsService(query);

        return res.status(200).json({
            result: products,
            message: 'Products retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: null,
            message: error.message,
            status: 'error',
            responseCode: 500,
        });
    }
};





