// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

dotenv.config();
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
