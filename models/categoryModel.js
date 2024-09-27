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
    required: false
},
updated_by: {
    type: Schema.Types.ObjectId,
    required: false
}
});

module.exports = mongoose.model('Category', categorySchema);
