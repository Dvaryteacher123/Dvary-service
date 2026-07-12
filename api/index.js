const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Hapa ndipo unapotuma muonekano wako moja kwa moja kutoka kwenye JS
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <body>
        <h1>Lipa Huduma</h1>
        <input id="phone" placeholder="Namba ya Simu">
        <input id="amount" placeholder="Kiasi">
        <button onclick="pay()">Lipa Sasa</button>
        <script>
            async function pay() {
                const phone = document.getElementById('phone').value;
                const amount = document.getElementById('amount').value;
                const res = await fetch('/api/malipo', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({phone, amount})
                });
                const data = await res.json();
                alert(data.message || "Imetumwa!");
            }
        </script>
    </body>
    </html>
    `);
});

// Endpoint ya malipo (Backend)
app.post('/api/malipo', async (req, res) => {
    // Hapa ndipo unaweka ile logic ya Haraka Pay
    // ... code yako ya axios.post ...
});

module.exports = app;
