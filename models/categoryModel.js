const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({
category_name: {
    type: String,
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



module.exports = mongoose.model('Category', categorySchema);
