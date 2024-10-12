const categorySchema = require('../models/categoryModel')

exports.createCategory = async (category_name, userId) => {
    const existingCategory = await categorySchema.findOne({ category_name });
console.log(existingCategory);

    if (existingCategory) {
        return {
            result: {},
            message: 'Category is already exist',
            status: 'error',
            responseCode: 400
        };  
    }

    const category = new categorySchema({
        category_name,
        created_by: userId,
        updated_by: userId,
    });


    return await category.save();
};

exports.getAllCategoriesService = async () => {
    return await categorySchema.find();
};

exports.getSingleCategoryService = async (categoryId, userId) => {

    const category = await categorySchema.findById(categoryId);
    if (!category) {
        return {
            result: {},
            message: 'Category not found',
            status: 'error',
            responseCode: 400
        };   
    }
    if (category.created_by.toString() !== userId.toString()) {
        return {
            result: {},
            message: 'Unauthorized to view this category',
            status: 'error',
            responseCode: 400
        }; 
    }

    return category;
};

exports.updateCategoryService = async (categoryId, category_name, userId) => {
    const category = await categorySchema.findById(categoryId);
    if (!category) {
        return {
            result: {},
            message: 'Category not found',
            status: 'error',
            responseCode: 400
        };
    }

    const existingCategory = await categorySchema.findOne({ category_name: category_name.trim() });
    if (existingCategory && existingCategory._id.toString() !== categoryId.toString()) {
        return {
            result: {},
            message: 'Category name already exists',
            status: 'error',
            responseCode: 409
        };
    }

    category.category_name = category_name.trim();
    category.updated_by = userId;
    category.updated_at = Date.now();

    return await category.save();
};

exports.deleteCategoryService = async (categoryId, userId) => {
    const category = await categorySchema.findById(categoryId);
    if (!category) {
        return {
            result: {},
            message: 'Category not found',
            status: 'error',
            responseCode: 400
        };
    }
    if (category.created_by.toString() !== userId.toString()) {
        return {
            result: {},
            message: 'Unauthorized to delete this category',
            status: 'error',
            responseCode: 403
        };
    }

    await categorySchema.findByIdAndDelete(categoryId);
};
