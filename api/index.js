const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Endpoint ya kuanzisha malipo
app.post('/api/malipo', async (req, res) => {
    const { phone, amount, description } = req.body;
    
    try {
        const response = await axios.post('https://harakapay.net/api/v1/collect', {
            phone: phone,
            amount: amount,
            description: description,
            webhook_url: 'https://app-yako.vercel.app/api/webhook'
        }, {
            headers: { 'X-API-Key': process.env.HARAKAPAY_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Imeshindwa kuunganisha na Haraka Pay" });
    }
});

// Endpoint ya Webhook (kufuatilia malipo)
app.post('/api/webhook', (req, res) => {
    console.log("Malipo yamepokelewa:", req.body);
    res.status(200).send("OK");
});

module.exports = app;
