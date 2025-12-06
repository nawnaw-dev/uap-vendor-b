require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

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

app.use('/vendor-b/products', productRoutes);

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found' 
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Vendor B API -- http://localhost:${PORT}`);
    });
}

module.exports = app;