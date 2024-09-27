const SubCategorySchema = require('../models/subCategoryModel')

exports.createSubCategory = async (subcategory_name, categoryId, userId) => {
    const existingSubCategory = await SubCategorySchema.findOne({ subcategory_name });
console.log(existingSubCategory);

    if (existingSubCategory) {
        return {
            result: {},
            message: 'subCategory is already exist',
            status: 'error',
            responseCode: 400
        };  
    }
    console.log(subcategory_name);

    const SubCategory = new SubCategorySchema({
        subcategory_name,
        categoryId,
        created_by: userId,
        updated_by: userId,
    });


    return await SubCategory.save();
};

exports.getAllSubCategory = async () => {
    return await SubCategorySchema.find();
};

exports.getSingleSubCategory = async (subCategoryId, userId) => {

    const subCategory = await SubCategorySchema.findById(subCategoryId);
    if (!subCategory) {
        return {
            result: {},
            message: 'subCategory not found',
            status: 'error',
            responseCode: 400
        };   
    }
    if (subCategory.created_by.toString() !== userId.toString()) {
        return {
            result: {},
            message: 'Unauthorized to view this category',
            status: 'error',
            responseCode: 400
        }; 
    }

    return subCategory;
};

exports.updateSubCategoryService = async (SubcategoryId, subcategory_name, userId) => {
    const Subcategory = await SubCategorySchema.findById(SubcategoryId);
    if (!Subcategory) {
        return {
            result: {},
            message: 'subCategory not found',
            status: 'error',
            responseCode: 404
        }; 
    }

    const existingSubCategory = await SubCategorySchema.findOne({ subcategory_name: subcategory_name});
    if (existingSubCategory && existingSubCategory._id.toString() !== SubcategoryId.toString()) {
        return {
            result: {},
            message: 'SubCategory name already exists',
            status: 'error',
            responseCode: 409
        };
    }

    Subcategory.subcategory_name = subcategory_name;
    Subcategory.updated_by = userId;
    Subcategory.updated_at = Date.now();

    return await Subcategory.save();
};

exports.deleteSubCategoryService = async (subCategoryId, userId) => {
    const subCategory = await SubCategorySchema.findById(subCategoryId);
    if (!subCategory) {
        return {
            result: {},
            message: 'SubCategory not found',
            status: 'error',
            responseCode: 404
        };
    }

    if (subCategory.created_by.toString() !== userId.toString()) {
        return {
            result: {},
            message: 'Unauthorized to delete this subcategory',
            status: 'error',
            responseCode: 403
        };
    }

    await SubCategorySchema.findByIdAndDelete(subCategoryId);

    return {
        result: {},
        message: 'SubCategory deleted successfully',
        status: 'success',
        responseCode: 200
    };
};
