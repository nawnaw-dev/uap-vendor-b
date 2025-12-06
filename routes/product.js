const express = require('express');
const router = express.Router();
const sql = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const products = await sql`
            SELECT 
                sku,
                "productName",
                price,
                "isAvailable"
            FROM product_vendorB
            ORDER BY id ASC
        `;

        const formattedData = products.map(product => ({
            sku: product.sku,
            productName: product.productName,
            price: product.price, // Number
            isAvailable: product.isAvailable // Boolean
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
});

router.get('/:sku', async (req, res) => {
    try {
        const { sku } = req.params;
        const products = await sql`
            SELECT sku, "productName", price, "isAvailable"
            FROM product_vendorB
            WHERE sku = ${sku}
        `;

        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            sku: products[0].sku,
            productName: products[0].productName,
            price: products[0].price,
            isAvailable: products[0].isAvailable
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message 
        });
    }
});

module.exports = router;