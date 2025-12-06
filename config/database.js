require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
    try {
        const result = await sql`SELECT NOW()`;
        console.log('Neon Database connected successfully!');
        console.log('Server time:', result[0].now);
    } catch (error) {
        console.error('Error connecting to Neon:', error.message);
    }
}

testConnection();

module.exports = sql;