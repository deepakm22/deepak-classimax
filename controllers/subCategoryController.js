const {createSubCategory, getAllSubCategory, getSingleSubCategory, updateSubCategoryService, deleteSubCategoryService} = require('../services/subCategoryServices')

exports.addSubCategory = async (req, res) => {
    try {

        const { subCategory_name, categoryId } = req.body;
        const userId = req.user

        const subCategory  = await createSubCategory( subCategory_name, categoryId, userId);
        return res.status(201).json({
            result: subCategory,
            message: 'SubCategory created successfully',
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

exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategory = await getAllSubCategory();
        return res.status(200).json({
            result: subCategory,
            message: 'subCategories retrieved successfully',
            status: 'success',
            responseCode: 200,
        })
    } catch (error) {
        return res.status(500).json({
            result: {},
            message: 'Server Error',
            status: 'error',
            responseCode: 500,
        });
    }
};

exports.getSingleSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id.trim();
        const userId = req.user;
        const category = await getSingleSubCategory(subCategoryId, userId);

        return res.status(200).json({
            result: category,
            message: 'subCategory fetched successfully',
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


exports.updateSubCategory = async (req, res) => {
    try {
        const SubcategoryId = req.params.id;
        const { subcategory_name } = req.body;
        const userId = req.user;
        const Subcategory = await updateSubCategoryService(SubcategoryId, subcategory_name, userId);

        return res.status(200).json({
            result: Subcategory,
            message: 'SubCategory updated successfully',
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

exports.deleteSubCategory = async (req, res) => {
    try {
        const  subCategoryId  = req.params.id;
        const userId = req.user;

        await deleteSubCategoryService(subCategoryId, userId);

        return res.status(200).json({
            result: {},
            message: 'SubCategory deleted successfully',
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