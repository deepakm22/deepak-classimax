const userSchema = require('./models/userModel');
const express = require('express');
const connectDB = require('./config/database'); 
const userRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const subCategoryRoutes = require('./routes/subCategoryRoutes')
const file_Upload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json()); 
app.use(file_Upload()); 


app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/subCategory', subCategoryRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
