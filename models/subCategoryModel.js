const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SubCategorySchema = new Schema({
subcategory_name: {
    type: String,
    required: true
},
categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category', 
    required: true
},
created_at: {
    type: Date,
    default: Date.now
},
updated_at: {
    type: Date,
    default: Date.now
},
created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
updated_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
}
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
