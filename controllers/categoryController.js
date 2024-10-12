const {createCategory, getAllCategoriesService, getSingleCategoryService, updateCategoryService, deleteCategoryService} = require('../services/categoryServices')


exports.addCategory = async (req, res) => {
    try {

        const { category_name } = req.body;
        const userId = req.user

        const category  = await createCategory( category_name, userId);
        return res.status(201).json({
            result: category,
            message: 'Category created successfully',
            status: 'success',
            responseCode: 201,
        });

    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'An unexpected error occurred. Please try again later.',
            status: 'error',
            responseCode: 500,
            reason: error.message
        });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        return res.status(200).json({
            result: categories,
            message: 'Categories retrieved successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Server Error',
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.getSingleCategory = async (req, res) => {
    try {
        const categoryId = req.params.id.trim();
        const userId = req.user;
        const category = await getSingleCategoryService(categoryId, userId);

        return res.status(200).json({
            result: category,
            message: 'Category fetched successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        console.log(error);
        
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category_name } = req.body;
        const userId = req.user;
        const category = await updateCategoryService(categoryId, category_name, userId);

        return res.status(200).json({
            result: category,
            message: 'Category updated successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const userId = req.user;

        await deleteCategoryService(categoryId, userId);

        return res.status(200).json({
            result: {},
            message: 'Category deleted successfully',
            status: 'success',
            responseCode: 200,
        });
    } catch (error) {
        return res.status(error.responseCode || 500).json({
            result: {},
            message: error.message || 'Server Error',
            status: 'error',
            responseCode: error.responseCode || 500,
        });
    }
};
