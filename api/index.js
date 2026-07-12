const express = require('express');
const axios = require('axios');
const app = express();

// Ruhusu data ya JSON
app.use(express.json());

// Endpoint ya kuanzisha malipo
app.post('/api/malipo', async (req, res) => {
    const { phone, amount, description } = req.body;
    
    // Hakikisha API Key ipo
    if (!process.env.HARAKAPAY_API_KEY) {
        return res.status(500).json({ success: false, message: "API Key haijawekwa kwenye server!" });
    }

    try {
        const response = await axios.post('https://harakapay.net/api/v1/collect', {
            phone: phone,
            amount: amount,
            description: description || "Malipo ya Huduma",
            webhook_url: 'https://dvary-service.vercel.app/api/webhook' // Hakikisha URL ni sahihi
        }, {
            headers: { 
                'X-API-Key': process.env.HARAKAPAY_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        // Tuma jibu la Haraka Pay kwa Frontend
        res.json(response.data);
    } catch (error) {
        console.error("Kosa la API:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Imeshindwa kuunganisha na Haraka Pay." });
    }
});

// Endpoint ya Webhook
app.post('/api/webhook', (req, res) => {
    // Hapa ndipo utaweka logic ya kusasisha database yako ikitokea malipo yamekamilika
    console.log("Webhook imepokea data:", req.body);
    res.status(200).send("OK");
});

module.exports = app;
