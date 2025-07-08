const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/fashionstore')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/products', productRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
