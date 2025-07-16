const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { connectDB } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
