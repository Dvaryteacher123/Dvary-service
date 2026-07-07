const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
// Inasoma faili la index.html lililopo kwenye root folder moja kwa moja
app.use(express.static(__dirname));

const HALAKA_API_KEY = process.env.HALAKA_API_KEY;

app.post('/api/pay', async (req, res) => {
    const { phone, amount, planName } = req.body;
    try {
        const response = await axios.post('https://harakapay.net/api/v1/collect', {
            phone: phone,
            amount: parseInt(amount),
            description: `Malipo ya ${planName}`
        }, {
            headers: { 'X-API-Key': HALAKA_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server inaenda!'));
