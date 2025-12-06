require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Vendor B API - Distro Modern',
        vendor: 'Vendor B',
        database: 'Neon PostgreSQL',
        endpoints: {
            getAllProducts: 'GET /vendor-b/products',
            getProductBySku: 'GET /vendor-b/products/:sku'
        }
    });
});

// Product routes
app.use('/vendor-b/products', productRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found' 
    });
});

module.exports = app;
