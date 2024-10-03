const userSchema = require('./models/userModel');
const express = require('express');
const connectDB = require('./config/database'); 
const userRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const subCategoryRoutes = require('./routes/subCategoryRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const adminRoutes = require('./routes/adminRoutes')
const file_Upload = require('express-fileupload');
const logger = require('./services/loggerServices')
const {loggerMiddleware, errorHandlingMiddleware} = require('./middlewares/loggerMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json()); 
app.use(file_Upload()); 
app.use(loggerMiddleware)
app.use(errorHandlingMiddleware)


app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes)
app.use('/api/subCategory', subCategoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
