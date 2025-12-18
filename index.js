require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();

/**
 * Watermark Code
 * Dibuat oleh Naura-Vendor B
 */

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    const apiInfo_naura = {
        message: 'Vendor B API - Distro Modern',
        database: 'Neon PostgreSQL',
        author: 'Naura Ulfatin Nadya',
        endpoints: {
            getAllProducts_naura: 'GET /products',
            getProductBySku_naura: 'GET /products/:sku'
        }
    };

    res.json(apiInfo_naura);
});

// Product routes
app.use('/products', productRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        handledBy: 'handler_naura'
    });
});

module.exports = app;