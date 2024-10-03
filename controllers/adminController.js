const { updateProductServices} = require('../services/adminServices')

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = { ...req.body, updated_by: req.user }; 
        const Admin = req.isAdmin;
console.log(Admin);

        if (!Admin) {
            return res.status(401).json({
                result: null,
                message: 'Unauthorized - Not an admin',
                status: 'error',
                responseCode: 401
            });
        }

        console.log('Updating product:', id, products);

        const updatedProduct = await updateProductServices(id, products);

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
        console.error('Error:', error.message);
        return res.status(500).json({
            result: null,
            message: 'Internal server error',
            status: 'error',
            responseCode: 500
        });
    }
}
